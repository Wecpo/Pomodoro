<script setup lang="ts">
import BaseInput from '@/components/inputs/BaseInput.vue';
import RadioInput from '../inputs/RadioInput.vue';

const timerFormat = defineModel<string>('timerFormat');
</script>

<template>
  <fieldset class="fieldset-timer">
    <legend>Choose a timer format</legend>
    <div>
      <RadioInput v-model="timerFormat" value="minutes" label="Minutes" />
      <RadioInput v-model="timerFormat" value="seconds" label="Seconds" />
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
