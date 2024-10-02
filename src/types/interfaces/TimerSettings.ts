export interface TimerSettingsReactive {
  settings: {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    rounds: number
  }
}

export interface TimerSettingsRef {
  focusDuration: number
  shortBreakDuration: number
  longBreakDuration: number
  rounds: number
}
