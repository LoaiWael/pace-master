import type { IdailyTask, TimeFormat } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAndDisplay(task: IdailyTask, timeFormat: TimeFormat): string {
  let [hours, min] = task.time.split(':');
  const amOrPm = Number(hours) >= 12 ? 'PM' : 'AM';

  if (timeFormat === '12') {
    const hourNum = Number(hours);
    hours = hourNum === 0 ? '12' : hourNum > 12 ? String(hourNum - 12) : hours;
  }

  return timeFormat === '12' ? `${hours}:${min} ${amOrPm}` : `${hours}:${min}`;
}