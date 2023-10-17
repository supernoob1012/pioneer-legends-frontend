/* eslint-disable @next/next/no-img-element */
import React, { FC, useMemo, useState, useContext } from "react";
import Image from "next/image";
import { stakeNFT, unStakeNFT } from "../solana/util";
import { useWallet } from "@solana/wallet-adapter-react";
import { stake, unStake } from "../utils/api";
import ButtonSm from "./ButtonSm";
import { UserContext, UserContextProps } from "../context/UserProvider";
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
  const { getNfts } = useContext<UserContextProps>(UserContext);
  const [isShowOrigin, setIsShowOrigin] = useState(false);
  const wallet = useWallet();
  const [loading, setLoading] = useState(false);
  const handleNftStake = async () => {
    if (!mint) return;
    try {
      const tx = await stakeNFT(wallet, mint, setLoading);
      if (!tx || !wallet.publicKey) return;
      await stake(tx, wallet.publicKey?.toBase58(), setLoading, getNfts);
    } catch (err) {
      console.log(err);
    }
  };

  const handleNftUnStake = async () => {
    if (!mint) return;
    try {
      const tx = await unStakeNFT(wallet, mint, setLoading);
      if (!tx || !wallet.publicKey) return;
      await unStake(tx, wallet.publicKey?.toBase58(), setLoading, getNfts);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const names = useMemo(() => {
    return {
      name: title ? title.split("#")[0] : "",
      id: title ? title.split("#")[1] : "",
    };
  }, [title]);

  const [checked, setChecked] = useState(false);

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
      {mint && (
        <div className="shadow-card">
          <div
            className="aspect-square relative card-mask"
            onClick={selectAble ? () => {} : () => setIsShowOrigin(true)}
          >
            {selectAble && (
              <>
                <div
                  className="w-8 h-8 border absolute right-0 bottom-0 z-10 cursor-pointer grid place-content-center"
                  style={{
                    background:
                      selected.indexOf(mint) !== -1 ? "#34949be6" : "#1e191566",
                    borderColor:
                      selected.indexOf(mint) !== -1 ? "transparent" : "#fff",
                  }}
                  onClick={handleChange}
                >
                  {selected.indexOf(mint) !== -1 && <CheckSmIcon />}
                </div>
              </>
            )}
            <Image src={image} layout="fill" alt=""  className=""/>
            {/* <Image src={"/img/avatar.png"} layout="fill" alt="" /> */}
          </div>
          <div
            className="pt-2 px-2.5 pb-3"
            style={{
              background:
                "var(--Brown-bg1, linear-gradient(180deg, #54504C -0.03%, #433B35 100%))",
            }}
          >
            <p className="text-[#fff] text-[14px] font-medium flex items-center">
              {names.name}{" "}
              <span className="text-[12px] font-normal ml-1">#{names.id}</span>
            </p>
            <p className="text-[#AFABA8] text-[11px] font-normal flex items-center pb-2">
              Rarity multiplier: 1x
            </p>
            {!staked ? (
              <ButtonSm onClick={handleNftStake} disabled={loading}>
                {loading ? "Loading..." : "Stake"}
              </ButtonSm>
            ) : (
              <div className="grid gap-3 grid-cols-1">
                <ButtonSm onClick={handleNftUnStake} disabled={loading}>
                  Unstake
                </ButtonSm>
                {/* <ButtonSm>Claim</ButtonSm> */}
              </div>
            )}
          </div>
        </div>
      )}

      {isShowOrigin && (
        <div className="fixed left-0 top-0 w-screen h-screen backdrop-blur-[10px] z-50 bg-[#000000CC]">
          <img
            src={image}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vh] h-screen"
            alt=""
          />
          <button
            className="absolute right-[96px] top-9 z-40"
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
