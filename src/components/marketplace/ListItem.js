import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Typography,
  Dialog,
  DialogContent,
  Box,
} from "@mui/material";
import Header from "./Header";

export default function ListItem() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [itemQuantity, setItemQuantity] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddItem = () => {
    const newItem = {
      id: items.length + 1,
      name: itemName,
      price: parseFloat(itemPrice),
      image: itemImage,
      remainingQuantity: parseInt(itemQuantity),
    };
    setItems([...items, newItem]);
    setItemName("");
    setItemPrice("");
    setItemImage(null);
    setItemQuantity("");
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result.split(",")[1];
        setItemImage(base64Image);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Header balance={100} />

      <Grid container spacing={2} sx={{ padding: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Add Item</Typography>
              {itemImage && (
                <img
                  src={`data:image/jpeg;base64,${itemImage}`}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    objectFit: "contain",
                  }}
                  alt="Selected Item"
                />
              )}
              <TextField
                label="Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Price"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Quantity"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                type="number"
                fullWidth
                margin="normal"
              />
              <Box>
                <Typography>Item Image</Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <Button
                  variant="contained"
                  onClick={handleAddItem}
                  sx={{ marginLeft: 2 }}
                >
                  Add
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
