import { useContext } from "react";
import { ImageContext } from "../contexts/ImageContext";

export const useImage = () => useContext(ImageContext)
