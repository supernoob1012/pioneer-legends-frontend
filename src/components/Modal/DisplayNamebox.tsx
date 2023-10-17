import { useWallet } from "@solana/wallet-adapter-react";
import { useUserData } from "../../context/UserProvider";
import { InputCloseIcon } from "../SvgIcons";
import { FC, useEffect } from "react";

interface BoxProps {
  username: string;
  setUsername: Function;
  inputActive: boolean;
}

const DisplayNamebox: FC<BoxProps> = ({
  username,
  setUsername,
  inputActive,
}) => {
  const { userData } = useUserData();
  const { publicKey } = useWallet();
  const handleUsername = (value: string) => {
    console.log("username", userData.username);
    setUsername(value);
  };
  useEffect(() => {
    if (userData.username === "" && publicKey) {
      setUsername(publicKey.toBase58());
    }
    // eslint-disable-next-line
  }, [userData]);
  return (
    <div className="mt-7 mb-8">
      <p className="text-white font-medium">Display name</p>
      <div className="mt-2 relative overflow-hidden group">
        <button
          className={`absolute right-3 top-3 ${!username ? "hidden" : "show"}`}
          onClick={() => setUsername("")}
        >
          <InputCloseIcon />
        </button>
        {publicKey && (
          <input
            id="username"
            className="p-3 w-full bg-[#00000000] text-[#ffffff] outline-none focus:text-white placeholder:text-white"
            value={username}
            // placeholder={publicKey.toBase58()}
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
            className={`group-hover:bg-[#00F2FF] h-0.5 w-[calc(100%-12px)] absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } top-0 left-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-0.5 w-[calc(100%-12px)] absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } bottom-0 left-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-9 w-0.5 absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } left-0 top-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-9 w-0.5 absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } right-0 top-1.5`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } left-0.5 -top-0.5 rotate-45`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } right-0.5 -top-0.5 -rotate-45`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } left-0.5 -bottom-0.5 -rotate-45`}
          />
          <div
            className={`group-hover:bg-[#00F2FF] h-3 w-0.5 absolute bg-primary-200 ${
              inputActive ? "bg-[#00F2FF]" : ""
            } right-0.5 -bottom-0.5 rotate-45`}
          />
        </label>
      </div>
    </div>
  );
};

export default DisplayNamebox;
