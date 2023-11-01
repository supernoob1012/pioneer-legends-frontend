/* eslint-disable @next/next/no-img-element */
import React, { FC, useMemo, useState } from "react";
import Image from "next/image";
import { CheckSmIcon, CloseIcon } from "./SvgIcons";

interface ItemProps {
  title?: string;
  image: string;
  description?: string;
  className?: string;
  mint?: string;
  staked?: boolean;
  selectAble?: boolean;
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  force: () => void;
}
const StakeCard: FC<ItemProps> = ({
  title,
  image,
  mint,
  staked,
  selectAble,
  selected,
  setSelected,
  force,
}) => {
  const [isShowOrigin, setIsShowOrigin] = useState(false);
  const [checked, setChecked] = useState(false);

  const names = useMemo(() => {
    return {
      name: title ? title.split("#")[0] : "",
      id: title ? title.split("#")[1] : "",
    };
  }, [title]);

  const handleChange = () => {
    if (!mint) return;
    // Create a copy of the selected array
    let newArray = [...selected];

    const index = newArray.indexOf(mint);
    if (index !== -1) {
      newArray.splice(index, 1);
    } else {
      newArray.push(mint);
    }

    // Update the state with the modified array
    setSelected(newArray);

    // You can also update the "checked" state based on the index check here
    setChecked(index !== -1);
    force();
  };

  return (
    <>
      <div
        className={`w-40 shadow-[6px_6px_0_0_#1E1915] [height:fit-content] duration-200 justify-self-center ${
          !selectAble
            ? "hover:translate-y-[6px] active:shadow-[0_0_0_0] active:translate-x-[6px]"
            : ""
        }`}
      >
        <div className="nft_card">
          <div
            className="relative"
            onClick={selectAble ? () => {} : () => setIsShowOrigin(true)}
          >
            <img src={image} alt="" className="w-full aspect-square" />
            {selectAble && (
              <>
                <div
                  className={`absolute w-8 h-8 border border-white bottom-0 right-0 flex items-center justify-center ${
                    selected.indexOf(mint!) !== -1
                      ? "bg-[#34949be6] border-[transparent]"
                      : "bg-[#1e191566] border-[#fff]"
                  }`}
                  onClick={handleChange}
                >
                  {selected.indexOf(mint!) !== -1 && <CheckSmIcon />}
                </div>
              </>
            )}
          </div>
          <div className="bg-[linear-gradient(180deg,#54504C_-0.03%,#433B35_100%)] px-[10px] py-2 flex flex-col gap-2">
            <div className="flex flex-col">
              <h1 className="font-medium text-sm text-white">{title}</h1>
              <h1 className="text-xs text-[#AFABA8]">Rarity multiplier: 1x</h1>
            </div>
            {!staked && !selectAble ? (
              <div className="flex w-full justify-center">
                <div
                  className="stake_button cursor-pointer"
                  onClick={() => {
                    console.log("mint");
                    // StakeNFT(mint!);
                  }}
                >
                  <h1 className="absolute font-medium text-xs leading-[18px] text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    Stake
                  </h1>
                </div>
              </div>
            ) : staked ? (
              <div className="stake_title uppercase font-medium text-[10px] leading-5 text-center text-[#FFD15F]">
                staked
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {isShowOrigin && selectAble && (
        <div className="fixed left-0 top-0 w-screen h-screen backdrop-blur-[10px] z-50 bg-[#000000CC]">
          <img
            src={image}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] md:h-screen h-auto"
            alt=""
          />
          <button
            className="absolute md:right-[96px] md:top-9 z-40 top-6 right-6"
            onClick={() => setIsShowOrigin(false)}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default StakeCard;
