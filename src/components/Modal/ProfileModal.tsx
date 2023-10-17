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
import { CheckLineIcon, InputCloseIcon } from "../SvgIcons";
import { getNonce, requestSignature, updateProfile } from "../../utils/api";
import ModalEdges from "./ModalCorner";
import DisplayNamebox from "./DisplayNamebox";
import { errorAlert } from "../ToastGroup";
import Link from "next/link";

const ProfileModal: FC = () => {
  const { userData, getUserData } = useUserData();
  const { isProfileModal, setIsProfileModal } = useContext<any>(ModalContext);

  const [isClose, setIsClose] = useState(false);

  const [checkedImge, setCheckedImage] = useState(userData.image);

  const wallet = useWallet();
  const useData = useContext<UserContextProps>(UserContext);
  const [inputActive, setInputActive] = useState(false);

  const allNftList = useData ? useData.allNftList : [];

  const [username, setUsername] = useState(userData.username);

  useEffect(() => {
    if (isProfileModal) {
      setUsername(userData.username);
    }
    // eslint-disable-next-line
  }, [isProfileModal]);

  useEffect(() => {
    console.log(userData);
    if (wallet.publicKey) {
      if (useData.userData.username === "") {
        setUsername(wallet.publicKey.toBase58());
      }
    }
    // eslint-disable-next-line
  }, [userData, wallet.publicKey, wallet.connected]);

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
        `Authorize your wallet.\nname: ${username}\nwallet: ${wallet.publicKey?.toBase58() as string
        }\nnonce: ${getNonce()}`
      );
      console.log(username, checkedImge);
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
      <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px]  bg-[#000000]/40">
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
      {!isClose && (
        <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px]  bg-[#000000]/40">
          <div className="w-[568px] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
            <ModalEdges />
            <CloseButton
              className="absolute right-5 top-[34px]"
              onClose={closeModal}
            />
            <div
              className="bg-gradient-to-b from-[#1F1B18] to-[#393028] px-6 py-7"
              onClick={() => setInputActive(false)}
            >
              <div className="relative">
                <p className="text-[24px] font-secondary text-primary-100 leading-[1.33] uppercase">
                  edit profile
                </p>
              </div>
              <DisplayNamebox
                username={username}
                setUsername={setUsername}
                inputActive={inputActive}
              />
              <div className="relative">
                <p className="text-white font-medium">Profile picture</p>
                {allNftList.length !== 0 ? (
                  <div className="h-[248px] overflow-auto mt-2 pr-1.5 custom-scroll">
                    <div className="grid grid-cols-4 gap-4">
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
                  <div className="h-[200px] flex items-center flex-col mt-8">
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
                            Matic Eden
                          </Link>
                        </span>{" "}
                        now
                      </div>
                    </div>
                  </div>
                )}

                <div className="py-6 flex items-center justify-center relative gap-7">
                  <div
                    className="w-full h-8 absolute left-0 -top-8 z-10 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(53, 44, 37, 0.00) 0%, #352C25 100%)",
                    }}
                  />
                  <Button variant="secondary" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={update}
                    disabled={isSaving}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
      className="aspect-square relative max-h-[114px] cursor-pointer"
      onClick={() => {
        setIsClicked(!isClicked);
        setCheckedImage(image);
      }}
    >
      <Image src={image} layout="fill" className="relative z-10" alt="" />
      <div className="bg-[#1E1915] absolute left-1.5 top-1.5 w-full h-full" />
      {checkedImge === image && (
        <div
          className="w-8 h-8 grid place-content-center absolute left-0 bottom-0 z-20"
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
