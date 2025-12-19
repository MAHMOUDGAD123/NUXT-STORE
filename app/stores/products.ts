import { skipHydrate } from 'pinia';

export const useProductsStore = defineStore('products', ({ action }) => {
  const initialValue: ProductsStore = {
    categories: [],
    itemCount: 0,
    list: [],
    totalStockCount: 0,
  };

  const _data = skipHydrate(useSessionStorage<ProductsStore>('__nuxt_store_data__', initialValue));
  let _productIdLookup: Record<string, ProductWithMetaData> = {};

  const loadProducts = async () => {
    if (_data.value.itemCount === 0) {
      const productsRawData = (await import('~/assets/db/products.json')).default;

      // Add meta data to the products list
      const productsWithMetaData = productsRawData.list.map(
        (product) =>
          ({
            ...product,
            inCart: false,
            inWishlist: false,
          }) as ProductWithMetaData,
      );

      _data.value = {
        list: productsWithMetaData,
        categories: productsRawData.categories,
        itemCount: productsRawData.itemCount,
        totalStockCount: productsRawData.totalStockCount,
      } as ProductsStore;
    }

    _buildProductIdlookup();
  };

  const _buildProductIdlookup = action(() => {
    _data.value.list.forEach((product) => {
      _productIdLookup[product.id] = product;
    });
  });

  const getProductById = (id: string): ProductWithMetaData => {
    return _productIdLookup[id];
  };

  return {
    productsData: _data,
    loadProducts,
    getProductById,
  };
});
