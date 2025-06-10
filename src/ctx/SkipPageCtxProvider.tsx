import { createContext, useState, ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "../hooks/useFetchSkips";

interface DefaultValue {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  skips: Skips | undefined;
  isLoading: boolean;
  error: unknown;
}

export const SkipPageCtx = createContext<DefaultValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const SkipPageCtxProvider: React.FC<Props> = ({ children }) => {
  const [search, setSearch] = useState<string>("NR32");

  const {
    data: skips,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skips", search],
    queryFn: () => fetchSkips(search),
    enabled: !!search,
    staleTime: 5 * 60 * 1000,
  });

  console.log("data: skips, isLoading, error,", skips, isLoading, error);

  const value: DefaultValue = { search, setSearch, skips, isLoading, error };

  return <SkipPageCtx.Provider value={value}>{children}</SkipPageCtx.Provider>;
};

export default SkipPageCtxProvider;
