<script setup lang="ts">
import { computed, ref } from "vue";
import { formatTime } from "../utils/formatTime";
import TimerButton from "./TimerButton.vue";

const focusTime = 10;
const shortRestTime = 3

enum TimerStatus {
  Started = "started",
  Paused = "paused",
}

enum TimerType {
  Focus = 'Focus',
  ShortRest = 'Short Break',
  LongRest = 'Long Break'
}

const timer = ref<number>(focusTime);
const timerType = ref<TimerType>(TimerType.Focus)
const timerStatus = ref<TimerStatus>(TimerStatus.Paused);
const intervalId = ref<number | undefined>();

const changeTimer = () => {
  if (timerType.value === TimerType.Focus) {
    timerType.value = TimerType.ShortRest
    timer.value = shortRestTime
    timerStatus.value = TimerStatus.Paused
    alert("Помидор завершился!");
    return
  }
  if (timerType.value === TimerType.ShortRest) {
    timerType.value = TimerType.Focus
    timer.value = focusTime
    timerStatus.value = TimerStatus.Paused
    alert("Короткий перерыв завершился!");
    return
  }
}

const startTimer = () => {
  timerStatus.value = TimerStatus.Started;

  const interval = setInterval(() => {
    timer.value--;
    if (timer.value < 0) {
      clearInterval(interval);
      changeTimer()
    }
  }, 1000);

  intervalId.value = interval;
};

const pauseTimer = () => {
  clearInterval(intervalId.value);
  timerStatus.value = TimerStatus.Paused;
};

const timerClass = computed(() => {
  return timerType.value === TimerType.Focus ? `mainContainerFocus` : `mainContainerRest`
})

const isTimerPaused = computed(() => timerStatus.value === TimerStatus.Paused)
const isTimerStarted = computed(() => timerStatus.value === TimerStatus.Started)

</script>

<template>
  <div :class="timerClass">
    <div class="timerContainer">
      <div>{{ timerType }}</div>
      <div>{{ formatTime(timer) }}</div>
    </div>
    <div class="timerButtonsContainer">
      <TimerButton v-if="isTimerPaused" @click="startTimer">Start</TimerButton>
      <TimerButton v-if="isTimerStarted" @click="pauseTimer">Pause</TimerButton>
    </div>
  </div>
</template>

<style scoped>
.mainContainerFocus {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: rgb(221, 70, 70);
}

.mainContainerRest {
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
