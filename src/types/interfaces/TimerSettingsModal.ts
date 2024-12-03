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
