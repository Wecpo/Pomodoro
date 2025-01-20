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

<style scoped lang="scss">
@use '@/styles/mixins';

.fieldset-timer {
  font-size: 1.2rem;
  margin: 1rem;
  @include mixins.flex-center();

  @include mixins.respond-to('xs') {
    font-size: 1rem;
  }
}
</style>
