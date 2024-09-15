<script setup lang="ts">
import { ref } from "vue";
import { formatTime } from "../utils/formatTime.ts";

const initTime = 1500;

enum TimerStatus {
  Started = "started",
  Paused = "paused",
  Stopped = "stopped",
}

const initialTimer = ref<number>(initTime);

const timerStatus = ref<TimerStatus>(TimerStatus.Stopped);

const currentInterval = ref<NodeJS.Timeout>();

const startTimer = () => {
  timerStatus.value = TimerStatus.Started;
  console.log("start", timerStatus.value);
  const interval = setInterval(() => {
    initialTimer.value--;

    if (initialTimer.value === 0) {
      clearInterval(interval);
      alert("Помидор завершился!");
    }
  }, 1000);

  currentInterval.value = interval;
};

const stopTimer = () => {
  clearInterval(currentInterval.value);
  timerStatus.value = TimerStatus.Stopped;
  console.log("stop", timerStatus.value);
  initialTimer.value = initTime;
};
const pauseTimer = () => {
  clearInterval(currentInterval.value);
  timerStatus.value = TimerStatus.Paused;
  console.log("[pause]", timerStatus.value);
};
</script>

<template>
  <div class="mainContainer">
    <div class="timerContainer">
      <h1>{{ formatTime(initialTimer) }}</h1>
    </div>
    <div class="timerButtonsContainer">
      <button
        v-if="
          timerStatus === TimerStatus.Started ||
          timerStatus === TimerStatus.Paused
        "
        @click="stopTimer"
      >
        Stop
      </button>
      <button
        v-if="
          timerStatus === TimerStatus.Stopped ||
          timerStatus === TimerStatus.Paused
        "
        @click="startTimer"
      >
        Start
      </button>
      <button v-if="timerStatus === TimerStatus.Started" @click="pauseTimer">
        Pause
      </button>
    </div>
  </div>
</template>

<style scoped>
.mainContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
  background-color: rgb(221, 70, 70);
}

.timerContainer {
  color: #fff;
}

.timerButtonsContainer {
  margin: 5px;
  padding: 5px;
  :hover {
    cursor: pointer;
  }
}
</style>
