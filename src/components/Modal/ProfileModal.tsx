import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/ModalProvider";
import {
  UserContext,
  UserContextProps,
  useUserData,
} from "../../context/UserProvider";
import { getNonce, requestSignature, updateProfile } from "../../utils/api";
import useWindowSize from "../../utils/useWindowSize";
import Button from "../Button";
import ImageCard from "../ImageCard";
import { CrossIcon } from "../SvgIcons";
import { errorAlert } from "../ToastGroup";
import CloseButton from "./CloseButton";
import DisplayNamebox from "./DisplayNamebox";

/* eslint-disable @next/next/no-img-element */
const ProfileModal = () => {
  const { userData, getUserData } = useUserData();
  const [username, setUsername] = useState(userData.username);
  const [isClose, setIsClose] = useState(false);
  const { isProfileModal, setIsProfileModal } = useContext<any>(ModalContext);
  const wallet = useWallet();
  const [inputActive, setInputActive] = useState(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [checkedImge, setCheckedImage] = useState(userData.image);
  const [isSaving, setIsSaving] = useState(false);
  const useData = useContext<UserContextProps>(UserContext);
  const { width } = useWindowSize();
  const isMobile = width > 768;

  const allNftList = useData ? useData.allNftList : [];

  if (!wallet.publicKey || !isProfileModal) return <></>;

  const closeModal = () => {
    if (username !== userData.username) {
      setIsClose(true);
    } else {
      setIsClose(false);
    }
    setIsProfileModal(false);
  };

  const update = async () => {
    if (username === "" || userData.username === "username") {
      errorAlert("Please enter a valid username.");
      return;
    }
    setIsSaving(true);
    try {
      const sig = await requestSignature(
        wallet,
        `Authorize your wallet.\nname: ${username}\nwallet: ${
          wallet.publicKey?.toBase58() as string
        }\nnonce: ${getNonce(wallet.publicKey?.toBase58() as string)}`
      );
      if (sig) {
        await updateProfile({
          name: username,
          wallet: wallet.publicKey?.toBase58() as string,
          image: checkedImge,
          signature: sig.signature,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      localStorage.setItem("pfp", checkedImge);
      localStorage.setItem("username", username);
      getUserData();
      setIsSaving(false);
      setIsProfileModal(false);
    }
  };

  const BlankCards = () => {
    return (
      <>
        <div className="w-[116px] h-[116px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card1"></div>
        </div>
        <div className="w-[116px] h-[116px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card1"></div>
        </div>
        <div className="w-[116px] h-[116px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card1"></div>
        </div>
        <div className="w-[116px] h-[116px] shadow-[6px_6px_0_#1E1915] opacity-10 justify-self-center">
          <div className="blank_card1"></div>
        </div>
        <h1 className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 font-medium text-center text-[#E4DECD]">
          You have no NFT,
          <br />
          buy one from{" "}
          <span className="underline ">
            <a
              href="https://magiceden.io/marketplace/pioneer_legends"
              className="cursor-pointer"
            >
              Magic Eden
            </a>
          </span>{" "}
          now!
        </h1>
      </>
    );
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 z-[100] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40">
      <div className="w-[576px] h-[590px] max-sm:w-screen max-sm:h-screen bg-[linear-gradient(180deg,#0F0902_0%,#26211E_100%)] relative after:absolute after:top-2 after:left-2 after:bottom-2 after:right-2 max-sm:after:top-0 max-sm:after:left-0 max-sm:after:bottom-0 max-sm:after:right-0 after:bg-[linear-gradient(180deg,#1F1B18_0%,#393028_100%)] after:shadow-[0_0_4px_0_rgba(0,0,0,0.80),1px_1px_2px_0_#37322F_inset]">
        {/**
         * Make corner image
         */}
        <img
          src="/img/Deco_leftbottom.png"
          alt="B_L"
          className="absolute -bottom-1 -left-1 z-[2] max-sm:hidden"
        />
        <img
          src="/img/Deco_rightbottom.png"
          alt="B_R"
          className="absolute -bottom-1 -right-1 z-[2] max-sm:hidden"
        />
        <img
          src="/img/Deco_lefttop.png"
          alt="T_L"
          className="absolute -top-1 -left-1 z-[2] max-sm:hidden"
        />
        <img
          src="/img/Deco_righttop.png"
          alt="T_R"
          className="absolute -top-1 -right-1 z-[2] max-sm:hidden"
        />
        <div className="px-6 py-10 flex justify-between items-center relative z-[2]">
          <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
            edit profile
          </p>
          {/**
           * Close button UI
           */}
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
        <div className="relative z-[20] px-8">
          <DisplayNamebox
            username={username}
            setUsername={setUsername}
            inputActive={inputActive}
            isChanged={isChanged}
            setIsChanged={setIsChanged}
          />
        </div>
        <div className="mt-8 px-8 flex flex-col gap-[10px] relative z-[20]">
          <h1 className="font-medium text-sm text-white">Profile picture</h1>
          <div className="w-full min-h-[200px] max-sm:min-h-[calc(100vh-400px)] h-full overflow-x-hidden overflow-y-auto">
            {allNftList.length !== 0 ? (
              <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-x-[10px] gap-y-4 relative">
                {allNftList.map((item, index) => (
                  <ImageCard
                    key={index}
                    image={item.image}
                    checkedImage={checkedImge}
                    setCheckedImage={setCheckedImage}
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-4 max-sm:grid-cols-2 gap-x-[10px] gap-y-4 relative">
                <BlankCards />
              </div>
            )}
          </div>
        </div>
        <div className="sm:py-10 py-0 sm:h-auto h-[88px] sm:px-0 flex items-center sm:justify-center -ml-[1px] justify-between gap-7 sm:relative fixed w-full left-0 px-5 bottom-0 bg-[#342B2590] backdrop-blur-sm z-[20]">
          <div className="w-full h-8 absolute left-0 bottom-[120px] z-10 pointer-events-none blur-[16px] sm:flex hidden bg-[linear-gradient(#1E1915_0%,#362D26_100%)]" />
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={update}
            disabled={isSaving || !isChanged}
          >
            {isSaving ? (
              <div className="w-6 h-6 relative mx-auto animate-spin">
                <Image src={"/icons/spin.png"} layout="fill" alt="" />
              </div>
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
