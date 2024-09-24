<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  settings: { focusTime: number, shortBreakTime: number, longBreakTime: number, rounds: number }

}
const props = defineProps<Props>()

const emit = defineEmits(['close', 'update'])

const settings = ref(props.settings)

function editSettings() {
  const data = JSON.stringify(settings.value)
  localStorage.setItem('timerSettings', data)
  emit('update')
  emit('close')
}
</script>

<template>
  <form class="modal" @submit.prevent="editSettings">
    <label>Focus Time (m)</label>
    <input v-model="settings.focusTime" type="number">
    <label>Short Rest (m)</label>
    <input v-model="settings.shortBreakTime" type="number">
    <label>Long Rest (m)</label>
    <input v-model="settings.longBreakTime" type="number">
    <label>Rounds</label>
    <input v-model="settings.rounds" type="number">
    <button type="submit">
      Apply
    </button>
  </form>
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
