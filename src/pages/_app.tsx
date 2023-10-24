import { AppProps } from "next/app";
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
import "react-loading-skeleton/dist/skeleton.css";
import Loading from "../components/Loading";

export default function App({ Component, pageProps }: AppProps) {
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
              <Loading />
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
