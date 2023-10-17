import React, { useContext } from "react";
import Image from "next/image";
import {
  MiningIcon,
  SpaceshipIcon,
  TownhallIcon,
} from "../components/SvgIcons";
import { useWallet } from "@solana/wallet-adapter-react";
import TopProfile from "../components/TopProfile";
import { ModalContext } from "../context/ModalProvider";
import TitleBox from "../components/TitleBox";
import Link from "next/link";

const Map = () => {
  const { setIsStakeModal } = useContext<any>(ModalContext);

  const wallet = useWallet();

  const handleOpenSpaceship = () => {
    setIsStakeModal(true);
  };

  return (
    <div className="h-screen relative grid place-content-center overflow-hidden">
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
        <div className="w-[289px] h-[32px] absolute top-[21px] left-[26px] z-50 cursor-pointer">
          <Image
            src="/img/logo@text.png"
            className="relative"
            layout="fill"
            alt=""
          />
        </div>
      </Link>
      <div className="w-[1920px] h-[1080px] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="w-[1920px] h-[1080px]">
          <Image
            src={"/img/background/empty.png"}
            className="absolute z-[1] object-cover"
            layout="fill"
            loading="lazy"
            alt=""
          />
          <Image
            src={"/img/background/river_animation.gif"}
            className="absolute z-[1] object-cover"
            layout="fill"
            loading="lazy"
            alt=""
          />
          {/* <img src="/img/background/empty.png" alt="" /> */}
        </div>
        <div className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 absolute z-20">
          <div className="absolute left-[-740px] top-[-485px] w-[332px] h-[332px]">
            <Image
              src={"/img/background/airship_animation.gif"}
              className="z-[1] object-cover"
              layout="fill"
              loading="lazy"
              alt=""
            />
          </div>
          <div className="absolute left-[-208px] top-[-181px] w-[341.5px] h-[341.5px]">
            <Image
              src={"/img/background/town_hall_animation.gif"}
              className="z-[1] object-cover"
              layout="fill"
              loading="lazy"
              alt=""
            />
          </div>
          <div className="absolute left-[46px] top-[-452px] w-[205px] h-[205px]">
            <Image
              src={"/img/background/windmill_animation.gif"}
              className="z-[1] object-cover"
              layout="fill"
              loading="lazy"
              alt=""
            />
          </div>
          <div className="absolute left-[355px] top-[115px] w-[205px] h-[205px]">
            <Image
              src={"/img/background/windmill_animation.gif"}
              className="z-[1] object-cover"
              layout="fill"
              loading="lazy"
              alt=""
            />
          </div>
          <TitleBox
            title="spaceship"
            icon={<SpaceshipIcon />}
            balance={10000}
            supply={1024.59}
            left={-652}
            top={-134}
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
            top={-250}
            hoverLeft={-64}
            hoverTop={114}
            onClick={() => console.log("town hall")}
          />
          <TitleBox
            title="mining"
            icon={<MiningIcon />}
            balance={10000}
            supply={1024.59}
            left={250}
            top={-180}
            hoverLeft={-70}
            hoverTop={28}
            onClick={() => console.log("mining")}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
