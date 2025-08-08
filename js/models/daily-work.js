import { DailyTask } from "./tasks";

class DailyWork {
  saturday
  sunday
  monday
  tuesday
  wednesday
  thursday
  friday
  weekend
  constructor(dataObj) {
    this.saturday = dataObj.saturday;
    this.sunday = dataObj.sunday;
    this.monday = dataObj.monday;
    this.tuesday = dataObj.tuesday;
    this.wednesday = dataObj.wednesday;
    this.thursday = dataObj.thursday;
    this.friday = dataObj.friday;
    this.weekend = dataObj.weekend;

    localStorage.setItem('daily-work', JSON.stringify(dataObj));
  }

  addTask(task, day) {
    const rightDay = this.#findDay(day);
    rightDay.push(new DailyTask(task));

    this.#updateLocalStorage();
  }

  removeTask(taskId, day) {
    const rightDay = this.#findDay(day);
    rightDay.filter(task => task.getId() !== taskId);

    this.#updateLocalStorage();
  }

  editTask(taskId, day, newName, newTime) {
    const rightDay = this.#findDay(day);
    const task = rightDay.find(taskItem => taskItem.getId() === taskId);

    task.setName(newName || task.getName());
    task.setTime(newTime || task.getTime());

    this.#updateLocalStorage();
  }

  #updateLocalStorage() {
    localStorage.setItem('daily-work', JSON.stringify(
      {
        saturday: this.saturday,
        sunday: this.sunday,
        monday: this.monday,
        tuesday: this.tuesday,
        wednesday: this.wednesday,
        thursday: this.thursday,
        friday: this.friday,
        weekend: this.weekend
      }
    ))
  }

  #findDay(day) {
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
    return rightDay;
  }
}