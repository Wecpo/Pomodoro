<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{ timerFormat: string }>();
const timerFormat = ref(props.timerFormat);
</script>

<template>
  <fieldset class="fieldset-timer">
    <legend>Choose a timer format</legend>
    <label>
      <input v-model="timerFormat" type="radio" value="minutes">Minutes
    </label>
    <br>
    <label>
      <input v-model="timerFormat" type="radio" value="seconds">Seconds
    </label>
  </fieldset>
</template>

<style scoped>
.fieldset-timer {
  margin: 6px;
}
</style>
