// vite-env.d.ts or globals.d.ts
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}
// declare module "*.module.css" {
//   const classes: { [key: string]: string };
//   export default classes;
// }

declare module "*.svg" {
  const src: string;
  export default src;
}
declare module "*.webp" {
  const src: string;
  export default src;
}

type SetStateFn<D> = React.Dispatch<React.SetStateAction<D>>;

/* Data Models */

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost?: null | number;
  per_tonne_cost?: null | number;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: strin;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}
type Skips = Skip[];

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
}

type Products = Product[];

type Layout = "grid" | "table";

type SelectedSkip = Skip | null;
type Sizes = (string | number)[];

interface Filters {
  size: null | Skip["size"];
  price: number[];
  postcode: Skip["postcode"];
  allowed_on_road: Skip["allowed_on_road"];
  allowes_heavy_waste: Skip["allows_heavy_waste"];
}
