interface ITask {
  id?: string;
  name: string;
  completed: boolean;
  completedDate: Date | null;
}

abstract class Task {
  protected _id: string
  protected _name: string
  protected _completed: boolean
  protected _completedDate: Date | null
  constructor(dataObj: ITask) {
    this._id = crypto.randomUUID();
    this._name = dataObj.name;
    this._completed = dataObj.completed || false;
    this._completedDate = dataObj.completedDate;
  }

  // read only
  get id(): string {
    return this._id;
  }
  get name(): string {
    return this._name;
  }
  get isCompleted(): boolean {
    return this._completed;
  }
  get getCompletedDate(): Date | null {
    if (this.isCompleted) {
      return this._completedDate;
    } else {
      return null
    }
  }

  // write only
  set name(newName: string) {
    this._name = newName;
  }
  set complete(complete: boolean) {
    this._completed = complete;
    this._completedDate = new Date();
  }
}

export interface IDailyTask extends ITask {
  time: string;
}

export class DailyTask extends Task {
  private _time: string
  constructor(dataObj: IDailyTask) {
    super(dataObj);
    this._time = dataObj.time;
  }

  get time(): string {
    return this._time;
  }
  set time(newTime) {
    this._time = newTime;
  }
}