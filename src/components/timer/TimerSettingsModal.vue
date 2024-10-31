<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = defineProps<TimerSettingsModal>();
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update'): void
}>();

const localTimerSettingsForSubmit = reactive({
  focusDuration: props.timerSettings.focusDuration,
  shortBreakDuration: props.timerSettings.shortBreakDuration,
  longBreakDuration: props.timerSettings.longBreakDuration,
  rounds: props.timerSettings.rounds,
  timerFormat: props.timerSettings.timerFormat,
});

onMounted(() => {
  if (localTimerSettingsForSubmit.timerFormat === 'minutes') {
    localTimerSettingsForSubmit.focusDuration = localTimerSettingsForSubmit.focusDuration / 60;
    localTimerSettingsForSubmit.shortBreakDuration = localTimerSettingsForSubmit.shortBreakDuration / 60;
    localTimerSettingsForSubmit.longBreakDuration = localTimerSettingsForSubmit.longBreakDuration / 60;
  }
});

function editSettings() {
  const data = localTimerSettingsForSubmit;
  // if (localTimerSettingsForSubmit.timerFormat === 'seconds') {
  //   data.focusDuration /= 60;
  //   data.shortBreakDuration /= 60;
  //   data.longBreakDuration /= 60;
  // }

  const LSdata = JSON.stringify(data);
  localStorage.setItem('timerSettings', LSdata);

  emit('update');
  emit('close');
}

watch(() => localTimerSettingsForSubmit.timerFormat, () => {
  if (localTimerSettingsForSubmit.timerFormat === 'seconds') {
    localTimerSettingsForSubmit.focusDuration = localTimerSettingsForSubmit.focusDuration * 60;
    localTimerSettingsForSubmit.shortBreakDuration = localTimerSettingsForSubmit.shortBreakDuration * 60;
    localTimerSettingsForSubmit.longBreakDuration = localTimerSettingsForSubmit.longBreakDuration * 60;
    return;
  }
  if (localTimerSettingsForSubmit.timerFormat = 'minutes') {
    localTimerSettingsForSubmit.focusDuration = Number((localTimerSettingsForSubmit.focusDuration / 60).toFixed(0));
    localTimerSettingsForSubmit.shortBreakDuration = +(localTimerSettingsForSubmit.shortBreakDuration / 60).toFixed(0);
    localTimerSettingsForSubmit.longBreakDuration = +(localTimerSettingsForSubmit.longBreakDuration / 60).toFixed(0);
  }
});

const modalRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (props.settingsIconRef && props.settingsIconRef.contains(event.target as Node)) {
    emit('close');
  }
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    emit('close');
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <div ref="modalRef">
    <form class="modal" @submit.prevent="editSettings">
      <fieldset class="fieldset">
        <legend>Choose a timer format</legend>
        <input
          v-model="localTimerSettingsForSubmit.timerFormat"
          type="radio" name="timer-format" value="minutes" checked
        >
        <label>Minutes</label><br>
        <input v-model="localTimerSettingsForSubmit.timerFormat" type="radio" name="timer-format" value="seconds">
        <label>Seconds</label><br>
      </fieldset>
      <label>Focus duration ({{ localTimerSettingsForSubmit.timerFormat.slice(0, 3) }})</label>
      <input v-model="localTimerSettingsForSubmit.focusDuration" type="number" min="0">
      <label>Short break duration ({{ localTimerSettingsForSubmit.timerFormat.slice(0, 3) }})</label>
      <input v-model="localTimerSettingsForSubmit.shortBreakDuration" type="number" min="0">
      <label>Long break duration ({{ localTimerSettingsForSubmit.timerFormat.slice(0, 3) }}) </label>
      <input v-model="localTimerSettingsForSubmit.longBreakDuration" type="number" min="0">
      <label>Rounds</label>
      <input v-model="localTimerSettingsForSubmit.rounds" type="number" min="0">
      <button type="submit">
        Apply
      </button>
    </form>
  </div>
</template>

<style scoped>
.modal {
  padding: 20px;
  position: fixed;
  top: 10%;
  left: 35%;
  display: flex;
  flex-direction: column;
  background-color: rgba(128, 92, 92, 0.8);
  width: 30%;
  min-width: 100px;
}

.fieldset {
  margin: 6px;
}

input {
  padding: 5px;
  margin: 5px;
  background-color: rgba(128, 92, 92, 0.7);
}
</style>
