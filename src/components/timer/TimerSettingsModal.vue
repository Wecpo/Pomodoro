<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<TimerSettingsModal>();
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update'): void
}>();

const focusDuration = defineModel('focusDuration');
const shortBreakDuration = defineModel('shortBreakDuration');
const longBreakDuration = defineModel('longBreakDuration');
const rounds = defineModel('rounds');

function editSettings() {
  const data = {
    focusDuration: focusDuration.value,
    shortBreakDuration: shortBreakDuration.value,
    longBreakDuration: longBreakDuration.value,
    rounds: rounds.value,
  };

  const LSdata = JSON.stringify(data);
  localStorage.setItem('timerSettings', LSdata);
  emit('update');
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
    <form class="modal" @change="editSettings">
      <label>Focus duration (m)</label>
      <input v-model.number="focusDuration" min="0" type="number">
      <label>Short break duration (m)</label>
      <input v-model.number="shortBreakDuration" min="0" type="number">
      <label>Long break duration (m) </label>
      <input v-model.number="longBreakDuration" min="0" type="number">
      <label>Rounds</label>
      <input v-model.number="rounds" min="0" type="number">
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
