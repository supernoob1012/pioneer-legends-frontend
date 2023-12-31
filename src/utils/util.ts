
export const getNftDetail = async (uri: string) => {
  try {
    // const response = await axios.get(uri);
    const response = (await Promise.race([
        fetch(uri, { method: 'GET' }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 3000)),
    ])) as Response;
    
    if (response.status === 200) {
      return response.json();
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
