import { ethers } from "ethers";
import { useDispatch } from "react-redux";
import {
  setIsConnectedState,
  setAccountDataState,
} from "../../redux/slices/metamaskSlice";
import { REACT_APP_SEPOLIA_ENDPOINT_URL } from "../../config";

function useMetamask() {
  const dispatch = useDispatch();

  const getBalance = (account) => {
   // Creating the provider for Sepolia network
   const provider = new ethers.providers.JsonRpcProvider(REACT_APP_SEPOLIA_ENDPOINT_URL);

   // Requesting balance from Sepolia network
   provider.getBalance(account).then((balanceData) => {
     dispatch(
       setAccountDataState({
         address: account,
         balance: ethers.utils.formatEther(balanceData),
       })
     );
   });
  };

  const accountChangeHandler = (account) => {
    getBalance(account);
  };

  const connectionHandler = () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      // Request account access from MetaMask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          dispatch(setIsConnectedState(true));
          accountChangeHandler(accounts[0]);
        })
        .catch((error) => {
          // User denied account access or MetaMask not available
          console.error(error);
          dispatch(setIsConnectedState(false));
        });
    } else {
      // MetaMask not available
      dispatch(setIsConnectedState(false));
      alert("install metamask extension!!");
    }
  };

  return { connectionHandler };
}

export default useMetamask;
