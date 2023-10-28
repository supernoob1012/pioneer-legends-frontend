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
  const [zoom, setZoom] = useState(1);
  const [zoomRate, setZoomRate] = useState(0);
  const [viewWidth, setViewWidth] = useState(0);
  const [viewHeight, setViewHeight] = useState(0);

  const zoomIn = useCallback(() => {
    if (zoom < 1.25) {
      setZoom(zoom + 0.05);
      setZoomRate(zoomRate + 1);
    }
  }, [zoom, zoomRate]);

  const zoomOut = useCallback(() => {
    if (zoom > 1) {
      setZoom(zoom - 0.05);
      setZoomRate(zoomRate - 1);
    }
  }, [zoom, zoomRate]);

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
      setViewWidth(width)
    } else if (width * 9 > height * 16) {
      setViewHeight(width * 9 / 16);
      setViewWidth(width)
    } else {
      setViewHeight(height);
      setViewWidth(height * 16 / 9)
    }
  }, [width, height])

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
            {/* {console.log('test', height, width)} */}
            <div
            className=""
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
                style={{
                  transform: `scale(${zoom})`
                }}
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
              <div className="absolute left-0 top-0 w-full h-full z-20">
                <TitleBox
                  title="airship"
                  icon={<SpaceshipIcon />}
                  balance={10000}
                  supply={1024.59}
                  left={(-792 - 70) * zoomRate}
                  top={-184 - 20 * zoomRate}
                  hoverLeft={-124 + (0 * zoomRate)}
                  hoverTop={-370 + (0 * zoomRate)}
                  zoomRate={zoom}
                  onClick={handleOpenSpaceship}
                  isBottom
                />
                <TitleBox
                  title="townhall"
                  icon={<TownhallIcon />}
                  balance={10000}
                  supply={1024.59}
                  left={-105 - 2 * zoomRate}
                  top={-300 - 22 * zoomRate}
                  hoverLeft={-120 + (0 * zoomRate)}
                  hoverTop={158 + (0 * zoomRate)}
                  zoomRate={zoom}
                  onClick={handleOpenSpaceship}
                />
                <TitleBox
                  title="mining"
                  icon={<MiningIcon />}
                  balance={10000}
                  supply={1024.59}
                  left={410 + 49 * zoomRate}
                  top={-220 - 14 * zoomRate}
                  hoverLeft={-267 + (-34 * zoomRate)}
                  hoverTop={19 + (4 * zoomRate)}
                  zoomRate={zoom}
                  onClick={handleOpenSpaceship}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="fixed right-8 bottom-8 flex flex-col z-50" style={{}}>
        <button
          className="p-2 relative z-20 hover:bg-[#e1e4cd1a] active:bg-[#1E191566]"
          onClick={zoomIn}
        >
          <PlusIcon />
        </button>
        <div className="bg-[#E1E4CD1A] w-4 h-[1px] z-20 ml-2" />
        <button
          className="p-2 relative z-20 hover:bg-[#e1e4cd1a] active:bg-[#1E191566]"
          onClick={zoomOut}
        >
          <MinusIcon />
        </button>
        <div
          className="absolute left-0 top-0 w-full h-full"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 9, 2, 0.70) 0%, rgba(38, 33, 30, 0.70) 100%)",
          }}
        ></div>
      </div>
      <Loading />

    </>
  )
};

export default Map;
