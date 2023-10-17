import React, { FC, useState, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { ModalContext } from "../../context/ModalProvider";
import { CloseIcon } from "../SvgIcons";
import Image from "next/image";
import Button from "../Button";

const DisconnectWalletModal: FC = () => {
  const { isDisconnectWalletModal, setIsDisconnectWalletModal } =
    useContext<any>(ModalContext);

  // const { wallet, connected, connect, disconnect, publicKey } = useWallet();
  const { disconnect } = useWallet();
  const router = useRouter();

  // const handleConnect = () => {
  //   connect();
  // };

  const handleDisconnect = () => {
    disconnect();
    // wallet.disconnect()
    setIsDisconnectWalletModal(!isDisconnectWalletModal);
    router.push("/");
  };
  return isDisconnectWalletModal ? (
    <div className="fixed left-0 top-0 w-screen h-screen z-[1000] flex items-center justify-center backdrop-blur-[20px]  bg-[#000000]/40">
      <div className="w-[576px] bg-gradient-to-b from-[#0F0902] to-[#26211E]  rounded-2xl relative p-2">
        <div className="bg-gradient-to-b from-[#1F1B18] to-[#393028]">
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
            <Image
              src={"/img/Deco_lefttop.png"}
              width={80}
              height={60}
              alt=""
            />
          </div>
          <div className="absolute -right-1 -top-1">
            <Image
              src={"/img/Deco_righttop.png"}
              width={80}
              height={60}
              alt=""
            />
          </div>
          <div className="grid place-content-center relative z-10">
            <div className="h-[171px] grid place-content-center">
              <p className="text-[24px] text-white font-medium">
                Are you sure to disconnect wallet?
              </p>
            </div>
            <div className="flex justify-center space-x-7 mt-6 pb-9">
              <Button
                variant="secondary"
                onClick={() => setIsDisconnectWalletModal(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default DisconnectWalletModal;
