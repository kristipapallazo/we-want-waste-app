import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import { GridRef } from "../Layout/Layout";
import ProductCard1 from "./ProductCard/ProductCard1";

import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  gridRef: GridRef;
}

const ProductGrid: React.FC<ProductGridProps> = ({ gridRef }) => {
  const { filteredSkips } = useSkipPageCtx();

  const items = filteredSkips?.map((skip) => (
    <ProductCard1 key={skip.id} skip={skip} gridRef={gridRef} />
  ));

  return <div className={styles.grid}>{items}</div>;
};

export default ProductGrid;
