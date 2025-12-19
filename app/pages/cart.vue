<script setup lang="ts">
  useSeoMeta({
    title: 'Cart',
  });

  definePageMeta({
    name: 'cart',
    pageHero: 'CART',
    pageHeroIcon: 'fa7-solid:cart-shopping',
    layout: 'filter-layout',
  });

  const cartStore = useCartStore();
  const { cartItems } = storeToRefs(cartStore);
  const emptyCart = computed(() => cartItems.value.length === 0);
</script>

<template>
  <ShopCardGrid :productsList="cartItems" :isEmpty="emptyCart" />
</template>
