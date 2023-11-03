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
    const res = await axios.post(
      `${BACKEND_URL}/stake/lock`,
      {
        encodedTx: stakeTx,
        user: wallet,
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
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
    const res = await axios.post(
      `${BACKEND_URL}/stake/unlock`,
      {
        encodedTx: stakeTx,
        user: wallet,
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );

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
    const res = await axios.get(`${BACKEND_URL}/stake/findByWallet/${wallet}`, {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    });
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

export const signature = async (signMessage: any, nonce: string) => {
  if (signMessage) {
    const message = new TextEncoder().encode(
      `Authorize your wallet. nonce: ${nonce}`
    );
    const sig = await signMessage(message);
    return sig;
  }
};

export const getNonce = async (wallet: string) => {
  if (wallet) {
    const res = await axios.post(
      `${BACKEND_URL}/nonce/get-nonce`,
      {
        wallet,
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    return res?.data?.nonce;
  }
};

export const authorizeUser = async (
  wallet: string,
  signature: string,
  nonce: string
) => {
  const res = await axios.post(
    `${BACKEND_URL}/user/authorize`,
    {
      wallet: wallet,
      signature: signature,
      nonce: nonce,
    },
    {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
  );

  if (res?.status == 200) return true;
  return false;
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
    const res = await axios.post(
      `${BACKEND_URL}/user/setprofile`,
      {
        name,
        wallet,
        img: image,
        signature,
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    console.log(res);
    successAlert("Profile is updated!");
  } catch (error) {
    console.log("profile update error:", error);
    errorAlert("Something went wrong. Please try again");
  } finally {
    console.log("api finished");
  }
};
