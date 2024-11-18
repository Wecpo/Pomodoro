import { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';

export const getFaviconHref = (timerStatus: TIMER_STATUS, timerType: TIMER_TYPE) => {
  let faviconLinkHref = '/icons/pomodoro-long-break.ico';
  if (timerStatus === TIMER_STATUS.PAUSED) {
    faviconLinkHref = '/icons/pomodoro-paused.ico';
  }
  else if (timerType === TIMER_TYPE.FOCUS) {
    faviconLinkHref = 'icons/pomodoro-focus.ico';
  }
  else if (timerType === TIMER_TYPE.SHORT_BREAK) {
    faviconLinkHref = '/icons/pomodoro-short-break.ico';
  }

  return faviconLinkHref;
};
