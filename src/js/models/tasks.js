"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyTask = void 0;
class Task {
    #id;
    #name;
    #completed;
    #completedDate;
    constructor(dataObj) {
        this.#id = crypto.randomUUID();
        this.#name = dataObj.name;
        this.#completed = dataObj.completed || false;
        this.#completedDate = dataObj.completedDate;
    }
    // read only
    get id() {
        return this.#id;
    }
    get name() {
        return this.#name;
    }
    get isCompleted() {
        return this.#completed;
    }
    get getCompletedDate() {
        if (this.isCompleted())
            return this.#completedDate;
    }
    // write only
    set name(newName) {
        this.#name = newName;
    }
    set complete(complete = true) {
        this.#completed = complete;
        this.#completedDate = new Date();
    }
}
class DailyTask extends Task {
    #time;
    constructor(dataObj) {
        super(dataObj);
        this.#time = dataObj.time;
    }
    get time() {
        return this.#time;
    }
    set time(newTime) {
        this.#time = newTime;
    }
}
exports.DailyTask = DailyTask;
