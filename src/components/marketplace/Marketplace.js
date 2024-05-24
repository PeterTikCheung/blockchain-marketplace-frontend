import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Typography,
  CardMedia,
  TextField,
} from "@mui/material";
import Header from "./Header";
import useMarketplace from "../../hooks/marketplace/useMarketplace";

export default function Marketplace() {
  const [items, setItems] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const { findAllItems, purchaceItem } = useMarketplace();

  useEffect(() => {
    const fetchData = async () => {
      const itemList = await findAllItems();
      setItems(itemList);
    };
    console.log(items);
    fetchData();
  }, []);

  const handleBuy = (item) => {
    purchaceItem(item.uuid, selectedQuantity, item.sellerAddress, item.price)
  };

  return (
    <div>
      <Header />
      {items != null && (
        <Grid container spacing={2} sx={{ padding: 2 }}>
          {items.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  src={`data:image/jpg;base64, ${item.image}`}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="subtitle1">
                    Price: ${item.price} ETH
                  </Typography>
                  <Typography variant="subtitle2">
                    Remaining Quantity: {item.remainingQuantity}
                  </Typography>
                  <TextField
                    id="outlined-number"
                    label="Number"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={selectedQuantity}
                    onChange={(event) => {
                      setSelectedQuantity(event.target.value);
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={() => handleBuy(item)}>
                    Buy
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}
