import ProductGrid from "../ProductGrid/ProductGrid";

import styles from "./AllSkips.module.css";

const AllSkips = () => {
  return (
    <div className={styles.all_skips}>
      <div>
        <ProductGrid />
      </div>
      <div>filters</div>
    </div>
  );
};

export default AllSkips;
