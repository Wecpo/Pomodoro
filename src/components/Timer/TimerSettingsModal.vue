<script setup lang="ts">
import type { SettingsModalProps } from '@/types/interfaces/SettingsModalProps'
import { onMounted, onUnmounted, ref } from 'vue'

const props = defineProps<SettingsModalProps>()
const emit = defineEmits(['close', 'update'])
const settings = ref(props.settings)

function editSettings() {
  const data = JSON.stringify(settings.value)
  localStorage.setItem('timerSettings', data)
  emit('update')
  emit('close')
}
const modalRef = ref<HTMLElement | null>(null)

function handleClickOutside(event: MouseEvent) {
  if (props.settingsIconRef && props.settingsIconRef.contains(event.target as Node)) {
    emit('close')
  }
  else if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    emit('close')
  }
}

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
  <div ref="modalRef">
    <form class="modal" @submit.prevent="editSettings">
      <label>Focus Time (m)</label>
      <input v-model="settings.focusDuration" type="number">
      <label>Short Rest (m)</label>
      <input v-model="settings.shortBreakDuration" type="number">
      <label>Long Rest (m)</label>
      <input v-model="settings.longBreakDuration" type="number">
      <label>Rounds</label>
      <input v-model="settings.rounds" type="number">
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
