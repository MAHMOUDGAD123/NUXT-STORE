<script setup lang="ts">
  type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  const { product, size = 'lg' } = defineProps<{
    product: ProductWithMetaData;
    size?: Size;
  }>();

  const hasDicount = product.discount !== 0;
</script>

<template>
  <div class="flex w-full flex-col content-end items-start gap-2">
    <UFieldGroup>
      <UBadge
        :label="hasDicount ? `-${product.discount}%` : 'Price'"
        :color="hasDicount ? 'primary' : 'neutral'"
        :size
        class="font-bold"
        :class="{ 'light:bg-accented light:text-default': !hasDicount }"
      />
      <UBadge
        :label="product.price"
        :size
        variant="subtle"
        color="neutral"
        :ui="{
          label: `${!hasDicount ? '' : 'line-through'}`,
        }"
      />
      <UBadge
        v-if="hasDicount"
        :label="
          hasDicount
            ? `${(product.price - product.price * (product.discount / 100)) >>> 0}`
            : 'none'
        "
        :size
        variant="subtle"
      />
      <UBadge
        icon="fa7-solid:dollar"
        :size
        :color="hasDicount ? 'primary' : 'neutral'"
        class="light:bg-accented light:text-default"
      />
    </UFieldGroup>
  </div>
</template>
