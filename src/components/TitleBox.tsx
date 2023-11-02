import { FC, ReactNode, useEffect, useRef } from "react";
import { SolanaIcon } from "./SvgIcons";
const RATE_ZOOM = 1;
interface BoxProps {
  title: string;
  icon: ReactNode;
  balance: number;
  supply: number;
  left?: number;
  top?: number;
  hoverLeft: number;
  hoverTop?: number;
  isBottom?: boolean;
  zoomRate?: number;
  onClick: () => void;
}

const TitleBox: FC<BoxProps> = ({
  title,
  icon,
  supply,
  balance,
  left = 0,
  top = 0,
  hoverLeft = 0,
  hoverTop = 0,
  isBottom = false,
  onClick,
}) => {
  return (
    <div
      className="absolute z-10 "
      style={{
        left,
        top,
      }}
      onClick={onClick}
    >
      <div
        className="absolute group peer border border-black"
        style={{
          left: hoverLeft,
          top: hoverTop,
          width: 230,
          height: 230,
        }}
      >
        {/* eslint-disable-next-line */}
        {title === 'mining' ?
          <img
            src="/img/build-hover1.png"
            className="opacity-100 group-hover:opacity-100 duration-150 border border-[red]"
            style={{
              width: 230,
              height: 230,
            }}
            alt=""
            draggable="false"
          /> :
          <img
            src="/img/build-hover.png"
            className="opacity-100 group-hover:opacity-100 duration-150 border border-[red]"
            style={{
              width: 230,
              height: 230,
            }}
            alt=""
            draggable="false"
          />
        }
      </div>
      <div className="w-[180px] h-[74px] pt-3 relative z-10 backdrop-blur-[2px] before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:opacity-70 before:bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] peer-hover:before:bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%),linear-gradient(180deg,#0F0902_0%,#26211E_100%)]">
        <div
          className="w-[18px] h-2.5 overflow-hidden absolute -translate-x-1/2 z-[9] ml-1"
          style={{
            bottom: title === 'airship' ? 74 : -10,
            left: title === 'airship' ? "50%" : "50%",
            marginLeft: title === 'airship' ? -8 : 0,
            transform: `${title === 'airship' ? "translateX(-50%) rotate(180deg)" : "translateX(-50%)"}`
            // bottom: isBottom ? 74 : -10,
            // left: isBottom ? "50%" : "50%",
            // marginLeft: isBottom ? -8 : 0,
            // transform: `${isBottom ? "translateX(-50%) rotate(180deg)" : "translateX(-50%)"}`
          }}
        >
          <div className="bg-[#38291E] w-4 h-4 rotate-45 absolute left-0 -top-[11px] opacity-70" />
        </div>
        <p className="text-primary-100 font-secondary text-[18px] leading-[32px] uppercase text-center z-10 relative">
          {title}
        </p>
        <div className="flex items-center justify-center gap-2 z-10 relative">
          <div className="flex items-center">
            {icon}
            <div className="font-normal text-[11px] ml-[3.2px] text-primary-200 mt-1">
              {balance}
            </div>
          </div>
          <div className="flex items-center">
            <SolanaIcon />
            <span className="font-normal text-[11px] ml-[3.2px] text-primary-200">
              {supply.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBox;
