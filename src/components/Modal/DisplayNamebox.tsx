import { useWallet } from "@solana/wallet-adapter-react";
import { useUserData } from "../../context/UserProvider";
import { InputCloseIcon } from "../SvgIcons";
import { FC, useEffect, useState } from "react";

interface BoxProps {
  username: string;
  setUsername: Function;
  inputActive: boolean;
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>
}

const DisplayNamebox: FC<BoxProps> = ({
  username,
  setUsername,
  inputActive,
  setIsChanged
}) => {
  const { userData } = useUserData();
  const { publicKey } = useWallet();
  const handleUsername = (value: string) => {
    console.log("username", userData.username);
    setUsername(value);
    if (userData.username === value) {
      setIsChanged(false)
    } else {
      setIsChanged(true)
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
        >
        </button>
        {publicKey && (
          <input
            id="username"
            className="p-3 w-full bg-[#322E28] rounded-xl text-[#ffffff] outline-none focus:text-white placeholder:text-white placeholder:opacity-50"
            value={username}
            placeholder={publicKey.toBase58().slice(0, 5) + "..." + publicKey.toBase58().substring(publicKey.toBase58().length - 5, publicKey.toBase58().length)}
            onChange={e => handleUsername(e.target.value)}
            style={{
              caretColor: "#00F2FF",
            }}
          />
        )}
        <label
          className="absolute left-0 top-0 w-full h-full pointer-events-none"
          htmlFor="username"
        >
          <div
            className={`group-hover:bg-[#00F2FF] h-0.5 w-[calc(100%-12px)] absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } top-0 left-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-0.5 w-[calc(100%-12px)] absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } bottom-0 left-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-9 w-0.5 absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } left-0 top-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-9 w-0.5 absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } right-0 top-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } left-0.5 -top-0.5 rotate-45`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } right-0.5 -top-0.5 -rotate-45`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } left-0.5 -bottom-0.5 -rotate-45`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-transparent ${inputActive ? "bg-[#00F2FF]" : ""
              } right-0.5 -bottom-0.5 rotate-45`}
          />
        </label>
      </div>
    </div>
  );
};

export default DisplayNamebox;
