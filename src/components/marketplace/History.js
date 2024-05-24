import React, { useEffect, useState } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import Header from "./Header";
import useHistory from "../../hooks/marketplace/useHistory";

const History = () => {
  const [historyData, setHistoryData] = useState(null);
  const { findAllHistory } = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const itemList = await findAllHistory();
      setHistoryData(itemList);
    };
    console.log(historyData);
    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {historyData != null && (
        <List>
          {historyData.map((history, index) => (
            <ListItem key={index}>
              <ListItemAvatar sx={{ marginRight: 4 }}></ListItemAvatar>
              <ListItemText
                primary={
                  history.type === "buy"
                    ? `Type: Sell     Buyer: ${history.buyer}`
                    : `Type: Buy     Seller: ${history.seller}`
                }
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Item Name: {history.itemName}
                    </Typography>
                    <br />
                    {`Price: $${history.totalPrice}`}
                    <br />
                    {`Quantity: ${history.quantity}`}
                    <br />
                    {`Time: ${history.time}`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default History;
