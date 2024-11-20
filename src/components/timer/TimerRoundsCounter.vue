<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import IconCancelButton from '../icons/IconCancelButton.vue';

const props = defineProps(['rounds']);

defineEmits<{
  (e: 'reset'): void
  (e: 'cancelReset', prev: number): void
}>();

const prevRounds: ComputedRef<number> = computed((prev) => {
  if (props.rounds <= 1) {
    return prev;
  }
  return props.rounds;
});
</script>

<template>
  <p class="rounds__paragraph" @click="$emit('reset')">
    Rounds completed: {{ props.rounds }}
  </p>
  <div class="rounds__cancel--button">
    <Transition>
      <IconCancelButton @click="$emit('cancelReset', prevRounds)" />
    </Transition>
  </div>
</template>

<style scoped>
.rounds__cancel--button {
  display: flex;
  position: relative;
}
.rounds__paragraph:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>
