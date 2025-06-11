import { createContext, useState, ReactNode, useMemo } from "react";
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
  search: string;
  setSearch: SetStateFn<string>;
  filters: Filters;
  setFilters: SetStateFn<Filters>;
  onResetFilters: () => void;
  onEnableSplitter: () => void;
  selectedSkip: SelectedSkip;
  setSelectedSkip: SetStateFn<SelectedSkip>;
  enabled: boolean;
  setEnabled: SetStateFn<boolean>;
  isMobile: boolean;
  setIsMobile: SetStateFn<boolean>;
  isLoading: boolean;
  error: unknown;
  currentIndex: number;
  setCurrentIndex: SetStateFn<number>;
}

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
  const [search, setSearch] = useState<string>("");
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentIndex, setCurrentIndex] = useState<number>(2);

  const onResetSplitter = () => {
    setSizes(initialSize);
    setEnabled(true);
  };
  const onEnableSplitter = () => setEnabled((prev) => !prev);
  const onResetFilters = () => setFilters(initialFilters);

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

  // Memoize filtered skips
  const filteredSkips = useMemo(() => {
    if (!skips) return [];

    const normalizedSearch = search.toLowerCase().trim();

    return skips.filter((skip) => {
      const {
        size,
        price_before_vat,
        postcode,
        allowed_on_road,
        allows_heavy_waste,
      } = skip;

      // Filter by search
      if (normalizedSearch) {
        const name = `${size} Skip`.toLowerCase();
        if (!name.includes(normalizedSearch)) return false;
      }

      // Filter by size
      if (filters.size && size !== filters.size) return false;

      // Filter by price range
      if (
        filters.price &&
        (price_before_vat < filters.price[0] ||
          price_before_vat > filters.price[1])
      )
        return false;

      // Filter by postcode
      if (
        filters.postcode &&
        !postcode
          .toLocaleLowerCase()
          .includes(filters.postcode.toLocaleLowerCase())
      )
        return false;

      // Filter by allowed_on_road
      if (
        filters.allowed_on_road &&
        allowed_on_road !== filters.allowed_on_road
      )
        return false;

      // Filter by allows_heavy_waste
      if (
        filters.allowes_heavy_waste &&
        allows_heavy_waste !== filters.allowes_heavy_waste
      )
        return false;

      return true;
    });
  }, [skips, search, filters]);

  const val: DefaultValue = {
    layout,
    setLayout,
    sizes,
    setSizes,
    onResetSplitter,
    filteredSkips,
    search,
    setSearch,
    filters,
    setFilters,
    onResetFilters,
    selectedSkip,
    setSelectedSkip,
    enabled,
    setEnabled,
    isMobile,
    setIsMobile,
    isLoading,
    error,
    onEnableSplitter,
    currentIndex,
    setCurrentIndex,
  };

  return <SkipPageCtx.Provider value={val}>{children}</SkipPageCtx.Provider>;
};

export default SkipPageCtxProvider;
