<script setup lang="ts">
import RadioInput from '@/components/inputs/RadioInput.vue';

const timerFormat = defineModel<string>('timerFormat');
</script>

<template>
  <fieldset class="fieldset-timer">
    <legend>Choose a timer format</legend>
    <div class="fieldset-timer__radio-input">
      <RadioInput v-model="timerFormat" value="minutes" label="Minutes" />
      <RadioInput v-model="timerFormat" value="seconds" label="Seconds" />
    </div>
  </fieldset>
</template>

<style scoped>
.fieldset-timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  margin: 1rem;
}

.fieldset-timer__radio-input {
  font-size: 1.2rem;
}
</style>
