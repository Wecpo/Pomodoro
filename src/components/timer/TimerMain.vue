<script setup lang="ts">
import BaseButton from '@/components/buttons/BaseButton.vue';
import IconForwardButton from '@/components/icons/IconForwardButton.vue';
import IconSettings from '@/components/icons/IconSettings.vue';
import TimerProgressBar from '@/components/timer/TimerProgressBar.vue';
import TimerRoundsCounter from '@/components/timer/TimerRoundsCounter.vue';
import TimerSettingsModal from '@/components/timer/TimerSettingsModal.vue';
import { useTimer } from '@/composable/useTimer';
import { useTodoStore } from '@/store/todoStore';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';
import { formatTime } from '@/utils/formatTime';
import { computed, onMounted, onUnmounted, ref } from 'vue';

const showModal = ref(false);
const settingsIconRef = ref<HTMLElement | null>(null);

const todoStore = useTodoStore();

const { timerState, startTimer, pauseTimer, changeTimer, getSettings, intervalId } = useTimer();

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
  getSettings();
});

onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <div :class="`timer ${timerClass}`">
    <TimerProgressBar
      :timer="timerState.timerValue"
      :timer-type="timerState.timerType"
    />
    <div ref="settingsIconRef" class="timer__settings" @click="showModal = !showModal">
      <IconSettings />
    </div>
    <div class="timer__title">
      <span class="timer__title__timer-type">{{ timerState.timerType }}</span>
      <span
        v-if="todoStore.getInProgressTodo?.name"
        class="timer__title__todo-name"
      >Todo name: {{ todoStore.getInProgressTodo?.name }}</span>
    </div>
    <div class="timer__time">
      {{ formatTime(timerState.timerValue) }}
    </div>
    <div class="timer__roundsCounter">
      <TimerRoundsCounter
        :rounds="timerState.totalRounds"
        @cancel-reset="timerState.totalRounds = $event"
        @reset="timerState.totalRounds = 0"
      />
    </div>
    <div class="timer__controls">
      <BaseButton v-if="isTimerPaused" @click="startTimer">
        Start
      </BaseButton>
      <BaseButton v-else-if="isTimerStarted" @click="pauseTimer">
        Pause
      </BaseButton>
      <div class="timer__forward-button">
        <Transition>
          <IconForwardButton v-if="isTimerStarted" @click="changeTimer" />
        </Transition>
      </div>
    </div>
  </div>
  <Transition>
    <Teleport to="body">
      <TimerSettingsModal
        v-if="showModal"
        :settings-icon-ref="settingsIconRef" :show-modal="showModal"
        @update="getSettings" @close="showModal = !showModal"
      />
    </Teleport>
  </Transition>
</template>

<style scoped>
.timer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  border-radius: 20px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.timer--backgound--focus {
  background: linear-gradient(135deg, #e74b33, #fecfef);
}

.timer--background--short-break {
  background: linear-gradient(135deg, #358b1b, #fecfef);
}

.timer--background--long-break {
  background: linear-gradient(135deg, #236975, #fecfef);
}

.timer__title {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  font-size: 2rem;
  color: #333;
  font-weight: bold;
}

.timer__title__timer-type {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.timer__title__todo-name {
  width: 300px;
  overflow-wrap: break-word;
}

.timer__time {
  text-align: center;
  font-size: 5rem;
  font-weight: 700;
}

.timer__settings {
  will-change: transform;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.timer__settings > svg {
  height: 3rem;
}

.timer__settings:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition-duration: 100ms;
}

.timer__controls {
  display: flex;
  position: relative;
  align-items: center;
  gap: 1rem;
}

.timer__forward-button {
  position: absolute;
  right: -20%;
  will-change: transform;
}

.timer__forward-button > svg {
  height: 100%;
  height: 32px;
}

.timer__forward-button > svg:hover {
  cursor: pointer;
  transform: scale(1.1);
  transition-duration: 100ms;
}

.v-enter-active,
.v-leave-active {
  will-change: opacity, transform;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translate(-50%, -60%);
  opacity: 0;
}

@media (max-width: 360px) {
  .timer {
    gap: 1rem;
  }

  .timer__time {
    font-size: 4rem;
  }
}
</style>
