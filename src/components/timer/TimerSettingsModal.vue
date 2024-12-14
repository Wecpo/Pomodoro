<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import TimerSettingsModalFieldsetSound from '@/components/fieldsets/TimerSettingsModalFieldsetSound.vue';
import TimerSettingsModalFieldsetTimer from '@/components/fieldsets/TimerSettingsModalFieldsetTimer.vue';
import BaseInput from '@/components/inputs/BaseInput.vue';
import { toMinutesFixed } from '@/utils/toMinutesFixed';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = withDefaults(defineProps<TimerSettingsModal>(), {
  timerSettings: () =>
    ({
      focusDuration: 1800,
      shortBreakDuration: 300,
      longBreakDuration: 600,
      rounds: 3,
      timerFormat: 'seconds',
      ringAtTheEnd: false,
      volume: 0.5,
    }),
});

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update'): void
}>();

const localTimerSettings = reactive({
  focusDuration: props.timerSettings.focusDuration,
  shortBreakDuration: props.timerSettings.shortBreakDuration,
  longBreakDuration: props.timerSettings.longBreakDuration,
  rounds: props.timerSettings.rounds,
  timerFormat: props.timerSettings.timerFormat,
  ringAtTheEnd: props.timerSettings.ringAtTheEnd,
  volume: props.timerSettings.volume,
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
      type="number" :label="`Focus duration (${timerFormatString})`"
    />
    <BaseInput
      v-model="localTimerSettings.shortBreakDuration"
      type="number"
      :label="`Short break duration (${timerFormatString})`"
    />
    <BaseInput
      v-model="localTimerSettings.longBreakDuration"
      type="number"
      :label="`Long break duration (${timerFormatString})`"
    />
    <BaseInput
      v-model="localTimerSettings.rounds"
      type="number"
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
  top: 10%;
  left: 42%;
  display: flex;
  flex-direction: column;
  background-color: rgba(128, 92, 92, 0.9);
  min-width: 100px;
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
