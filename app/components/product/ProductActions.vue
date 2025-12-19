<script setup lang="ts">
  interface ActionButton {
    icon: string;
    tooltip: string;
    action: () => void;
  }

  const { product } = defineProps<{
    product: ProductWithMetaData;
  }>();

  const wishlistStore = useWishlistStore();
  const cartStore = useCartStore();
  const actionButtons = computed<ActionButton[]>(() => [
    {
      icon: product?.inWishlist ? 'fa7-solid:heart' : 'fa7-regular:heart',
      tooltip: product?.inWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST',
      action: () => {
        wishlistStore.toggleWishlistItem(product);
      },
    },
    {
      icon: product?.inCart
        ? 'streamline-plump:shopping-cart-add-solid'
        : 'streamline-plump:shopping-cart-add-remix',
      tooltip: product?.inCart ? 'REMOVE FROM CART' : 'ADD TO CART',
      action: () => {
        cartStore.toggleCartItem(product);
      },
    },
  ]);
</script>

<template>
  <div class="flex justify-center gap-3">
    <UTooltip v-for="actionBtn in actionButtons">
      <UButton variant="subtle" class="text-3xl" @click="actionBtn.action">
        <UIcon :name="actionBtn.icon" />
      </UButton>
      <template #content>{{ actionBtn.tooltip }}</template>
    </UTooltip>
  </div>
</template>
