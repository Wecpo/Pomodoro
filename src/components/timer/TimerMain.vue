<script setup lang="ts">
import type { TimerSettings } from '@/types/interfaces/TimerSettings';
import IconForwardButton from '@/components/icons/IconForwardButton.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import TimerButton from '@/components/timer/TimerButton.vue';
import TimerProgressBar from '@/components/timer/TimerProgressBar.vue';
import TimerRoundsCounter from '@/components/timer/TimerRoundsCounter.vue';
import TimerSettingsModal from '@/components/timer/TimerSettingsModal.vue';
import { useTimer } from '@/composable/useTimer';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';
import { formatTime } from '@/utils/formatTime';
import { computed, onMounted, onUnmounted, reactive, ref, toRef } from 'vue';

const DEFAULT_TIMER_SETTINGS = {
  focusDuration: 1800,
  shortBreakDuration: 300,
  longBreakDuration: 600,
  rounds: 3,
  timerFormat: 'minutes',
  soundEndRound: true,
  soundsVolume: 0.5,
};

const showModal = ref(false);
const settingsIconRef = ref<HTMLElement | null>(null);

const timerSettings = reactive<TimerSettings>(DEFAULT_TIMER_SETTINGS);
const { timerState, startTimer, pauseTimer, changeTimer, intervalId } = useTimer(timerSettings);
const { timerTypeKey } = useTimerTypeKey(toRef(timerState, 'timerType'));

const fetchSettings = () => {
  const settingsData = localStorage.getItem('timerSettings');

  if (settingsData) {
    const { focusDuration, shortBreakDuration, longBreakDuration, rounds, timerFormat, soundEndRound, soundsVolume }
     = JSON.parse(settingsData);
    if (timerFormat === 'minutes') {
      timerSettings.focusDuration = focusDuration * 60;
      timerSettings.shortBreakDuration = shortBreakDuration * 60;
      timerSettings.longBreakDuration = longBreakDuration * 60;
    }

    if (timerFormat === 'seconds') {
      timerSettings.focusDuration = focusDuration;
      timerSettings.shortBreakDuration = shortBreakDuration;
      timerSettings.longBreakDuration = longBreakDuration;
    }

    timerSettings.soundEndRound = soundEndRound;
    timerSettings.rounds = rounds;
    timerSettings.soundsVolume = soundsVolume;
    timerSettings.timerFormat = timerFormat;
    timerState.timerValue = timerSettings[timerTypeKey.value];
  }
};

const isTimerPaused = computed(() => timerState.timerStatus === TIMER_STATUS.PAUSED);
const isTimerStarted = computed(() => timerState.timerStatus === TIMER_STATUS.STARTED);

const timerClass = computed(() => {
  if (timerState.timerType === TIMER_TYPE.FOCUS) {
    return 'timer--backgound--focus';
  }

  if (timerState.timerType === TIMER_TYPE.SHORT_BREAK) {
    return 'timer--background--short-break';
  }

  return 'timer--background--long-break';
});

onMounted(() => {
  fetchSettings();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div :class="`timer ${timerClass}`">
    <TimerProgressBar
      :timer="timerState.timerValue"
      :timer-settings="timerSettings"
      :timer-type="timerState.timerType"
    />
    <div ref="settingsIconRef" @click="showModal = !showModal">
      <IconSettings />
    </div>
    <div class="timer__title">
      {{ timerState.timerType }}
    </div>
    <div class="timer__time">
      {{ formatTime(timerState.timerValue) }}
    </div>
    <div class="timer__roundsCounter">
      <TimerRoundsCounter
        :rounds="timerState.totalRounds"
        @cancel-reset="(prevRounds) => timerState.totalRounds = prevRounds"
        @reset="timerState.totalRounds = 0"
      />
    </div>
    <div class="timer__controls">
      <TimerButton v-if="isTimerPaused" @click="startTimer">
        Start
      </TimerButton>
      <TimerButton v-else-if="isTimerStarted" @click="pauseTimer">
        Pause
      </TimerButton>
      <Transition>
        <IconForwardButton v-if="isTimerStarted" @click="changeTimer" />
      </Transition>
    </div>
  </div>
  <TimerSettingsModal
    v-if="showModal"
    :timer-settings="timerSettings"
    :settings-icon-ref="settingsIconRef"
    @update="fetchSettings" @close="showModal = !showModal"
  />
</template>

<style scoped>
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  padding: 6px;
  color: #fff;
}

.timer--backgound--focus {
  background-color: rgb(206, 76, 76);
}

.timer--background--short-break {
  background-color: rgb(85, 197, 122);
}

.timer--background--long-break {
  background-color: rgb(107, 194, 209);
}

.timer__title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.timer__time {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.timer__controls {
  display: flex;
  position: relative;
  align-items: center;
  gap: 0.5rem;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
