<script setup lang="ts">
import SettingsModal from '@/components/SettingsModal.vue'
import TimerButton from '@/components/TimerButton.vue'
import { TimerStatus, TimerType } from '@/constants/TimerEnums'
import { formatTime } from '@/utils/formatTime'
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'
import IconSettings from './icons/IconSettings.vue'

const toast = useToast()

const defaultTimerSettings = { focusTime: 30, shortBreakTime: 5, longBreakTime: 10, rounds: 3 }

const timerSettings = ref(defaultTimerSettings)
const settingsData = localStorage.getItem('timerSettings')

if (settingsData) {
  timerSettings.value = JSON.parse(settingsData)
}

const focusTime = timerSettings.value.focusTime * 60
const shortBreakTime = timerSettings.value.shortBreakTime * 60
const longBreakTime = timerSettings.value.longBreakTime * 60
const rounds = timerSettings.value.rounds

const timer = ref(focusTime)
const timerType = ref<TimerType>(TimerType.Focus)
const timerStatus = ref<TimerStatus>(TimerStatus.Paused)
const intervalId = ref<number | undefined>()
const showModal = ref(false)

function changeTimer() {
  if (timerType.value === TimerType.Focus) {
    timerType.value = TimerType.ShortBreak
    timer.value = shortBreakTime
    timerStatus.value = TimerStatus.Paused
    toast.success('Помидор завершен!')
    return
  }
  if (timerType.value === TimerType.ShortBreak) {
    timerType.value = TimerType.Focus
    timer.value = focusTime
    timerStatus.value = TimerStatus.Paused
    toast.info('Короткий перерыв завершен!')
  }
}

function startTimer() {
  timerStatus.value = TimerStatus.Started

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
  timerStatus.value = TimerStatus.Paused
}

const timerClass = computed(() => {
  return timerType.value === TimerType.Focus
    ? `mainContainerFocus`
    : `mainContainerBreak`
})

const isTimerPaused = computed(() => timerStatus.value === TimerStatus.Paused)
const isTimerStarted = computed(
  () => timerStatus.value === TimerStatus.Started,
)
</script>

<template>
  <div :class="timerClass">
    <IconSettings @click="showModal = !showModal" />
    <div class="timerContainer">
      <div>{{ timerType }}</div>
      <div>{{ formatTime(timer) }}</div>
    </div>
    <div class="timerButtonsContainer">
      <TimerButton v-if="isTimerPaused" @click="startTimer">
        Start
      </TimerButton>
      <TimerButton v-if="isTimerStarted" @click="pauseTimer">
        Pause
      </TimerButton>
    </div>
  </div>
  <SettingsModal v-if="showModal" :settings="timerSettings" />
</template>

<style scoped>
.mainContainerFocus {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: rgb(221, 70, 70);
}

.mainContainerBreak {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: rgb(177, 218, 179);
}

.timerContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 40px;
  font-weight: bolder;
  color: #fff;
  margin: 20px;
}
</style>
