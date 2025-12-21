import { skipHydrate } from 'pinia';

interface FilterOptionsMapProps {
  value: FilterCategory;
  label: Capitalize<FilterCategory> | (string & {});
  icon: string;
}

type FilterCategoryLookup = Record<Category, ProductWithMetaData[]>;

export const useCategoryFilterStore = defineStore('categoryFilter', ({ action }) => {
  const route = useRoute();
  const defaultValue: FilterCategory = 'all';
  const currentFilter = skipHydrate(
    useSessionStorage<FilterCategory>('__nuxt_store_filter_cat__', defaultValue),
  );
  const productsStore = useProductsStore();
  const { productsData, productsRenderList } = storeToRefs(productsStore);

  const _filterMetaDataMap: Record<
    FilterCategory,
    Pick<FilterOptionsMapProps, 'icon' | 'label'>
  > = {
    all: {
      label: 'All',
      icon: 'fa7-solid:bolt',
    },
    accessories: {
      label: 'Accessories',
      icon: 'ant-design:product-filled',
    },
    airpods: {
      label: 'Airpods',
      icon: 'teenyicons:airpods-solid',
    },
    cameras: {
      label: 'Cameras',
      icon: 'fa7-solid:camera',
    },
    components: {
      label: 'Components',
      icon: 'bi:gpu-card',
    },
    headphones: {
      label: 'Headphones',
      icon: 'fa7-solid:headphones',
    },
    laptops: {
      label: 'Laptops',
      icon: 'fa7-solid:laptop',
    },
    monitors: {
      label: 'Monitors',
      icon: 'fa7-solid:desktop',
    },
    pc: {
      label: 'PC',
      icon: 'fa7-solid:computer',
    },
    smartphones: {
      label: 'Smartphones',
      icon: 'fa7-solid:mobile',
    },
    speakers: {
      label: 'Speakers',
      icon: 'mi:speakers',
    },
    storage: {
      label: 'Storage',
      icon: 'fa7-solid:hard-drive',
    },
    tvs: {
      label: 'TVs',
      icon: 'fa7-solid:tv',
    },
    tablets: {
      label: 'Tablets',
      icon: 'fa7-solid:tablet',
    },
  };

  // Build the category Map + adding the default 'all' filter option to the map
  const _filterOptionsMap = new Map<FilterCategory, FilterOptionsMapProps>(
    ['all', ...productsData.value.categories].map((category) => {
      const cat = category as FilterCategory;
      return [
        cat,
        {
          value: cat,
          label: _filterMetaDataMap[cat].label,
          icon: _filterMetaDataMap[cat].icon,
        },
      ];
    }),
  );

  const _buildCategorylookup = action(() => {
    const lookup = {} as FilterCategoryLookup;
    const logger = createLogger();
    productsData.value.list.forEach((product) => {
      if (lookup[product.category]) {
        lookup[product.category].push(product);
      } else {
        lookup[product.category] = [product];
      }
    });
    return lookup as FilterCategoryLookup;
  });

  const _productCategoryLookup: FilterCategoryLookup = _buildCategorylookup();

  const filteredProducts = computed(() =>
    currentFilter.value === 'all'
      ? productsData.value.list
      : _productCategoryLookup[currentFilter.value],
  );

  const filterPageTitle = computed(() =>
    currentFilter.value === 'all' ? 'Electronics' : _filterMetaDataMap[currentFilter.value].label,
  );

  const setFilter = (newValue: FilterCategory) => {
    currentFilter.value = newValue;
  };

  const resetFilter = () => {
    currentFilter.value = 'all';
  };

  const getCategory = (category: FilterCategory, propertyKey?: keyof FilterOptionsMapProps) => {
    return propertyKey
      ? _filterOptionsMap.get(category)[propertyKey]
      : _filterOptionsMap.get(category);
  };

  return {
    filterOptions: [..._filterOptionsMap.values()],
    filteredProducts,
    currentFilter,
    filterPageTitle,
    setFilter,
    resetFilter,
    getCategory,
  };
});
