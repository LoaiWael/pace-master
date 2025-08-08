class Task {
  #id
  #name
  #completed
  #completedDate
  constructor(dataObj) {
    this.#id = dataObj.id;
    this.#name = dataObj.name;
    this.#completed = dataObj.completed;
    this.#completedDate = dataObj.completedDate;
  }

  // read only
  getId() {
    return this.#id;
  }
  getName() {
    return this.#name;
  }
  isCompleted() {
    return this.#completed;
  }
  getCompleteDate() {
    if (this.isCompleted())
      return this.#completedDate;
  }

  // write only
  setName(newName) {
    this.#name = newName;
  }
  complete() {
    this.#completed = true;
    this.#completedDate = new Date();
  }
}

export class DailyTask extends Task {
  #time
  constructor(dataObj) {
    super(dataObj);
    this.#time = dataObj.time;
  }

  getTime() {
    return this.#time;
  }
  setTime(newTime) {
    this.#time = newTime;
  }
}