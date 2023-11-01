import { useWallet } from "@solana/wallet-adapter-react";
import { useUserData } from "../../context/UserProvider";
import { CrossIcon, InputCloseIcon } from "../SvgIcons";
import { FC, useEffect, useState } from "react";

interface BoxProps {
  username: string;
  setUsername: Function;
  inputActive: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

const DisplayNamebox: FC<BoxProps> = ({
  username,
  setUsername,
  inputActive,
  setIsChanged,
}) => {
  const { userData } = useUserData();
  const { publicKey } = useWallet();
  const handleUsername = (value: string) => {
    console.log("username", userData.username);
    setUsername(value);
    if (userData.username === value) {
      setIsChanged(false);
    } else {
      setIsChanged(true);
    }
    if (value === "") {
    }
  };
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    if (userData.username === "" && publicKey) {
      setUsername(publicKey.toBase58());
    }
    if (userData.username === username) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
    // eslint-disable-next-line
  }, [userData, username]);

  return (
    <div className="mt-7 mb-8">
      <p className="text-white font-medium">Display name</p>
      <div className="mt-2 relative overflow-hidden group">
        <button
          className={`absolute right-3 top-3 ${!username ? "hidden" : "show"}`}
          onClick={() => setUsername("")}
        ></button>
        <div className="flex justify-between items-center relative w-full">
          {publicKey && (
            <>
              <input
                id="username"
                className="p-3 w-[calc(100%-24px)] left-[12px] bg-[#E1E4CD1A] hover:bg-[#E1E4CD33] text-[#ffffff] outline-none focus:text-white placeholder:text-white peer relative z-[3]"
                value={username}
                placeholder={
                  publicKey.toBase58().slice(0, 5) +
                  "..." +
                  publicKey
                    .toBase58()
                    .substring(
                      publicKey.toBase58().length - 5,
                      publicKey.toBase58().length
                    )
                }
                onChange={(e) => handleUsername(e.target.value)}
                style={{
                  caretColor: "#29A3A9",
                }}
              />
              <div className="box-outer absolute peer-hover:before:border-r-[22px] peer-hover:before:border-r-[rgba(225,228,205,0.2)] peer-hover:after:border-l-[22px] peer-hover:after:border-l-[rgba(225,228,205,0.2)] "></div>
              <div className="absolute w-full h-full bg-[#fff0] peer-focus:before:bg-[linear-gradient(to_right,#29A3A9_0%,#29A3A9_100%),linear-gradient(to_right,#29A3A9_0%,#29A3A9_100%),linear-gradient(-45deg,transparent_45%,#29A3A9_50%,transparent_55%),linear-gradient(to_right,#29A3A9_0%,#29A3A9_100%),linear-gradient(225deg,transparent_45%,#29A3A9_50%,transparent_55%),linear-gradient(-45deg,transparent_45%,#29A3A9_50%,transparent_55%),linear-gradient(to_right,#29A3A9_0%,#29A3A9_100%),linear-gradient(225deg,transparent_45%,#29A3A9_50%,transparent_55%)] input_border"></div>
            </>
          )}
          <button
            className={`absolute top-[12px] right-[15px] w-4 h-4 z-[5] ${username === "" ? "hidden" : "block"
              }`}
            onClick={() => {
              handleUsername("");
            }}
          >
            <CrossIcon color="#A39C87" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplayNamebox;
