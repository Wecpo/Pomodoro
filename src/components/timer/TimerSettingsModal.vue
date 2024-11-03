<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = defineProps<TimerSettingsModal>();
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

onMounted(() => {
  if (localTimerSettings.timerFormat === 'minutes') {
    localTimerSettings.focusDuration = localTimerSettings.focusDuration / 60;
    localTimerSettings.shortBreakDuration = localTimerSettings.shortBreakDuration / 60;
    localTimerSettings.longBreakDuration = localTimerSettings.longBreakDuration / 60;
  }
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
  document.addEventListener('mousedown', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});

const timerFormatString = computed(() => localTimerSettings.timerFormat.slice(0, 3));
</script>

<template>
  <div ref="modalRef">
    <form class="modal" @submit.prevent="editSettings">
      <fieldset class="fieldset">
        <legend>Choose a timer format</legend>
        <input id="minutes" v-model="localTimerSettings.timerFormat" type="radio" name="timer-format" value="minutes">
        <label for="minutes">Minutes</label><br>
        <input id="seconds" v-model="localTimerSettings.timerFormat" type="radio" name="timer-format" value="seconds">
        <label for="seconds">Seconds</label><br>
      </fieldset>
      <label for="focus">Focus duration ({{ timerFormatString }})</label>
      <input id="focus" v-model="localTimerSettings.focusDuration" type="number" min="0">
      <label for="shortBreak">Short break duration ({{ timerFormatString }})</label>
      <input id="shortBreak" v-model="localTimerSettings.shortBreakDuration" type="number" min="0">
      <label for="longBreak">Long break duration ({{ timerFormatString }})</label>
      <input id="longBreak" v-model="localTimerSettings.longBreakDuration" type="number" min="0">
      <label for="rounds">Rounds</label>
      <input id="rounds" v-model="localTimerSettings.rounds" type="number" min="0">
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
