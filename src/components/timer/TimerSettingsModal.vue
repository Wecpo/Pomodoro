<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = withDefaults(defineProps<TimerSettingsModal>(), {
  timerSettings: () =>
    ({
      focusDuration: 1800,
      shortBreakDuration: 300,
      longBreakDuration: 600,
      rounds: 3,
      timerFormat: 'minutes',
    }),
});

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update'): void
}>();

const localTimerSettings = reactive({
  focusDuration: props.timerSettings.focusDuration,
  shortBreakDuration: props.timerSettings.shortBreakDuration,
  longBreakDuration: props.timerSettings.longBreakDuration,
  rounds: props.timerSettings.rounds,
  timerFormat: props.timerSettings.timerFormat,
});

function editSettings() {
  const data = localTimerSettings;

  const LSdata = JSON.stringify(data);
  localStorage.setItem('timerSettings', LSdata);

  emit('update');
  emit('close');
}

watch(() => localTimerSettings.timerFormat, () => {
  if (localTimerSettings.timerFormat === 'seconds') {
    localTimerSettings.focusDuration *= 60;
    localTimerSettings.shortBreakDuration *= 60;
    localTimerSettings.longBreakDuration *= 60;
    return;
  }
  localTimerSettings.focusDuration /= 60;
  localTimerSettings.shortBreakDuration /= 60;
  localTimerSettings.longBreakDuration /= 60;
});

// watch(() => localTimerSettings.timerFormat, (value) => {
//   localTimerSettings.timerFormat = value;
// });

const modalRef = ref<HTMLElement | null>(null);

function handleClickOutside(event: MouseEvent) {
  if (props.settingsIconRef && props.settingsIconRef.contains(event.target as Node)) {
    emit('close');
  }
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    emit('close');
  }
}

onMounted(() => {
  localTimerSettings.timerFormat = props.timerSettings.timerFormat;
  if (localTimerSettings.timerFormat === 'minutes') {
    localTimerSettings.focusDuration /= 60;
    localTimerSettings.shortBreakDuration /= 60;
    localTimerSettings.longBreakDuration /= 60;
  }
});

onMounted(() => {
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>

<template>
  <div ref="modalRef">
    <form class="modal" @submit.prevent="editSettings">
      <fieldset class="fieldset">
        <legend>Choose a timer format</legend>
        <label>
          <input v-model="localTimerSettings.timerFormat" checked type="radio" value="minutes">Minutes
        </label>
        <br>
        <label>
          <input v-model="localTimerSettings.timerFormat" type="radio" value="seconds">Seconds
        </label>
      </fieldset>
      <label for="focus">Focus duration</label>
      <input id="focus" v-model="localTimerSettings.focusDuration" type="number" required="true" min="1">
      <label for="shortBreak">Short break duration</label>
      <input id="shortBreak" v-model="localTimerSettings.shortBreakDuration" required="true" type="number" min="1">
      <label for="longBreak">Long break duration</label>
      <input id="longBreak" v-model="localTimerSettings.longBreakDuration" required="true" type="number" min="1">
      <label for="rounds">Rounds</label>
      <input id="rounds" v-model="localTimerSettings.rounds" required="true" type="number" min="1">
      <button class="submit" type="submit">
        Apply
      </button>
    </form>
  </div>
</template>

<style scoped>
.modal {
  padding: 15px;
  position: fixed;
  top: 10%;
  left: 33.6%;
  display: flex;
  flex-direction: column;
  background-color: rgba(128, 92, 92, 0.9);
  width: 30%;
  min-width: 100px;
}

.fieldset {
  margin: 6px;
}

.submit {
  background-color: black;
  color: #fff;
  height: 30px;
  margin-top: 10px;
}

.submit:hover {
  cursor: pointer;
}

input {
  padding: 5px;
  margin: 5px;
  background-color: rgba(128, 92, 92, 0.7);
}
</style>
