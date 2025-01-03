import type { TimerSettings, TimerState } from '@/types/interfaces/Timer';
import { useTimerTypeKey } from '@/composable/useTimerTypeKey';
import { useTodoStore } from '@/store/todoStore';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';
import { getFaviconHref } from '@/utils/getFaviconHref';
import { getTitle } from '@/utils/getTitle';
import { playSound } from '@/utils/playSound';
import { onMounted, onUnmounted, reactive, toRef, watchEffect } from 'vue';

const DEFAULT_TIMER_SETTINGS = {
  focusDuration: 1800,
  shortBreakDuration: 300,
  longBreakDuration: 600,
  rounds: 3,
  timerFormat: 'minutes',
  ringAtTheEnd: true,
  volume: 0.5,
};

export const useTimer = () => {
  const timerSettings = reactive<TimerSettings>(DEFAULT_TIMER_SETTINGS);

  const timerState = reactive<TimerState>({
    timerValue: timerSettings.focusDuration,
    roundCounter: 1,
    totalRounds: 0,
    timerType: TIMER_TYPE.FOCUS,
    timerStatus: TIMER_STATUS.PAUSED,
  });

  const todoStore = useTodoStore();

  const { timerTypeKey } = useTimerTypeKey(toRef(timerState, 'timerType'));

  const getSettings = () => {
    const settingsData = localStorage.getItem('timerSettings');

    if (settingsData) {
      const { focusDuration, shortBreakDuration, longBreakDuration, rounds, timerFormat, ringAtTheEnd, volume }
       = JSON.parse(settingsData);
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

      timerSettings.ringAtTheEnd = ringAtTheEnd;
      timerSettings.rounds = rounds;
      timerSettings.volume = volume;
      timerSettings.timerFormat = timerFormat;
      timerState.timerValue = timerSettings[timerTypeKey.value];
    }
  };

  let intervalId: ReturnType<typeof setTimeout> | undefined;

  const pauseTimer = () => {
    clearInterval(intervalId);
    timerState.timerStatus = TIMER_STATUS.PAUSED;
  };

  const changeTimerToFocus = () => {
    if (timerState.timerType === TIMER_TYPE.SHORT_BREAK) {
      timerState.timerType = TIMER_TYPE.FOCUS;
      timerState.timerValue = timerSettings.focusDuration;
      pauseTimer();
      timerState.totalRounds++;
      return;
    }
    if (timerState.timerType === TIMER_TYPE.LONG_BREAK) {
      timerState.roundCounter = 1;
      timerState.timerType = TIMER_TYPE.FOCUS;
      timerState.timerValue = timerSettings.focusDuration;
      timerState.totalRounds++;
      pauseTimer();
    }
  };

  const changeTimerToBreak = () => {
    todoStore.changeTodoRemainingTime(timerSettings.focusDuration / 60);
    if (timerState.roundCounter < timerSettings.rounds) {
      timerState.roundCounter++;
      timerState.timerType = TIMER_TYPE.SHORT_BREAK;
      timerState.timerValue = timerSettings.shortBreakDuration;
      pauseTimer();
      return;
    }

    if (timerState.roundCounter === timerSettings.rounds) {
      timerState.roundCounter++;
      timerState.timerType = TIMER_TYPE.LONG_BREAK;
      timerState.timerValue = timerSettings.longBreakDuration;
      pauseTimer();
    }
  };

  const changeTimerMap = new Map<TIMER_TYPE, () => void>([
    [TIMER_TYPE.FOCUS, changeTimerToBreak],
    [TIMER_TYPE.LONG_BREAK, changeTimerToFocus],
    [TIMER_TYPE.SHORT_BREAK, changeTimerToFocus],
  ]);

  const changeTimer = () => {
    if (timerSettings.ringAtTheEnd) {
      playSound('/sounds/bell.mp3', timerSettings.volume);
    }
    changeTimerMap.get(timerState.timerType)?.();
  };

  const startTimer = () => {
    timerState.timerStatus = TIMER_STATUS.STARTED;

    intervalId = setInterval(() => {
      timerState.timerValue--;
      if (timerState.timerValue <= 0) {
        clearInterval(intervalId);
        changeTimer();
      }
    }, 1000);
  };

  watchEffect(() => {
    const title = getTitle(timerState.timerValue, timerState.timerType);
    document.title = title;
  });

  watchEffect(() => {
    const faviconLink: HTMLLinkElement
    = document.querySelector('link[rel*=\'shortcut icon\']') || document.createElement('link');

    const faviconLinkHref = getFaviconHref(timerState.timerStatus, timerState.timerType);
    faviconLink.href = faviconLinkHref;
  });

  onMounted(() => {
    getSettings();
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return { timerState, timerSettings, startTimer, pauseTimer, changeTimer, getSettings };
};
