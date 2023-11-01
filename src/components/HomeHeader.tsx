/* eslint-disable @next/next/no-img-element */
import { FC } from "react";
import ConnectWallet from "./ConnectWallet";
import { BsTwitter, BsDiscord } from "react-icons/bs";

interface Props {
  scroll: number;
}

const HomeHeader: FC<Props> = ({ scroll }) => {
  return (
    <div className="fixed w-full left-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0)_100%)]">
      <div
        className="bg-[#1E1915] absolute left-0 top-0 w-full h-full opacity-80 duration-300"
        style={{
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
      <div className="flex items-center justify-between w-full px-6 lg:px-8 z-10 relative">
        <div className="py-4 hidden lg:block">
          <img
            src="/img/logo@sm.png"
            className="w-[177px] aspect-[177/74] duration-300"
            alt=""
            style={{
              transform: `translateY(${scroll < -50 ? 0 : -150}px)`,
            }}
          />
        </div>
        <div className="flex py-[18px] w-full justify-between lg:justify-end">
          <ConnectWallet />
          <div className="flex items-center gap-4 ml-10 max-sm:hidden">
            <a
              href="https://x.com/pioneerlegendio/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsTwitter className="text-white text-2xl cursor-pointer" />
            </a>
            <a
              href="https://discord.com/invite/pioneerlegends"
              target="_blank"
              rel="noopener noreferrer"
            >
              <BsDiscord className="text-white text-2xl cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
