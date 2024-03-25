<script setup>
useHead({
  link: {
    rel: 'icon',
    type: 'image/x-icon',
    href: '/favicon.ico',
  }
});
</script>

<template>
  <NuxtLoadingIndicator />
  <div class="w-[100vw] min-w-[100vw] h-[100vh] min-h-[100vh] overflow-x-hidden">
    <NuxtPage />
  </div>
</template>

<style>
@import '@fortawesome/fontawesome-svg-core/styles.css';

@keyframes spinner {
  to { transform: rotate(360deg); }
}
.fa-spinner {
  animation: spinner 1s linear infinite;
}
</style>