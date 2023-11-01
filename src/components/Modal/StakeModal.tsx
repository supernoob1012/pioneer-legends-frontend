import React, { FC, useContext, useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { ModalContext } from "../../context/ModalProvider";
import { UserContext, UserContextProps } from "../../context/UserProvider";
import Button from "../Button";
import Link from "next/link";
import StakeCard from "../StakeCard";
import StakeTab from "../StakeTab";
import ModalEdges from "./ModalCorner";
import CloseButton from "./CloseButton";
import { stakeMultiNFT, stakeNFT, unStakeMultiNFT } from "../../solana/util";
import useWindowSize from "../../utils/useWindowSize";
import { CrossIcon, LoadingSpin } from "../SvgIcons";
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

  const stakeMulti = async () => {
    if (selected.length !== 0) {
      await stakeMultiNFT(wallet, selected, setLoading, getNfts);
    }
  };

  const unstakeMulti = async () => {
    if (selected.length !== 0) {
      await unStakeMultiNFT(wallet, selected, setLoading, getNfts);
    }
  };

  const stakedNfts = allNftList.filter(item => item.staked);
  const walletNfts = allNftList.filter(item => !item.staked);
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

  useEffect(() => {
    getNfts();
  }, [isStakeModal]);

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
          </div>
          <div className="">
            <div className="-ml-6 relative w-[calc(100%+47px)] lg:w-[1006px] h-[248px] max-md:h-[132px]">
              {/* eslint-disable-next-line */}
              <img
                src={"/img/banner.png"}
                className="w-full md:aspect-auto max-md:h-40 absolute left-0 top-0"
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
                <div className="fixed bottom-0 h-[88px] w-full md:hidden flex justify-center items-center backdrop-blur-sm bg-[#342B2590] left-0 z-[100]">
                  {tab === "staked" ?
                    <Button
                      onClick={unstakeMulti}
                      disabled={selected.length === 0 || loading}
                      style={{
                        width: "calc(100vw - 40px)",
                        marginLeft: "8px",
                        marginRight: "8px",
                      }}
                    >
                      {loading ? (
                        <div className="w-6 h-6">
                          <LoadingSpin />
                        </div>
                      ) : (
                        <>Unstake({selected.length})</>
                      )}
                    </Button>
                    :
                    <Button
                      onClick={stakeMulti}
                      disabled={selected.length === 0 || loading}
                      style={{
                        width: "calc(100vw - 40px)",
                        marginLeft: "8px",
                        marginRight: "8px",
                      }}
                    >
                      {loading ? (
                        <div className="w-6 h-6">
                          <LoadingSpin />
                        </div>
                      ) : (
                        <>Stake({selected.length})</>
                      )}
                    </Button>
                  }
                </div>
                <div className="flex gap-8">
                  {selectAble &&
                    (isMobile ? (
                      <>
                        <Button onClick={cancelSelect} variant="secondary">
                          Cancel
                        </Button>
                        {tab === "wallet" ? (
                          <Button
                            onClick={stakeMulti}
                            disabled={selected.length === 0}
                          >
                            {loading ? (
                              <LoadingSpin />
                            ) : (
                              <>Stake({selected.length})</>
                            )}
                          </Button>
                        ) : (
                          <Button
                            onClick={unstakeMulti}
                            disabled={selected.length === 0}
                          >
                            {loading ? (
                              <LoadingSpin />
                            ) : (
                              <>Unstake({selected.length})</>
                            )}
                          </Button>
                        )}
                      </>
                    ) : (
                      <p
                        className={`text-sm font-medium text-white`}
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
                        className={`text-sm font-medium text-white`}
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
                        className={`text-sm font-medium text-white`}
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
                        // image={"/img/avatar.png"}
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
                )}
              </div>
              <div className="max-md:block hidden md:px-12 px-5 md:pt-8 pt-6 pb-12 md:h-[374px] h-[calc(100vh-320px)] overflow-y-scroll overflow-x-hidden">
                {walletNfts.length !== 0 ? (
                  <div className="grid md:grid-cols-5 grid-cols-2 gap-x-5 gap-y-4 mt-4 pb-10 min-h-[224px]">
                    {walletNfts.map((nft, index: number) => (
                      <StakeCard
                        key={index}
                        // image={"/img/avatar.png"}
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
                      // image={"/img/avatar.png"}
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
