/* eslint-disable @next/next/no-img-element */
import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ModalContext } from "../../context/ModalProvider";
import { SolanaIcon, CrossIcon } from "../SvgIcons";
import { UserContext, UserContextProps } from "../../context/UserProvider";
import Button from "../Button";
import NftCard from "../NftCard";
import Link from "next/link";
import CloseButton from "./CloseButton";
import useWindowSize from "../../utils/useWindowSize";
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
  const { width, height } = useWindowSize();
  const isMobile = width > 768;
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
    <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-full md:w-[calc(100%-50px)] h-full md:h-auto lg:w-[974px] bg-gradient-to-b from-[#0F0902] to-[#26211E] md:rounded-2xl relative md:p-2">
        <div className="absolute -right-1 -bottom-3 hidden md:block">
          <Image
            src={"/img/Deco_rightbottom.png"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="absolute -left-1 -bottom-3 hidden md:block">
          <Image
            src={"/img/Deco_leftbottom.png"}
            width={100}
            height={100}
            alt=""
          />
        </div>
        <div className="absolute -left-1 -top-1 hidden md:block">
          <Image src={"/img/Deco_lefttop.png"} width={80} height={60} alt="" />
        </div>
        <div className="absolute -right-1 -top-1 hidden md:block">
          <Image src={"/img/Deco_righttop.png"} width={80} height={60} alt="" />
        </div>
        <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028] h-full">
          <div className="p-5 flex items-center justify-between">
            <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
              My Wallet
            </p>
            <CloseButton
              className="absolute right-5 top-[20px] md:flex hidden z-10"
              onClose={() => setIsMyWalletModal(false)}
            />
            {/* <button
              className="md:absolute md:-right-5 md:top-[34px] flex"
              onClick={() => setIsMyWalletModal(false)}
            >
              {isMobile ? (
                <Image
                  src="/img/close-normal.png"
                  width={40}
                  height={40}
                  alt=""
                />
              ) : (
                <CrossIcon color="white" />
              )}
            </button> */}
          </div>
          <div className="">
            <div className="-ml-6 relative w-[calc(100%+47px)] lg:w-[1006px] h-[248px] md:h-[132px]">
              <img
                src={"/img/banner.png"}
                className="w-full h-full absolute left-0 top-0 hidden md:block"
                alt=""
              />

              <div className="w-4 h-4 overflow-hidden absolute left-0 -top-4">
                <div className="w-6 h-6 bg-[#161311] rotate-45 mt-1 ml-1" />
              </div>
              <div className="w-4 h-4 overflow-hidden absolute right-0 -top-4">
                <div className="w-6 h-6 bg-[#161311] rotate-45 mt-1 -ml-[15px]" />
              </div>
              <div className="flex flex-col overflow-y-scroll overflow-x-hidden relative">
                <img
                  src={"/img/mobile/info-banner.png"}
                  className="w-full h-[248px] absolute left-0 top-0 block md:hidden "
                  alt=""
                />
                <div className="flex items-start md:items-center z-20 relative pt-9 md:py-4 pl-11 pr-8 justify-between flex-col md:flex-row">
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
                  <div className="flex gap-8 w-[calc(100%-10px)] md:w-auto ml-0 md:ml-0 justify-between mt-9">
                    <Button onClick={handleProfileModal}>Edit profile</Button>
                    <Button
                      variant="secondary"
                      onClick={handleDisconnectWalletModal}
                    >
                      Disconnect wallet
                    </Button>
                  </div>
                </div>
                <div className="md:hidden block md:px-12 px-5 md:pt-8 pt-[60px] md:pb-12 pb-6 md:h-[374px] md:mx-0 mx-5 h-[calc(100%-212px)]">
                  <p className="text-[14px] text-[white] font-medium flex gap-1">
                    {allNftList.length !== 0 && <p>My NFT</p>}
                    {allNftList.length !== 0 && <>({allNftList.length})</>}{" "}
                  </p>
                  {allNftList.length !== 0 ? (
                    <div className="grid md:grid-cols-5 grid-cols-2 gap-x-5 gap-y-4 mt-4 pb-[40px] min-h-[224px]">
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
                    <div className="flex justify-center flex-col h-full w-full mx-auto text-center text-[#E4DECD] font-medium">
                      <p>You have no NFT,</p>
                      <div className="whitespace-nowrap">
                        buy one from{" "}
                        <span className="underline">
                          <Link href="#" passHref>
                            Magic Eden
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
          <div className="md:block hidden md:px-12 px-5 md:pt-8 pt-6 pb-12 md:h-[374px] h-[calc(100vh-320px)] overflow-y-scroll overflow-x-hidden">
            <p className="text-[14px] text-[white] font-medium flex gap-1">
              {allNftList.length !== 0 && <p>My NFT</p>}
              {allNftList.length !== 0 && <>({allNftList.length})</>}{" "}
            </p>
            {allNftList.length !== 0 ? (
              <div className="grid md:grid-cols-4 grid-cols-2 gap-x-5 gap-y-4 mt-4 pb-10 min-h-[224px]">
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
              <div className="flex justify-center flex-col h-full w-full mx-auto text-center text-[#E4DECD] font-medium">
                <p>You have no NFT,</p>
                <div className="whitespace-nowrap">
                  buy one from{" "}
                  <span className="underline">
                    <Link href="#" passHref>
                      Magic Eden
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
