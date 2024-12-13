<script setup lang="ts">
import IconCancelButton from '@/components/icons/IconCancelButton.vue';
import { onUnmounted, ref, watch } from 'vue';

const props = defineProps<{
  rounds: number
}>();

const emit = defineEmits<{
  (e: 'reset'): void
  (e: 'cancelReset', prevRounds: number): void
}>();

const prevRounds = ref(props.rounds);
const isShowCancelButton = ref(false);

let timeoutId: ReturnType<typeof setTimeout> | undefined;

const toggleShowCancelButton = (action: 'show' | 'hidden') => {
  if (action === 'show' && props.rounds > 0) {
    isShowCancelButton.value = true;
    timeoutId = setTimeout(() => {
      isShowCancelButton.value = false;
      clearTimeout(timeoutId);
      prevRounds.value = 0;
    }, 2000);
  }
  if (action === 'hidden') {
    clearTimeout(timeoutId);
    isShowCancelButton.value = false;
  }
};

watch(() => props.rounds, (newRounds) => {
  if (newRounds > 0) {
    prevRounds.value = newRounds;
  }
});

onUnmounted(() => clearInterval(timeoutId));
</script>

<template>
  <p class="rounds__paragraph" @click="emit('reset'), toggleShowCancelButton('show')">
    Rounds completed: {{ props.rounds }}
  </p>
  <div v-show="isShowCancelButton" class="rounds__cancel--button">
    <Transition>
      <IconCancelButton @click="emit('cancelReset', prevRounds), toggleShowCancelButton('hidden')" />
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
