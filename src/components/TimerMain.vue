<script setup lang="ts">
import { computed, ref } from "vue";
import { formatTime } from "../utils/formatTime";
import TimerButton from "./TimerButton.vue";

const focusTime = 10;
const shortRestTime = 3
const longRestTime = 600

enum TimerStatus {
  Started = "started",
  Paused = "paused",
}

enum TimerType {
  Focus = 'focus',
  ShortRest = 'shortRest',
  LongRest = 'longRest'
}

const timerType = ref<string>(TimerType.Focus)
const currentTime = ref<number>(focusTime);

const timerStatus = ref<TimerStatus>(TimerStatus.Paused);

const currentIntervalId = ref<number>();

const startTimer = () => {
  timerStatus.value = TimerStatus.Started;

  const interval = setInterval(() => {
    currentTime.value--;
    if (currentTime.value === 0) {
      clearInterval(interval);
      if (timerType.value === TimerType.Focus) {
        timerType.value = TimerType.ShortRest
        currentTime.value = shortRestTime
        timerStatus.value = TimerStatus.Paused
        alert("Помидор завершился!");
        return
      }
      if (timerType.value === TimerType.ShortRest) {
        timerType.value = TimerType.Focus
        currentTime.value = focusTime
        timerStatus.value = TimerStatus.Paused
        alert("Короткий перерыв завершился!");
        return
      }

    }
  }, 1000);

  currentIntervalId.value = interval;
};

const pauseTimer = () => {
  clearInterval(currentIntervalId.value);
  timerStatus.value = TimerStatus.Paused;
};

const currentTimerClass = computed(() => {
  return timerType.value === TimerType.Focus ? `mainContainerFocus` : `mainContainerRest`
})
</script>

<template>
  <div :class="currentTimerClass">
    <div class="timerContainer">
      {{ formatTime(currentTime) }}
    </div>
    <div class="timerButtonsContainer">
      <TimerButton v-if="timerStatus === TimerStatus.Paused" @click="startTimer">Start</TimerButton>
      <TimerButton v-if="timerStatus === TimerStatus.Started" @click="pauseTimer">Pause</TimerButton>
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
  font-size: 40px;
  font-weight: bolder;
  color: #fff;
  margin: 20px;
}
</style>
