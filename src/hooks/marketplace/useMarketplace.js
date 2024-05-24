import { useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BACKEND_ENDPOINT_URL } from "../../config";
import backendApiUrls from "../../utils/backendApiPaths";
import marketplaceContract from "../../utils/MarketplaceAbi.json"; // Import your smart contract API functions
import { MARKET_PLACE_CONTRACT_ADDRESS } from "../../config";
import { ethers } from "ethers";
import { Buffer } from 'buffer';

const useMarketplace = () => {
  const userUuid = useSelector((state) => state.user.userUuid);

  const findAllItems = async () => {
    const apiUrl =
        REACT_APP_BACKEND_ENDPOINT_URL + backendApiUrls.findAllItemsApi;
    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
    
    const items = await response.json();

    const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia")
    const contract = new ethers.Contract(
        MARKET_PLACE_CONTRACT_ADDRESS,
        marketplaceContract.abi,
        provider
    );
    
    const itemList = await Promise.all(items.map(async (item) => {
        const result = await contract.getProductByMetaUuid(item.uuid);
        const imageBase64 = Buffer.from(item.productImage).toString();
        return {
            uuid: item.uuid,
            id: item._id,
            name: item.name,
            image: imageBase64,
            price: result.price/(10**18),
            remainingQuantity: result.quantity,
            sellerAddress: result.seller
        }
    }))

    return itemList;
  }

  const purchaceItem = async (metaUuid, quantity, sellerAddress, price) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia")

      // Send the signed transaction to the blockchain
      const contract = new ethers.Contract(
        MARKET_PLACE_CONTRACT_ADDRESS,
        marketplaceContract.abi,
        provider.getSigner(0)
      );

      const weiValue = ethers.utils.parseEther((price*quantity).toString());

      const tx = await contract.purchaseProduct(
        metaUuid,
        quantity,
        userUuid,
        {
          value: weiValue,
        }
      );
    } catch (error) {
      // Handle network or API errors
      console.error("Error:", error);
      return Promise.reject(); // Reject the Promise when registration fails
    }
  };

  return { findAllItems, purchaceItem };
};

export default useMarketplace;
