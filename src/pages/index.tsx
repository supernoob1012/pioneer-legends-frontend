/* eslint-disable @next/next/no-img-element */
import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import { DownArrowIcon } from "../components/SvgIcons";
import { HOME_INTRO_CONTENT } from "../config";
import IntroBox from "../components/IntroBox";
import HomeHeader from "../components/HomeHeader";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

export default function Index(props: { isMute: boolean; setIsMute: Function }) {
  const mainRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);

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

  const wallet = useWallet();
  const router = useRouter();

  // useEffect(() => {
  //   if (wallet.connected && wallet.publicKey) {
  //     router.push("/map");
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wallet.connected, wallet.publicKey]);

  return (
    <>
      <Head>
        <title>Pioneer Legends</title>
        <meta name="description" content="Pioneer Legends | Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main ref={mainRef}>
        <HomeHeader scroll={scroll} />
        <div
          className="h-screen w-screen opacity-80 fixed left-0 top-0 z-[2]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #1F1B18 0%, #393028 100%)",
          }}
        ></div>
        <div className="backdrop-blur-[10px] relative overflow-hidden z-20">
          <div className="grid place-content-center h-screen relative z-10">
            <img src="/img/logo.png" className="w-[163px] h-[212px]" alt="" />
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
              <h2 className="text-[24px] lg:text-[36px] font-medium lg:font-normal text-center lg:text-left leading-[1.5]">
                Intro words
              </h2>
              <p className="mt-4 text-[16px] lg:text-[20px] font-medium lg:font-normal leading-[1.5] text-center lg:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                imperdiet sem id venenatis, massa ornare. Odio diam lectus
                laoreet semper tortor non. In risus, proin purus a sit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Diam
                imperdiet sem id venenatis, massa ornare. Odio diam lectus
                laoreet semper tortor non. In risus, proin purus a sit.
              </p>
              <div className="grid grid-cols-1 gap-8 my-8 py-12">
                {HOME_INTRO_CONTENT.map((item, key) => (
                  <IntroBox
                    title={item.title}
                    key={key}
                    description={item.desciption}
                    image={item.media}
                  />
                ))}
              </div>
              <h2 className="text-[24px] lg:text-[36px] font-medium lg:font-normal text-center lg:text-left leading-[1.5]">
                Close Word
              </h2>
              <p className="mt-4 text-[16px] lg:text-[20px] font-medium lg:font-normal leading-[1.5] text-center lg:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Diam
                imperdiet sem id venenatis, massa ornare. Odio diam lectus
                laoreet semper tortor non. In risus, proin purus a sit. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
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
