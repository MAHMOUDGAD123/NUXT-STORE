<script setup lang="ts">
  import type { NavigationMenuItem } from '@nuxt/ui';

  type USize = 'sm' | 'xl' | 'xs' | 'md' | 'lg';

  // Links
  const NavItems: NavigationMenuItem[] = [
    {
      to: { name: 'shop' },
      label: 'SHOP',
      icon: 'fa7-solid:shop',
    },
    {
      to: { name: 'receipts' },
      label: 'RECEIPTS',
      icon: 'fa7-solid:receipt',
    },
    {
      to: { name: 'profile' },
      label: 'PROFILE',
      icon: 'fa7-solid:user',
    },
  ];

  // theme & UI
  const themeStore = useThemeStore();
  const { theme } = storeToRefs(themeStore);
  const iconSize: USize = 'xl';

  // Wishlist
  const { wishlistItemsCount: wishlistSize } = storeToRefs(useWishlistStore());
  const wishlistSizeDisplay = computed(() =>
    wishlistSize.value > 9 ? '+9' : `${wishlistSize.value}`,
  );

  // Cart
  const { cartItemsCount: cartSize } = storeToRefs(useCartStore());
  const cartSizeDisplay = computed(() => (cartSize.value > 9 ? '+9' : `${cartSize.value}`));
</script>

<template>
  <UHeader
    mode="slideover"
    :toggle="{
      size: iconSize,
      class: 'hover:text-primary focus-visible:text-primary',
    }"
  >
    <template #left>
      <AppLogo />
    </template>

    <template #default>
      <UNavigationMenu
        :items="NavItems"
        :ui="{
          list: 'rounded-full px-3 gap-5',
          link: 'rouded-full w-14 aspect-square text-4xl p-0 flex justify-center before:w-full before:h-full',
        }"
      >
        <template #item="{ item }">
          <UTooltip
            :delay-duration="0"
            :ui="{
              content: 'text-primary p-1 px-2.5 rounded-full bg-accented font-bold',
            }"
            :content="{ avoidCollisions: true, sideOffset: 15 }"
          >
            <template #content>{{ item.label }}</template>
            <UIcon :name="item.icon" />
          </UTooltip>
        </template>
      </UNavigationMenu>
    </template>

    <template #body>
      <UNavigationMenu :items="NavItems" orientation="vertical">
        <template #item="{ item }">
          <div class="flex items-center gap-3 font-bold">
            <UIcon :name="item.icon" class="text-3xl" />
            <span class="">{{ item.label }}</span>
          </div>
        </template>
      </UNavigationMenu>
    </template>

    <template #right>
      <ClientOnly>
        <UTooltip text="WISHLIST">
          <UChip
            :text="wishlistSizeDisplay"
            size="3xl"
            :ui="{ base: 'p-2' }"
            :show="wishlistSize !== 0"
            position="top-left"
          >
            <UButton
              :to="{ name: 'wishlist' }"
              variant="ghost"
              :size="iconSize"
              color="neutral"
              :icon="$route.name === 'wishlist' ? 'fa7-solid:heart' : 'fa7-regular:heart'"
              class="hover:text-primary focus-visible:text-primary"
              :class="{ 'text-primary': $route.name === 'wishlist' }"
            >
            </UButton>
          </UChip>
        </UTooltip>
        <template #fallback>
          <UButton icon="line-md:heart" variant="ghost" :size="iconSize" color="neutral" />
        </template>
      </ClientOnly>

      <ClientOnly>
        <UTooltip text="CART">
          <UChip
            :text="cartSizeDisplay"
            :show="cartSize !== 0"
            size="3xl"
            :ui="{ base: 'p-2' }"
            position="top-left"
          >
            <UButton
              :to="{ name: 'cart' }"
              variant="ghost"
              :size="iconSize"
              color="neutral"
              :icon="$route.name === 'cart' ? 'mdi:cart' : 'mdi:cart-outline'"
              class="hover:text-primary focus-visible:text-primary"
              :class="{ 'text-primary': $route.name === 'cart' }"
            >
            </UButton>
          </UChip>
        </UTooltip>
        <template #fallback>
          <UButton icon="mdi:cart-outline" variant="ghost" :size="iconSize" color="neutral" />
        </template>
      </ClientOnly>

      <ClientOnly>
        <UTooltip :text="theme.toUpperCase()">
          <UButton
            ref="themeToggleBtn"
            :size="iconSize"
            variant="ghost"
            color="neutral"
            :icon="theme === 'dark' ? 'lucide:moon' : 'ph:sun-bold'"
            class="hover:text-primary focus-visible:text-primary"
            @click="themeStore.toggleTheme"
          />
        </UTooltip>
        <template #fallback>
          <UButton loading variant="ghost" :size="iconSize" color="neutral" />
        </template>
      </ClientOnly>
    </template>
  </UHeader>
</template>
