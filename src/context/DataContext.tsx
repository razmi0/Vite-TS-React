import { useState, useEffect, createContext } from "react";
import { DataType, Fams, Pokemon } from "../types";
import { prepareData } from "../utils";

type Loading = "idle" | "loading" | "loaded" | "error";
type Error = string;
type Refetch = boolean;

export interface DataContextType {
  loading: Loading;
  error: Error;
  refetch: Refetch;
  setRefetch: React.Dispatch<React.SetStateAction<Refetch>>;
  data: DataType[];
  fams: Fams[];
  rawLth: number;
}

interface DataProviderProps {
  children: React.ReactNode;
}

const url = "http://localhost:4444/pokemons";

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [loading, setLoading] = useState<Loading>("idle");
  const [error, setError] = useState<Error>("");
  const [refetch, setRefetch] = useState<Refetch>(true);
  const [data, setData] = useState<DataType[]>([]);
  const [rawData, setRawData] = useState<Pokemon[]>([]);
  const [rawLth, setRawLth] = useState<number>(0);
  const [fams, setFams] = useState<Fams[]>([]);

  useEffect(() => {
    if (refetch) {
      setRefetch(false);
      setLoading("loading");
      const fetching = async () => {
        try {
          const response = await fetch(url);
          const raw = await response.json();
          setRawData(raw);
        } catch (error: any) {
          setError(error.message);
          setLoading("error");
        }
      };
      fetching();
      if (loading === "error") {
        setTimeout(() => {
          setLoading("loading");
          setRefetch(true);
        }, 3000);
      }
    }
  }, [refetch, loading]);

  useEffect(() => {
    if (rawData.length === 0) return;
    setRawLth(rawData.length);
    setFams([...new Set(rawData.flatMap((item) => item.type))] as Fams[]);
    setData(prepareData(rawData));
    setError("");
    setLoading("loaded");
  }, [rawData]);

  return (
    <DataContext.Provider
      value={{ loading, error, refetch, setRefetch, data, rawLth, fams }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
