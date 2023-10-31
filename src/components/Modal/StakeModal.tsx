import React, { FC, useContext, useEffect, useMemo, useState } from "react";
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
import { stakeNFT } from "../../solana/util";
import useWindowSize from "../../utils/useWindowSize";
import { CrossIcon } from "../SvgIcons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { stake, unStake } from "../../utils/api";

const StakeModal: FC = () => {
  const { isStakeModal, setIsStakeModal, title } =
    useContext<any>(ModalContext);
  const [tab, setTab] = useState<"staked" | "wallet">("wallet");
  const [selected, setSelected] = useState<string[]>([]);
  const [selectAble, setSelectAble] = useState(false);
  const [forceRender, setForeceRender] = useState(false);
  const { width, height } = useWindowSize();
  const isMobile = width > 768;
  const wallet = useWallet();
  const useData = useContext<UserContextProps>(UserContext);
  const notify = () =>
    toast(
      "!\u00A0\u00A0\u00A0\u00A0\u00A0You have reached your selection limit."
    );

  const allNftList = useData ? useData.allNftList : [];
  const [loading, setLoading] = useState(false);
  const { getNfts } = useContext<UserContextProps>(UserContext);

  const handleNftStake = async (mint: string, setLoading: Function) => {
    if (!mint) return;
    try {
      const tx = await stakeNFT(wallet, mint, setLoading);
      if (!tx || !wallet.publicKey) return;
      await stake(tx, wallet.publicKey?.toBase58(), setLoading, getNfts);
    } catch (err) {
      console.log(err);
    }
  };
  const stakeAll = async () => {
    for (let i = 0; i < selected.length; i++) {
      await stakeNFT(wallet, selected[i], setLoading);
    }
  };
  const unStakeAll = async () => {};

  const stakedNfts = allNftList.filter((item) => item.staked);
  const walletNfts = allNftList.filter((item) => !item.staked);
  const [isWalletSelected, setWalletSelected] = useState(false);
  const cancelSelect = () => {
    setSelected([]);
    setSelectAble(false);
  };
  useMemo(() => {
    console.log(stakedNfts.length);
    if (selected.length === 3) {
      notify();
    }
  }, [selected]);
  useEffect(() => {
    cancelSelect();
  }, [tab]);

  const closeModal = () => {
    cancelSelect();
    setIsStakeModal(false);
  };

  if (!wallet.publicKey) return <></>;

  return isStakeModal ? (
    <div className="fixed left-0 top-0 w-screen h-screen z-[200] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="md:w-[974px] md:h-auto h-screen w-full bg-gradient-to-b from-[#0F0902] to-[#26211E] rounded-none md:rounded-2xl relative p-2">
        {isMobile && <ModalEdges />}
        <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028] md:h-auto h-full">
          <div className="px-6 py-10 flex justify-between items-center">
            <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
              {title}
            </p>
            {isMobile ? (
              <CloseButton
                className="absolute right-5 top-[34px] z-50"
                onClose={closeModal}
              />
            ) : (
              <button onClick={closeModal}>
                <CrossIcon color="white" />
              </button>
            )}
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
              className={`-ml-6 relative w-[calc(100%+47px)] lg:w-[1006px] ${
                title ? "max-md:h-[80px]" : "h-[248px] max-md:h-[132px]"
              }`}
              // style={{
              //   width: 1006,
              //   height: 132,
              // }}
            >
              {/* eslint-disable-next-line */}
              <img
                src={"/img/banner.png"}
                className={`w-full md:aspect-auto ${
                  title ? "max-md:h-20" : "max-md:h-40"
                } absolute left-0 top-0`}
                alt=""
              />
              <div className="w-4 h-4 overflow-hidden absolute left-0 -top-4">
                <div className="w-6 h-6 bg-[#161311] rotate-45 mt-1 ml-1" />
              </div>
              <div className="w-4 h-4 overflow-hidden absolute right-0 -top-4">
                <div className="w-6 h-6 bg-[#161311] rotate-45 mt-1 -ml-3" />
              </div>
              <div className="flex items-center z-20 relative py-4 md:pl-12 md:pr-8 px-5 justify-between md:h-[120px] h-[88px]">
                <StakeTab
                  tab={tab}
                  setTab={setTab}
                  stakedNumber={stakedNfts.length}
                  walletNumber={walletNfts.length}
                />
                {selectAble && (
                  <div className="fixed bottom-0 h-[88px] w-full md:hidden flex justify-center items-center backdrop-blur-sm bg-[#342B2590] left-0 z-[100]">
                    <Button
                      onClick={stakeAll}
                      disabled={selected.length === 0}
                      style={{
                        width: "calc(100vw - 40px)",
                        marginLeft: "8px",
                        marginRight: "8px",
                      }}
                    >
                      Stake({selected.length})
                    </Button>
                  </div>
                )}
                <div className="flex max-md:mr-5 md:gap-8">
                  {selectAble &&
                    (isMobile ? (
                      <>
                        <Button onClick={cancelSelect} variant="secondary">
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
                    ) : (
                      <p
                        className={`text-sm font-medium text-white cursor-pointer`}
                        onClick={() => {
                          cancelSelect();
                        }}
                      >
                        Cancel
                      </p>
                    ))}
                  {tab === "wallet" &&
                    walletNfts &&
                    walletNfts.length !== 0 &&
                    !selectAble &&
                    (isMobile ? (
                      <Button
                        onClick={() => {
                          setSelectAble(true);
                        }}
                      >
                        Select
                      </Button>
                    ) : (
                      <p
                        className={`text-sm font-medium text-white cursor-pointer`}
                        // style={{
                        //   color: isWalletSelected ? "#ffffff" : "#29A3A9"
                        // }}
                        onClick={() => {
                          setWalletSelected(!isWalletSelected);
                          setSelectAble(true);
                        }}
                      >
                        Select
                      </p>
                    ))}
                  {tab === "staked" &&
                    stakedNfts &&
                    stakedNfts.length !== 0 &&
                    !selectAble &&
                    (isMobile ? (
                      <Button
                        onClick={() => {
                          setSelectAble(true);
                        }}
                      >
                        Select
                      </Button>
                    ) : (
                      <p
                        className={`text-sm font-medium text-white hover:text-[#29A3A9]`}
                        // style={{
                        //   color: isWalletSelected ? "#ffffff" : "#29A3A9"
                        // }}
                        onClick={() => {
                          setWalletSelected(!isWalletSelected);
                          setSelectAble(true);
                        }}
                      >
                        Select
                      </p>
                    ))}
                  {/* 
                  {tab === "staked" && stakedNfts.length !== 0 && (
                    <Button onClick={() => setSelectAble(true)}>Select</Button>
                  )} */}
                </div>
              </div>
            </div>
          </div>
          {tab === "wallet" && (
            <>
              <div className="md:block hidden md:px-12 px-5 md:pt-8 pt-6 pb-12 md:h-[374px] h-[calc(100vh-320px)] overflow-y-scroll overflow-x-hidden">
                {walletNfts.length !== 0 ? (
                  <div className="grid md:grid-cols-5 grid-cols-2 gap-x-5 gap-y-4 mt-4 pb-10 min-h-[224px]">
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
                  <div className="grid w-full place-content-center mx-auto min-h-[224px] pb-12 text-center text-[#E4DECD] font-medium relative">
                    <div className="grid grid-cols-2 w-full md:grid-cols-5 gap-x-5 gap-y-4 pb-10 md:min-h-[224px] min-h-[calc(100%-35px)] absolute left-0 top-0 md:mt-10 mt-0">
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328] md:block hidden"></div>
                    </div>
                    <div className="absolute top-10 max-md:top-1/2 max-md:-translate-y-[220%] left-1/2 -translate-x-1/2">
                      <p className="z-10">You have no NFT,</p>
                      <div className="whitespace-nowrap z-10">
                        buy one from{" "}
                        <span className="underline">
                          <Link href="#" passHref>
                            Magic Eden
                          </Link>
                        </span>{" "}
                        now
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="max-md:flex hidden md:px-12 px-5 pt-8 md:pb-12 pb-6 md:h-[374px] h-[calc(100%-175px)] overflow-y-scroll overflow-x-hidden">
                {walletNfts.length !== 0 ? (
                  <div className="grid md:grid-cols-5 grid-cols-2 gap-x-5 gap-y-4 mt-4 pb-10 min-h-[224px]">
                    {console.log("walletNfts", walletNfts)}
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
                  <div className="grid w-full place-content-center mx-auto min-h-[224px] pb-12 text-center text-[#E4DECD] font-medium relative">
                    <div className="grid grid-cols-2 w-full md:grid-cols-5 gap-x-5 gap-y-4 pb-10 md:min-h-[224px] min-h-[calc(100%-35px)] absolute left-0 top-0 md:mt-10 mt-0">
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                      <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328] md:block hidden"></div>
                    </div>
                    <div className="absolute top-10 max-md:top-1/2 max-md:-translate-y-[220%] left-1/2 -translate-x-1/2">
                      <p className="z-10">You have no NFT,</p>
                      <div className="whitespace-nowrap z-10">
                        buy one from{" "}
                        <span className="underline">
                          <Link href="#" passHref>
                            Magic Eden
                          </Link>
                        </span>{" "}
                        now
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
          {tab === "staked" && (
            <div className="md:px-12 px-5 pt-8 md:pb-12 flex pb-6 md:h-[374px] h-[calc(100%-175px)] overflow-auto">
              {stakedNfts.length !== 0 ? (
                <div className="grid grid-cols-2 w-full md:grid-cols-5 gap-x-5 gap-y-4 pb-10 md:min-h-[224px] min-h-[calc(100%-175px)]">
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
                <div className="grid w-full place-content-center mx-auto min-h-[224px] pb-12 text-center text-[#E4DECD] font-medium relative">
                  <div className="grid grid-cols-2 w-full md:grid-cols-5 gap-x-5 gap-y-4 pb-10 md:min-h-[224px] min-h-[calc(100%-35px)] absolute left-0 top-0 md:mt-10 mt-0">
                    <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                    <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                    <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                    <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328]"></div>
                    <div className="bg-[#2D2620] md:h-[220px] h-auto max-md:aspect-[264/328] md:block hidden"></div>
                  </div>
                  <div className="absolute top-10 max-md:top-1/2 max-md:-translate-y-[220%] left-1/2 -translate-x-1/2">
                    <p className="z-10">You have no NFT,</p>
                    <div className="whitespace-nowrap z-10">
                      buy one from{" "}
                      <span className="underline">
                        <Link href="#" passHref>
                          Magic Eden
                        </Link>
                      </span>{" "}
                      now
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* {tab === "staked" && (
            <div className="md:px-12 px-5 pt-8 md:pb-12 pb-6 flex md:h-[374px] h-[calc(100%-175px)] overflow-auto">
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
          )} */}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default StakeModal;
