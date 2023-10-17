/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import ConnectWallet from "./ConnectWallet";
import Link from "next/link";
import { DiscordIcon, TwitterIcon } from "./SvgIcons";

interface Props {
  scroll: number;
}

const HomeHeader: FC<Props> = ({ scroll }) => {
  return (
    <div className="fixed w-full left-0 top-0 z-50 backdrop-blur-[10px] ">
      <div
        className="bg-[#1E1915] absolute left-0 top-0 w-full h-full opacity-80 duration-300"
        style={{
          boxShadow: "3px 10px 7px #00000059",
          transform: `translateY(${scroll < -50 ? 0 : -150}px)`,
        }}
      >
        <div
          className="absolute left-0 top-0 w-full h-full"
          style={{
            fill: "linear-gradient(110deg, #30353D 13.13%, #38291D 86.87%)",
            boxShadow: "1px 1px 2px 0px #46484B inset",
          }}
        ></div>
      </div>
      <div className="flex items-center justify-between w-full px-8 z-10 relative">
        <div className="py-4">
          <img
            src="/img/logo@sm.png"
            className="w-[177px] h-[74px] duration-300"
            alt=""
            style={{
              transform: `translateY(${scroll < -50 ? 0 : -150}px)`,
            }}
          />
        </div>
        <div className="flex py-[18px]">
          <ConnectWallet />
          <div className="flex items-center gap-4 ml-10">
            <Link href={"#"} passHref>
              <a className="w-8 h-8">
                <TwitterIcon />
              </a>
            </Link>
            <Link href={"#"} passHref>
              <a className="w-8 h-8">
                <DiscordIcon />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
