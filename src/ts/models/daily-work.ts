import type { IDailyTask } from "./tasks.js";
import { DailyTask } from "./tasks.js";

export type dayNames = keyof IDailyWork;

interface IDailyWork {
  saturday: DailyTask[]
  sunday: DailyTask[]
  monday: DailyTask[]
  tuesday: DailyTask[]
  wednesday: DailyTask[]
  thursday: DailyTask[]
  friday: DailyTask[]
  weekend: dayNames[]
}

class DailyWork implements IDailyWork {
  private static is12HourFormat: boolean
  saturday
  sunday
  monday
  tuesday
  wednesday
  thursday
  friday
  weekend
  constructor(dataObj: IDailyWork) {
    this.saturday = dataObj.saturday;
    this.sunday = dataObj.sunday;
    this.monday = dataObj.monday;
    this.tuesday = dataObj.tuesday;
    this.wednesday = dataObj.wednesday;
    this.thursday = dataObj.thursday;
    this.friday = dataObj.friday;
    this.weekend = dataObj.weekend;

    this.updateLocalStorage();
    DailyWork.is12HourFormat = DailyWork.findIf12Hour();
  }

  addTask(task: IDailyTask, day: dayNames): DailyTask {
    const newTask = new DailyTask(task);
    const rightDay = this.findDay(day) as DailyTask[];
    rightDay.push(newTask);

    this.sortTasksByTime(rightDay);
    this.formatTime(newTask);
    this.updateLocalStorage();

    return newTask
  }

  removeTask(taskId: string, day: dayNames) {
    const rightDay = this.findDay(day) as DailyTask[];

    for (let i = 0; i < rightDay.length; i++) {
      if (rightDay[i]?.id === taskId) {
        rightDay.splice(i, 1);
        break;
      }
    }

    this.updateLocalStorage();
  }

  editTask(taskId: string, day: dayNames, newName: string, newTime: string): DailyTask {
    const rightDay = this.findDay(day) as DailyTask[];
    const task = rightDay.find(taskItem => taskItem.id === taskId);
    if (task) {
      task.name = newName || task.name;
      task.time = newTime || task.name;
    }

    this.sortTasksByTime(rightDay);
    this.formatTime(task as DailyTask);
    this.updateLocalStorage();

    return task as DailyTask;
  }

  private dayToPlainObjects(day: DailyTask[]): IDailyTask[] {
    return day?.map(task => this.taskToPlainObject(task));
  }

  private taskToPlainObject(task: DailyTask): IDailyTask {
    return {
      id: task.id,
      name: task.name,
      completed: task.isCompleted,
      completedDate: task.getCompletedDate,
      time: task.time
    };
  }

  private updateLocalStorage() {
    localStorage.setItem('daily-work', JSON.stringify(
      {
        saturday: this.dayToPlainObjects(this.saturday),
        sunday: this.dayToPlainObjects(this.sunday),
        monday: this.dayToPlainObjects(this.monday),
        tuesday: this.dayToPlainObjects(this.tuesday),
        wednesday: this.dayToPlainObjects(this.wednesday),
        thursday: this.dayToPlainObjects(this.thursday),
        friday: this.dayToPlainObjects(this.friday),
        weekend: this.weekend
      }
    ))
  }

  private findDay(day: dayNames): DailyTask[] {
    let rightDay;
    switch (day) {
      case 'saturday': rightDay = this.saturday;
        break;
      case 'sunday': rightDay = this.sunday;
        break;
      case 'monday': rightDay = this.monday;
        break;
      case 'tuesday': rightDay = this.tuesday;
        break;
      case 'wednesday': rightDay = this.wednesday;
        break;
      case 'thursday': rightDay = this.thursday;
        break;
      case 'friday': rightDay = this.friday;
        break;
    }
    return rightDay as DailyTask[];
  }

  private sortTasksByTime(day: DailyTask[], ascending = true): void {
    function timeToMinutes(timeString: string) {
      if (!timeString) return 0;

      const [hours, minutes] = timeString.split(':').map(Number);
      return (hours as number) * 60 + (minutes as number);
    }

    day.sort((a, b) => {
      const timeA = timeToMinutes(a.time);
      const timeB = timeToMinutes(b.time);

      return ascending ? timeA - timeB : timeB - timeA;
    });
  }

  private static findIf12Hour(): boolean {
    const formatter = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric'
    });

    const testDate = new Date(2023, 0, 1, 13, 0, 0);
    const formattedTime = formatter.format(testDate);

    // Check if the formatted time contains AM/PM indicators
    const is12Hour = /AM|PM|am|pm/.test(formattedTime);

    return is12Hour ? true : false;
  }

  private formatTime(task: DailyTask): void {
    let [hours, min] = task.time.split(':');
    const amOrPm = Number(hours) >= 12 ? 'PM' : 'AM';

    if (DailyWork.is12HourFormat) {
      hours = Number(hours) > 12 ? String(Number(hours) - 12) : hours;
    }

    task.time = `${hours}:${min} ${amOrPm}`;
  }
}

export const dailyWork = new DailyWork(loadFromLocalStorage() || {
  saturday: [],
  sunday: [],
  monday: [],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
  weekend: []
});

function loadFromLocalStorage(): IDailyWork | null {
  const saved = localStorage.getItem('daily-work');
  if (!saved) return null;

  const data = JSON.parse(saved);

  return {
    saturday: data.saturday?.map((obj: IDailyTask) => new DailyTask(obj)) || [],
    sunday: data.sunday?.map((obj: IDailyTask) => new DailyTask(obj)) || [],
    monday: data.monday?.map((obj: IDailyTask) => new DailyTask(obj)) || [],
    tuesday: data.tuesday?.map((obj: IDailyTask) => new DailyTask(obj)) || [],
    wednesday: data.wednesday?.map((obj: IDailyTask) => new DailyTask(obj)) || [],
    thursday: data.thursday?.map((obj: IDailyTask) => new DailyTask(obj)) || [],
    friday: data.friday?.map((obj: IDailyTask) => new DailyTask(obj)) || [],
    weekend: data.weekend?.map((obj: IDailyTask) => new DailyTask(obj)) || []
  };
}