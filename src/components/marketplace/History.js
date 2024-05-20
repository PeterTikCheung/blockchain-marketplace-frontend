import React from "react";
import { Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";
import Header from "./Header";

const historyData = [
  {
    type: "buy",
    buyer: "John",
    itemName: "Item 1",
    itemImage: "item1.jpg",
    totalPrice: 10,
    quantity: 5,
    time: "2024-05-19 10:30 AM",
  },
  {
    type: "sell",
    seller: "Jane",
    itemName: "Item 2",
    itemImage: "item2.jpg",
    totalPrice: 15,
    quantity: 3,
    time: "2024-05-19 11:45 AM",
  },
  // Add more history objects as needed
];

const History = () => {
  return (
    <div>
      <Header balance={100} />
      <List>
        {historyData.map((history, index) => (
          <ListItem key={index}>
            <ListItemAvatar sx = {{marginRight: 4}}>
              <Avatar alt={`Item ${index + 1}`} src={history.itemImage} sx={{ width: 100, height: 100 }} />
            </ListItemAvatar>
            <ListItemText
              primary={history.type === "buy" ? `Type: Sell     Buyer: ${history.buyer}` : `Type: Buy     Seller: ${history.seller}`}
              secondary={
                <>
                  <Typography component="span" variant="body2" color="textPrimary">
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
    </div>
  );
};

export default History;