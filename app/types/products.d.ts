interface Product {
  id: string;
  title: string;
  shortName: string;
  description: string;
  price: number;
  discount: number; // Percentage as a number (e.g., 10 for 10%) or distinct amount
  stockCount: number;
  specs: Record<string, string>;
  category: Category;
}

interface ProductWithMetaData extends Product {
  inCart: boolean;
  inWishlist: boolean;
}

interface ProductsStore {
  list: ProductWithMetaData[];
  itemCount: number; // Should be 50
  totalStockCount: number; // Sum of all item.stockCount
  categories: Category[];
}

type Category =
  | 'laptops'
  | 'pc'
  | 'components'
  | 'storage'
  | 'smartphones'
  | 'accessories'
  | 'tablets'
  | 'tvs'
  | 'monitors'
  | 'headphones'
  | 'airpods'
  | 'cameras'
  | 'speakers';

type FilterCategory = Category | 'all';
