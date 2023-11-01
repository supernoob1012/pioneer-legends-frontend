import { FC, useState, useContext } from "react";
import { getShortAddress } from "../utils/util";
import { HamburgerIcon } from "./SvgIcons";
import { ModalContext } from "../context/ModalProvider";
import ClickAwayComponent from "./ClickAwayComponent";
import { useUserData } from "../context/UserProvider";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";

interface Props {
  pfp?: string;
  address: string;
}

const TopProfile: FC<Props> = ({ address }) => {
  const [opened, setOpened] = useState(false);

  const {
    isDisconnectWalletModal,
    setIsDisconnectWalletModal,
    isMyWalletModal,
    setIsMyWalletModal,
  } = useContext<any>(ModalContext);

  const { userData, isDataLoading } = useUserData();

  const handleDisconnectWalletModal = () => {
    setIsDisconnectWalletModal(!isDisconnectWalletModal);
  };

  const hanleMyWalletModal = () => {
    setIsMyWalletModal(!isMyWalletModal);
  };

  return (
    <ClickAwayComponent
      onClickAway={() => setOpened(false)}
      className="fixed top-[18px] right-4 z-50 w-[132px] lg:w-[237px] h-[60px] flex items-center"
    >
      <div className="absolute left-0 top-0 w-[132px] lg:w-[237px] h-full overflow-hidden">
        <div
          className="absolute left-0 top-0 w-[237px] h-full opacity-75 backdrop-blur-[20px]"
          style={{
            backgroundImage: `url("/img/t-p-bg.svg")`,
          }}
        />
      </div>
      {/* eslint-disable-next-line */}
      <img
        src="/img/deco-rightbottom.png"
        className="absolute -right-1 -bottom-1.5 z-10"
        alt=""
      />
      <div className="flex items-center justify-between relative z-20 w-full pr-4">
        <div
          className="flex items-center cursor-pointer"
          onClick={() => {
            if (!isDataLoading) {
              setIsMyWalletModal(true);
            }
          }}
        >
          {isDataLoading ? (
            <>
              <Skeleton
                baseColor="#828282"
                highlightColor="#999999"
                className="relative ml-4 lg:ml-6"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                }}
              />
              <Skeleton
                baseColor="#828282"
                highlightColor="#999999"
                className="hidden lg:block relative ml-2"
                style={{
                  width: 80,
                  height: 16,
                  borderRadius: 4,
                }}
              />
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-full z-20 relative ml-4 lg:ml-6 overflow-hidden bg-[radial-gradient(115.57%_115.57%_at_-3.5%_-16%,#3F434B_0%,#2D2721_100%)] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:rounded-full hover:after:bg-[rgba(225,228,205,0.30)] flex items-center justify-center">
                <div className="w-10 h-10 overflow-hidden rounded-full">
                  <Image
                    src={
                      userData.image !== ""
                        ? userData.image
                        : "/img/default-avatar.svg"
                    }
                    width={40}
                    height={40}
                    className="object-content"
                    alt="user avartar"
                  />
                </div>
              </div>
              <p className="text-[#fff] text-[14px] leading-[22px] font-[500] ml-2 hidden lg:block">
                {userData.username !== ""
                  ? userData.username
                  : getShortAddress(address)}
              </p>
            </>
          )}
        </div>
        <button
          className="mr-2.5 lg:mr-0 w-6 h-6 flex items-center justify-center hover:bg-[#E1E4CD1A] active:bg-[#1E191566]"
          onClick={() => setOpened(!opened)}
        >
          <HamburgerIcon />
        </button>
      </div>
      {opened && (
        <div className="min-w-[238px] py-3 px-4 absolute right-0 left-auto lg:right-auto lg:left-0 top-[74px] backdrop-blur-[20px]">
          <div
            className="absolute left-0 top-0 w-full h-full opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(180deg, #0F0902 0%, #26211E 100%)",
            }}
          ></div>
          <ul className="relative z-10" onClick={() => setOpened(false)}>
            <li className="">
              <button
                className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
                onClick={hanleMyWalletModal}
              >
                My wallet
              </button>
            </li>
            <li className="">
              <button
                className="p-3 text-[16px] font-medium text-white w-full text-left hover:bg-[#e1e4cd1a] active:bg-[#1e191566]"
                onClick={handleDisconnectWalletModal}
              >
                Disconnect wallet
              </button>
            </li>
          </ul>
        </div>
      )}
    </ClickAwayComponent>
  );
};

export default TopProfile;
