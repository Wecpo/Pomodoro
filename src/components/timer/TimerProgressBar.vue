<script setup lang="ts">
import { TIMER_TYPE } from '@/types/enums/Timer';
import { computed, onUpdated } from 'vue';

const props = defineProps(['timer', 'timerType', 'timerSettings']);

const timerType = computed(() => props.timerType);

const timerTypeKey = computed(() => {
  if (timerType.value === TIMER_TYPE.FOCUS) {
    return 'focusDuration';
  }
  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    return 'shortBreakDuration';
  }
  return 'longBreakDuration';
});
const progressMax = computed(() => props.timerSettings.settings[timerTypeKey.value] * 60);
const progressValue = computed(() => progressMax.value - props.timer);
</script>

<template>
  <progress :value="progressValue" :max="progressMax" />
</template>

<style scoped>
progress {
  margin: 5px;
  width: 30%;
  height: 5px;
  background-color: red;
}
</style>
