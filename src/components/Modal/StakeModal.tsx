/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@solana/wallet-adapter-react";
import { useContext, useState } from "react";

import { ModalContext } from "../../context/ModalProvider";
import { UserContext, UserContextProps } from "../../context/UserProvider";
import { stakeNFT } from "../../solana/util";
import useWindowSize from "../../utils/useWindowSize";
import Button from "../Button";
import StakeCard from "../StakeCard";
import StakeTab from "../StakeTab";
import { CrossIcon } from "../SvgIcons";
import CloseButton from "./CloseButton";

const StakeModal = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [selectAble, setSelectAble] = useState(false);
  const { width } = useWindowSize();
  const [tab, setTab] = useState<"staked" | "wallet">("wallet");
  const useData = useContext<UserContextProps>(UserContext);
  const [isWalletSelected, setWalletSelected] = useState(false);
  const [forceRender, setForeceRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMobile = width > 768;
  const wallet = useWallet();

  const { isStakeModal, setIsStakeModal, title } =
    useContext<any>(ModalContext);

  if (!isStakeModal) return <></>;

  const closeModal = () => {
    cancelSelect();
    setIsStakeModal(false);
  };

  const cancelSelect = () => {
    setSelected([]);
    setSelectAble(false);
  };

  const stakeAll = async () => {
    for (let i = 0; i < selected.length; i++) {
      await stakeNFT(wallet, selected[i], setLoading);
    }
  };

  const BlankCards = () => {
    return (
      <>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10">
          <div className="blank_card"></div>
        </div>
        <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-medium text-center text-[#E4DECD]">
          You have no NFT,
          <br />
          buy one from{" "}
          <span className="underline cursor-pointer">
            <a>Magic Eden</a>
          </span>{" "}
          now!
        </h1>
      </>
    );
  };

  const allNftList = useData ? useData.allNftList : [];
  console.log("all nfts---->", allNftList);
  const stakedNfts = allNftList.filter((item) => item.staked);
  const walletNfts = allNftList.filter((item) => !item.staked);

  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 z-[200] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-[974px] h-[590px] max-lg:w-[calc(100%-32px)] max-md:w-screen max-md:h-screen bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] relative after:absolute after:top-2 after:left-2 after:bottom-2 after:right-2 max-md:after:top-0 max-md:after:left-0 max-md:after:bottom-0 max-md:after:right-0 after:bg-[linear-gradient(180deg,#1F1B18_0%,#393028_100%)] after:shadow-[0_0_4px_0_rgba(0,0,0,0.80),1px_1px_2px_0_#37322F_inset]">
        <img
          src="/img/Deco_leftbottom.png"
          alt="B_L"
          className="absolute -bottom-1 -left-1 z-[2] max-md:hidden"
        />
        <img
          src="/img/Deco_rightbottom.png"
          alt="B_R"
          className="absolute -bottom-1 -right-1 z-[2] max-md:hidden"
        />
        <img
          src="/img/Deco_lefttop.png"
          alt="T_L"
          className="absolute -top-1 -left-1 z-[2] max-md:hidden"
        />
        <img
          src="/img/Deco_righttop.png"
          alt="T_R"
          className="absolute -top-1 -right-1 z-[2] max-md:hidden"
        />
        <img
          src="/img/banner.png"
          alt="Banner"
          className="absolute top-24 -left-4 max-lg:-left-[1%] z-[3] !max-w-[calc(100%+32px)] max-lg:!max-w-[102%] max-sm:h-[90px]"
        />
        <div className="w-4 h-4 border-t-[#0000] border-l-[#0000] border-[8px] max-lg:border-[0.5%] border-[#161311] absolute top-20 z-[2] -left-4 max-lg:hidden" />
        <div className="w-4 h-4 border-t-[#0000] border-r-[#0000] border-[8px] max-lg:border-[0.5%] border-[#161311] absolute top-20 z-[2] -right-4 max-lg:hidden" />
        <div className="px-6 py-10 flex justify-between items-center relative z-[2]">
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
        <div className="flex items-center z-20 relative py-4 md:pl-12 md:pr-8 px-5 justify-between">
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
                    <Button onClick={stakeAll} disabled={selected.length === 0}>
                      Stake({selected.length})
                    </Button>
                  ) : (
                    <Button onClick={stakeAll} disabled={selected.length === 0}>
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
        <div className="mt-20 ml-12 pr-6 max-w-[calc(100%-96px)] relative z-[2] h-[300px] max-md:h-[calc(100%-350px)] grid grid-cols-5 max-md:grid-cols-2 gap-[26px] overflow-y-scroll overflow-x-hidden">
          {console.log("walletnft", walletNfts, stakedNfts)}
          {tab === "wallet" ? (
            <>
              {walletNfts.length !== 0 ? (
                <>
                  {walletNfts.map((nft, index) => (
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
                </>
              ) : (
                BlankCards()
              )}
            </>
          ) : tab === "staked" ? (
            <>
              {stakedNfts.length !== 0 ? (
                <>
                  {console.log("stakedNFt", stakedNfts)}
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
                </>
              ) : (
                BlankCards()
              )}
            </>
          ) : (
            BlankCards()
          )}
        </div>
      </div>
    </div>
  );
};

export default StakeModal;
