import React, { FC, useContext, useState, useEffect } from "react";
import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ModalContext } from "../../context/ModalProvider";
import Button from "../Button";
import {
  UserContext,
  UserContextProps,
  useUserData,
} from "../../context/UserProvider";
import CloseButton from "./CloseButton";
import { CheckLineIcon, LoadingSpin, CrossIcon } from "../SvgIcons";
import { getNonce, requestSignature, updateProfile } from "../../utils/api";
import ModalEdges from "./ModalCorner";
import DisplayNamebox from "./DisplayNamebox";
import { errorAlert } from "../ToastGroup";
import Link from "next/link";
import useWindowSize from "../../utils/useWindowSize";

const ProfileModal: FC = () => {
  const { userData, getUserData } = useUserData();
  const { isProfileModal, setIsProfileModal } = useContext<any>(ModalContext);
  const [isClose, setIsClose] = useState(false);
  const { width, height } = useWindowSize();
  const [checkedImge, setCheckedImage] = useState(userData.image);

  const wallet = useWallet();
  const useData = useContext<UserContextProps>(UserContext);
  const [inputActive, setInputActive] = useState(false);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const allNftList = useData ? useData.allNftList : [];

  const [username, setUsername] = useState(userData.username);

  useEffect(() => {
    if (isProfileModal) {
      setUsername(userData.username);
    }
    // eslint-disable-next-line
  }, [isProfileModal]);

  useEffect(() => {
    if (wallet.publicKey) {
      if (useData.userData.username === "") {
        setUsername(wallet.publicKey.toBase58());
      }
    }
    // eslint-disable-next-line
  }, [userData, wallet.publicKey, wallet.connected]);
  const isMobile = width > 768;

  const [isSaving, setIsSaving] = useState(false);

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
      console.log("action done!");
      localStorage.setItem("pfp", checkedImge);
      localStorage.setItem("username", username);
      getUserData();
      setIsSaving(false);
      setIsProfileModal(false);
    }
  };

  const closeModal = () => {
    if (username !== userData.username) {
      setIsClose(true);
      // setIsProfileModal(false);
    } else {
      setIsProfileModal(false);
      setIsClose(false);
    }
  };

  const CloseModal: FC = () => {
    return (
      <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px] bg-[#000000]/40 md:px-0 p-[14px]">
        <div className="w-[576px] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
          <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028]">
            <ModalEdges />
            <div className="grid place-content-center relative z-10">
              <div className="h-[171px] grid place-content-center">
                <p className="text-[24px] text-white font-medium max-w-[436px] text-center mx-auto">
                  If you close this screen, all changes will be lost. Continue?
                </p>
              </div>
              <div className="flex justify-center space-x-7 mt-6 pb-9">
                <Button variant="secondary" onClick={() => setIsClose(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsProfileModal(false);
                    setIsClose(false);
                    setUsername(userData.username);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return isProfileModal ? (
    <>
      <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px]  bg-[#000000]/40">
        <div className="md:w-[568px] bg-gradient-to-b md:from-[#0F0902] md:to-[#26211E] from-[#1F1B18] to-[#393028]  rounded-2xl relative md:p-2  p-0 w-full md:h-auto h-full">
          {isMobile && <ModalEdges />}
          <CloseButton
            className="absolute right-5 top-[34px] md:flex hidden"
            onClose={closeModal}
          />
          <div
            className="bg-gradient-to-b from-[#1F1B18] to-[#393028] px-5 md:pt-7 pt-7 h-full md:h-auto"
            onClick={() => setInputActive(false)}
          >
            <div className="relative flex items-center justify-between md:mb-0 mb-5">
              <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
                edit profile
              </p>
              <div className="flex md:hidden" onClick={closeModal}>
                <CrossIcon color="white" />
              </div>
            </div>
            <div className="flex flex-col md:h-auto h-[calc(100%-31px)] overflow-x-hidden overflow-y-hidden">
              <DisplayNamebox
                username={username}
                setUsername={setUsername}
                inputActive={inputActive}
                setIsChanged={setIsChanged}
              />
              <div className="relative h-[calc(100%-320px)] flex flex-col justify-center items-center">
                <p className="text-white font-medium absolute top-0 left-0">
                  Profile picture
                </p>
                {allNftList.length !== 0 ? (
                  <div className="md:h-[248px] h-full overflow-auto md:mt-8 mt-[40px] pr-1.5 custom-scroll md:mb-0 mb-[112px] w-full">
                    <div className="grid grid-cols-3 md:grid-cols-4 md:gap-4 gap-[12px] w-full">
                      {allNftList.map((item, key) => (
                        <PfpCard
                          image={item.image}
                          key={key}
                          pfp={userData.image}
                          checkedImge={checkedImge}
                          setCheckedImage={setCheckedImage}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="md:h-[200px] flex items-center flex-col mt-8 justify-center">
                    <div
                      className="w-[100px] h-[100px] rounded-full z-20 relative overflow-hidden"
                      style={{
                        backgroundImage:
                          "radial-gradient(115.57% 115.57% at -3.5% -16%, #3F434B 0%, #2D2721 100%)",
                      }}
                    >
                      <div
                        className="m-0.5 w-[96px] h-[96px] rounded-full overflow-hidden"
                        style={{
                          backgroundImage:
                            "linear-gradient(149deg, #38393C 9.39%, #2D2721 93.63%)",
                        }}
                      >
                        <div className="m-1.5 overflow-hidden rounded-full bg-[#675F57]">
                          {/* eslint-disable-next-line */}
                          <img
                            src={"/img/default-avatar.svg"}
                            className="w-full h-full"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid place-content-center w-fultext-center mx-auto text-center text-[#E4DECD] font-medium">
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
                  </div>
                )}

                <div className="md:py-10 py-0 md:h-auto h-[88px] md:px-0 flex items-center md:justify-center -ml-[1px] justify-between gap-7 md:relative fixed w-full left-0 px-5 bottom-0 bg-[#342B2590] backdrop-blur-sm">
                  <div
                    className="w-full h-8 absolute left-0 bottom-[120px] z-10 pointer-events-none blur-[16px] md:flex hidden"
                    style={{
                      backgroundImage:
                        "linear-gradient(#1E1915 0%, #362D26 100%)",
                    }}
                  />
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
          </div>
        </div>
      </div>
      {isClose && <CloseModal />}
    </>
  ) : (
    <></>
  );
};

export default ProfileModal;

const PfpCard = ({
  image,
  checkedImge,
  setCheckedImage,
}: {
  image: string;
  pfp: string;
  checkedImge: string;
  setCheckedImage: Function;
}) => {
  const { userData } = useUserData();
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className="aspect-square relative max-h-[calc((100% - 16px)/3)] h-full cursor-pointer card-mask"
      onClick={() => {
        setIsClicked(!isClicked);
        setCheckedImage(image);
      }}
    >
      <Image
        src="/img/avatar.png"
        layout="fill"
        className="relative z-10"
        width={120}
        height={120}
        alt=""
      />
      <div className="bg-[#1E1915] absolute left-1.5 top-1.5 w-full h-full" />
      {checkedImge === image && (
        <div
          className="w-8 h-8 grid place-content-center absolute right-0 bottom-0 z-20"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #376F73 0%, #3C433C 100%)",
          }}
        >
          <CheckLineIcon />
        </div>
      )}
    </div>
  );
};
