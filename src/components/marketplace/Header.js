import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

function Header({ balance }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Marketplace
        </Typography>
        <IconButton color="inherit">
          <Avatar>
            <AccountCircle />
          </Avatar>
        </IconButton>
        <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
          Balance: ${balance}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;