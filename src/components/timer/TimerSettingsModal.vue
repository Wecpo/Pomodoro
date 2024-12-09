<script setup lang="ts">
import type { TimerSettingsModal } from '@/types/interfaces/TimerSettingsModal';
import { toMinutesFixed } from '@/utils/toMinutesFixed';
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';

const props = withDefaults(defineProps<TimerSettingsModal>(), {
  timerSettings: () =>
    ({
      focusDuration: 1800,
      shortBreakDuration: 300,
      longBreakDuration: 600,
      rounds: 3,
      timerFormat: 'seconds',
      soundEndRound: true,
      soundsVolume: 50,
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
  soundEndRound: props.timerSettings.soundEndRound,
  soundsVolume: props.timerSettings.soundsVolume,
});

const editSettings = () => {
  const LSdata = JSON.stringify(localTimerSettings);
  localStorage.setItem('timerSettings', LSdata);

  emit('update');
  emit('close');
};

watch(() => localTimerSettings.timerFormat, (timerFormat) => {
  if (timerFormat === 'seconds') {
    localTimerSettings.focusDuration *= 60;
    localTimerSettings.shortBreakDuration *= 60;
    localTimerSettings.longBreakDuration *= 60;
    return;
  }
  localTimerSettings.focusDuration = toMinutesFixed(localTimerSettings.focusDuration);
  localTimerSettings.shortBreakDuration = toMinutesFixed(localTimerSettings.shortBreakDuration);
  localTimerSettings.longBreakDuration = toMinutesFixed(localTimerSettings.longBreakDuration);
});

const modalRef = ref<HTMLElement | null>(null);

const handleClickOutside = (event: MouseEvent) => {
  if (props.settingsIconRef && props.settingsIconRef.contains(event.target as Node)) {
    emit('close');
  }
  if (modalRef.value && !modalRef.value.contains(event.target as Node)) {
    emit('close');
  }
};

const timerFormatString = computed(() => `${localTimerSettings.timerFormat.slice(0, 3)}`);

onMounted(() => {
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
      <fieldset class="fieldset-sounds">
        <legend>Sound at the end of the round</legend>
        <label>
          <input v-model="localTimerSettings.soundEndRound" type="radio" :value="true">On
        </label>
        <label>
          <input v-model="localTimerSettings.soundEndRound" type="radio" :value="false">Off
        </label>
        <label class="label-volume" for="volume">Громкость: {{ Math.round(localTimerSettings.soundsVolume * 100) }}%
          <input
            id="volume"
            v-model="localTimerSettings.soundsVolume"
            type="range"
            min="0"
            max="1"
            step="0.05"
          >
        </label>
      </fieldset>

      <fieldset class="fieldset-timer">
        <legend>Choose a timer format</legend>
        <label>
          <input v-model="localTimerSettings.timerFormat" type="radio" value="minutes">Minutes
        </label>
        <br>
        <label>
          <input v-model="localTimerSettings.timerFormat" type="radio" value="seconds">Seconds
        </label>
      </fieldset>
      <label for="focus">Focus duration ({{ timerFormatString }})</label>
      <input id="focus" v-model="localTimerSettings.focusDuration" type="number" required="true" min="1">
      <label for="shortBreak">Short break duration ({{ timerFormatString }})</label>
      <input id="shortBreak" v-model="localTimerSettings.shortBreakDuration" required="true" type="number" min="1">
      <label for="longBreak">Long break duration ({{ timerFormatString }})</label>
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
  left: 42%;
  display: flex;
  flex-direction: column;
  background-color: rgba(128, 92, 92, 0.9);
  min-width: 100px;
}

.fieldset-sounds {
  display: flex;
  flex-direction: column;
  margin: 6px;
}

.fieldset-timer {
  margin: 6px;
}

.label-volume {
  display: flex;
  flex-direction: column;
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
