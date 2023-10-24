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
const Map = () => {
  const { setIsStakeModal } = useContext<any>(ModalContext);
  const [zoom, setZoom] = useState(0.5);
  const [zoomRate, setZoomRate] = useState(0);
  const zoomIn = useCallback(() => {
    if (zoom <= 0.95) {
      setZoom(zoom + 0.05);
      setZoomRate(zoomRate + 1);
    }
  }, [zoom, zoomRate]);

  const zoomOut = useCallback(() => {
    if (zoom >= 0.55) {
      setZoom(zoom - 0.05);
      setZoomRate(zoomRate - 1);
    }
  }, [zoom, zoomRate]);

  const wallet = useWallet();

  const handleOpenSpaceship = () => {
    setIsStakeModal(true);
  };

  const videoContainerRef = useRef<HTMLDivElement>(null);
  let isDragging = false;
  let prevX = 0;
  let prevY = 0;
  const { width, height } = useWindowSize();

  return (
    <>
      <div className="w-screen h-screen relative grid place-content-center overflow-hidden">
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
        <div className="w-[3840px] h-[2160px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="duration-200"
            style={{
              transform: `scale(${zoom})`,
            }}
          >
            <img
              src={"/img/background/empty.png"}
              className={`z-[1] object-cover duration-150 w-full h-full`}
              draggable="false"
              alt=""
            />
            <img
              src={"/img/background/river_animation.gif"}
              className={`absolute left-0 top-0 z-[1] object-cover duration-150 w-full h-full`}
              draggable="false"
              alt=""
            />
            <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 absolute z-20">
              <div className="absolute left-[-1480px] top-[-970px] w-[664px] h-[664px]">
                <Image
                  src={"/img/background/airship_animation.gif"}
                  className="z-[1] object-cover"
                  layout="fill"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="absolute left-[-416px] top-[-362px] w-[683px] h-[683px]">
                <Image
                  src={"/img/background/town_hall_animation.gif"}
                  className="z-[1] object-cover"
                  layout="fill"
                  loading="lazy"
                  alt=""
                />
              </div>
              <div className="absolute left-[90px] top-[-908px] w-[410px] h-[410px]">
                <Image
                  src={"/img/background/windmill_animation.gif"}
                  className="z-[1] object-cover"
                  layout="fill"
                  loading="lazy"
                  draggable="false"
                  alt=""
                />
              </div>
              <div className="absolute left-[710px] top-[230px] w-[410px] h-[410px]">
                <Image
                  src={"/img/background/windmill_animation.gif"}
                  className="z-[1] object-cover"
                  layout="fill"
                  draggable="false"
                  loading="lazy"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 absolute z-20">
            <TitleBox
              title="airship"
              icon={<SpaceshipIcon />}
              balance={10000}
              supply={1024.59}
              left={-652 - 44 * zoomRate}
              top={-134 - 14 * zoomRate}
              hoverLeft={-68}
              hoverTop={-308}
              onClick={handleOpenSpaceship}
              isBottom
            />
            <TitleBox
              title="townhall"
              icon={<TownhallIcon />}
              balance={10000}
              supply={1024.59}
              left={-143}
              top={-250 - 14 * zoomRate}
              hoverLeft={-64}
              hoverTop={114}
              onClick={handleOpenSpaceship}
            />
            <TitleBox
              title="mining"
              icon={<MiningIcon />}
              balance={10000}
              supply={1024.59}
              left={250 + 32 * zoomRate}
              top={-180 - 14 * zoomRate}
              hoverLeft={-70}
              hoverTop={28}
              onClick={handleOpenSpaceship}
            />
          </div>
        </div>
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
      </div>
      <Loading />
    </>
  );
};

export default Map;
