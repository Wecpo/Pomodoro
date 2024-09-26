<script setup lang="ts">
import type { TimerSettings } from '@/types/interfaces/TimerSettings'
import IconSettings from '@/components/icons/IconSettings.vue'
import SettingsModal from '@/components/SettingsModal.vue'
import TimerButton from '@/components/Timer/TimerButton.vue'
import { TimerStatus } from '@/types/enums/TimerEnums/TimerStatusEnum'
import { TimerType } from '@/types/enums/TimerEnums/TimerTypeEnum'
import { formatTime } from '@/utils/formatTime'
import { computed, onMounted, reactive, ref } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()

const defaultTimerSettings = { focusDuration: 30, shortBreakDuration: 5, longBreakDuration: 10, rounds: 3 }

let timerSettings: TimerSettings = reactive(defaultTimerSettings)
const timer = ref<number>(timerSettings.focusDuration)
const roundCounter = ref(1)
const timerType = ref<TimerType>(TimerType.Focus)
const timerStatus = ref<TimerStatus>(TimerStatus.Paused)
const intervalId = ref<number | undefined>()
const showModal = ref(false)

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
  if (timerType.value === TimerType.Focus) {
    if (roundCounter.value < timerSettings.rounds) {
      roundCounter.value++
      timerType.value = TimerType.ShortBreak
      timer.value = timerSettings.shortBreakDuration
      timerStatus.value = TimerStatus.Paused
      toast.success('Помидор завершен!')
      return
    }
    if (roundCounter.value === timerSettings.rounds) {
      roundCounter.value++
      timerType.value = TimerType.LongBreak
      timer.value = timerSettings.longBreakDuration
      timerStatus.value = TimerStatus.Paused
      toast.success('Помидор завершен!')
      return
    }
  }

  if (timerType.value === TimerType.ShortBreak) {
    timerType.value = TimerType.Focus
    timer.value = timerSettings.focusDuration
    timerStatus.value = TimerStatus.Paused
    toast.info('Короткий перерыв завершен!')
  }

  if (timerType.value === TimerType.LongBreak) {
    roundCounter.value = 0
    timerType.value = TimerType.Focus
    timer.value = timerSettings.focusDuration
    timerStatus.value = TimerStatus.Paused
    toast.info('Длинный перерыв завершен!')
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
  if (timerType.value === TimerType.Focus) {
    return 'timer--backgound--focus'
  }

  if (timerType.value === TimerType.ShortBreak) {
    return 'timer--background--short-break'
  }

  else {
    return 'timer--background--long-break'
  }
})

const isTimerPaused = computed(() => timerStatus.value === TimerStatus.Paused)
const isTimerStarted = computed(
  () => timerStatus.value === TimerStatus.Started,
)
</script>

<template>
  <div :class="`timer ${timerClass}`">
    <IconSettings @click="showModal = !showModal" />
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
  <SettingsModal v-if="showModal" :settings="timerSettings" @update="fetchSettings" @close="showModal = !showModal" />
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
