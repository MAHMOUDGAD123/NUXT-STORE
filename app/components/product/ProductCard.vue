<script setup lang="ts">
  defineProps<{
    product: ItemWithIcon;
  }>();
</script>

<template>
  <UPageCard
    :key="product.id"
    :title="product.title"
    :description="product.description"
    variant="subtle"
    class="cv-auto-800 duration-global hover:shadow-primary transtion-all scale-3d hover:scale-101 hover:shadow-[0_0_0_4px] starting:opacity-0"
    :ui="{
      container: 'p-2.5 sm:p-2.5',
      header: 'w-full',
      footer: 'w-full flex flex-col gap-5 items-center',
      title: 'font-bold text-[1.15rem]',
      description: 'text-accented text-sm',
    }"
  >
    <template #header>
      <ULink :to="{ name: 'product', params: { product_id: product.id } }">
        <NuxtImg
          src="/logo.svg"
          class="light:bg-accented bg-secondary hover:bg-primary-800 duration-global aspect-video w-full rounded-xl transition-colors"
        />
      </ULink>
    </template>

    <template #title>
      <ULink :to="{ name: 'product', params: { product_id: product.id } }">
        {{ product.title }}
      </ULink>
    </template>

    <template #description>
      {{ product.description }}
    </template>

    <template #leading>
      <UBadge class="text-center" :icon="product.icon" size="lg" />
    </template>

    <template #footer>
      <div class="flex w-full flex-col content-end gap-2 *:w-fit **:text-xl">
        <UBadge
          :label="product.price"
          size="lg"
          trailing-icon="fa7-solid:dollar"
          variant="outline"
          color="neutral"
          class="gap-0"
          :ui="{
            label: `${product.discount === 0 ? '' : 'line-through'}`,
          }"
        />
        <div class="flex gap-2">
          <UBadge
            v-if="product.discount !== 0"
            :label="(product.price - product.discount) >>> 0"
            size="lg"
            trailing-icon="fa7-solid:dollar"
            variant="subtle"
            class="gap-0"
          />

          <UBadge v-if="product.discount !== 0" size="lg" variant="subtle">
            {{ '-' + Math.ceil((product.discount / product.price) * 100) + '%' }}
          </UBadge>
        </div>
      </div>

      <div class="ms-auto flex gap-3">
        <UTooltip :delay-duration="0" :content="{ side: 'top' }">
          <UButton icon="fa7-solid:cart-plus" size="xl" variant="subtle" />
          <template #content>ADD TO CART</template>
        </UTooltip>

        <UTooltip :delay-duration="0" :content="{ side: 'top' }">
          <UButton icon="fa7-solid:heart" size="xl" variant="subtle" />
          <template #content>ADD TO WISHLIST</template>
        </UTooltip>
      </div>
    </template>
  </UPageCard>
</template>
