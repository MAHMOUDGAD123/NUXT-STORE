<script setup lang="ts">
  import type { RouteMap } from 'vue-router';
  import type { EmptyProps } from '@nuxt/ui';

  type EmptyListData = Pick<EmptyProps, 'icon' | 'title' | 'description'>;
  type RouteEmptyListDataMap = Partial<Record<keyof RouteMap, EmptyListData>>;

  defineProps<{
    productsList: ProductWithMetaData[];
    isEmpty: boolean;
  }>();

  // Holds the empty list data maped with the route name
  const routeEmptylistDataLookup: RouteEmptyListDataMap = {
    shop: {
      title: 'No Products',
      description: 'The store is closed',
      icon: 'fa7-solid:shop-lock',
    },
    wishlist: {
      title: 'Empty Wishlist',
      description: 'Add some items to the list',
      icon: 'fa7-solid:heart-crack',
    },
    cart: {
      title: 'Empty Cart',
      description: 'Add some items to the list',
      icon: 'carbon:shopping-cart-error',
    },
  };

  const route = useRoute();
  const emptyData = routeEmptylistDataLookup[route.name];
</script>

<template>
  <UPageGrid class="grid grid-cols-1 py-9 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
    <ClientOnly>
      <template #default>
        <ProductCard
          v-if="!isEmpty"
          v-for="(product, index) in productsList"
          :index
          :key="product.id"
          :product
        />

        <UEmpty
          v-else
          :title="emptyData.title"
          :description="emptyData.description"
          :icon="emptyData.icon"
          size="xl"
          class="col-span-full mt-5"
          :ui="{
            avatar: 'w-21 h-21 text-5xl',
          }"
        />
      </template>

      <template #placeholder>
        <SkeletonProductCard />
      </template>

      <template #fallback>
        <SkeletonProductCard />
      </template>
    </ClientOnly>
  </UPageGrid>
</template>
