import type { TIMER_TYPE } from '@/types/enums/Timer';
import { formatTime } from '@/utils/formatTime';
import { computed } from 'vue';

export function useTitle(timerValue: number, timerType: TIMER_TYPE) {
  const title = computed(() => `${formatTime(timerValue, ':')} - ${timerType} time`);
  document.title = title.value;
}
