import DataContext from "../context/DataContext";
import { useContext } from "react";

const useData = () => {
  return useContext(DataContext);
};
export default useData;
