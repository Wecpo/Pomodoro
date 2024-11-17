import type { TIMER_TYPE } from '@/types/enums/Timer';
import type { TimerSettings } from '@/types/interfaces/TimerSettings';

export interface TimerProgressBar {
  timer: number
  timerType: TIMER_TYPE
  timerSettings: TimerSettings
}
