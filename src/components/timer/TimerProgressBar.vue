<script setup lang="ts">
import { computed, onUpdated, ref, watch } from 'vue';

const props = defineProps(['timer']);
const hundred = ref(props.timer);

const current = () => hundred.value - props.timer;

watch(() => props.timer, () => {
  hundred.value = props.timer;
  console.log(hundred.value);
});

// onUpdated(() => {
//   console.log(hundred);
//   hundred.value = props.timer;
// });
</script>

<template>
  <progress :value="props.timer" :max="hundred" />
</template>

<style scoped>
   progress {
  margin: 5px;
  width: 50%;
  height: 5px;
  background-color: red;
}
</style>
