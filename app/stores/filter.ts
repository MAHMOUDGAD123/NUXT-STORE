import type { RadioGroupItem } from '@nuxt/ui';
import { skipHydrate } from 'pinia';

export const useCategoryFilterStore = defineStore('categoryFilter', () => {
  const _filterMap: Record<
    FilterCategory,
    { label: Capitalize<FilterCategory> | (string & {}); icon: string }
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

  const defaultValue: FilterCategory = 'all';
  const currentValue = skipHydrate(
    useSessionStorage<FilterCategory>('__nuxt_store_filter_cat__', defaultValue),
  );
  const productStore = useProductStore();
  const { products } = storeToRefs(productStore);

  // Get all categories as (RadioGroupItem) and add the default value 'all' to it.
  const filterOptions = [defaultValue, ...products.value.categories].map(
    (category) =>
      ({
        label: _filterMap[category].label,
        value: category,
        icon: _filterMap[category].icon,
      }) satisfies RadioGroupItem,
  );

  const productsWithIcons = products.value.list.map(
    (product) =>
      ({
        ...product,
        icon: _filterMap[product.category].icon,
      }) satisfies ItemWithIcon,
  );

  const filteredProducts = computed(() =>
    currentValue.value === 'all'
      ? productsWithIcons
      : productsWithIcons.filter((product) => product.category == currentValue.value),
  );

  const filterPageTitle = computed(() =>
    currentValue.value === 'all' ? 'Electronics' : _filterMap[currentValue.value].label,
  );

  const setFilter = (newValue: FilterCategory) => {
    currentValue.value = newValue;
  };

  const resetFilter = () => {
    currentValue.value = 'all';
  };

  const getItemById = (id: string) => {
    return filteredProducts.value.find((prod) => prod.id === id);
  };

  return {
    filterOptions,
    filteredProducts,
    currentValue,
    filterPageTitle,
    setFilter,
    resetFilter,
    getItemById,
  };
});
