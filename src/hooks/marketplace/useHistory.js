import { useSelector } from "react-redux";
import tradeRecordContract from "../../utils/TradeRecordAbi.json"; // Import your smart contract API functions
import { TRADE_RECORD_CONTRACT_ADDRESS } from "../../config";
import { ethers } from "ethers";

const useHistory = () => {
  const account = useSelector((state) => state.metamask.accountData);
  const address = account.address;

  const findAllHistory = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "sepolia")
    const contract = new ethers.Contract(
        TRADE_RECORD_CONTRACT_ADDRESS,
        tradeRecordContract.abi,
        provider
    );

    const buySideFromBlockchain = await contract.getTransactionByBuyer(address);
    console.log(buySideFromBlockchain)
    const buyItemList = buySideFromBlockchain.map((item) => {
        const timestamp = new Date(item.timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        const formattedTime = timestamp.toLocaleString(); // Convert the timestamp to a localized string representation
        return {
            type: 'sell',
            seller: item.buyer,
            itemName: item.name,
            totalPrice: (item.price* item.quantity)/(10**18),
            quantity: item.quantity,
            time: formattedTime
        }
    })

    const sellSideFromBlockchain = await contract.getTransactionBySeller(address)
    console.log(sellSideFromBlockchain)
    const sellerItemList = sellSideFromBlockchain.map((item) => {
        const timestamp = new Date(item.timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds
        const formattedTime = timestamp.toLocaleString(); // Convert the timestamp to a localized string representation
        return {
            type: 'buy',
            buyer: item.seller,
            itemName: item.name,
            totalPrice: (item.price* item.quantity)/(10**18),
            quantity: item.quantity,
            time: formattedTime
        }
    })
    const combinedList = buyItemList.concat(sellerItemList);
    return combinedList;
  }


  return { findAllHistory };
};

export default useHistory;
