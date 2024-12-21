<script setup lang="ts">
import type { TimerProgressBarProps } from '@/types/interfaces/Timer';
import { useTimer } from '@/composable/useTimer';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { computed, onUpdated } from 'vue';

const props = defineProps<TimerProgressBarProps>();

const timerCurrentValue = computed(() => props.timerType);
const { timerSettings } = useTimer();
const { timerTypeKey } = useTimerTypeKey(timerCurrentValue);

const progressMax = computed(() => timerSettings[timerTypeKey.value]);
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
