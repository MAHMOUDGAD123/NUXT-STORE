<script setup lang="ts">
  const route = useRoute();

  useSeoMeta({
    title: `Product ${route.params.product_id}`,
  });

  definePageMeta({
    name: 'product',
    pageHero: 'PRODUCT',
    pageHeroIcon: 'line-md:loading-loop',
  });

  const productsStore = useProductStore();
  const { getCategory } = useCategoryFilterStore();
  const product = productsStore.getProductById(route.params.product_id as string);
  route.meta.pageHeroIcon = `${getCategory(product.category, 'icon')}`;

  interface ActionButton {
    icon: string;
    tooltip: string;
    action: () => void;
  }

  const actionButtons = computed<ActionButton[]>(() => [
    {
      icon: product.inCart
        ? 'streamline-plump:shopping-cart-add-solid'
        : 'streamline-plump:shopping-cart-add-remix',
      tooltip: product.inCart ? 'REMOVE FROM CART' : 'ADD TO CART',
      action: () => {},
    },
    {
      icon: product.inWishlist ? 'fa7-solid:heart' : 'fa7-regular:heart',
      tooltip: product.inWishlist ? 'REMOVE FROM WISHLIST' : 'ADD TO WISHLIST',
      action: () => {},
    },
  ]);
</script>

<template>
  <div>
    <ClientOnly>
      <template #fallback>
        <SkeletonProductPage />
      </template>
      <template #placeholder>
        <SkeletonProductPage />
      </template>

      <UCard class="my-7">
        <template #header>
          <div class="flex justify-center gap-3">
            <UTooltip v-for="actionBtn in actionButtons">
              <UButton variant="subtle" class="text-3xl" @click="actionBtn.action">
                <UIcon :name="actionBtn.icon" />
              </UButton>
              <template #content>{{ actionBtn.tooltip }}</template>
            </UTooltip>
          </div>
        </template>

        <template #default>
          <UBadge variant="soft" :label="`${product.stockCount} left`" size="xl" class="mb-3" />

          <h2 class="mb-5 text-2xl font-extrabold">{{ product?.title }}</h2>
          <p class="mb-5 text-(--text-color-muted)">{{ product?.description }}</p>

          <ProductPrice :product size="xl" />
        </template>

        <template #footer>
          <h4 class="text-primary mb-3 font-extrabold">PRODUCT DETAILS</h4>
          <UTable
            :data="Object.entries(product?.specs)"
            :ui="{
              thead: 'hidden',
            }"
          />
        </template>
      </UCard>
    </ClientOnly>
  </div>
</template>

<style>
  tr:nth-child(even) {
    background-color: var(--background-color-muted);
  }

  tr td:first-child {
    color: var(--text-color-toned);
    font-weight: bold;
  }
</style>
