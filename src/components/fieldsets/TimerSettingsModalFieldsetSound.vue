<script setup lang="ts">
import BaseInput from '@/components/inputs/BaseInput.vue';

const ringAtheEnd = defineModel<boolean>('ringAtTheEnd');
const volume = defineModel<number>('volume', { required: true, default: 0.5 });
</script>

<template>
  <fieldset class="fieldset-sounds">
    <legend>Sounds</legend>
    <BaseInput v-model="ringAtheEnd" label="Ring at the end" type="checkbox" />
    <BaseInput
      v-model.number="volume" :label="`Громкость: ${Math.round(volume * 100)}%`"
      type="range"
      min="0"
      max="1"
      step="0.05"
    />
  </fieldset>
</template>

<style scoped lang="scss">
@use '@/styles/mixins';

.fieldset-sounds {
  @include mixins.flex-center();
}
</style>
