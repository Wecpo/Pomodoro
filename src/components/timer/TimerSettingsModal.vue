<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/Timer';
import TimerSettingsModalFieldsetSound from '@/components/fieldsets/TimerSettingsModalFieldsetSound.vue';
import TimerSettingsModalFieldsetTimer from '@/components/fieldsets/TimerSettingsModalFieldsetTimer.vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import { useTimer } from '@/composable/useTimer';
import { INPUT_LIMITS } from '@/types/enums/InputLimits';
import { toMinutesFixed } from '@/utils/toMinutesFixed';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = defineProps<TimerSettingsModal>();

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update'): void
}>();

const { timerSettings } = useTimer();

const localTimerSettings = reactive({
  focusDuration: timerSettings.focusDuration,
  shortBreakDuration: timerSettings.shortBreakDuration,
  longBreakDuration: timerSettings.longBreakDuration,
  rounds: timerSettings.rounds,
  timerFormat: timerSettings.timerFormat,
  ringAtTheEnd: timerSettings.ringAtTheEnd,
  volume: timerSettings.volume,
});

const editSettings = () => {
  const LSdata = JSON.stringify(localTimerSettings);
  localStorage.setItem('timerSettings', LSdata);

  emit('update');
  emit('close');
};

watch(() => localTimerSettings.timerFormat, (timerFormat) => {
  if (timerFormat === 'seconds') {
    localTimerSettings.focusDuration *= 60;
    localTimerSettings.shortBreakDuration *= 60;
    localTimerSettings.longBreakDuration *= 60;
    return;
  }
  localTimerSettings.focusDuration = toMinutesFixed(localTimerSettings.focusDuration);
  localTimerSettings.shortBreakDuration = toMinutesFixed(localTimerSettings.shortBreakDuration);
  localTimerSettings.longBreakDuration = toMinutesFixed(localTimerSettings.longBreakDuration);
});

const formRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (props.settingsIconRef && props.settingsIconRef.contains(event.target as Node)) {
    emit('close');
  }
  if (formRef.value && !formRef.value.contains(event.target as Node)) {
    emit('close');
  }
};

const timerFormatString = computed(() => `${localTimerSettings.timerFormat.slice(0, 3)}`);

onMounted(() => {
  if (localTimerSettings.timerFormat === 'minutes') {
    localTimerSettings.focusDuration /= 60;
    localTimerSettings.shortBreakDuration /= 60;
    localTimerSettings.longBreakDuration /= 60;
  }
});

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <form ref="formRef" class="modal" @submit.prevent="editSettings">
    <TimerSettingsModalFieldsetSound
      v-model:ring-at-the-end="localTimerSettings.ringAtTheEnd"
      v-model:volume.number="localTimerSettings.volume"
    />
    <TimerSettingsModalFieldsetTimer v-model:timer-format="localTimerSettings.timerFormat" />
    <BaseInput
      v-model="localTimerSettings.focusDuration"
      :min="INPUT_LIMITS.MIN_TIME"
      :max="INPUT_LIMITS.MAX_TIME"
      type="number" :label="`Focus duration (${timerFormatString})`"
    />
    <BaseInput
      v-model="localTimerSettings.shortBreakDuration"
      type="number"
      :min="INPUT_LIMITS.MIN_TIME"
      :max="INPUT_LIMITS.MAX_TIME"
      :label="`Short break duration (${timerFormatString})`"
    />
    <BaseInput
      v-model="localTimerSettings.longBreakDuration"
      type="number"
      :min="INPUT_LIMITS.MIN_TIME"
      :max="INPUT_LIMITS.MAX_TIME"
      :label="`Long break duration (${timerFormatString})`"
    />
    <BaseInput
      v-model="localTimerSettings.rounds"
      type="number"
      :min="INPUT_LIMITS.MIN_ROUNDS"
      :max="INPUT_LIMITS.MAX_ROUNDS"
      label="Rounds"
    />
    <button class="submit" type="submit">
      Apply
    </button>
  </form>
</template>

<style scoped>
.modal {
  padding: 16px;
  position: fixed;
  z-index: 1;
  top: 10%;
  left: 42%;
  display: flex;
  flex-direction: column;
  background-color: rgba(128, 92, 92, 0.95);
}

.submit {
  background-color: black;
  color: #fff;
  height: 30px;
  margin-top: 12px;
}

.submit:hover {
  cursor: pointer;
}
</style>
