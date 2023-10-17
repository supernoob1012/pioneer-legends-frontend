import axios from "axios";
import { web3 } from "@project-serum/anchor";
import { NETWORK } from "../config";

export const solConnection = new web3.Connection(web3.clusterApiUrl(NETWORK));

export const getNftDetail = async (uri: string) => {
  try {
    const response = await axios.get(uri);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(
        `Failed to fetch NFT detail. Status code: ${response.status}`
      );
    }
  } catch (error) {
    // Handle any errors that might occur during the HTTP request
    console.log("fetch nft detail error: ", error);
    return null
  }
};

export const getShortAddress = (address: string) => {
  const prefix = address.slice(0, 5);
  const suffix = address.slice(-5);
  return `${prefix}...${suffix}`;
};
