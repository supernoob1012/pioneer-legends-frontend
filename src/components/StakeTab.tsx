import Image from "next/image";
import { FC } from "react";

interface TabProps {
  setTab: React.Dispatch<React.SetStateAction<"staked" | "wallet">>;
  tab: "staked" | "wallet";
  stakedNumber?: number;
  walletNumber?: number;
}

const StakeTab: FC<TabProps> = ({
  tab = "staked",
  setTab,
  stakedNumber = 0,
  walletNumber = 0,
}) => {
  return (
    <div className="h-10 flex">
      <button
        className="w-[137px] h-10  relative"
        onClick={() => setTab("wallet")}
      >
        <div
          className="text-[16px] relative z-10"
          style={{
            color: tab === "wallet" ? "#fff" : "#ffffff80",
            fontWeight: tab === "wallet" ? 600 : 500,
          }}
        >
          Wallet ({walletNumber})
        </div>
        {tab === "wallet" ? (
          <Image
            src="/img/tab-l-active.png"
            layout="fill"
            className="absolute left-0 top-0"
            alt=""
          />
        ) : (
          <Image
            src="/img/tab-l-inactive.png"
            layout="fill"
            className="absolute left-0 top-0"
            alt=""
          />
        )}
      </button>
      <button className="w-[137px] h-10  relative"
        onClick={() => setTab("staked")}>
        <div
          className="text-[16px] relative z-10"
          style={{
            color: tab === "staked" ? "#fff" : "#ffffff80",
            fontWeight: tab === "staked" ? 600 : 500,
          }}
        >
          Staked ({stakedNumber})
        </div>
        {tab === "staked" ? (
          <Image
            src="/img/tab-r-active.png"
            layout="fill"
            className="absolute left-0 top-0"
            alt=""
          />
        ) : (
          <Image
            src="/img/tab-r-inactive.png"
            layout="fill"
            className="absolute left-0 top-0"
            alt=""
          />
        )}
      </button>
    </div>
  );
};

export default StakeTab;
