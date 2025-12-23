import type { RouteMap } from 'vue-router';

export default defineNuxtPlugin({
  parallel: true,
  setup: () => {
    const route = useRoute();
    const ProductsStore = useProductsStore();
    const { renderListCompleted } = storeToRefs(ProductsStore);
    const { currentFilter } = storeToRefs(useCategoryFilterStore());
    const targetRoutes: (keyof RouteMap)[] = ['shop'];

    const { observer } = useIntersectionObserver(
      () => {
        if (currentFilter.value === 'all' && !renderListCompleted.value) {
          ProductsStore.updateRenderList();
        }
      },
      {
        scrollMargin: '100px',
      },
    );

    // 1- Watch the route to reset the (productsRenderListCount) and disconnect the observer
    //    when the route name isn't in the (targetRoutes)
    // 2- Watch the filter to reset the (productsRenderListCount) on filter change
    watch(
      [() => route.name, () => currentFilter.value],
      ([currentRoute, currentFilter]) => {
        if (targetRoutes.includes(currentRoute) && currentFilter === 'all') {
          const targetEle = document.getElementById('__main_footer__');
          observer.observe(targetEle);
        } else {
          ProductsStore.resetRenderList();
          observer.disconnect();
        }
      },
      { immediate: true },
    );
  },
});
