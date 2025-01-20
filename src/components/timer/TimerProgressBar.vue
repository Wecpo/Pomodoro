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
  <div class="progress-bar">
    <div
      class="progress-bar__line"
      :style="{ width: `${(progressValue / progressMax) * 100}%` }"
    />
  </div>
</template>

<style scoped lang="scss">
.progress-bar {
  width: 50%;
  height: 12px;
  background-color: #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  position: relative;

  &__line {
    height: 100%;
    background: linear-gradient(90deg, #72b975, #81c784);
    transition: width 0.4s ease;
  }
}
</style>
