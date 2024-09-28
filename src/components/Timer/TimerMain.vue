<script setup lang="ts">
import type { TimerSettings } from '@/types/interfaces/TimerSettings'
import IconSettings from '@/components/icons/IconSettings.vue'
import TimerButton from '@/components/Timer/TimerButton.vue'
import SettingsModal from '@/components/Timer/TimerSettingsModal.vue'
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer'
import { formatTime } from '@/utils/formatTime'
import { computed, onMounted, onUpdated, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const defaultTimerSettings = { focusDuration: 30, shortBreakDuration: 5, longBreakDuration: 10, rounds: 3 }

let timerSettings: TimerSettings = reactive(defaultTimerSettings)
const timer = ref<number>(timerSettings.focusDuration)
const roundCounter = ref(1)
const timerType = ref<TIMER_TYPE>(TIMER_TYPE.FOCUS)
const timerStatus = ref<TIMER_STATUS>(TIMER_STATUS.PAUSED)
const intervalId = ref<number | undefined>()
const showModal = ref(false)
const settingsIconRef = ref<HTMLElement | null>(null)

function fetchSettings() {
  const settingsData = localStorage.getItem('timerSettings')

  if (settingsData) {
    timerSettings = JSON.parse(settingsData)
    timer.value = timerSettings.focusDuration
  }
}

onMounted(() => {
  fetchSettings()
})

function changeTimer() {
  if (timerType.value === TIMER_TYPE.FOCUS) {
    if (roundCounter.value < timerSettings.rounds) {
      roundCounter.value++
      timerType.value = TIMER_TYPE.SHORT_BREAK
      timer.value = timerSettings.shortBreakDuration
      timerStatus.value = TIMER_STATUS.PAUSED
      toast.success('Помидор завершен!')
      return
    }
    if (roundCounter.value === timerSettings.rounds) {
      roundCounter.value++
      timerType.value = TIMER_TYPE.LONG_BREAK
      timer.value = timerSettings.longBreakDuration
      timerStatus.value = TIMER_STATUS.PAUSED
      toast.success('Помидор завершен!')
      return
    }
  }

  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    timerType.value = TIMER_TYPE.FOCUS
    timer.value = timerSettings.focusDuration
    timerStatus.value = TIMER_STATUS.PAUSED
    toast.info('Короткий перерыв завершен!')
  }

  if (timerType.value === TIMER_TYPE.LONG_BREAK) {
    roundCounter.value = 0
    timerType.value = TIMER_TYPE.FOCUS
    timer.value = timerSettings.focusDuration
    timerStatus.value = TIMER_STATUS.PAUSED
    toast.info('Длинный перерыв завершен!')
  }
}

function startTimer() {
  timerStatus.value = TIMER_STATUS.STARTED

  const interval = setInterval(() => {
    timer.value--
    if (timer.value < 0) {
      clearInterval(interval)
      changeTimer()
    }
  }, 1000)

  intervalId.value = interval
}

function pauseTimer() {
  clearInterval(intervalId.value)
  timerStatus.value = TIMER_STATUS.PAUSED
}

const timerClass = computed(() => {
  if (timerType.value === TIMER_TYPE.FOCUS) {
    return 'timer--backgound--focus'
  }

  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    return 'timer--background--short-break'
  }

  else {
    return 'timer--background--long-break'
  }
})

const isTimerPaused = computed(() => timerStatus.value === TIMER_STATUS.PAUSED)
const isTimerStarted = computed(() => timerStatus.value === TIMER_STATUS.STARTED)
</script>

<template>
  <div :class="`timer ${timerClass}`">
    <div ref="settingsIconRef" @click="showModal = !showModal">
      <IconSettings ref="settingsIconRef" />
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
    </div>
  </div>
  <SettingsModal v-if="showModal" :settings-icon-ref="settingsIconRef" :settings="timerSettings" @update="fetchSettings" @close="showModal = !showModal" />
</template>

<style scoped>
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  padding: 6px;
  color:#fff;
}

.timer--backgound--focus {
  background-color:rgb(206, 76, 76);
}

.timer--background--short-break {
  background-color:rgb(85, 197, 122);
}

.timer--background--long-break {
  background-color:rgb(107, 194, 209);
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
  gap: 0.5rem;
}
</style>
