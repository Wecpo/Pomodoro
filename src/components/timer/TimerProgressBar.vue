<script setup lang="ts">
import type { TimerProgressBarProps } from '@/types/interfaces/TimerProgressBarProps';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { computed } from 'vue';

const props = defineProps<TimerProgressBarProps>();

const timerCurrentValue = computed(() => props.timerType);
const { timerTypeKey } = useTimerTypeKey(timerCurrentValue);

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
