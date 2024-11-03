export interface TimerSettingsModal {
  timerSettings: {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    rounds: number
    timerFormat: string
  }
  settingsIconRef: HTMLElement | null
}
