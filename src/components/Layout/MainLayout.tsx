import { FC, ReactNode, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";

interface LayoutProps {
  children: ReactNode;
}
const MainLayout: FC<LayoutProps> = ({ children }) => {
  const wallet = useWallet();
  const router = useRouter();

  // useEffect(() => {
  //   if (wallet.connected) {
  //     router.push("/map");
  //   } else {
  //     router.push("/");
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [wallet.connected]);

  return (
    <>
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default MainLayout;
