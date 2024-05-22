import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMetamask from "../../hooks/metamask/useMetamask";
import ComponentUrls from "../../utils/componentPaths";
import { useSelector } from "react-redux";
import useLogin from "../../hooks/auth/useLogin";
import { useEffect } from "react";

const defaultTheme = createTheme();

export default function Login() {
  const { connectionHandler } = useMetamask();
  const { isSuccess, login } = useLogin();
  const isConnected = useSelector((state) => state.metamask.isConnected);
  const navigate = useNavigate();

  const onMetamaskButtonClick = () => {
    connectionHandler();
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(ComponentUrls.Marketplace);
    }
  }, [isSuccess, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    await login(username, password);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {isConnected && (
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="username"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Link to={ComponentUrls.SignUp} variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          )}

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onMetamaskButtonClick}
              disabled={isConnected}
            >
              Connect with MetaMask
            </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
