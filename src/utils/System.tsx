import { useSystem } from "@/contexts/SystemContext";
import type { IdailyTask } from "@/types";

export function formatTimeAndDisplay(task: IdailyTask): string {
  const { systemState } = useSystem()

  let [hours, min] = task.time.split(':');
  const amOrPm = Number(hours) >= 12 ? 'PM' : 'AM';

  if (systemState.timeFormat === '12') {
    const hourNum = Number(hours);
    hours = hourNum === 0 ? '12' : hourNum > 12 ? String(hourNum - 12) : hours;
  }

  return systemState.timeFormat === '12' ? `${hours}:${min} ${amOrPm}` : `${hours}:${min}`;
}