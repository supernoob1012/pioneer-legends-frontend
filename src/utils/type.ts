export interface NftItem {
  mint: string;
  name: string;
  description: string;
  staked: boolean;
  image: string;
  user: string;
  startTime: string;
  uri: string;
}

export interface User {
  username: string;
  wallet: string;
  image: string;
}
