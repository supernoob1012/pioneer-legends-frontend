import React, {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import { NftItem, User } from "../utils/type";
import { useWallet } from "@solana/wallet-adapter-react";
import { getNft } from "../utils/api";
import { getParsedNftAccountsByOwner } from "@nfteyez/sol-rayz";
import { solConnection } from "../solana/util";
import { BACKEND_URL, CREATOR_ADDRESS } from "../config";
import { getNftDetail } from "../utils/util";
import axios from "axios";

export interface UserContextProps {
  allNftList: NftItem[];
  setAllNftList: Function;
  isDataLoading: boolean;
  setIsDataLoading: Function;
  getNfts: Function;
  userData: User;
  setUserData: Function;
  getUserData: Function;
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
};

export const UserContext = createContext<UserContextProps>(defaultContext);

export const useUserData = (): {
  userData: UserContextProps["userData"];
  getUserData: UserContextProps["getUserData"];
  isDataLoading: boolean;
  setIsDataLoading: Function;
} => {
  const { userData, getUserData, isDataLoading, setIsDataLoading } =
    useContext(UserContext);
  return { userData, getUserData, isDataLoading, setIsDataLoading };
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [allNftList, setAllNftList] = useState<NftItem[]>([]);
  const [userData, setUserData] = useState<User>(defaultContext.userData);

  const wallet = useWallet();

  const getNfts = async (once?: boolean) => {
    if (wallet.publicKey === null) return [];
    setIsDataLoading(true);
    const stakedData = await getNft(wallet.publicKey.toBase58());

    const nftList = await getParsedNftAccountsByOwner({
      publicAddress: wallet.publicKey.toBase58(),
      connection: solConnection,
    });

    const nfts = new Array(nftList.length); // Initialize with a reasonable capacity

    await Promise.all(
      nftList.map(async (item, index) => {
        if (
          item.data.creators[0]?.verified === 1 &&
          item.data.creators[0]?.address === CREATOR_ADDRESS
        ) {
          const data = await getNftDetail(item.data.uri);
          if (data) {
            const stakedNft = stakedData.find(
              nft =>
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
            };
          }
        }
      })
    );
    setAllNftList(nfts.filter(Boolean));
    
    if (once) {
      setIsDataLoading(false);
    }
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

  useEffect(() => {
    getUserData();
    getNfts();
  }, [wallet.publicKey, wallet.connected]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
