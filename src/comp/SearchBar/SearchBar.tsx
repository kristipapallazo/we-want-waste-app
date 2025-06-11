// import { SearchProps } from "antd/es/input";
// import { useSkipPageCtx } from "../../hooks/useSkipCtx";
// import MainSearch from "../../UI/AntD/MainSearch";
import BreadcrumbSteps from "../BreadcrumbSteps/BreadcrumbSteps";
import SegmentedLayout from "../SegmentLayout/SegmentedLayout";

import styles from "./SearchBar.module.css";

const SearchBar: React.FC = () => {
  // const onChange: SearchProps["onChange"] = (value) => {
  //   setSearch(value.target.value);
  // };

  return (
    <div className={styles.cont}>
      {/* <MainSearch value={search} onChange={onChange} /> */}
      <BreadcrumbSteps />

      <SegmentedLayout />
    </div>
  );
};

export default SearchBar;
