import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CardMedia,
  TextField
} from "@mui/material";
import Header from "./Header";

const initialItems = [
  {
    id: 1,
    name: "Item 1",
    price: 10,
    image: "item1.jpg",
    remainingQuantity: 5,
  },
  {
    id: 2,
    name: "Item 2",
    price: 20,
    image: "item2.jpg",
    remainingQuantity: 10,
  },
  {
    id: 3,
    name: "Item 3",
    price: 30,
    image: "item3.jpg",
    remainingQuantity: 3,
  },
];

export default function Marketplace() {
  const [items, setItems] = useState(initialItems);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const handleBuy = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleConfirmBuy = () => {
    // Perform buy logic here
    setOpenDialog(false);
  };

  return (
    <div>
      <Header balance={100} />

      <Grid container spacing={2} sx={{ padding: 2 }}>
        {items.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="subtitle1">
                  Price: ${item.price}
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
                  value = {selectedQuantity}
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Purchase</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to buy {selectedItem?.name} for $
            {selectedItem?.price}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleConfirmBuy} color="primary" autoFocus>
            Buy
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}