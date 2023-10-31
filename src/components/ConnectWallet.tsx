/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { errorAlert } from "./ToastGroup";
import Button from "./Button";
import { BackpackIcon, LedgerIcon, PhantomIcon } from "./SvgIcons";
import { ModalContext } from "../context/ModalProvider";
import { useUserData } from "../context/UserProvider";
import Skeleton from "react-loading-skeleton";
import bs58 from "bs58";
import { authorizeUser, getNonce } from "../utils/api";
import { useRouter } from "next/router";

const ConnectWallet = () => {
  const {
    wallets,
    connect,
    select,
    connecting,
    publicKey,
    connected,
    signMessage,
  } = useWallet();
  const router = useRouter();
  const { setIsProfileModal } = useContext<any>(ModalContext);
  const { isDataLoading } = useUserData();
  const [isAuthrized, setIsAuthrized] = useState<boolean>(false);

  useEffect(() => {
    const getnon = async () => {
      if (!signMessage) return;
      const nonce = await getNonce(publicKey?.toBase58()!);
      if (nonce && connected) {
        const message = new TextEncoder().encode(
          `Authorize your wallet. nonce: ${nonce}`
        );
        const sig = await signMessage(message);

        if (sig) {
          const ret = await authorizeUser(
            publicKey?.toBase58()!,
            bs58.encode(new Uint8Array(sig as unknown as ArrayBuffer)),
            nonce as string
          );

          if (ret) {
            router.push("/map");
            setIsAuthrized(true);
          } else {
            router.push("/");
          }
        }
      }
    };

    if (publicKey && connected) {
      getnon();
    }
  }, [publicKey, connected]);

  const handleConnect = async (walletName: string) => {
    try {
      const wallet = wallets.find(wallet => wallet.adapter.name === walletName);
      if (wallet) {
        if (wallet.readyState === "Installed") {
          console.log("what?");
          select(wallet.adapter.name);
          // await connect();
        } else {
          errorAlert("Cannot connect the wallet!");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative connect">
      <div className="">
        {connected && isAuthrized ? (
          <>
            {isDataLoading ? (
              <Skeleton
                baseColor="#828282"
                highlightColor="#999999"
                style={{
                  width: 136,
                  height: 40,
                  borderRadius: 6,
                }}
              />
            ) : (
              <Button variant="primary" onClick={() => setIsProfileModal(true)}>
                Edit profile
              </Button>
            )}
          </>
        ) : (
          <Button variant="primary">Connect wallet</Button>
        )}
      </div>
      <div className="min-w-[238px] py-3 px-4 absolute right-auto left-0 lg:left-auto lg:right-0 top-[40px] connect-drop">
        <div
          className="absolute left-0 top-5 w-full h-[calc(100%-20px)] opacity-70 backdrop-blur-[10px]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, #0F0902 0%, #26211E 100%)",
          }}
        ></div>
        <div className="relative z-10 mt-5">
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={() => handleConnect("Phantom")}
            // onClick={() => {
            //   setModalVisible(true);
            // }}
          >
            <div className="flex items-center gap-2">
              <PhantomIcon /> Phantom
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={() => handleConnect("Backpack")}
          >
            <div className="flex items-center gap-2">
              <BackpackIcon /> Backpack
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={() => handleConnect("Ledger")}
          >
            <div className="flex items-center gap-2">
              <LedgerIcon />
              Phantom/Ledger
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
