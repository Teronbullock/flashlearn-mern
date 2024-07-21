import { useContext } from "react";
import { AuthContext } from "../AuthContext";

/**
 * -- Custom hook to use the AuthContext --
 * @returns The AuthContext object
 */ 
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if(context === undefined) { 
    throw new Error('useAuthContext must be used within an AuthContextProvider');
  }
  return context;
}