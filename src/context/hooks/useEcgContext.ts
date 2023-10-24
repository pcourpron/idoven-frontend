import { useContext } from "react";
import { EcgContext } from "../EcgContext/EcgContext";

export const useEcgContext = () => {
  const context = useContext(EcgContext);
  if (!context) {
    throw new Error("useEcgContext must be used within a EcgContextProvider");
  }
  return context;
};
