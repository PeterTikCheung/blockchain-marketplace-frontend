import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import ComponentUrls from "../../utils/componentPaths";
import {useSelector} from 'react-redux';

function Header() {
  const accountData = useSelector((state)=> state.metamask.accountData)
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" sx = {{fontWeight: "bold", fontSize: 24}}>Marketplace</Typography>
          <Link
            to={ComponentUrls.Marketplace}
            variant="h6"
            style = {{marginLeft : 10, fontWeight: "bold", fontSize: 24}}
          >
            Buy
          </Link>
          <Link to={ComponentUrls.ListItem} variant="h6" style = {{marginLeft : 10, fontWeight: "bold", fontSize: 24}}>
            Sell
          </Link>
          <Link to={ComponentUrls.History} variant="h6" style = {{marginLeft : 10, fontWeight: "bold", fontSize: 24}}>
            History
          </Link>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <IconButton color="inherit">
            <Avatar>
              <AccountCircle />
            </Avatar>
          </IconButton>
          <Typography variant="subtitle1" sx={{ marginRight: 2 }}>
            Balance: ${accountData.balance} ETH
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
