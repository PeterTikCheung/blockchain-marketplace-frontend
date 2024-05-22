import { useState } from "react";
import { useSelector } from "react-redux";
import { REACT_APP_BACKEND_ENDPOINT_URL } from "../../config";
import backendApiUrls from "../../utils/backendApiPaths";
import Cookies from 'js-cookie';
import marketplaceContract from "../../utils/MarketplaceAbi.json"; // Import your smart contract API functions

const useListItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const userUuid = useSelector((state) => state.user.userUuid);
  console.log(userUuid);

  const addItemToDb = async (uuid, productImage, name) => {
    try {
      const apiUrl =
        REACT_APP_BACKEND_ENDPOINT_URL + backendApiUrls.ListItemApi;
      const token = Cookies.get('jwt');

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

  // const addItemToBlockchain = async (
  //   metaUuid,
  //   name,
  //   price,
  //   quantity,
  //   sellerUuid
  // ) => {
  //   try {
  //     setIsLoading(true);
  //     // Call your smart contract function to add a new product
  //     await addProduct(metaUuid, name, price, quantity, sellerUuid);

  //     // Dispatch any necessary actions or update local state as needed
  //     // For example, you can dispatch an action to update the list of items in Redux
  //     // dispatch(updateItems(newItem));

  //     setIsLoading(false);
  //     return Promise.resolve(); // Resolve the Promise when the item is added successfully
  //   } catch (error) {
  //     // Handle errors
  //     console.error("Error:", error);
  //     setIsLoading(false);
  //     return Promise.reject(); // Reject the Promise when an error occurs
  //   }
  // };

  return { isLoading, addItemToDb };
};

export default useListItem;
