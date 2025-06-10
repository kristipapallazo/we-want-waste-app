import { useSkipPageCtx } from "../../hooks/useSkipCtx";
import ProductCard from "./ProductCard/ProductCard";
import ProductCard1 from "./ProductCard/ProductCard1";

import styles from "./ProductGrid.module.css";

const ProductGrid: React.FC = () => {
  const { skips } = useSkipPageCtx();

  const items = skips?.map((skip) => (
    <ProductCard1 key={skip.id} skip={skip} />
  ));
  // const items = skips?.map((skip) => <ProductCard key={skip.id} skip={skip} />);

  return <div className={styles.grid}>{items}</div>;
};

export default ProductGrid;
