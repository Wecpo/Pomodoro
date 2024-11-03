import type { Ref } from 'vue';
import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';

export function useFavicon(timerType: Ref<TIMER_TYPE>, timerStatus: Ref<TIMER_STATUS>) {
  const faviconLink: HTMLLinkElement = document.querySelector('link[rel*=\'icon\']') || document.createElement('link');

  if (timerStatus.value === TIMER_STATUS.PAUSED) {
    faviconLink.href = '/src/public/pomodoro-paused.png';
    return;
  }
  if (timerType.value === TIMER_TYPE.FOCUS) {
    faviconLink.href = '/src/public/pomodoro-focus.png';
    return;
  }
  if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
    faviconLink.href = '/src/public/pomodoro-short-break.png';
    return;
  }
  faviconLink.href = '/src/public/pomodoro-long-break.png';
}
