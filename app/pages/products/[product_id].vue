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

  const categoryStore = useCategoryFilterStore();
  const product = categoryStore.getItemById(route.params.product_id as string);
  route.meta.pageHeroIcon = `${product.icon}`;

  interface ActionButton {
    icon: string;
    tooltip: string;
    action: () => void;
  }

  const actionButtons: ActionButton[] = [
    {
      icon: 'fa7-solid:cart-plus',
      tooltip: 'ADD TO CART',
      action: () => {},
    },
    {
      icon: 'fa7-solid:heart',
      tooltip: 'ADD TO WISHLIST',
      action: () => {},
    },
  ];
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
              <UButton
                :icon="actionBtn.icon"
                size="xl"
                variant="subtle"
                @click="actionBtn.action"
              />
              <template #content>{{ actionBtn.tooltip }}</template>
            </UTooltip>
          </div>
        </template>

        <template #default>
          <h2 class="mb-5 text-2xl font-extrabold">{{ product?.title }}</h2>
          <p class="text-(--text-color-muted)">{{ product?.description }}</p>
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
