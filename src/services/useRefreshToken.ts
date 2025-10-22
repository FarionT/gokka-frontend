import axios from "axios";

const ENV = import.meta.env;
const baseUrl = ENV.VITE_API_URL || "/api/v1";

export const useRefreshToken = () => {
  const refresh = async () => {
    try {
      const tempState = localStorage.getItem("gokka_login");
      if (!tempState) throw new Error("User data not found");

      const loginstate = JSON.parse(tempState);
      const refreshToken = loginstate.refresh;
      if (!refreshToken) throw new Error("Refresh token not found");

      // Fetch new access token
      // Adjust to API requirement
      const res = await axios.post(
        `${baseUrl}/auth/refresh-token`,
        { refresh_token: refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status !== 200) throw new Error("Failed to refresh token");

      const tokens = res.data;
      const newAccessToken = tokens.access.token;
      const newRefreshToken = tokens.refresh.token;
      const newLoginstate = {
        ...loginstate,
        token: newAccessToken,
        refresh: newRefreshToken,
      };

      // Update local storage
      localStorage.setItem("gokka_login", JSON.stringify(newLoginstate));

      // Return new access token
      return newAccessToken;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return refresh;
};
