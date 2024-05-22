import { useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BACKEND_ENDPOINT_URL } from "../../config";
import backendApiUrls from "../../utils/backendApiPaths";
import Cookies from "js-cookie";
import marketplaceContract from "../../utils/MarketplaceAbi.json"; // Import your smart contract API functions
import { MARKET_PLACE_CONTRACT_ADDRESS } from "../../config";
import { ethers } from "ethers";

const useListItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userUuid = useSelector((state) => state.user.userUuid);
  const metamask = useSelector((state) => state.metamask.accountData);

  const addItemToDb = async (uuid, productImage, name) => {
    try {
      const apiUrl =
        REACT_APP_BACKEND_ENDPOINT_URL + backendApiUrls.ListItemApi;
      const token = Cookies.get("jwt");

      // Call your API endpoint to authenticate the user and get the JWT token
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          uuid,
          productImage,
          name,
          user: {
            uuid: userUuid,
          },
        }),
      });
    } catch (error) {
      // Handle network or API errors
      console.error("Error:", error);
      return Promise.reject(); // Reject the Promise when registration fails
    }
  };

  const addItemToBlockchain = async (metaUuid, name, price, quantity) => {
    try {
      const userAddress = metamask.address;
      const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia")

      // Send the signed transaction to the blockchain
      const contract = new ethers.Contract(
        MARKET_PLACE_CONTRACT_ADDRESS,
        marketplaceContract.abi,
        provider.getSigner(0)
      );
      const tx = await contract.addProduct(
        metaUuid,
        name,
        price,
        quantity,
        userUuid
      );
      console.log(tx);
    } catch (error) {
      // Handle blockchain transaction errors
      console.error("Error:", error);
      return Promise.reject();
    }
  };

  return { isLoading, addItemToBlockchain, addItemToDb };
};

export default useListItem;
