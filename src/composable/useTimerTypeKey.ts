import { TIMER_TYPE, TIMER_TYPE_KEY } from '@/types/enums/Timer';
import { computed, type Ref } from 'vue';

export function useTimerTypeKey(timerType: Ref<TIMER_TYPE>) {
  const timerTypeKey = computed(() => {
    if (timerType.value === TIMER_TYPE.FOCUS) {
      return TIMER_TYPE_KEY.FOCUS;
    }
    if (timerType.value === TIMER_TYPE.SHORT_BREAK) {
      return TIMER_TYPE_KEY.SHORT_BREAK;
    }
    return TIMER_TYPE_KEY.LONG_BREAK;
  });

  return { timerTypeKey };
}
