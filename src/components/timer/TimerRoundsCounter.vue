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
    }, 3000);
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
  <div class="rounds-counter">
    <p class="rounds-counter__paragraph" @click="emit('reset'), toggleShowCancelButton('show')">
      Rounds completed: {{ props.rounds }}
    </p>
    <div v-show="isShowCancelButton" class="rounds-counter__cancel--button">
      <Transition>
        <IconCancelButton @click="emit('cancelReset', prevRounds), toggleShowCancelButton('hidden')" />
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/styles/mixins';
@use '@/styles/variables';

.rounds-counter {
  height: 2rem;

  &__cancel--button {
    display: flex;
    position: relative;
    height: 0px;
    top: -54px;
    right: 14%;
    will-change: transform;

    @include mixins.respond-to('xs') {
      top: -40px;
      right: 25%;
    }

    &:hover {
      cursor: pointer;
      transform: scale(1.05);
      transition-duration: variables.$transition-duration;
    }
  }

  &__paragraph {
    font-size: 1.6rem;

    @include mixins.respond-to('xs') {
      font-size: 1rem;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
}

.v-enter-active,
.v-leave-active {
  will-change: opacity;
  transition: opacity variables.$transition-duration variables.$transition-easing;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
