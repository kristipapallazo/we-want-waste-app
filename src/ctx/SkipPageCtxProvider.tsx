import { createContext, useState, ReactNode, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchSkips } from "../hooks/useFetchSkips";

const initialSize: Sizes = ["25%", "75%"];
const initialLayout: Layout = "grid";
const initialFilters: Filters = {
  size: null,
  price: [0, 1000],
  postcode: "",
  allowed_on_road: false,
  allowes_heavy_waste: false,
};

interface DefaultValue {
  layout: Layout;
  setLayout: SetStateFn<Layout>;
  sizes: Sizes;
  setSizes: SetStateFn<Sizes>;
  onResetSplitter: () => void;
  filteredSkips: Skips;
  setFilteredSkips: SetStateFn<Skips>;
  selectedSkip: SelectedSkip;
  setSelectedSkip: SetStateFn<SelectedSkip>;
  enabled: boolean;
  setEnabled: SetStateFn<boolean>;
  isMobile: boolean;
  setIsMobile: SetStateFn<boolean>;
  search: string;
  setSearch: SetStateFn<string>;
  filters: Filters;
  setFilters: SetStateFn<Filters>;
  onResetFilters: () => void;
  // skips: Skips | undefined;
  isLoading: boolean;
  error: unknown;
}
// const defaultValue: DefaaultValue = {
//   layout: initialLayout,
//   setLayout: () => {},
//   sizes: initialSize,
//   setSizes: () => {},
//   onResetSplitter: () => {},
//   filteredSkips: [],
//   setFilteredSkips: () => {},
//   selectedSkip: null,
//   setSelectedSkip: () => {},
//   enabled: true,
//   setEnabled: () => {},
//   isMobile: true,
//   setIsMobile: () => {},
//   search: "",
//   setSearch: () => {},
//   filters: initialFilters,
//   setFilters: () => {},
//   onResetFilters: () => {},
// };

export const SkipPageCtx = createContext<DefaultValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const SkipPageCtxProvider: React.FC<Props> = ({ children }) => {
  const [sizes, setSizes] = useState<Sizes>(initialSize);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [layout, setLayout] = useState<Layout>(initialLayout);
  const [selectedSkip, setSelectedSkip] = useState<SelectedSkip>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [filteredSkips, setFilteredSkips] = useState<Skips>([]);
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>(initialFilters);

  const onResetSplitter = () => {
    setSizes(initialSize);
  };

  const onResetFilters = () => {
    setFilters(initialFilters);
  };

  const {
    data: skips,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["skips", search],
    queryFn: () => fetchSkips(),
    enabled: true,
    staleTime: 5 * 60 * 1000,
  });

  console.log("data: skips, isLoading, error,", skips, isLoading, error);

  useEffect(() => {
    if (!skips) return;
    let filtered = [...(skips as Skips)];
    // let filtered = filteredSkips;

    /* filter by search  */
    if (!!search.toLocaleLowerCase().length) {
      filtered = filtered.filter((skip) => {
        const { size } = skip;
        const name = `${size} Skip`;

        return name.toLowerCase().trim().includes(search.toLocaleLowerCase());
      });
    } else {
      filtered = [...skips];
    }

    if (filters.size)
      filtered = filtered.filter((s) => s.size === filters.size);

    if (filters.price)
      filtered = filtered.filter(
        (s) =>
          s.price_before_vat >= filters.price[0] &&
          s.price_before_vat <= filters.price[1]
      );

    if (filters.postcode)
      filtered = filtered.filter((s) => s.postcode.includes(filters.postcode));

    if (filters.allowed_on_road)
      filtered = filtered.filter(
        (s) => s.allowed_on_road === filters.allowed_on_road
      );

    if (filters.allowes_heavy_waste)
      filtered = filtered.filter(
        (s) => s.allows_heavy_waste === filters.allowes_heavy_waste
      );

    setFilteredSkips(filtered);
  }, [search, filters]);

  useEffect(() => {
    setFilteredSkips(skips || []);
  }, [skips]);

  const val: DefaultValue = {
    layout,
    setLayout,
    sizes,
    setSizes,
    onResetSplitter,
    enabled,
    setEnabled,
    selectedSkip,
    setSelectedSkip,
    isMobile,
    setIsMobile,
    filteredSkips,
    setFilteredSkips,
    search,
    setSearch,
    filters,
    setFilters,
    onResetFilters,
    isLoading,
    error,
  };

  return <SkipPageCtx.Provider value={val}>{children}</SkipPageCtx.Provider>;
};

export default SkipPageCtxProvider;
