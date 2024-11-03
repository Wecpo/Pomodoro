<script setup lang="ts">
import type { TimerProgressBarProps } from '@/types/interfaces/TimerProgressBar';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { computed } from 'vue';

const props = defineProps<TimerProgressBarProps>();

const timerTest = computed(() => props.timerType);
const { timerTypeKey } = useTimerTypeKey(timerTest);

const progressMax = computed(() => props.timerSettings[timerTypeKey.value]);
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
