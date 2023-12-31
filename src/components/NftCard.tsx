/* eslint-disable @next/next/no-img-element */
import React, { FC, useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { BtnCorner, CardCropMask, CloseIcon } from "./SvgIcons";

interface ItemProps {
  title?: string;
  image: string;
  description?: string;
  className?: string;
  mint?: string;
  staked?: boolean;
}
const NftCard: FC<ItemProps> = ({ title, image, mint, staked }) => {
  const [isShowOrigin, setIsShowOrigin] = useState(false);
  const names = useMemo(() => {
    return {
      name: title ? title.split("#")[0] : "",
      id: title ? title.split("#")[1] : "",
    };
  }, [title]);

  return (
    <>
      <div
        className={`w-40 shadow-[6px_6px_0_0_#1E1915] [height:fit-content] duration-200 justify-self-center hover:translate-y-[6px] active:shadow-[0_0_0_0] active:translate-x-[6px]`}
      >
        <div
          className="aspect-square relative  card-mask"
          onClick={() => setIsShowOrigin(true)}
        >
          <Image src={image} layout="fill" alt="" className=" object-cover object-center" />
        </div>
        <div
          className="pt-2 px-2.5 pb-3 min-h-[65px]"
          style={{
            background:
              "var(--Brown-bg1, linear-gradient(180deg, #54504C -0.03%, #433B35 100%))",
          }}
        >
          <p className="text-[#fff] text-[14px] font-medium flex items-center">
            {names.name}{" "}
            <span className="text-[12px] font-normal ml-1">#{names.id}</span>
          </p>
          {staked ? (
            <button className="uppercase text-primary-100 text-[10px] font-medium bg-secondary-200 py-0.5 px-[7px] relative">
              staked
              <span className="absolute right-[0.5px] top-[0.5px]">
                <BtnCorner color="#FFD774" />
              </span>
              <span
                className="absolute -left-[0.5px] -bottom-[0.5px]"
                style={{
                  transform: "rotateZ(180deg)",
                }}
              >
                <BtnCorner color="#FFD774" />
              </span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      {isShowOrigin && (
        <div className="fixed left-0 top-0 w-screen h-screen backdrop-blur-[10px] z-50 bg-[#000000CC]">
          <img
            src={image}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] md:w-auto h-auto md:h-screen"
            alt=""
          />
          <button
            className="absolute md:right-[96px] right-5 top-9 z-40 md:w-[30px] md:h-[30px] w-6 h-6 flex items-center justify-center"
            onClick={() => setIsShowOrigin(false)}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default NftCard;
