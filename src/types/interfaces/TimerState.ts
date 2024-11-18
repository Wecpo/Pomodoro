import type { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';

export interface TimerState {
  timerValue: number
  roundCounter: number
  timerType: TIMER_TYPE
  timerStatus: TIMER_STATUS
}
