import { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.scss";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { ToastContainer } from "react-toastify";
import WalletConnect from "../context/WalletProvider";
import MainLayout from "../components/Layout/MainLayout";
import { ModalProvider } from "../context/ModalProvider";
import ProfileModal from "../components/Modal/ProfileModal";
import DisconnectWalletModal from "../components/Modal/DisconnectWalletModal";
import ShareModal from "../components/Modal/ShareModal";
import AboutModal from "../components/Modal/AboutModal";
import MyWalletModal from "../components/Modal/MyWalletModal";
import { UserProvider } from "../context/UserProvider";
import StakeModal from "../components/Modal/StakeModal";
import TagManager from "react-gtm-module";
import "react-loading-skeleton/dist/skeleton.css";
import styled, { keyframes } from "styled-components";
import Image from "next/image";

const cursorAnimation = keyframes`
  /* Define your cursor animation keyframes here */
`;

const CustomCursor = styled.div`
  width: 50px;
  height: 50px;
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  pointer-events: none;
  animation: ${cursorAnimation} 1s infinite; /* Apply the animation */
`;

const tagManagerArgs = {
  gtmId: "G-7PRF0Q1K9J",
  dataLayer: {
    userId: "001",
    userProject: "project",
  },
};

function initializeGTM() {
  if (typeof window !== "undefined") {
    console.log("Initialize GTM");
    TagManager.initialize(tagManagerArgs);
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  // Update cursor position on mouse movement
  const updateCursorPosition = (e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    document.addEventListener("mousemove", updateCursorPosition);
    return () => {
      document.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  useEffect(() => {
    initializeGTM();
  }, []);
  return (
    <WalletConnect>
      <WalletModalProvider>
        <UserProvider>
          <ModalProvider>
            <CustomCursor
              style={{ left: `${position.x}px`, top: `${position.y}px` }}
            >
              <Image src="/cursor/cursor.gif" width={50} height={50} alt="" />
            </CustomCursor>
            <MainLayout>
              <Component {...pageProps} />
              <ProfileModal />
              <DisconnectWalletModal />
              <ShareModal />
              <AboutModal />
              <MyWalletModal />
              <StakeModal />
            </MainLayout>
          </ModalProvider>
        </UserProvider>
        <ToastContainer
          style={{ fontSize: 15 }}
          pauseOnFocusLoss={false}
          enableMultiContainer={false}
        />
      </WalletModalProvider>
    </WalletConnect>
  );
}
