/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head";
import Link from "next/link";
import useSound from "use-sound";

import {
  MiningIcon,
  SolanaIcon,
  SpaceshipIcon,
  TownhallIcon,
} from "../components/SvgIcons";
import TopProfile from "../components/TopProfile";
import { ModalContext } from "../context/ModalProvider";
import useWindowSize from "../utils/useWindowSize";
import Loading from "../components/Loading";
import ScrollBooster from "scrollbooster";
import { UserTech } from "../components/UserTech";
import { UserContext, UserContextProps } from "../context/UserProvider";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { getCookie } from "cookies-next";

const Map = () => {
  const { width, height } = useWindowSize();
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { setIsStakeModal, setTitle } = useContext<any>(ModalContext);
  const { isNetSpeed, setIsNetSpeed } =
    useContext<UserContextProps>(UserContext);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [isTech, setIsTech] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const [cookieInfo, setCookieInfo] = useState<string>("");

  // const [play, { pause }] = useSound("/music/landing_bg_music.wav", {
  //   onend: () => {
  //     setIsEnd(true);
  //   },
  // });

  // useEffect(() => {
  //   if (isEnd) {
  //     play();
  //     setIsEnd(false);
  //   }
  // }, [isEnd]);

  const wallet = useWallet();

  const handleOpenSpaceship = (title: string) => {
    setIsStakeModal(true);
    setTitle(title);
  };

  useEffect(() => {
    const userImageLink =
      "https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200714180638/CIP_Launch-banner.png";
    let time_start: number, end_time: number;

    // The size in bytes
    const downloadSize = 5616998;
    const downloadImgSrc = new Image();

    downloadImgSrc.onload = function () {
      end_time = new Date().getTime();
      displaySpeed();
    };
    time_start = new Date().getTime();
    downloadImgSrc.src = userImageLink;

    function displaySpeed() {
      const timeDuration = (end_time - time_start) / 1000;
      const loadedBits = downloadSize * 8;
      const bps = (loadedBits / timeDuration).toFixed(2);
      // @ts-ignore
      const mbps = (bps / 1048576).toFixed(2);

      console.log("Speed", mbps, typeof mbps);
      setIsNetSpeed(mbps);
    }
  }, []);

  useEffect(() => {
    if (viewport.current && viewWidth > 0) {
      const sb = new ScrollBooster({
        viewport: viewport.current,
        content: content.current!,
        scrollMode: "transform",
        direction: "all",
        emulateScroll: true,
        bounce: false, // Adds a bounce effect when content edge is reached
      });

      sb.scrollTo({
        x: (viewWidth - viewport.current.clientWidth) / 2,
        y: 0,
      });
    }
  }, [viewport, viewWidth, isNetSpeed]);

  const playingButton = () => {
    if (!audio.current) return;
    if (isPlaying) {
      audio.current.pause();
      setIsPlaying(false);
    } else {
      audio.current.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    if (width * 9 === height * 16) {
      setViewHeight(height);
      setViewWidth(width);
    } else if (width * 9 > height * 16) {
      setViewHeight((width * 9) / 16);
      setViewWidth(width);
    } else {
      setViewHeight(height);
      setViewWidth((height * 16) / 9);
    }
  }, [width, height]);

  useEffect(() => {
    setScale(viewHeight / 9);
  }, [viewHeight]);

  useEffect(() => {
    const handleWheel = (event: any) => {
      if (event.ctrlKey) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.ctrlKey && (event.key === "-" || event.key === "=")) {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const setTechAnim = () => {
      if (width <= 480) {
        setIsTech(true);
      } else {
        setIsTech(false);
      }
    };

    const tiemr = setTimeout(() => {
      setTechAnim();
      if (audio.current) {
        audio.current.load();
        audio.current.play();
      }
    }, 3000);

    return () => clearTimeout(tiemr);
  }, [width]);

  useEffect(() => {
    const cookie = getCookie("handtech");
    // @ts-ignore
    setCookieInfo(cookie);
  }, []);

  if (!isNetSpeed) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Map | Pioneer Legends</title>
      </Head>
      <main>
        <audio autoPlay src="/music/pl_bg20.wav" ref={audio}></audio>
        <div className="relative w-screen h-screen overflow-hidden">
          <div
            ref={viewport}
            className="z-10 w-screen h-screen overflow-hidden relative" // Set width, height, and overflow
          >
            <TopProfile
              address={
                wallet.publicKey?.toBase58() ? wallet.publicKey?.toBase58() : ""
              }
              pfp=""
            />
            <Link href={"/"} passHref>
              <div className="w-[289px] h-[32px] absolute top-[21px] left-[26px] z-50  opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
                <img src="/img/logo@text.png" className="relative" alt="" />
              </div>
            </Link>
            <div
              className="relative object-center"
              ref={content}
              style={{
                width: viewWidth,
                height: viewHeight,
              }}
            >
              <video
                ref={video}
                className="w-full h-full z-20 object-cover object-center"
                autoPlay={true}
                playsInline
                loop
                muted
                data-wf-ignore="true"
                data-object-fit="cover"
                id="video"
              >
                <source
                  src={
                    parseInt(isNetSpeed) < 2000
                      ? "/video/video_50.mp4"
                      : "/video/video_70.mp4"
                  }
                  type="video/mp4"
                  data-wf-ignore="true"
                />
              </video>
              <div
                style={{
                  position: "absolute",
                  top: `${(9 * viewHeight) / 100}px`,
                  left: `${(12.8 * viewWidth) / 100}px`,
                  transformOrigin: "0% 0%",
                  transform: `scale(${scale}%)`,
                  opacity: 1,
                }}
                className="cursor-url('/cursor/hover.png') group"
                onClick={() => handleOpenSpaceship("airship")}
              >
                <img
                  src="/img/build-hover.png"
                  className="opacity-0 group-hover:opacity-100 duration-150 peer"
                  style={{
                    width: 230,
                    height: 230,
                  }}
                  alt=""
                  draggable="false"
                />
                <div className="w-[180px] mt-5 ml-8 h-[74px] pt-3 relative z-10 backdrop-blur-[2px] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:opacity-70 before:bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] group-hover:before:bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,#0F0902_0%,#26211E_100%)]">
                  <div
                    className="w-[18px] h-2.5 overflow-hidden absolute -translate-x-1/2 z-[9] ml-1"
                    style={{
                      bottom: 74,
                      left: "50%",
                      marginLeft: -8,
                      transform: "translateX(-50%) rotate(180deg)",
                    }}
                  >
                    <div className="bg-[#38291E] w-4 h-4 rotate-45 absolute left-0 -top-[11px] opacity-70" />
                  </div>
                  <p className="text-primary-100 font-secondary text-[18px] leading-[32px] uppercase text-center z-10 relative">
                    {`AIRSHIP`}
                  </p>
                  <div className="flex items-center justify-center gap-2 z-10 relative">
                    <div className="flex items-end">
                      <SpaceshipIcon />
                      <div className="font-normal text-[11px] ml-[3.2px] text-primary-200">
                        {1000}
                      </div>
                    </div>
                    <div className="flex items-end">
                      <SolanaIcon />
                      <span className="font-normal text-[11px] ml-[3.2px] text-primary-200">
                        {1020}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: `${(38.5 * viewHeight) / 100}px`,
                  left: `${(40.5 * viewWidth) / 100}px`,
                  transformOrigin: "0% 0%",
                  transform: `scale(${scale}%)`,
                }}
                onClick={() => handleOpenSpaceship("townhall")}
                className=" group"
              >
                <img
                  src="/img/build-hover.png"
                  className="opacity-0 group-hover:opacity-100 duration-150"
                  style={{
                    width: 230,
                    height: 230,
                  }}
                  alt=""
                  draggable="false"
                />
                <div className="ml-7 -mt-[360px] w-[180px] h-[74px] pt-3 relative z-10 backdrop-blur-[2px] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:opacity-70 before:bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] group-hover:before:bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,#0F0902_0%,#26211E_100%)]">
                  <div
                    className="w-[18px] h-2.5 overflow-hidden absolute -translate-x-1/2 z-[9] ml-1"
                    style={{
                      bottom: -10,
                      left: "53%",
                      marginLeft: -8,
                      transform: "translateX(-50%) rotate(0deg)",
                    }}
                  >
                    <div className="bg-[#38291E] w-4 h-4 rotate-45 absolute left-0 -top-[11px] opacity-70" />
                  </div>
                  <p className="text-primary-100 font-secondary text-[18px] leading-[32px] uppercase text-center z-10 relative">
                    TOWNHALL
                  </p>
                  <div className="flex items-center justify-center gap-2 z-10 relative">
                    <div className="flex items-end">
                      <TownhallIcon />
                      <div className="font-normal text-[11px] ml-[3.2px] text-primary-200 mt-1">
                        2312
                      </div>
                    </div>
                    <div className="flex items-end">
                      <SolanaIcon />
                      <span className="font-normal text-[11px] ml-[3.2px] text-primary-200">
                        2345
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: `${(37 * viewHeight) / 100}px`,
                  left: `${(60.5 * viewWidth) / 100}px`,
                  transformOrigin: "0% 0%",
                  transform: `scale(${scale}%)`,
                }}
                onClick={() => handleOpenSpaceship("mining")}
                className=" group"
              >
                <img
                  src="/img/build-hover1.png"
                  className="opacity-0 group-hover:opacity-100 duration-150"
                  style={{
                    width: 230,
                    height: 230,
                  }}
                  alt=""
                  draggable="false"
                />
                <div className="ml-[34px] -mt-[300px] w-[180px] h-[74px] pt-3 relative z-10 backdrop-blur-[2px] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:opacity-70 before:bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] group-hover:before:bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,#0F0902_0%,#26211E_100%)]">
                  <div
                    className="w-[18px] h-2.5 overflow-hidden absolute -translate-x-1/2 z-[9] ml-1"
                    style={{
                      bottom: -10,
                      left: "53%",
                      marginLeft: -8,
                      transform: "translateX(-50%) rotate(0deg)",
                    }}
                  >
                    <div className="bg-[#38291E] w-4 h-4 rotate-45 absolute left-0 -top-[11px] opacity-70" />
                  </div>
                  <p className="text-primary-100 font-secondary text-[18px] leading-[32px] uppercase text-center z-10 relative">
                    MINING
                  </p>
                  <div className="flex items-center justify-center gap-2 z-10 relative">
                    <div className="flex items-end">
                      <MiningIcon />

                      <div className="font-normal text-[11px] ml-[3.2px] text-primary-200 mt-1">
                        2323
                      </div>
                    </div>
                    <div className="flex items-end">
                      <SolanaIcon />
                      <span className="font-normal text-[11px] ml-[3.2px] text-primary-200">
                        1020
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {isTech && !cookieInfo && <UserTech setIsTech={setIsTech} />}
            </div>
            <div
              className="h-8 w-8 fixed right-8 bottom-8 bg-[linear-gradient(180deg,rgba(15,9,2,0.7)_0%,rgba(38,33,30,0.7)_100%)] flex items-center justify-center z-50 "
              onClick={playingButton}
            >
              {!isPlaying ? (
                <BiSolidVolumeMute className="text-white" />
              ) : (
                <BiSolidVolumeFull className="text-white" />
              )}
            </div>
          </div>
        </div>
      </main>
      {/* <Loading /> */}

    </>
  );
};

export default Map;
