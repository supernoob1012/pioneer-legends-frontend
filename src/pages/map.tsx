/* eslint-disable @next/next/no-img-element */
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import {
  MiningIcon,
  MinusIcon,
  PlusIcon,
  SpaceshipIcon,
  TownhallIcon,
} from "../components/SvgIcons";
import { useWallet } from "@solana/wallet-adapter-react";
import TopProfile from "../components/TopProfile";
import { ModalContext } from "../context/ModalProvider";
import TitleBox from "../components/TitleBox";
import Link from "next/link";
import useWindowSize from "../utils/useWindowSize";
import Loading from "../components/Loading";
import ScrollBooster from "scrollbooster";

const Map = () => {
  const { width, height } = useWindowSize();
  const viewport = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const { setIsStakeModal } = useContext<any>(ModalContext);

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
        content.current!.scrollHeight - viewport.current!.offsetHeight!;
      sb.setPosition({
        x: offsetX / 2,
        y: offsetY / 2,
      });
    }
  }, [viewport, content.current, video.current]);

  return (
    <>
      <main>
        <div className="relative w-screen h-screen overflow-hidden">
          {/* <div className="h-1/5 bg-gradient-to-b from-black/70 fixed top-0 left-0 right-0 w-full z-[21] pointer-events-none" />
          <div className="h-1/5 bg-gradient-to-t from-black/70 fixed bottom-0 left-0 w-full z-[21] pointer-events-none" /> */}

          <div
            ref={viewport}
            className="z-10 w-screen h-screen overflow-hidden" // Set width, height, and overflow
          >
            <div
              className="absolute left-0 top-0 w-full h-[160px] z-20"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(30, 25, 21, 0.50) 0%, rgba(30, 25, 21, 0.00) 100%)",
              }}
            />
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
              ref={content}
              className="relative"
              style={{
                minWidth: "100vw",
                height: "auto",
              }}
            >
              <video
                ref={video}
                className="absolute w-screen h-auto z-20 object-cover object-left-top"
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
              {/* <div className="absolute left-0 top-0 w-full h-full z-20">
                <TitleBox
                  title="airship"
                  icon={<SpaceshipIcon />}
                  balance={10000}
                  supply={1024.59}
                  left={317}
                  top={424}
                  hoverLeft={-62}
                  hoverTop={-325}
                  width={300}
                  height={300}
                  onClick={handleOpenSpaceship}
                  isBottom
                />
                <TitleBox
                  title="townhall"
                  icon={<TownhallIcon />}
                  balance={10000}
                  supply={1024.59}
                  left={876}
                  top={310}
                  hoverLeft={-58}
                  hoverTop={119}
                  width={300}
                  height={300}
                  onClick={handleOpenSpaceship}
                  isBottom
                />
                <TitleBox
                  title="mining"
                  icon={<MiningIcon />}
                  balance={10000}
                  supply={1024.59}
                  left={1302}
                  top={376}
                  hoverLeft={-64}
                  hoverTop={41}
                  width={300}
                  height={300}
                  onClick={handleOpenSpaceship}
                  isBottom
                />
              </div> */}
            </div>
          </div>
        </div>
      </main>
      <Loading />
    </>
  );
};

export default Map;
