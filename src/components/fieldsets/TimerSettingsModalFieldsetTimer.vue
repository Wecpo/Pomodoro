<script setup lang="ts">
import { useId } from 'vue';
import BaseInput from '../inputs/BaseInput.vue';

const timerFormat = defineModel<string>('timerFormat');
</script>

<template>
  <fieldset class="fieldset-timer">
    <legend>Choose a timer format</legend>
    <div>
      <BaseInput v-model="timerFormat" type="radio" value="minutes" label="Minutes" />
      <BaseInput v-model="timerFormat" type="radio" value="seconds" label="Seconds" />
    </div>
  </fieldset>
</template>

<style scoped>
.fieldset-timer {
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 8px;
}
</style>
