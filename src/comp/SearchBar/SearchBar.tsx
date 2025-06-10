import { SearchProps } from "antd/es/input";
import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import MainSearch from "../../UI/AntD/MainSearch";

import styles from "./SearchBar.module.css";

const SearchBar: React.FC = () => {
  const { search, setSearch } = useSkipPageCtx();

  const onSearch: SearchProps["onSearch"] = (value) => setSearch(value);

  return (
    <div className={styles.cont}>
      <MainSearch value={search} onSearch={onSearch} />
      {/* <button className="">
        <span className="">Filter</span>
      </button> */}
    </div>
  );
};

export default SearchBar;
