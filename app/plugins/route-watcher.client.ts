import type { RouteMap } from 'vue-router';

export default defineNuxtPlugin({
  parallel: true,
  setup: () => {
    const route = useRoute();
    const ProductsStore = useProductsStore();
    const { renderListCompleted, productsRenderListCount } = storeToRefs(ProductsStore);
    const { currentFilter } = storeToRefs(useCategoryFilterStore());
    const logger = createLogger();

    const { observer } = useIntersectionObserver(
      () => {
        if (currentFilter.value === 'all' && !renderListCompleted.value) {
          ProductsStore.updateRenderList();
          logger.info(route.name, '-', productsRenderListCount.value);
        }
      },
      {
        scrollMargin: '100px',
      },
    );

    watch(
      () => route.name,
      (currentRoute) => {
        const targetRoutes: (keyof RouteMap)[] = ['shop'];

        if (targetRoutes.includes(currentRoute)) {
          observer.observe(document.getElementById('__main_footer__'));
        } else {
          ProductsStore.resetRenderList();
          observer.disconnect();
        }
      },
      { immediate: true },
    );
  },
});
