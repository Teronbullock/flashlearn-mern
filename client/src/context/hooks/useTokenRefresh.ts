import { useEffect, useRef, useCallback } from "react";
import apiRequest from "../../lib/api"; // Adjust based on your project structure


const useTokenRefresh = (dispatch, token, userId, logout) => {
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);

  const refreshAuthToken = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: "/api/users/refresh", 
        method: "post",
        src: "useTokenRefresh",
        data: { userId },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 200 && res.data) {
        const { token } = res.data;

        console.log('This is the res.data from custom Hook: ', res.data);

        dispatch({
          type: 'LOGIN',
          payload: {
            // userId: '', 
            token,
            // tokenExpiration: new Date(expiration) ,
          },
        });

      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logout(); 
    }

    console.log("refreshAuthToken called");
  }, [token, dispatch, logout, userId]);


  useEffect(() => {
    if (token) {
      // Set interval to refresh token periodically (every 10min )
      refreshInterval.current = setInterval(refreshAuthToken, 1000 * 60 * 10);
      console.log("setting interval", new Date(new Date().getTime() + 1000 * 60 * 10));
      return () => {
        // Cleanup on unmount or token change
        if (refreshInterval.current) {
          clearInterval(refreshInterval.current);
          console.log("clearing interval");
        }
      };
    }
  }, [token, refreshAuthToken]);
  
  return { refreshAuthToken };
};

export default useTokenRefresh;
