export const useCartStore = defineStore('cart', () => {
  const { productsData } = storeToRefs(useProductsStore());
  const categoryFilterStore = useCategoryFilterStore();
  const { filteredProducts } = storeToRefs(categoryFilterStore);
  const toast = useToast();

  const cartItems = computed(() => filteredProducts.value.filter((product) => product.inCart));
  const cartItemsCount = computed(() =>
    productsData.value.list.reduce((total, prod) => {
      return prod.inCart ? total + 1 : total;
    }, 0),
  );

  const toggleCartItem = (product: ProductWithMetaData) => {
    product.inCart = !product.inCart;
    toast.add({
      id: product.id,
      icon: product.inCart
        ? 'icon-park-solid:shopping-cart-add'
        : 'icon-park-solid:shopping-cart-del',
      title: `${product.title}`,
      description: product.inCart ? 'Added to cart' : 'Removed from cart',
      color: product.inCart ? 'primary' : 'warning',
      type: 'foreground',
    });
  };

  return {
    cartItems,
    cartItemsCount,
    toggleCartItem,
  };
});
