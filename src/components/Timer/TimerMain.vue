<script setup lang="ts">
import type { TimerSettingsReactive } from '@/types/interfaces/TimerSettings';
import IconSettings from '@/components/icons/IconSettings.vue';
import TimerButton from '@/components/Timer/TimerButton.vue';
import SettingsModal from '@/components/Timer/TimerSettingsModal.vue';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';
import { formatTime } from '@/utils/formatTime';
import { computed, onMounted, reactive, ref } from 'vue';
import { useToast } from 'vue-toastification';
import IconForwardButton from '../icons/IconForwardButton.vue';

const toast = useToast();

const DEFAULT_TIMER_SETTINGS = {
  focusDuration: 30,
  shortBreakDuration: 5,
  longBreakDuration: 10,
  rounds: 3,
};

const timerSettings = reactive<TimerSettingsReactive>({ settings: DEFAULT_TIMER_SETTINGS });
const timer = ref<number>(timerSettings.settings.focusDuration);
const roundCounter = ref(1);
const timerType = ref<TIMER_TYPE>(TIMER_TYPE.FOCUS);
const timerStatus = ref<TIMER_STATUS>(TIMER_STATUS.PAUSED);
const showModal = ref(false);
const settingsIconRef = ref<HTMLElement | null>(null);
let intervalId = 0;

function fetchSettings() {
  const settingsData = localStorage.getItem('timerSettings');

  if (settingsData) {
    timerSettings.settings = JSON.parse(settingsData);
    timer.value = timerSettings.settings.focusDuration;
  }
}

onMounted(() => {
  fetchSettings();
});

const changeTimerMap = new Map<TIMER_TYPE, () => void>([
  [TIMER_TYPE.FOCUS, changeTimerToBreak],
  [TIMER_TYPE.LONG_BREAK, changeTimerToFocus],
  [TIMER_TYPE.SHORT_BREAK, changeTimerToFocus],
]);

function changeTimerToFocus() {
  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    timerType.value = TIMER_TYPE.FOCUS;
    timer.value = timerSettings.settings.focusDuration;
    pauseTimer();
    toast.info('Короткий перерыв завершен!');
    return;
  }
  if (timerType.value === TIMER_TYPE.LONG_BREAK) {
    roundCounter.value = 0;
    timerType.value = TIMER_TYPE.FOCUS;
    timer.value = timerSettings.settings.focusDuration;
    pauseTimer();
    toast.info('Длинный перерыв завершен!');
  }
}

function changeTimerToBreak() {
  if (roundCounter.value < timerSettings.settings.rounds) {
    roundCounter.value++;
    timerType.value = TIMER_TYPE.SHORT_BREAK;
    timer.value = timerSettings.settings.shortBreakDuration;
    pauseTimer();
    toast.success('Помидор завершен!');
    return;
  }

  if (roundCounter.value === timerSettings.settings.rounds) {
    roundCounter.value++;
    timerType.value = TIMER_TYPE.LONG_BREAK;
    timer.value = timerSettings.settings.longBreakDuration;
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

function changeTimer() {
  const changeTimer1 = changeTimerMap.get(timerType.value);
  if (changeTimer1) {
    changeTimer1();
  }
}

function pauseTimer() {
  clearInterval(intervalId);
  timerStatus.value = TIMER_STATUS.PAUSED;
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

const isTimerPaused = computed(() => timerStatus.value === TIMER_STATUS.PAUSED);
const isTimerStarted = computed(() => timerStatus.value === TIMER_STATUS.STARTED);
</script>

<template>
  <div :class="`timer ${timerClass}`">
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
  <SettingsModal
    v-if="showModal"
    :settings-icon-ref="settingsIconRef" :settings="timerSettings.settings"
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
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
