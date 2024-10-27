<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

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
      <label>Focus duration (m)</label>
      <input
        :value="localTimerSettingsForSubmit.focusDuration" min="0" type="number"
        @input="localTimerSettingsForSubmit.focusDuration = Number($event.target?.value)"
      >
      <label>Short break duration (m)</label>
      <input
        :value="localTimerSettingsForSubmit.shortBreakDuration" min="0" type="number"
        @input="localTimerSettingsForSubmit.shortBreakDuration = Number($event.target?.value)"
      >
      <label>Long break duration (m) </label>
      <input
        :value="localTimerSettingsForSubmit.longBreakDuration" min="0" type="number"
        @input="localTimerSettingsForSubmit.longBreakDuration = Number($event.target?.value)"
      >
      <label>Rounds</label>
      <input
        :value="localTimerSettingsForSubmit.rounds" min="0" type="number"
        @input="localTimerSettingsForSubmit.rounds = Number($event.target?.value)"
      >
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

input {
  padding: 5px;
  margin: 5px;
  background-color: rgba(128, 92, 92, 0.7);
}
</style>
