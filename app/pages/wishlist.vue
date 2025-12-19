<script setup lang="ts">
  useSeoMeta({
    title: 'Wishlist',
  });

  definePageMeta({
    name: 'wishlist',
    pageHero: 'WISHLIST',
    pageHeroIcon: 'fa7-solid:heart',
    layout: 'filter-layout',
  });

  const wishlistStore = useWishlistStore();
  const { wishlistProducts } = storeToRefs(wishlistStore);
  const emptyWishlist = computed(() => wishlistProducts.value.length === 0);
</script>

<template>
  <ShopCardGrid :productsList="wishlistProducts" :isEmpty="emptyWishlist" />
</template>
