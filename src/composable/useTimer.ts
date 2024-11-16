import type { TimerSettings } from '@/types/interfaces/TimerSettings';
import type { TimerState } from '@/types/interfaces/TimerState';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';
import { reactive, watchEffect } from 'vue';
import { useToast } from 'vue-toastification';
import { useFaviconHref } from './useFaviconHref';
import { useTitle } from './useTitle';

const toast = useToast();

export function useTimer(timerSettings: TimerSettings) {
  const timerState = reactive<TimerState>({
    timerValue: timerSettings.focusDuration,
    roundCounter: 1,
    timerType: TIMER_TYPE.FOCUS,
    timerStatus: TIMER_STATUS.PAUSED,
  });

  function changeTimerToFocus() {
    if (timerState.timerType === TIMER_TYPE.SHORT_BREAK) {
      timerState.timerType = TIMER_TYPE.FOCUS;
      timerState.timerValue = timerSettings.focusDuration;
      pauseTimer();
      toast.info('Короткий перерыв завершен!');
      return;
    }
    if (timerState.timerType === TIMER_TYPE.LONG_BREAK) {
      timerState.roundCounter = 1;
      timerState.timerType = TIMER_TYPE.FOCUS;
      timerState.timerValue = timerSettings.focusDuration;
      pauseTimer();
      toast.info('Длинный перерыв завершен!');
    }
  }

  function changeTimerToBreak() {
    if (timerState.roundCounter < timerSettings.rounds) {
      timerState.roundCounter++;
      timerState.timerType = TIMER_TYPE.SHORT_BREAK;
      timerState.timerValue = timerSettings.shortBreakDuration;
      pauseTimer();
      toast.success('Помидор завершен!');
      return;
    }

    if (timerState.roundCounter === timerSettings.rounds) {
      timerState.roundCounter++;
      timerState.timerType = TIMER_TYPE.LONG_BREAK;
      timerState.timerValue = timerSettings.longBreakDuration;
      pauseTimer();
      toast.success('Помидор завершен!');
    }
  }

  let intervalId = 0;

  function startTimer() {
    timerState.timerStatus = TIMER_STATUS.STARTED;

    intervalId = setInterval(() => {
      timerState.timerValue--;
      if (timerState.timerValue < 0) {
        clearInterval(intervalId);
        changeTimer();
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(intervalId);
    timerState.timerStatus = TIMER_STATUS.PAUSED;
  }

  const changeTimerMap = new Map<TIMER_TYPE, () => void>([
    [TIMER_TYPE.FOCUS, changeTimerToBreak],
    [TIMER_TYPE.LONG_BREAK, changeTimerToFocus],
    [TIMER_TYPE.SHORT_BREAK, changeTimerToFocus],
  ]);

  function changeTimer() {
    changeTimerMap.get(timerState.timerType)?.();
  }

  watchEffect(() => {
    const { title } = useTitle(timerState.timerValue, timerState.timerType);
    document.title = title;
  });

  watchEffect(() => {
    const faviconLink: HTMLLinkElement
    = document.querySelector('link[rel*=\'shortcut icon\']') || document.createElement('link');

    const { faviconLinkHref } = useFaviconHref(timerState.timerStatus, timerState.timerType);
    faviconLink.href = faviconLinkHref;
  });

  return { timerState, startTimer, pauseTimer, changeTimer, intervalId };
}
