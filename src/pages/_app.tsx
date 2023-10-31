import { AppProps } from "next/app";
import { useEffect } from "react";
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
  useEffect(() => {
    initializeGTM();
  }, []);
  return (
    <WalletConnect>
      <WalletModalProvider>
        <UserProvider>
          <ModalProvider>
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
