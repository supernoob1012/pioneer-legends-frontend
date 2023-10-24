/* eslint-disable @next/next/no-img-element */
import React, { useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { errorAlert } from "./ToastGroup";
import Button from "./Button";
import { BackpackIcon, LedgerIcon, PhantomIcon } from "./SvgIcons";
import { ModalContext } from "../context/ModalProvider";
import { useUserData } from "../context/UserProvider";
import Skeleton from "react-loading-skeleton";

const ConnectWallet = () => {
  const { wallets, select, connected } = useWallet();
  const { setIsProfileModal } = useContext<any>(ModalContext);
  const { isDataLoading } = useUserData();

  const handelConnectPhantom = () => {
    for (let i = 0; i < wallets.length; i++) {
      if (wallets[i].adapter.name === "Phantom") {
        if (wallets[i].readyState === "Installed") {
          select(wallets[i].adapter.name);
        } else {
          errorAlert("Cannot connect the wallet!");
        }
      }
    }
  };

  const handleConnectBackpack = () => {
    for (let i = 0; i < wallets.length; i++) {
      if (wallets[i].adapter.name === "Backpack") {
        if (wallets[i].readyState === "Installed") {
          select(wallets[i].adapter.name);
        } else {
          errorAlert("Cannot connect the wallet!");
        }
      }
    }
  };

  const handleConnectLedger = () => {
    for (let i = 0; i < wallets.length; i++) {
      if (wallets[i].adapter.name === "Ledger") {
        if (wallets[i].readyState === "Installed") {
          select(wallets[i].adapter.name);
        } else {
          errorAlert("Cannot connect the wallet!");
        }
      }
    }
  };
  return (
    <div className="relative connect">
      <div className="">
        {connected ? (
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
            onClick={handelConnectPhantom}
          >
            <div className="flex items-center gap-2">
              <PhantomIcon /> Phantom
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={handleConnectBackpack}
          >
            <div className="flex items-center gap-2">
              <BackpackIcon /> Backpack
            </div>
          </button>
          <button
            className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
            onClick={handleConnectLedger}
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
