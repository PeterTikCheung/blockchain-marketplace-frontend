import { useState } from "react";
import { ethers } from "ethers";

function useMetamask() {
  const [isConnected, setIsConnected] = useState(false);
  const [accountData, setAccountData] = useState({
    address: "",
    Balance: null,
  });

  const getBalance = (account) => {
    // Requesting balance method
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [account, "latest"],
      })
      .then((balance) => {
        // Setting balance
        setAccountData({
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };

  const accountChangeHandler = (account) => {
    setAccountData({
      address: account,
    });

    getBalance(account);
  };

  const connectionHandler = () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      // Request account access from MetaMask
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          // User approved account access
          setIsConnected(true);
          accountChangeHandler(accounts[0]);
        })
        .catch((error) => {
          // User denied account access or MetaMask not available
          console.error(error);
          setIsConnected(false);
          setAccountData(null);
        });
    } else {
      // MetaMask not available
      setIsConnected(false);
      setAccountData(null);
      alert("install metamask extension!!");
    }
  }

  return { connectionHandler, isConnected, accountData };
}

export default useMetamask;
