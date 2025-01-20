<script setup lang="ts">
import { useId } from 'vue';

interface Props {
  label: string
  type: string
  placeholder?: string
  required?: boolean
  min?: string
  max?: string
  step?: string
  value?: string
}

defineProps<Props>();

const modelValue = defineModel();
const inputId = useId();
</script>

<template>
  <label :for="inputId" class="base-input__label">
    {{ label }}
  </label>
  <input
    :id="inputId"
    v-model.trim="modelValue"
    :required="required"
    class="base-input"
    :placeholder="placeholder"
    :type="type"
    :min="min"
    :max="max"
    :step="step"
  >
</template>

<style scoped lang="scss">
@use '@/styles/mixins';

.base-input {
  padding: 0.6rem;
  margin: 0.5rem;
  background-color: rgba(128, 92, 92, 0.7);
  border-radius: 4px;
  font-size: 1.2rem;
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  width: 14rem;

  &__label {
    font-size: 1.2rem;
    @include mixins.respond-to('xs') {
      font-size: 1rem;
    }
  }

  &:hover {
    cursor: pointer;
  }

  &::placeholder {
    color: rgb(194, 191, 191);
    font-size: 1.2rem;
  }

  &:focus::placeholder {
    color: transparent;
  }

  @include mixins.respond-to('xs') {
    padding: 0.2rem;
  }
}
</style>
