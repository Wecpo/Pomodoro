import type { TIMER_STATUS, TIMER_TYPE } from '@/types/enums/Timer';

export interface TimerProgressBarProps {
  timer: number
  timerType: TIMER_TYPE
  timerSettings: TimerSettings
}

export interface TimerSettings {
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  rounds: number
  timerFormat: string
  ringAtTheEnd: boolean
  volume: number
}

export interface TimerSettingsModal {
  timerSettings: {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    rounds: number
    timerFormat: string
    ringAtTheEnd: boolean
    volume: number
  }
  settingsIconRef: HTMLElement | null
}

export interface TimerState {
  timerValue: number
  roundCounter: number
  totalRounds: number
  timerType: TIMER_TYPE
  timerStatus: TIMER_STATUS
}
