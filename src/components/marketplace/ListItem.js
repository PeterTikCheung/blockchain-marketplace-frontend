import React, { useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import Header from "./Header";
import useListItem from "../../hooks/marketplace/useListItem";

export default function ListItem() {
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemImage, setItemImage] = useState(null);
  const [itemQuantity, setItemQuantity] = useState("");
  const { addItemToDb } = useListItem();

  const handleAddItem = async () => {
    const newItem = {
      name: itemName,
      price: parseFloat(itemPrice),
      image: itemImage,
      remainingQuantity: parseInt(itemQuantity),
    };
    const itemUuid = crypto.randomUUID();
    await addItemToDb(itemUuid, newItem.image, newItem.name)
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
