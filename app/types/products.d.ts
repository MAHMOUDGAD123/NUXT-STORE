interface Item {
  id: string;
  title: string;
  shortName: string;
  description: string;
  price: number;
  discount: number; // Percentage as a number (e.g., 10 for 10%) or distinct amount
  stockCount: number;
  specs: Record<string, string | number | boolean>;
  category: string;
}

interface Products {
  list: Item[];
  itemCount: number; // Should be 50
  totalStockCount: number; // Sum of all item.stockCount
  categories: Category[];
}

type Category =
  | 'Laptops'
  | 'PC'
  | 'Components'
  | 'Storage'
  | 'Smartphones'
  | 'Accessories'
  | 'Tablets'
  | 'TVs'
  | 'Monitors'
  | 'Headphones'
  | 'AirPods'
  | 'Cameras'
  | 'Speakers';
