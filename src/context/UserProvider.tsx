import React, {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import { NftItem, User } from "../utils/type";
import { useWallet } from "@solana/wallet-adapter-react";
import { authorizeUser, getNft, getNonce } from "../utils/api";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { solConnection } from "../solana/util";
import { BACKEND_URL, CREATOR_ADDRESS } from "../config";
import { getNftDetail } from "../utils/util";
import axios from "axios";
import bs58 from "bs58";
import { useRouter } from "next/router";
import { PublicKey } from "@solana/web3.js";

export interface UserContextProps {
  allNftList: NftItem[];
  setAllNftList: Function;
  isDataLoading: boolean;
  setIsDataLoading: Function;
  getNfts: Function;
  userData: User;
  setUserData: Function;
  getUserData: Function;
  isAuthrized: boolean;
  setIsAuthrized: Function;
  sign: Function;
  isSignning: boolean;
  isNetSpeed: string;
  setIsNetSpeed: Function;
}

const defaultContext: UserContextProps = {
  allNftList: [],
  setAllNftList: () => {},
  isDataLoading: false,
  setIsDataLoading: () => {},
  getNfts: () => {},
  userData: {
    username: "",
    wallet: "",
    image: "",
  },
  setUserData: () => {},
  getUserData: () => {},
  isAuthrized: false,
  setIsAuthrized: () => {},
  sign: () => {},
  isSignning: false,
  isNetSpeed: "",
  setIsNetSpeed: () => {},
};

export const UserContext = createContext<UserContextProps>(defaultContext);

export const useUserData = (): {
  userData: UserContextProps["userData"];
  getUserData: UserContextProps["getUserData"];
  isDataLoading: boolean;
  setIsDataLoading: Function;
  isAuthrized: boolean;
  setIsAuthrized: Function;
  sign: Function;
  isSignning: boolean;
} => {
  const {
    userData,
    getUserData,
    isDataLoading,
    setIsDataLoading,
    isAuthrized,
    setIsAuthrized,
    sign,
    isSignning,
  } = useContext(UserContext);
  return {
    userData,
    getUserData,
    isDataLoading,
    setIsDataLoading,
    isAuthrized,
    setIsAuthrized,
    sign,
    isSignning,
  };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [allNftList, setAllNftList] = useState<NftItem[]>([]);
  const [userData, setUserData] = useState<User>(defaultContext.userData);
  const [isAuthrized, setIsAuthrized] = useState<boolean>(false);
  const [isSignning, setIsSignning] = useState(false);
  const [isNetSpeed, setIsNetSpeed] = useState("");

  const router = useRouter();

  const { signMessage, publicKey, connected } = useWallet();

  const wallet = useWallet();

  const getNfts = async (once?: boolean) => {
    if (wallet.publicKey === null) return [];
    setIsDataLoading(true);
    const stakedData = await getNft(wallet.publicKey.toBase58());

    const nftList = await getParsedNftAccountsByOwner({
      publicAddress: "HgGEWfhLuFukEJpgcc13ZFkstyaq6HF1DmBruwDtbiJV",
      // publicAddress: wallet.publicKey.toBase58(),
      connection: solConnection,
    });

    const nfts = new Array(nftList.length); // Initialize with a reasonable capacity

    await Promise.all(
      nftList.map(async (item, index) => {
        if (
          item.data.creators &&
          item.data.creators[0]?.verified === 1 &&
          item.data.creators[0]?.address === CREATOR_ADDRESS
        ) {
          try {
            const data = await getNftDetail(item.data.uri);

            if (data) {
              const stakedNft = stakedData.find(
                (nft) =>
                  nft.mint === item.mint &&
                  nft.user === wallet.publicKey?.toBase58()
              );
              nfts[index] = {
                name: data.name,
                image: data.image,
                description: data.description,
                staked: stakedNft ? true : false,
                user: wallet.publicKey ? wallet.publicKey.toBase58() : "",
                startTime: stakedNft ? stakedNft.startTime : "",
                mint: item.mint,
                uri: item.data.uri,
                faction: stakedNft?.faction,
              };
            } else {
              throw Error(
                "Could not fetch metadata: " + item.data.uri
              );
            }
          } catch (error) {
            // nfts[index] = undefined;
            console.log(error);
          }
        }
      })
    );
    setAllNftList(nfts.filter(Boolean));
    setIsDataLoading(false);
  };

  const getUserData = async () => {
    setIsDataLoading(true);
    if (wallet.publicKey) {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/user/profile/${wallet.publicKey.toBase58()}`
        );
        console.log("res.data", res.data);
        if (res.data) {
          setUserData({
            wallet: wallet.publicKey.toBase58(),
            username: res.data.name,
            image: res.data.img,
          });
        }
      } catch (error) {
        console.log(error);
        setUserData({
          wallet: wallet.publicKey.toBase58(),
          username: "",
          image: "",
        });
      }
    }
    setIsDataLoading(false);
  };

  const sign = async () => {
    if (!signMessage) return;
    setIsSignning(true);
    try {
      const nonce = await getNonce(publicKey?.toBase58()!);
      if (nonce && connected) {
        const message = new TextEncoder().encode(
          `Authorize your wallet. nonce: ${nonce}`
        );
        const sig = await signMessage(message);

        if (sig) {
          const ret = await authorizeUser(
            publicKey?.toBase58()!,
            bs58.encode(new Uint8Array(sig as unknown as ArrayBuffer)),
            nonce as string
          );

          if (ret) {
            router.push("/map");
            setIsAuthrized(true);
          } else {
            router.push("/");
          }
        }
      }
    } catch (error) {
      console.log("sign error", error);
    } finally {
      setIsSignning(false);
    }
  };

  useEffect(() => {
    if (isAuthrized) {
    }
    getNfts();
    getUserData();
  }, [wallet.publicKey, wallet.connected, isAuthrized]);

  return (
    <UserContext.Provider
      value={{
        isDataLoading,
        setIsDataLoading,
        allNftList,
        setAllNftList,
        getNfts,
        setUserData,
        userData,
        getUserData,
        isAuthrized,
        setIsAuthrized,
        sign,
        isSignning,
        isNetSpeed,
        setIsNetSpeed,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
