<script setup lang="ts">
import type { TimerSettings } from '@/types/interfaces/TimerSettings';
import type { TimerState } from '@/types/interfaces/TimerState';
import IconForwardButton from '@/components/icons/IconForwardButton.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import TimerButton from '@/components/timer/TimerButton.vue';
import TimerProgressBar from '@/components/timer/TimerProgressBar.vue';
import TimerSettingsModal from '@/components/timer/TimerSettingsModal.vue';
import { useFaviconHref } from '@/composable/useFaviconHref';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { useTitle } from '@/composable/useTitle';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';
import { formatTime } from '@/utils/formatTime';
import { computed, onMounted, onUnmounted, reactive, ref, toRef, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const DEFAULT_TIMER_SETTINGS = {
  focusDuration: 1800,
  shortBreakDuration: 300,
  longBreakDuration: 600,
  rounds: 3,
  timerFormat: 'minutes',
};

const timerSettings = reactive<TimerSettings>(DEFAULT_TIMER_SETTINGS);
const timerState = reactive<TimerState>({
  timerValue: timerSettings.focusDuration,
  roundCounter: 1,
  timerType: TIMER_TYPE.FOCUS,
  timerStatus: TIMER_STATUS.PAUSED,
});

const showModal = ref(false);
const settingsIconRef = ref<HTMLElement | null>(null);
const { timerTypeKey } = useTimerTypeKey(toRef(timerState, 'timerType'));
let intervalId = 0;

function fetchSettings() {
  const settingsData = localStorage.getItem('timerSettings');

  if (settingsData) {
    const { focusDuration, shortBreakDuration, longBreakDuration, rounds, timerFormat } = JSON.parse(settingsData);
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

    timerSettings.rounds = rounds;
    timerSettings.timerFormat = timerFormat;
    timerState.timerValue = timerSettings[timerTypeKey.value];
  }
}

const isTimerPaused = computed(() => timerState.timerStatus === TIMER_STATUS.PAUSED);
const isTimerStarted = computed(() => timerState.timerStatus === TIMER_STATUS.STARTED);

function changeTimerToFocus() {
  if (timerState.timerType === TIMER_TYPE.SHORT_BREAK) {
    timerState.timerType = TIMER_TYPE.FOCUS;
    timerState.timerValue = timerSettings.focusDuration;
    pauseTimer();
    toast.info('Короткий перерыв завершен!');
    return;
  }
  if (timerState.timerType === TIMER_TYPE.LONG_BREAK) {
    timerState.roundCounter = 1;
    timerState.timerType = TIMER_TYPE.FOCUS;
    timerState.timerValue = timerSettings.focusDuration;
    pauseTimer();
    toast.info('Длинный перерыв завершен!');
  }
}

function changeTimerToBreak() {
  if (timerState.roundCounter < timerSettings.rounds) {
    timerState.roundCounter++;
    timerState.timerType = TIMER_TYPE.SHORT_BREAK;
    timerState.timerValue = timerSettings.shortBreakDuration;
    pauseTimer();
    toast.success('Помидор завершен!');
    return;
  }

  if (timerState.roundCounter === timerSettings.rounds) {
    timerState.roundCounter++;
    timerState.timerType = TIMER_TYPE.LONG_BREAK;
    timerState.timerValue = timerSettings.longBreakDuration;
    pauseTimer();
    toast.success('Помидор завершен!');
  }
}

function startTimer() {
  timerState.timerStatus = TIMER_STATUS.STARTED;

  intervalId = setInterval(() => {
    timerState.timerValue--;
    if (timerState.timerValue < 0) {
      clearInterval(intervalId);
      changeTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  timerState.timerStatus = TIMER_STATUS.PAUSED;
}

const changeTimerMap = new Map<TIMER_TYPE, () => void>([
  [TIMER_TYPE.FOCUS, changeTimerToBreak],
  [TIMER_TYPE.LONG_BREAK, changeTimerToFocus],
  [TIMER_TYPE.SHORT_BREAK, changeTimerToFocus],
]);

function changeTimer() {
  changeTimerMap.get(timerState.timerType)?.();
}

const timerClass = computed(() => {
  if (timerState.timerType === TIMER_TYPE.FOCUS) {
    return 'timer--backgound--focus';
  }

  if (timerState.timerType === TIMER_TYPE.SHORT_BREAK) {
    return 'timer--background--short-break';
  }

  return 'timer--background--long-break';
});

watchEffect(() => {
  const { title } = useTitle(timerState.timerValue, timerState.timerType);
  document.title = title;
});

watchEffect(() => {
  const faviconLink: HTMLLinkElement
  = document.querySelector('link[rel*=\'shortcut icon\']') || document.createElement('link');

  const { faviconLinkHref } = useFaviconHref(timerState.timerStatus, timerState.timerType);

  faviconLink.href = faviconLinkHref;
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
