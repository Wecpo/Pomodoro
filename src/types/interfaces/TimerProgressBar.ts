import type { TIMER_TYPE } from '../enums/Timer';
import type { TimerSettingsReactive } from './TimerSettings';

export interface TimerProgressBarProps {
  timer: number
  timerType: TIMER_TYPE
  timerSettings: TimerSettingsReactive
}
