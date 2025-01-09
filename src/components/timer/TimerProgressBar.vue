<script setup lang="ts">
import type { TimerProgressBarProps } from '@/types/interfaces/Timer';
import { useTimer } from '@/composable/useTimer';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { computed } from 'vue';

const props = defineProps<TimerProgressBarProps>();

const timerCurrentValue = computed(() => props.timerType);
const { timerSettings } = useTimer();
const { timerTypeKey } = useTimerTypeKey(timerCurrentValue);

const progressMax = computed(() => timerSettings[timerTypeKey.value]);
const progressValue = computed(() => progressMax.value - props.timer);
</script>

<template>
  <div class="progress-bar-container">
    <div
      class="progress-bar"
      :style="{ width: `${(progressValue / progressMax) * 100}%` }"
    />
  </div>
</template>

<style scoped>
.progress-bar-container {
  width: 50%;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #72b975, #81c784);
  transition: width 0.4s ease;
}

.progress-bar-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 15px;
  background: rgba(255, 255, 255, 0.4);
  filter: blur(10px);
  transform: translateX(-100%);
  animation: shimmer 2s infinite ease-in-out;
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
