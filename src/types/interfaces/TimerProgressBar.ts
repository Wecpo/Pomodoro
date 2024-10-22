import type { TIMER_TYPE } from '@/types/enums/Timer';
import type { TimerSettings } from '@/types/interfaces/TimerSettings';

export interface TimerProgressBarProps {
  timer: number
  timerType: TIMER_TYPE
  timerSettings: TimerSettings
}
