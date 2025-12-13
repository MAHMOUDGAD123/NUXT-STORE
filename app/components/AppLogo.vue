<script setup lang="ts"></script>

<template>
  <NuxtLink
    to="/"
    color="neutral"
    class="duration-global focus-visible:shadow-primary font-saira flex items-center justify-center gap-1 rounded-md px-1 py-0.5 [user-select:none] focus-visible:shadow-[0_0_0_2px]"
  >
    <img src="/logo.svg" alt="logo" class="w-10 min-w-10" />
    <div class="xsm:block duration-global hidden text-xl transition-opacity starting:opacity-0">
      <span>NUXT</span>
      <span class="text-primary">STORE</span>
    </div>
  </NuxtLink>
</template>
