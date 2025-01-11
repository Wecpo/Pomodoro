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
    }, 15000);
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
  <div class="rounds__cointainer">
    <p class="rounds__paragraph" @click="emit('reset'), toggleShowCancelButton('show')">
      Rounds completed: {{ props.rounds }}
    </p>
    <div v-show="isShowCancelButton" class="rounds__cancel--button">
      <Transition>
        <IconCancelButton @click="emit('cancelReset', prevRounds), toggleShowCancelButton('hidden')" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.rounds__cointainer {
  height: 2rem;
}
.rounds__cancel--button {
  display: flex;
  position: relative;
  height: 0px;
  top: -64px;
  right: 14%;
  will-change: transform;
}

.rounds__cancel--button:hover {
  cursor: pointer;
  transform: scale(1.05);
  transition-duration: 100ms;
}

.rounds__paragraph {
  font-size: 2rem;
}

.rounds__paragraph:hover {
  cursor: pointer;
  opacity: 0.8;
}

.v-enter-active,
.v-leave-active {
  will-change: opacity;
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .rounds__cointainer {
    height: 1rem;
  }

  .rounds__paragraph {
    font-size: 1.4rem;
  }

  .rounds__cancel--button {
    top: -50px;
    right: 16%;
  }
}
</style>
