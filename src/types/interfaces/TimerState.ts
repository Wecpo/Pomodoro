import type { TIMER_STATUS, TIMER_TYPE } from '../enums/Timer';

export interface TimerState {
  timerValue: number
  roundCounter: number
  timerType: TIMER_TYPE
  timerStatus: TIMER_STATUS
}