<script setup lang="ts">
import { ref } from 'vue'

const settings = ref({
  focus: 30,
  shortRest: 5,
  longRest: 10,
  rounds: 3,
})

function editSettings() {
  const data = JSON.stringify(settings.value)
  localStorage.setItem('timerSettings', data)
}
</script>

<template>
  <form class="modal" @submit.prevent="editSettings">
    <label>Focus Time</label>
    <input v-model="settings.focus" type="number">
    <label>Short Rest</label>
    <input v-model="settings.shortRest" type="number">
    <label>Long Rest</label>
    <input v-model="settings.longRest" type="number">
    <label>Rounds</label>
    <input v-model="settings.rounds" type="number">
    <button type="submit">
      Edit
    </button>
  </form>
</template>

<style scoped>
.modal {
  display: flex;
  flex-direction: column;
  background-color:aqua;
  height: 300px;
  width: 300px;
}
</style>
