<script setup lang="ts">
import type { TimerSettingsRef } from '@/types/interfaces/TimerSettings';
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps<TimerSettingsModal>();
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update'): void
}>();
const settings = ref<TimerSettingsRef>(Object.assign({}, props.settings));

function editSettings() {
  const data = JSON.stringify(settings.value);
  localStorage.setItem('timerSettings', data);
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
      <input v-model="settings.focusDuration" min="0" type="number">
      <label>Short break duration (m)</label>
      <input v-model="settings.shortBreakDuration" min="0" type="number">
      <label>Long break duration (m) </label>
      <input v-model="settings.longBreakDuration" min="0" type="number">
      <label>Rounds</label>
      <input v-model="settings.rounds" min="0" type="number">
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
