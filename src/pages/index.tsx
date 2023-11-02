/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { BsTwitter, BsDiscord } from "react-icons/bs";
import { BiSolidVolumeFull, BiSolidVolumeMute } from "react-icons/bi";

import IntroBox from "../components/IntroBox";
import HomeHeader from "../components/HomeHeader";
import { DownArrowIcon } from "../components/SvgIcons";
import { HOME_INTRO_CONTENT } from "../config";
import useWindowSize from "../utils/useWindowSize";
import {
  UserContext,
  UserContextProps,
  useUserData,
} from "../context/UserProvider";
import Button from "../components/Button";

export default function Index(props: { isMute: boolean; setIsMute: Function }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const { width } = useWindowSize();
  const { sign } = useUserData();
  const { publicKey } = useWallet();
  const { setIsNetSpeed, isNetSpeed } =
    useContext<UserContextProps>(UserContext);
  const video = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleSign = async () => {
    await sign();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (mainRef.current !== null) {
        const top = mainRef.current.getBoundingClientRect().top;
        setScroll(top);
      }
    };

    const handleResize = () => {
      if (mainRef.current !== null) {
        const top = mainRef.current.getBoundingClientRect().top;
        setScroll(top);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const playingButton = () => {
    if (!video.current) return;
    if (isPlaying) {
      video.current.muted = false;
      setIsPlaying(false);
    } else {
      video.current.muted = true;
      setIsPlaying(true);
    }
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     console.log("Muted", video.current);
  //     if (video.current) {
  //       video.current.muted = false;
  //       video.current.autoplay = true;
  //     }
  //   }, 1500);
  // }, []);

  if (!isNetSpeed) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>Pioneer Legends</title>
        <meta name="description" content="Pioneer Legends | Home" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={mainRef}>
        <HomeHeader scroll={scroll} />
        <div
          className={`h-screen w-screen left-0 top-0 z-[20] fixed bg-[linear-gradient(180deg,#000_47.89%,rgba(0,0,0,0.00)_100%)] opacity-0 duration-300 ${
            scroll < -80
              ? "drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] opacity-70 backdrop-blur-[20px]"
              : ""
          }`}
        />
        <video
          ref={video}
          className="w-full h-screen object-cover object-center fixed z-[1]"
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
                ? "/video/landing_50.mp4"
                : "/video/landing_70.mp4"
            }
            type="video/mp4"
            data-wf-ignore="true"
          />
        </video>
        {width <= 640 && (
          <div className="bottom-6 social_panel z-[8000] fixed flex gap-5 items-center pl-4">
            <a
              href="http://x.com/pioneerlegendio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter className="text-white text-2xl" />
            </a>
            <a
              href="http://discord.com/invite/pioneerlegends"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsDiscord className="text-white text-2xl" />
            </a>
          </div>
        )}
        <div
          className="h-8 w-8 fixed right-8 bottom-8 bg-[linear-gradient(180deg,rgba(15,9,2,0.7)_0%,rgba(38,33,30,0.7)_100%)] flex items-center justify-center z-50 cursor-pointer"
          onClick={playingButton}
        >
          {!isPlaying ? (
            <BiSolidVolumeFull className="text-white" />
          ) : (
            <BiSolidVolumeMute className="text-white" />
          )}
        </div>
        <div
          className={`relative overflow-hidden z-20 ${
            scroll < -200 ? "backdrop-blur-[6px]" : ""
          }`}
        >
          <div className="grid place-content-center h-screen relative z-10">
            <Link href={"#content"} passHref>
              <div className="w-10 h-10 absolute left-1/2 -translate-x-1/2 bottom-[56px] cursor-pointer drop-scroll">
                <DownArrowIcon />
              </div>
            </Link>
          </div>
          <div
            className="text-[#fff] pt-[157px] pb-[80px] relative"
            id="content"
          >
            <div className="w-[calc(100%-40px)] lg:w-[970px] mx-5 lg:mx-auto">
              <h2 className="text-4xl text-white max-lg:text-center">
                Feeling lucky?
              </h2>
              <p className="mt-4 font-medium text-2xl text-[#E1E4CD] max-lg:text-center">
                Welcome to Pioneer Legends, where the Old Wild West meets the
                New. This is a world full of lawlessness, euphoria, and
                degeneracy...
              </p>
              <div className="flex w-full justify-center mt-10">
                <a
                  href="https://www.pioneerlegends.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary">See Whitepaper</Button>
                </a>
              </div>
              <div className="grid grid-cols-1 gap-8 my-8 py-12 max-lg:gap-20">
                {HOME_INTRO_CONTENT.map((item, key) => (
                  <IntroBox
                    title={item.title}
                    key={key}
                    description={item.desciption}
                    image={item.media}
                  />
                ))}
              </div>
              <h1 className="text-2xl text-center text-white">
                You should feel right at home.
              </h1>
              <div className="flex gap-10 pt-12 justify-center">
                <a
                  href="https://www.pioneerlegends.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary">See Whitepaper</Button>
                </a>
                {publicKey ? (
                  <Button variant="primary" onClick={handleSign}>
                    Connect wallet
                  </Button>
                ) : (
                  <Button variant="primary">Connect wallet</Button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <img
          src="/img/background.jpg"
          className="w-full absolute left-0 top-0 h-full min-h-full object-cover"
          style={{
            height: `calc(100vh - ${scroll}px)`,
          }}
          alt=""
        /> */}
      </main>
    </>
  );
}
