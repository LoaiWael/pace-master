class Task {
    _id;
    _name;
    _completed;
    _completedDate;
    constructor(dataObj) {
        this._id = crypto.randomUUID();
        this._name = dataObj.name;
        this._completed = dataObj.completed || false;
        this._completedDate = dataObj.completedDate;
    }
    // read only
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    get isCompleted() {
        return this._completed;
    }
    get getCompletedDate() {
        if (this.isCompleted) {
            return this._completedDate;
        }
        else {
            return null;
        }
    }
    // write only
    set name(newName) {
        this._name = newName;
    }
    set complete(complete) {
        this._completed = complete;
        this._completedDate = new Date();
    }
}
export class DailyTask extends Task {
    _time;
    constructor(dataObj) {
        super(dataObj);
        this._time = dataObj.time;
    }
    get time() {
        return this._time;
    }
    set time(newTime) {
        this._time = newTime;
    }
}
