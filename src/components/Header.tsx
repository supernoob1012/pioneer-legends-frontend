import { FC, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ConnectWallet from "./ConnectWallet";

const Header: FC = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  const router = useRouter();
  const { pathname } = router;
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const visible = prevScrollPos > currentScrollPos;

      setPrevScrollPos(currentScrollPos);
      setShowHeader(visible);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
    // eslint-disable-next-line
  }, []);

  return router.pathname !== "/map" ? (
    <header
      className={`h-20 flex items-center fixed top-0 left-0 w-full z-50  ${
        showHeader ? "" : "shadow-xl bg-[#fff] backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto">
        {pathname === "/" ? (
          <div
            className={`flex items-center py-3 ${
              showHeader ? "" : " justify-between"
            } `}
          >
            <div className={showHeader ? "hidden" : "show"}>
              <Link href={"/"} passHref>
                <div className="text-[36px] font-bold leading-[1] max-[500px]:hidden">
                  Pioneer Legends
                </div>
              </Link>
              <Link href={"/"} passHref>
                <div className="text-[36px] font-bold leading-[1] min-[500px]:hidden px-4">
                  PL
                </div>
              </Link>
            </div>
            <div className="absolute right-[60px] top-[10px] max-[550px]:right-4">
              {/* <WalletMultiButton /> */}
              <ConnectWallet />
            </div>
          </div>
        ) : (
          <div className={`flex items-center py-3  justify-between`}>
            <div className="">
              {/* <div
                className="flex space-x-4 rounded-full py-4 px-6 bg-[#E6E6E6]"
                onClick={handleProfileModal}
              >
                <Image
                  src={"/icons/account_icon.svg"}
                  alt="account"
                  width={30}
                  height={30}
                />
                <p className="text-black text-md place-content-center">
                  {walletAddress}
                </p>
              </div> */}
            </div>
          </div>
        )}
      </div>
    </header>
  ) : (
    <></>
  );
};

export default Header;
