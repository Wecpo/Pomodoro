<script setup lang="ts">
import IconCancelButton from '@/components/icons/IconCancelButton.vue';
import { computed, type ComputedRef, onUpdated, ref } from 'vue';

const props = defineProps(['rounds']);

defineEmits<{
  (e: 'reset'): void
  (e: 'cancelReset', prev: number): void
}>();

const isShowCancelButton = ref(false);
let timeoutId = 0;

const handleShowCancelButton = (action: string) => {
  if (action === 'on') {
    clearTimeout(timeoutId);
    isShowCancelButton.value = true;
    timeoutId = setTimeout(() => isShowCancelButton.value = false, 2000);
  }
  if (action === 'off') {
    clearTimeout(timeoutId);
    isShowCancelButton.value = false;
  }
};

const prevRounds: ComputedRef<number> = computed((prevRounds) => {
  if (props.rounds >= 0) {
    return props.rounds;
  }
  return prevRounds;
});
</script>

<template>
  <p class="rounds__paragraph" @click="$emit('reset'), handleShowCancelButton('on')">
    Rounds completed: {{ props.rounds }}
    prev:{{ prevRounds }}
  </p>
  <div v-show="isShowCancelButton" class="rounds__cancel--button">
    <Transition>
      <IconCancelButton @click="$emit('cancelReset', prevRounds), handleShowCancelButton('off')" />
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

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
