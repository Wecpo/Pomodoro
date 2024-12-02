export interface TimerSettingsModal {
  timerSettings: {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    rounds: number
    timerFormat: string
    ringAtTheEnd: string
    volume: number
  }
  settingsIconRef: HTMLElement | null
}
