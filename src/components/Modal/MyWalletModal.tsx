import React, { FC, useContext } from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ModalContext } from "../../context/ModalProvider";
import { SolanaIcon } from "../SvgIcons";
import { UserContext, UserContextProps } from "../../context/UserProvider";
import Button from "../Button";
import NftCard from "../NftCard";
import Link from "next/link";

const MyWalletModal: FC = () => {
  const {
    isMyWalletModal,
    setIsMyWalletModal,
    isProfileModal,
    setIsProfileModal,
    isDisconnectWalletModal,
    setIsDisconnectWalletModal,
  } = useContext<any>(ModalContext);

  const wallet = useWallet();
  const useData = useContext<UserContextProps>(UserContext);

  const allNftList = useData ? useData.allNftList : [];

  const handleProfileModal = () => {
    setIsProfileModal(!isProfileModal);
    setIsMyWalletModal(false);
  };

  const handleDisconnectWalletModal = () => {
    setIsDisconnectWalletModal(!isDisconnectWalletModal);
    setIsMyWalletModal(false);
  };

  if (!wallet.publicKey) return <></>;

  return isMyWalletModal ? (
    <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px]  bg-[#000000]/40">
      <div className="w-[974px] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
        <div className="absolute -right-1 -bottom-3">
          <Image
            src={"/img/Deco_rightbottom.png"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="absolute -left-1 -bottom-3">
          <Image
            src={"/img/Deco_leftbottom.png"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="absolute -left-1 -top-1">
          <Image src={"/img/Deco_lefttop.png"} width={80} height={60} alt="" />
        </div>
        <div className="absolute -right-1 -top-1">
          <Image src={"/img/Deco_righttop.png"} width={80} height={60} alt="" />
        </div>
        <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028]">
          <div className="px-6 py-7">
            <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
              My Wallet
            </p>
            <button
              className="absolute -right-5 top-[34px]"
              onClick={() => setIsMyWalletModal(false)}
            >
              <Image
                src="/img/close-normal.png"
                width={40}
                height={40}
                alt=""
              />
            </button>
          </div>
          <div className="">
            <div
              className="-ml-6 relative"
              style={{
                width: 1006,
                height: 132,
              }}
            >
              {/* eslint-disable-next-line */}
              <img
                src={"/img/banner.png"}
                className="w-full h-full absolute left-0 top-0"
                alt=""
              />
              <div className="w-4 h-4 overflow-hidden absolute left-0 -top-4">
                <div className="w-6 h-6 bg-[#161311] rotate-45 mt-1 ml-1" />
              </div>
              <div className="w-4 h-4 overflow-hidden absolute right-0 -top-4">
                <div className="w-6 h-6 bg-[#161311] rotate-45 mt-1 -ml-3" />
              </div>
              <div className="flex items-center z-20 relative py-4 pl-11 pr-8 justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-[100px] h-[100px] rounded-full border-[#2D2721] p-0.5 border-2 grid place-content-center overflow-hidden"
                    style={{
                      backgroundImage:
                        "radial-gradient(115.57% 115.57% at -3.5% -16%, #3F434B 0%, #2D2721 100%)",
                    }}
                  >
                    <Image
                      src={"/img/default-avatar.svg"}
                      width={100}
                      height={100}
                      alt="profile icon"
                    />
                  </div>
                  <div className="">
                    <p className="text-[#fff] font-medium text-[16px]">
                      {wallet.publicKey.toBase58().slice(0, 5)}...
                      {wallet.publicKey.toBase58().slice(-4)}
                    </p>
                    <div className="flex gap-2 items-center text-primary-200 font-medium text-[14px] mt-1">
                      <SolanaIcon /> 5,154.23
                    </div>
                  </div>
                </div>
                <div className="flex gap-8">
                  <Button onClick={handleProfileModal}>Edit profile</Button>
                  <Button
                    variant="secondary"
                    onClick={handleDisconnectWalletModal}
                  >
                    Disconnect wallet
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="px-12 pt-8 pb-12 h-[374px] overflow-auto">
            <p className="text-[14px] text-[white] font-medium">
              My NFT{allNftList.length !== 0 && <>({allNftList.length})</>}{" "}
            </p>
            {allNftList.length !== 0 ? (
              <div className="grid grid-cols-5 gap-x-5 gap-y-4 mt-4 pb-10 min-h-[224px]">
                {allNftList.map((nft, index: number) => (
                  <NftCard
                    key={index}
                    image={nft.image}
                    title={nft.name}
                    mint={nft.mint}
                  />
                ))}
              </div>
            ) : (
              <div className="grid place-content-center w-fultext-center mx-auto min-h-[224px] pb-12 text-center text-[#E4DECD] font-medium">
                <p>You have no NFT,</p>
                <div className="whitespace-nowrap">
                  buy one from{" "}
                  <span className="underline">
                    <Link href="#" passHref>
                      Matic Eden
                    </Link>
                  </span>{" "}
                  now
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default MyWalletModal;
