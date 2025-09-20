"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_js_1 = require("./tasks.js");
class DailyWork {
    saturday;
    sunday;
    monday;
    tuesday;
    wednesday;
    thursday;
    friday;
    weekend;
    constructor(dataObj) {
        this.saturday = dataObj.saturday;
        this.sunday = dataObj.sunday;
        this.monday = dataObj.monday;
        this.tuesday = dataObj.tuesday;
        this.wednesday = dataObj.wednesday;
        this.thursday = dataObj.thursday;
        this.friday = dataObj.friday;
        this.weekend = dataObj.weekend;
        this.#updateLocalStorage();
    }
    addTask(task, day) {
        const rightDay = this.#findDay(day);
        rightDay.push(new tasks_js_1.DailyTask(task));
        this.#sortTasksByTime(rightDay);
        this.#updateLocalStorage();
    }
    removeTask(taskId, day) {
        const rightDay = this.#findDay(day);
        rightDay.filter(task => task.id !== taskId);
        this.#updateLocalStorage();
    }
    editTask(taskId, day, newName, newTime) {
        const rightDay = this.#findDay(day);
        const task = rightDay.find(taskItem => taskItem.id === taskId);
        task.setName(newName || task.name);
        task.setTime(newTime || task.name);
        this.#sortTasksByTime(rightDay);
        this.#updateLocalStorage();
    }
    #dayToPlainObjects(day) {
        return day?.map(task => this.#taskToPlainObject(task));
    }
    #taskToPlainObject(task) {
        return {
            id: task.id,
            name: task.name,
            completed: task.isCompleted,
            completedDate: task.getCompleteDate,
            time: task.time
        };
    }
    #updateLocalStorage() {
        localStorage.setItem('daily-work', JSON.stringify({
            saturday: this.#dayToPlainObjects(this.saturday),
            sunday: this.#dayToPlainObjects(this.sunday),
            monday: this.#dayToPlainObjects(this.monday),
            tuesday: this.#dayToPlainObjects(this.tuesday),
            wednesday: this.#dayToPlainObjects(this.wednesday),
            thursday: this.#dayToPlainObjects(this.thursday),
            friday: this.#dayToPlainObjects(this.friday),
            weekend: this.#dayToPlainObjects(this.weekend)
        }));
    }
    #findDay(day) {
        let rightDay;
        switch (day) {
            case 'saturday':
                rightDay = this.saturday;
                break;
            case 'sunday':
                rightDay = this.sunday;
                break;
            case 'monday':
                rightDay = this.monday;
                break;
            case 'tuesday':
                rightDay = this.tuesday;
                break;
            case 'wednesday':
                rightDay = this.wednesday;
                break;
            case 'thursday':
                rightDay = this.thursday;
                break;
            case 'friday':
                rightDay = this.friday;
                break;
        }
        return rightDay;
    }
    #sortTasksByTime(day, ascending = true) {
        function timeToMinutes(timeString) {
            if (!timeString)
                return 0;
            const [hours, minutes] = timeString.split(':').map(Number);
            return hours * 60 + minutes;
        }
        day.sort((a, b) => {
            const timeA = timeToMinutes(a.time);
            const timeB = timeToMinutes(b.time);
            return ascending ? timeA - timeB : timeB - timeA;
        });
    }
}
exports.default = new DailyWork(loadFromLocalStorage() || {
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    weekend: []
});
function loadFromLocalStorage() {
    const saved = localStorage.getItem('daily-work');
    if (!saved)
        return null;
    const data = JSON.parse(saved);
    return {
        saturday: data.saturday?.map(obj => new tasks_js_1.DailyTask(obj)) || [],
        sunday: data.sunday?.map(obj => new tasks_js_1.DailyTask(obj)) || [],
        monday: data.monday?.map(obj => new tasks_js_1.DailyTask(obj)) || [],
        tuesday: data.tuesday?.map(obj => new tasks_js_1.DailyTask(obj)) || [],
        wednesday: data.wednesday?.map(obj => new tasks_js_1.DailyTask(obj)) || [],
        thursday: data.thursday?.map(obj => new tasks_js_1.DailyTask(obj)) || [],
        friday: data.friday?.map(obj => new tasks_js_1.DailyTask(obj)) || [],
        weekend: data.weekend?.map(obj => new tasks_js_1.DailyTask(obj)) || []
    };
}
