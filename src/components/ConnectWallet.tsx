/* eslint-disable @next/next/no-img-element */
import React, { useState, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { errorAlert } from "./ToastGroup";
import Button from "./Button";
import ClickAwayComponent from "./ClickAwayComponent";
import { BackpackIcon, LedgerIcon, PhantomIcon } from "./SvgIcons";
import { ModalContext } from "../context/ModalProvider";
import { useUserData } from "../context/UserProvider";
import Skeleton from "react-loading-skeleton";

const ConnectWallet = () => {
  const { wallets, select, connected } = useWallet();
  const { setIsProfileModal } = useContext<any>(ModalContext);
  const { isDataLoading } = useUserData();

  const [isOpen, setIsOpen] = useState(false);

  const handleSelectWallet = () => {
    setIsOpen(!isOpen);
  };

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
    <ClickAwayComponent
      onClickAway={() => setIsOpen(false)}
      className="backdrop-blur-[10px]"
    >
      <div className="relative">
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
          <Button variant="primary" onClick={handleSelectWallet}>
            Connect wallet
          </Button>
        )}

        {isOpen && (
          <div className="min-w-[238px] h-[240px] pt-3 pb-9 px-4 absolute left-0 top-[60px] backdrop-blur-[10px]">
            <div
              className="absolute left-0 top-0 w-full h-full opacity-70"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, #0F0902 0%, #26211E 100%)",
              }}
            ></div>
            {/* <div className="absolute left-2 bottom-2 z-10 w-5 h-5 mix-blend-overlay">
              <Image src={"/img/screw.svg"} width={20} height={20} alt="" />
            </div>
            <div className="absolute right-2 bottom-2 z-10 w-5 h-5 mix-blend-overlay">
              <Image src={"/img/screw.svg"} width={20} height={20} alt="" />
            </div> */}
            <ul className="relative z-10">
              <li className="">
                <button
                  className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] focus:bg-[#1e191566]"
                  onClick={handelConnectPhantom}
                >
                  <div className="flex items-center gap-2">
                    <PhantomIcon /> Phantom
                  </div>
                </button>
              </li>
              <li className="">
                <button
                  className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] focus:bg-[#1e191566]"
                  onClick={handleConnectBackpack}
                >
                  <div className="flex items-center gap-2">
                    <BackpackIcon /> Backpack
                  </div>
                </button>
              </li>
              <li className="">
                <button
                  className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] focus:bg-[#1e191566]"
                  onClick={handleConnectLedger}
                >
                  <div className="flex items-center gap-2">
                    <LedgerIcon />
                    Phantom/Ledger
                  </div>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </ClickAwayComponent>
  );
};

export default ConnectWallet;
