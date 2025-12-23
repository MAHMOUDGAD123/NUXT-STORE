<script setup lang="ts">
  const showup = shallowRef(false);

  const windowScroll = useWindowScroll({
    onScroll: () => {
      if (windowScroll.y.value >= 500) {
        showup.value = true;
      } else {
        showup.value = false;
      }
    },
    throttle: 500,
  });

  const scrollToTop = () => {
    window.scrollTo({ behavior: 'smooth', top: 0 });
  };
</script>

<template>
  <UTooltip
    text="Back to top"
    :content="{ side: 'left' }"
    id="__back_to_top__"
    class="text-primary duration-global fixed right-3 bottom-3 z-10 flex cursor-pointer items-center justify-center text-3xl opacity-55 transition-[opacity_visibility] hover:opacity-100 starting:opacity-0"
    :class="{ 'hidden opacity-0': !showup }"
  >
    <button @click="scrollToTop">
      <UIcon name="fa7-solid:circle-chevron-up" />
    </button>
  </UTooltip>
</template>
