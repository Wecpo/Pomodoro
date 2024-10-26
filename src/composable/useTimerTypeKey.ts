import { TIMER_TYPE } from '@/types/enums/Timer';
import { computed, type Ref } from 'vue';

export function useTimerTypeKey(timerType: Ref<TIMER_TYPE>) {
  return computed(() => {
    if (timerType.value === TIMER_TYPE.FOCUS) {
      return 'focusDuration';
    }
    if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
      return 'shortBreakDuration';
    }
    return 'longBreakDuration';
  });
}
