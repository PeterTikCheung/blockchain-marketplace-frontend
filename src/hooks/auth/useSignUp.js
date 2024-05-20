import { useState } from "react";
import { REACT_APP_BACKEND_ENDPOINT_URL } from "../../config";
import backendApiUrls from "../../utils/backendApiPaths";
const useSignUp = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const registration = async (username, password) => {
    try {
      const apiUrl = REACT_APP_BACKEND_ENDPOINT_URL + backendApiUrls.SignUpApi;
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
        setIsSuccess(true);
        return Promise.resolve(); // Resolve the Promise when registration is successful
      } else {
        // Handle authentication error
        console.error("Registration error:", response.status);
        return Promise.reject(); // Reject the Promise when registration fails
      }
    } catch (error) {
      // Handle network or API errors
      console.error("Error:", error);
      return Promise.reject(); // Reject the Promise when registration fails
    }
  };

  return { isSuccess, registration };
};

export default useSignUp;
