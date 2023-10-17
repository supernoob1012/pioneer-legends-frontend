import axios from "axios";
import { BACKEND_URL } from "../config";
import { errorAlert, successAlert } from "../components/ToastGroup";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

interface StakedItem {
  faction: string;
  image: string;
  mint: string;
  startTime: string;
  uri: string;
  user: string;
}

export const stake = async (
  stakeTx: string,
  wallet: string,
  setLoading: Function,
  getNfts: Function
) => {
  try {
    setLoading(true);
    const res = await axios.post(`${BACKEND_URL}/stake/lock`, {
      encodedTx: stakeTx,
      user: wallet,
    });
    await getNfts();
    successAlert("Stake successful!");
    return res.data;
  } catch (err) {
    console.log(err);
    errorAlert("Something went wrong. Please try again");
  } finally {
    setLoading(false);
  }
};

export const unStake = async (
  stakeTx: string,
  wallet: string,
  setLoading: Function,
  getNfts: Function
) => {
  try {
    setLoading(true);
    const res = await axios.post(`${BACKEND_URL}/stake/unlock`, {
      encodedTx: stakeTx,
      user: wallet,
    });

    await getNfts();
    successAlert("Unstake successful!");
    return res.data;
  } catch (err) {
    console.log(err);
    errorAlert("Something went wrong. Please try again");
  } finally {
    setLoading(false);
  }
};

export const getNft = async (wallet: string) => {
  const nfts: StakedItem[] = [];
  try {
    const res = await axios.get(`${BACKEND_URL}/stake/findByWallet/${wallet}`);
    if (res.data) {
      res.data.map((item: any) => {
        nfts.push({
          faction: item.faction,
          image: item.imgUrl,
          mint: item.mintAddr,
          startTime: item.startTime,
          uri: item.uri,
          user: item.user,
        });
      });
    }
    return nfts;
  } catch (err) {
    return nfts;
  }
};

export const requestSignature = async (
  wallet: WalletContextState,
  message: string
) => {
  if (wallet.signMessage) {
    try {
      const encodedMessage = new TextEncoder().encode(message);
      const verificationSignature = await wallet?.signMessage(encodedMessage);
      return {
        signature: bs58.encode(verificationSignature),
      };
    } catch (e) {
      console.log(e);
      return undefined;
    }
  } else {
    return undefined;
  }
};

export const getNonce = (): number => {
  return Math.floor(new Date().getTime() / 3600000);
};

export const updateProfile = async ({
  name,
  wallet,
  image,
  signature,
}: {
  name: string;
  wallet: string;
  image: string;
  signature: string;
}) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/user/setprofile`, {
      name,
      wallet,
      img: image,
      signature,
    });
    console.log(res);
    successAlert("Profile is updated!");
  } catch (error) {
    console.log("profile update error:", error);
    errorAlert("Something went wrong. Please try again");
  } finally {
    console.log("api finished");
  }
};
