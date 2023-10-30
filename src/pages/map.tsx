/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  MiningIcon,
  SolanaIcon,
  SpaceshipIcon,
  TownhallIcon,
} from "../components/SvgIcons";
import { useWallet } from "@solana/wallet-adapter-react";
import TopProfile from "../components/TopProfile";
import { ModalContext } from "../context/ModalProvider";
import Link from "next/link";
import useWindowSize from "../utils/useWindowSize";
import Loading from "../components/Loading";
import ScrollBooster from "scrollbooster";
import { UserTech } from "../components/UserTech";

const Map = () => {
  const { width, height } = useWindowSize();
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { setIsStakeModal } = useContext<any>(ModalContext);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);
  const [scale, setScale] = useState(1);
  const [isTech, setIsTech] = useState<boolean>(false);

  const wallet = useWallet();

  const handleOpenSpaceship = () => {
    setIsStakeModal(true);
  };

  useEffect(() => {
    if (viewport.current) {
      const sb = new ScrollBooster({
        viewport: viewport.current,
        content: content.current!,
        scrollMode: "transform",
        direction: "all",
        emulateScroll: true,

        bounce: false, // Adds a bounce effect when content edge is reached
      });
      const offsetX =
        content.current!.scrollWidth - viewport.current!.offsetWidth;
      const offsetY =
        video.current!.scrollHeight - viewport.current!.offsetHeight!;
      sb.setPosition({
        x: offsetX / 2,
        y: offsetY / 2,
      });
    }
  }, [viewport]);

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
    }, 3000);

    return () => clearTimeout(tiemr);
  }, [width]);

  return (
    <div className="relative">
      <main>
        <div className="relative w-screen h-screen overflow-hidden">
          {/* <div className="h-1/5 bg-gradient-to-b from-black/70 fixed top-0 left-0 right-0 w-full z-[21] pointer-events-none" />
          <div className="h-1/5 bg-gradient-to-t from-black/70 fixed bottom-0 left-0 w-full z-[21] pointer-events-none" /> */}

          <div
            ref={viewport}
            className="z-10 w-screen h-screen overflow-hidden" // Set width, height, and overflow
          >
            {/* <div
              className="absolute left-0 top-0 w-full h-[160px] z-20"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(30, 25, 21, 0.50) 0%, rgba(30, 25, 21, 0.00) 100%)",
              }}
            /> */}
            <TopProfile
              address={
                wallet.publicKey?.toBase58() ? wallet.publicKey?.toBase58() : ""
              }
              pfp=""
            />
            <Link href={"/"} passHref>
              <div className="w-[289px] h-[32px] absolute top-[21px] left-[26px] z-50 cursor-pointer opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
                <Image
                  src="/img/logo@text.png"
                  className="relative"
                  layout="fill"
                  alt=""
                />
              </div>
            </Link>
            <div
              className="relative"
              ref={content}
              style={{
                width: viewWidth,
                height: viewHeight,
                // width: (3840 / 2160) * (height + (width > 768 ? 100 : 300)),
                // height: height + 300,
              }}
            >
              <video
                ref={video}
                className="w-full h-full z-20 object-cover object-left-top"
                autoPlay={true}
                playsInline
                loop
                muted
                data-wf-ignore="true"
                data-object-fit="cover"
                id="video"
              >
                <source
                  src="/video/video.mp4"
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
                className="cursor-pointer group"
                onClick={handleOpenSpaceship}
              >
                <img
                  src="/img/build-hover.png"
                  className="opacity-0 group-hover:opacity-100 duration-150 peer"
                  style={{
                    width: 230,
                    height: 230,
                    // transform: `scale(${scale}%)`,
                    // transformOrigin: '70% 50%'
                    // scale: `${scale}%`
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
                onClick={handleOpenSpaceship}
                className="cursor-pointer group"
              >
                <img
                  src="/img/build-hover.png"
                  className="opacity-0 group-hover:opacity-100 duration-150"
                  style={{
                    width: 230,
                    height: 230,
                    // transform: `scale(${scale}%)`,
                    // transformOrigin: '70% 50%'
                    // scale: `${scale}%`
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
                onClick={handleOpenSpaceship}
                className="cursor-pointer group"
              >
                <img
                  src="/img/build-hover1.png"
                  className="opacity-0 group-hover:opacity-100 duration-150"
                  style={{
                    width: 230,
                    height: 230,
                    // transform: `scale(${scale}%)`,
                    // transformOrigin: '70% 50%'
                    // scale: `${scale}%`
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
            </div>
          </div>
        </div>
      </main>
      <Loading />
      <div className="flex justify-center">
        {isTech && <UserTech setIsTech={setIsTech} />}
      </div>
    </div>
  );
};

export default Map;
