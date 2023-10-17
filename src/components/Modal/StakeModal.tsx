import React, { FC, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ModalContext } from "../../context/ModalProvider";
import { UserContext, UserContextProps } from "../../context/UserProvider";
import Button from "../Button";
import Link from "next/link";
import StakeCard from "../StakeCard";
import StakeTab from "../StakeTab";
import ModalEdges from "./ModalCorner";
import CloseButton from "./CloseButton";

const StakeModal: FC = () => {
  const { isStakeModal, setIsStakeModal } = useContext<any>(ModalContext);
  const [tab, setTab] = useState<"staked" | "wallet">("wallet");
  const [selected, setSelected] = useState<string[]>([]);
  const [selectAble, setSelectAble] = useState(false);
  const [forceRender, setForeceRender] = useState(false);

  const wallet = useWallet();
  const useData = useContext<UserContextProps>(UserContext);

  const allNftList = useData ? useData.allNftList : [];

  const stakeAll = async () => {};
  const unStakeAll = async () => {};

  const stakedNfts = allNftList.filter(item => item.staked);
  const walletNfts = allNftList.filter(item => !item.staked);

  const cancelSelect = () => {
    setSelected([]);
    setSelectAble(false);
  };

  useEffect(() => {
    cancelSelect();
  }, [tab]);

  const closeModal = () => {
    cancelSelect();
    setIsStakeModal(false);
  };

  if (!wallet.publicKey) return <></>;

  return isStakeModal ? (
    <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-[974px] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
        <ModalEdges />
        <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028]">
          <div className="px-6 py-7">
            <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
              spaceship
            </p>
            <CloseButton
              className="absolute right-5 top-[34px]"
              onClose={closeModal}
            />
            {/* <button
              className="absolute -right-5 top-[34px]"
              onClick={() => setIsStakeModal(false)}
            >
              <Image
                src="/img/close-normal.png"
                width={40}
                height={40}
                alt=""
              />
            </button> */}
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
              <div className="flex items-center z-20 relative py-4 pl-12 pr-8 justify-between h-[120px]">
                <StakeTab
                  tab={tab}
                  setTab={setTab}
                  stakedNumber={stakedNfts.length}
                  walletNumber={walletNfts.length}
                />
                <div className="flex gap-8">
                  {selectAble && (
                    <>
                      <Button
                        onClick={cancelSelect}
                        variant="secondary"
                      >
                        Cancel
                      </Button>
                      {tab === "wallet" ? (
                        <Button
                          onClick={stakeAll}
                          disabled={selected.length === 0}
                        >
                          Stake({selected.length})
                        </Button>
                      ) : (
                        <Button
                          onClick={stakeAll}
                          disabled={selected.length === 0}
                        >
                          Unstake({selected.length})
                        </Button>
                      )}
                    </>
                  )}
                  {tab === "wallet" &&
                    walletNfts &&
                    walletNfts.length !== 0 &&
                    !selectAble && (
                      <Button onClick={() => setSelectAble(true)}>
                        Select
                      </Button>
                    )}

                  {tab === "staked" && stakedNfts.length !== 0 && (
                    <Button onClick={() => setSelectAble(true)}>Select</Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {tab === "wallet" && (
            <div className="px-12 pt-8 pb-12 h-[374px] overflow-auto">
              {walletNfts.length !== 0 ? (
                <div className="grid grid-cols-5 gap-x-5 gap-y-4 pb-10 min-h-[224px]">
                  {walletNfts.map((nft, index: number) => (
                    <StakeCard
                      key={index}
                      image={nft.image}
                      title={nft.name}
                      mint={nft.mint}
                      staked={nft.staked}
                      selected={selected}
                      selectAble={selectAble}
                      setSelected={setSelected}
                      force={() => setForeceRender(forceRender)}
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
          )}
          {tab === "staked" && (
            <div className="px-12 pt-8 pb-12 h-[374px] overflow-auto">
              {stakedNfts.length !== 0 ? (
                <div className="grid grid-cols-5 gap-x-5 gap-y-4 pb-10 min-h-[224px]">
                  {stakedNfts.map((nft, index: number) => (
                    <StakeCard
                      key={index}
                      image={nft.image}
                      title={nft.name}
                      mint={nft.mint}
                      staked={nft.staked}
                      selected={selected}
                      selectAble={selectAble}
                      setSelected={setSelected}
                      force={() => setForeceRender(forceRender)}
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
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default StakeModal;
