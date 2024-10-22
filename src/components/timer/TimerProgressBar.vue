<script setup lang="ts">
import type { TimerProgressBarProps } from '@/types/interfaces/TimerProgressBar';
import { TIMER_TYPE } from '@/types/enums/Timer';
import { computed } from 'vue';

const props = defineProps<TimerProgressBarProps>();

const timerTypeKey = computed(() => {
  if (props.timerType === TIMER_TYPE.FOCUS) {
    return 'focusDuration';
  }
  if (props.timerType === TIMER_TYPE.SHORT_BREAK) {
    return 'shortBreakDuration';
  }
  return 'longBreakDuration';
});

const progressMax = computed(() => props.timerSettings.settings[timerTypeKey.value] * 60);
const progressValue = computed(() => progressMax.value - props.timer);
</script>

<template>
  <progress class="progress" :value="progressValue" :max="progressMax" />
</template>

<style scoped>
.progress {
  width: 30%;
}
</style>
