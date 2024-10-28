<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { onMounted, onUnmounted, onUpdated, reactive, ref } from 'vue';

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

function editSettings() {
  const data = localTimerSettingsForSubmit;

  const LSdata = JSON.stringify(data);
  localStorage.setItem('timerSettings', LSdata);

  emit('update');
  emit('close');
}

const modalRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (props.settingsIconRef && props.settingsIconRef.contains(event.target as Node)) {
    emit('close');
  }
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    emit('close');
  }
}

onUpdated(() => console.log(localTimerSettingsForSubmit.timerFormat),
);

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
        <input v-model="localTimerSettingsForSubmit.timerFormat" type="radio" name="timer-format" value="minutes">
        <label>Minutes</label><br>
        <input v-model="localTimerSettingsForSubmit.timerFormat" type="radio" name="timer-format" value="seconds">
        <label>Seconds</label><br>
      </fieldset>
      <label>Focus duration (m)</label>
      <input v-model="localTimerSettingsForSubmit.focusDuration" type="number" min="0">
      <label>Short break duration (m)</label>
      <input v-model="localTimerSettingsForSubmit.shortBreakDuration" type="number" min="0">
      <label>Long break duration (m) </label>
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
