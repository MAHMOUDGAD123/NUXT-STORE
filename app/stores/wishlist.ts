export const useWishlistStore = defineStore('wishlist', () => {
  const categoryFilterStore = useCategoryFilterStore();
  const { filteredProducts } = storeToRefs(categoryFilterStore);
  const toast = useToast();

  const wishlistProducts = computed(() =>
    filteredProducts.value.filter((product) => product.inWishlist),
  );

  const toggleWishlistItem = (product: ProductWithMetaData) => {
    product.inWishlist = !product.inWishlist;
    toast.add({
      id: product.id,
      icon: product.inWishlist ? 'fa7-solid:heart' : 'fa7-solid:heart-crack',
      title: `${product.title}`,
      description: product.inWishlist ? `Added to wishlist` : 'Removed from wishlist',
      color: product.inWishlist ? 'primary' : 'warning',
      type: 'foreground',
    });
    console.clear();
    const logger = createLogger();
    logger.info(product);
  };

  return {
    wishlistProducts,
    toggleWishlistItem,
  };
});
