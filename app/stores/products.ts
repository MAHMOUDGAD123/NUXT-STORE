import { skipHydrate } from 'pinia';

export const useProductsStore = defineStore('products', ({ action }) => {
  const initialValue: ProductsStore = {
    list: [],
    categories: [],
    itemCount: 0,
    totalStockCount: 0,
  };

  const _data = skipHydrate(useSessionStorage<ProductsStore>('__nuxt_store_data__', initialValue));
  let _productIdLookup: Record<string, ProductWithMetaData> = {};

  const _renderListIncreaseBy = 5;
  const productsRenderListCount = ref(0);
  const productsRenderList = computed<ProductWithMetaData[]>(() => {
    const list: ProductWithMetaData[] = [];
    for (let i = 0; i < productsRenderListCount.value; ++i) {
      list.push(_data.value.list[i]);
    }
    return list;
  });

  const renderListCompleted = computed(
    () => productsRenderListCount.value === _data.value.itemCount,
  );

  const loadProducts = async () => {
    if (_data.value.itemCount === 0) {
      const productsRawData = (await import('~~/public/products.json')).default;

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
        categories: productsRawData.categories as Category[],
        itemCount: productsRawData.itemCount,
        totalStockCount: productsRawData.totalStockCount,
      } satisfies ProductsStore;
    }

    // initiate the products render list

    productsRenderListCount.value = _renderListIncreaseBy;
    _buildProductIdlookup();
  };

  const _buildProductIdlookup = action(() => {
    _data.value.list.forEach((product) => {
      _productIdLookup[product.id] = product;
    });
  });

  const updateRenderList = (increaseBy: number = _renderListIncreaseBy) => {
    const _maxItemsCount = _data.value.itemCount;
    if (productsRenderList.value.length + increaseBy >= _maxItemsCount) {
      productsRenderListCount.value = _maxItemsCount;
    } else {
      productsRenderListCount.value += increaseBy;
    }
  };

  const resetRenderList = () => {
    productsRenderListCount.value = _renderListIncreaseBy;
  };

  const getProductById = (id: string): ProductWithMetaData | null => {
    return _productIdLookup[id];
  };

  return {
    productsData: _data,
    productsRenderListCount,
    productsRenderList,
    renderListCompleted,
    updateRenderList,
    resetRenderList,
    loadProducts,
    getProductById,
  };
});
