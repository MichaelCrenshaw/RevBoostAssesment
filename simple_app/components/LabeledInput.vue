<script setup lang="ts">

const props = defineProps<{
  label: string
}>();

// Expose the input value to the parent component
const model = defineModel<string>();

const focused = ref<boolean>(false);

</script>

<template>
  <div class="label-wrapper">
    <label id="label" for="input" :class="{'float_over': focused || (model ?? '').length > 0}">{{ props.label }}</label>
    <input id="input" v-model="model" @focusin="focused = true" @focusout="focused = false">
  </div>
</template>

<style scoped>
  .label-wrapper {
    @apply relative w-full;
    container-type: size;
  }
  label {
    @apply absolute w-full text-base font-semibold;
    transition: all 0.2s;
    transform: translate(0.5rem, calc(50cqh - 0.80rem));
  }
  label.float_over {
    @apply text-sm;
    transform: translateY(-1.5rem);
  }
  input {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
  }

</style>