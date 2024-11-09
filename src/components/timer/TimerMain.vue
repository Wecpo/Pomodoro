<script setup lang="ts">
import type { TimerSettings } from '@/types/interfaces/TimerSettings';
import IconForwardButton from '@/components/icons/IconForwardButton.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import TimerButton from '@/components/timer/TimerButton.vue';
import TimerProgressBar from '@/components/timer/TimerProgressBar.vue';
import TimerSettingsModal from '@/components/timer/TimerSettingsModal.vue';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';
import { formatTime } from '@/utils/formatTime';
import { computed, onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue';
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
const timer = ref(timerSettings.focusDuration);
const roundCounter = ref(1);
const timerType = ref<TIMER_TYPE>(TIMER_TYPE.FOCUS);
const timerStatus = ref<TIMER_STATUS>(TIMER_STATUS.PAUSED);
const showModal = ref(false);
const settingsIconRef = ref<HTMLElement | null>(null);
const { timerTypeKey } = useTimerTypeKey(timerType);
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
    timer.value = timerSettings[timerTypeKey.value];
  }
}

const isTimerPaused = computed(() => timerStatus.value === TIMER_STATUS.PAUSED);
const isTimerStarted = computed(() => timerStatus.value === TIMER_STATUS.STARTED);

function changeTimerToFocus() {
  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    timerType.value = TIMER_TYPE.FOCUS;
    timer.value = timerSettings.focusDuration;
    pauseTimer();
    toast.info('Короткий перерыв завершен!');
    return;
  }
  if (timerType.value === TIMER_TYPE.LONG_BREAK) {
    roundCounter.value = 1;
    timerType.value = TIMER_TYPE.FOCUS;
    timer.value = timerSettings.focusDuration;
    pauseTimer();
    toast.info('Длинный перерыв завершен!');
  }
}

function changeTimerToBreak() {
  if (roundCounter.value < timerSettings.rounds) {
    roundCounter.value++;
    timerType.value = TIMER_TYPE.SHORT_BREAK;
    timer.value = timerSettings.shortBreakDuration;
    pauseTimer();
    toast.success('Помидор завершен!');
    return;
  }

  if (roundCounter.value === timerSettings.rounds) {
    roundCounter.value++;
    timerType.value = TIMER_TYPE.LONG_BREAK;
    timer.value = timerSettings.longBreakDuration;
    pauseTimer();
    toast.success('Помидор завершен!');
  }
}

function startTimer() {
  timerStatus.value = TIMER_STATUS.STARTED;

  intervalId = setInterval(() => {
    timer.value--;
    if (timer.value < 0) {
      clearInterval(intervalId);
      changeTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(intervalId);
  timerStatus.value = TIMER_STATUS.PAUSED;
}

const changeTimerMap = new Map<TIMER_TYPE, () => void>([
  [TIMER_TYPE.FOCUS, changeTimerToBreak],
  [TIMER_TYPE.LONG_BREAK, changeTimerToFocus],
  [TIMER_TYPE.SHORT_BREAK, changeTimerToFocus],
]);

function changeTimer() {
  changeTimerMap.get(timerType.value)?.();
}

const timerClass = computed(() => {
  if (timerType.value === TIMER_TYPE.FOCUS) {
    return 'timer--backgound--focus';
  }

  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    return 'timer--background--short-break';
  }

  return 'timer--background--long-break';
});

watchEffect(() => {
  document.title = `${formatTime(timer.value, ':')} ${timerType.value}`;
});

watchEffect(() => {
  const faviconLink: HTMLLinkElement
  = document.querySelector('link[rel*=\'shortcut icon\']') || document.createElement('link');

  if (timerStatus.value === TIMER_STATUS.PAUSED) {
    faviconLink.href = '/icons/pomodoro-paused.ico';
    return;
  }
  if (timerType.value === TIMER_TYPE.FOCUS) {
    faviconLink.href = 'icons/pomodoro-focus.ico';
    return;
  }
  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    faviconLink.href = '/icons/pomodoro-short-break.ico';
    return;
  }
  faviconLink.href = '/icons/pomodoro-long-break.ico';
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
    <TimerProgressBar :timer="timer" :timer-settings="timerSettings" :timer-type="timerType" />
    <div ref="settingsIconRef" @click="showModal = !showModal">
      <IconSettings />
    </div>
    <div class="timer__title">
      {{ timerType }}
    </div>
    <div class="timer__time">
      {{ formatTime(timer) }}
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
