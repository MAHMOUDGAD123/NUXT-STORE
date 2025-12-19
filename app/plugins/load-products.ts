export default defineNuxtPlugin(async () => {
  const productsStore = useProductsStore();
  await productsStore.loadProducts();
});
