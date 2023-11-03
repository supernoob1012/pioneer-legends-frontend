/* eslint-disable @next/next/no-img-element */
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useContext } from "react";
import { ModalContext } from "../../context/ModalProvider";
import {
  UserContext,
  UserContextProps,
  useUserData,
} from "../../context/UserProvider";
import useWindowSize from "../../utils/useWindowSize";
import Button from "../Button";
import NftCard from "../NftCard";
import { NftLoading } from "../Nftloading";
import { CrossIcon, SolanaIcon } from "../SvgIcons";
import CloseButton from "./CloseButton";

const MyWalletModal = () => {
  const wallet = useWallet();
  const {
    isMyWalletModal,
    setIsMyWalletModal,
    isDisconnectWalletModal,
    setIsDisconnectWalletModal,
    isProfileModal,
    setIsProfileModal,
  } = useContext<any>(ModalContext);
  const useData = useContext<UserContextProps>(UserContext);
  const { width } = useWindowSize();
  const { userData } = useUserData();

  const isMobile = width > 768;

  if (!wallet.publicKey || !isMyWalletModal) return <></>;

  const handleDisconnectWalletModal = () => {
    setIsDisconnectWalletModal(!isDisconnectWalletModal);
    setIsMyWalletModal(false);
  };

  const handleProfileModal = () => {
    setIsProfileModal(!isProfileModal);
    setIsMyWalletModal(false);
  };

  const allNftList = useData ? useData.allNftList : [];

  const BlankCards = () => {
    return (
      <>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card"></div>
        </div>
        <div className="w-[154px] h-[220px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card"></div>
        </div>
        <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-medium text-center text-[#E4DECD]">
          You have no NFT,
          <br />
          buy one from{" "}
          <span className="underline ">
            <a>Magic Eden</a>
          </span>{" "}
          now!
        </h1>
      </>
    );
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 z-[100] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-[974px] h-[590px] max-lg:w-[calc(100%-32px)] max-md:w-screen max-md:h-screen bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] relative after:absolute after:top-2 after:left-2 after:bottom-2 after:right-2 max-md:after:top-0 max-md:after:left-0 max-md:after:bottom-0 max-md:after:right-0 after:bg-[linear-gradient(180deg,#1F1B18_0%,#393028_100%)] after:shadow-[0_0_4px_0_rgba(0,0,0,0.80),1px_1px_2px_0_#37322F_inset]">
        {/**
         * Make corner image
         */}
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
        {/**
         * Make banner image
         */}
        <img
          src="/img/banner.png"
          alt="Banner"
          className="absolute top-24 -left-4 max-lg:-left-[1%] z-[3] !max-w-[calc(100%+32px)] max-lg:!max-w-[102%] min-h-[130px] max-sm:h-[90px]"
        />
        <div className="w-4 h-4 border-t-[#0000] border-l-[#0000] border-[8px] max-lg:border-[0.5%] border-[#161311] absolute top-20 z-[2] -left-4 max-lg:hidden" />
        <div className="w-4 h-4 border-t-[#0000] border-r-[#0000] border-[8px] max-lg:border-[0.5%] border-[#161311] absolute top-20 z-[2] -right-4 max-lg:hidden" />
        <div className="px-6 py-10 flex justify-between items-center relative z-[2]">
          {" "}
          <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
            my wallet
          </p>
          {/**
           * Close button UI
           */}
          {isMobile ? (
            <CloseButton
              className="absolute right-5 top-[34px] z-50"
              onClose={() => setIsMyWalletModal(false)}
            />
          ) : (
            <button onClick={() => setIsMyWalletModal(false)}>
              <CrossIcon color="white" />
            </button>
          )}
        </div>
        <div className="flex items-center justify-between z-[20] mt-1 mx-12 relative">
          <div className="flex gap-4 items-center">
            <div className="w-[100px] h-[100px] rounded-full border-[#2D2721] p-0.5 border-2 grid place-content-center overflow-hidden bg-[radial-gradient(115.57%_115.57%_at_-3.5%_-16%,#3F434B_0%,#2D2721_100%)]">
              <Image
                src={"/img/default-avatar.svg"}
                width={94}
                height={94}
                alt="profile icon"
                className="rounded-[50%] object-cover"
              />
            </div>
            <div className="">
              <p className="text-[#fff] font-medium text-[16px]">
                {userData.username ? (
                  <>{userData.username}</>
                ) : (
                  <>
                    {wallet.publicKey.toBase58().slice(0, 5)}...
                    {wallet.publicKey.toBase58().slice(-4)}
                  </>
                )}
              </p>
              <div className="flex gap-2 items-center text-primary-200 font-medium text-[14px] mt-1">
                <SolanaIcon /> 5,154.23
              </div>
            </div>
          </div>
          <div className="flex gap-8 justify-between">
            <Button variant="secondary" onClick={handleProfileModal}>
              Edit profile
            </Button>
            <Button variant="secondary" onClick={handleDisconnectWalletModal}>
              Disconnect
            </Button>
          </div>
        </div>
        <div className="mt-20 ml-12 max-md:ml-4 pr-6 max-w-[calc(100%-96px)] max-md:max-w-[calc(100%-32px)] relative z-[20] h-[250px] max-md:h-[calc(100%-350px)] grid grid-cols-5 max-lg:grid-cols-4 max-md:grid-cols-2 gap-[26px] overflow-y-scroll overflow-x-hidden">
          {useData.isDataLoading ? (
            <NftLoading />
          ) : (
            <>
              {allNftList.length !== 0 ? (
                <>
                  {allNftList.map((nft, index) => (
                    <NftCard
                      key={index}
                      image={nft.image}
                      title={nft.name}
                      mint={nft.mint}
                      staked={nft.staked}
                    />
                  ))}
                </>
              ) : (
                BlankCards()
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyWalletModal;
