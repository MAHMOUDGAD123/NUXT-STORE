export const useCartStore = defineStore('cart', () => {
  const categoryFilterStore = useCategoryFilterStore();
  const { filteredProducts } = storeToRefs(categoryFilterStore);
  const toast = useToast();

  const cartItems = computed(() => filteredProducts.value.filter((product) => product.inCart));

  const toggleCartItem = (product: ProductWithMetaData) => {
    product.inCart = !product.inCart;
    toast.add({
      id: product.id,
      icon: product.inCart
        ? 'icon-park-solid:shopping-cart-add'
        : 'icon-park-solid:shopping-cart-del',
      title: `${product.title}`,
      description: product.inCart ? `Added to cart` : 'Removed from cart',
      color: product.inCart ? 'primary' : 'warning',
      type: 'foreground',
    });
    console.clear();
    const logger = createLogger();
    logger.info(product);
  };

  return {
    cartItems,
    toggleCartItem,
  };
});
