import type { TIMER_TYPE } from '@/types/enums/Timer';
import { formatTime } from '@/utils/formatTime';

export function useTitle(timerValue: number, timerType: TIMER_TYPE) {
  const title = `${formatTime(timerValue, ':')} - ${timerType}`;

  return { title };
}
