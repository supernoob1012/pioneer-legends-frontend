/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  DiscordIcon,
  DownArrowIcon,
  TwitterIcon,
} from "../components/SvgIcons";
import { HOME_INTRO_CONTENT } from "../config";
import IntroBox from "../components/IntroBox";
import HomeHeader from "../components/HomeHeader";
import useWindowSize from "../utils/useWindowSize";
import Button from "../components/Button";
import { useUserData } from "../context/UserProvider";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Index(props: { isMute: boolean; setIsMute: Function }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const { width } = useWindowSize();
  const { sign } = useUserData();
  const { publicKey } = useWallet();

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
        ></div>
        {width <= 640 && (
          <div className="bottom-6 social_panel z-[8000] fixed flex gap-5 items-center pl-4">
            <Link href="https://x.com/pioneerlegendio/" passHref>
              <a className="w-8 h-8">
                <TwitterIcon />
              </a>
            </Link>
            <Link href="https://discord.com/invite/pioneerlegends" passHref>
              <a className="w-8 h-8">
                <DiscordIcon />
              </a>
            </Link>
          </div>
        )}
        <div className="relative overflow-hidden z-20">
          <div className="grid place-content-center h-screen relative z-10">
            {width >= 480 ? (
              <img
                src="/img/md_logo.png"
                className="w-[503px] max-lg:w-80 aspect-auto"
                alt=""
              />
            ) : (
              <img
                src="/img/sm_logo.png"
                className="w-[163px] h-[212px]"
                alt=""
              />
            )}
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
        <img
          src="/img/background.jpg"
          className="w-full absolute left-0 top-0 h-full min-h-full object-cover"
          style={{
            height: `calc(100vh - ${scroll}px)`,
          }}
          alt=""
        />
      </main>
    </>
  );
}
