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
        :label="hasDicount ? `-${Math.ceil((product.discount / product.price) * 100)}%` : 'Price'"
        :color="hasDicount ? 'primary' : 'neutral'"
        :size
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
        :label="hasDicount ? `${(product.price - product.discount) >>> 0}` : 'none'"
        :size
        variant="subtle"
      />
      <UBadge icon="fa7-solid:dollar" :size :color="hasDicount ? 'primary' : 'neutral'" />
    </UFieldGroup>
  </div>
</template>
