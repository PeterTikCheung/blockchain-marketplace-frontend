import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";
import { REACT_APP_BACKEND_ENDPOINT_URL } from "../../config";
import backendApiUrls from "../../utils/backendApiPaths";
import { useDispatch } from "react-redux";
import { setUsername, setUserUuid } from "../../redux/slices/userSlice";
const useLogin = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [jwt, setJwt] = useState("");
  const dispatch = useDispatch();

  const login = async (username, password) => {
    try {
      const apiUrl = REACT_APP_BACKEND_ENDPOINT_URL + backendApiUrls.LoginApi;
      // Call your API endpoint to authenticate the user and get the JWT token
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming your API response has a property named 'jwt' containing the JWT token
        setJwt(token);
        setIsSuccess(true);

        // Store the JWT token in a cookie
        Cookies.set("jwt", token, { expires: 7 }); // Set the cookie to expire in 7 days

        // Decode the JWT token
        const decodedToken = jwtDecode(token);
        console.log("Decoded JWT:", decodedToken);
        // Extract username and user UUID from the decoded token
        const { username, userUuid } = decodedToken;
        dispatch(setUsername(username));
        console.log(userUuid);
        dispatch(setUserUuid(userUuid));
        return Promise.resolve(); // Resolve the Promise when registration is successful
      } else {
        // Handle authentication error
        console.error("Authentication error:", response.status);
        return Promise.reject(); // Reject the Promise when registration fails
      }
    } catch (error) {
      // Handle network or API errors
      console.error("Error:", error);
      return Promise.reject(); // Reject the Promise when registration fails
    }
  };

  return { isSuccess, jwt, login };
};

export default useLogin;
