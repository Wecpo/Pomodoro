export interface TimerSettingsModal {
  timerSettings: {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    rounds: number
    timerFormat: string
    soundEndRound: boolean
    soundsVolume: number
  }
  settingsIconRef: HTMLElement | null
}
