import { DailyTask } from "./tasks.js";
class DailyWork {
    static is12HourFormat;
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
        this.updateLocalStorage();
        DailyWork.is12HourFormat = DailyWork.findIf12Hour();
    }
    addTask(task, day) {
        const newTask = new DailyTask(task);
        const rightDay = this.findDay(day);
        rightDay.push(newTask);
        this.sortTasksByTime(rightDay);
        this.formatTime(newTask);
        this.updateLocalStorage();
        return newTask;
    }
    removeTask(taskId, day) {
        const rightDay = this.findDay(day);
        for (let i = 0; i < rightDay.length; i++) {
            if (rightDay[i]?.id === taskId) {
                rightDay.splice(i, 1);
                break;
            }
        }
        this.updateLocalStorage();
    }
    editTask(taskId, day, newName, newTime) {
        const rightDay = this.findDay(day);
        const task = rightDay.find(taskItem => taskItem.id === taskId);
        if (task) {
            task.name = newName || task.name;
            task.time = newTime || task.name;
        }
        this.sortTasksByTime(rightDay);
        this.formatTime(task);
        this.updateLocalStorage();
        return task;
    }
    dayToPlainObjects(day) {
        return day?.map(task => this.taskToPlainObject(task));
    }
    taskToPlainObject(task) {
        return {
            id: task.id,
            name: task.name,
            completed: task.isCompleted,
            completedDate: task.getCompletedDate,
            time: task.time
        };
    }
    updateLocalStorage() {
        localStorage.setItem('daily-work', JSON.stringify({
            saturday: this.dayToPlainObjects(this.saturday),
            sunday: this.dayToPlainObjects(this.sunday),
            monday: this.dayToPlainObjects(this.monday),
            tuesday: this.dayToPlainObjects(this.tuesday),
            wednesday: this.dayToPlainObjects(this.wednesday),
            thursday: this.dayToPlainObjects(this.thursday),
            friday: this.dayToPlainObjects(this.friday),
            weekend: this.weekend
        }));
    }
    findDay(day) {
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
    sortTasksByTime(day, ascending = true) {
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
    static findIf12Hour() {
        const formatter = new Intl.DateTimeFormat(navigator.language, {
            hour: 'numeric'
        });
        const testDate = new Date(2023, 0, 1, 13, 0, 0);
        const formattedTime = formatter.format(testDate);
        // Check if the formatted time contains AM/PM indicators
        const is12Hour = /AM|PM|am|pm/.test(formattedTime);
        return is12Hour ? true : false;
    }
    formatTime(task) {
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
function loadFromLocalStorage() {
    const saved = localStorage.getItem('daily-work');
    if (!saved)
        return null;
    const data = JSON.parse(saved);
    return {
        saturday: data.saturday?.map((obj) => new DailyTask(obj)) || [],
        sunday: data.sunday?.map((obj) => new DailyTask(obj)) || [],
        monday: data.monday?.map((obj) => new DailyTask(obj)) || [],
        tuesday: data.tuesday?.map((obj) => new DailyTask(obj)) || [],
        wednesday: data.wednesday?.map((obj) => new DailyTask(obj)) || [],
        thursday: data.thursday?.map((obj) => new DailyTask(obj)) || [],
        friday: data.friday?.map((obj) => new DailyTask(obj)) || [],
        weekend: data.weekend?.map((obj) => new DailyTask(obj)) || []
    };
}
