import { skipHydrate } from 'pinia';

export const useProductStore = defineStore('products', () => {
  const defaultProducts: Products = {
    list: [],
    itemCount: 0,
    totalStockCount: 0,
    categories: [],
  };
  const _data = skipHydrate(useSessionStorage<Products>('__nuxt_store_data__', defaultProducts));

  const loadData = async () => {
    if (_data.value.itemCount === 0) {
      const jsonData = await import('~/assets/db/products.json');
      _data.value = jsonData.default as Products;
    }
  };

  const getItemById = (id: string) => {
    return _data.value.list.find((product) => product.id === id);
  };

  return {
    products: _data,
    loadData,
    getItemById,
  };
});
