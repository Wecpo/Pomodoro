<script setup lang="ts">
const ringAtheEnd = defineModel<string>('ringAtTheEnd');
const volume = defineModel<string>('volume');
</script>

<template>
  <fieldset class="fieldset-sounds">
    <legend>Sound at the end of the round</legend>
    <label>
      <input v-model="ringAtheEnd" type="radio" value="on">On
    </label>
    <label>
      <input v-model="ringAtheEnd" type="radio" value="off">Off
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
