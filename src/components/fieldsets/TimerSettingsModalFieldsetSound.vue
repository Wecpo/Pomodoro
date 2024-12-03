<script setup lang="ts">
const ringAtheEnd = defineModel<boolean>('ringAtTheEnd');
const volume = defineModel<number>('volume', { required: true, default: 0.5 });
</script>

<template>
  <fieldset class="fieldset-sounds">
    <legend>Sounds</legend>
    <label>
      <input v-model="ringAtheEnd" type="checkbox">Ring at the end
    </label>
    <label class="label-volume" for="volume">Громкость: {{ Math.round(volume * 100) }}%
      <input
        id="volume"
        v-model.number="volume"
        type="range"
        min="0"
        max="1"
        step="0.05"
      >
    </label>
  </fieldset>
</template>

<style scoped>
.fieldset-sounds {
  display: flex;
  flex-direction: column;
  margin: 8px;
}
</style>
