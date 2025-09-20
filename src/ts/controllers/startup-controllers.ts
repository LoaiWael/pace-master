import StartUp from "../views/startup-view.js";
import Language from "../models/language.js";
import { Profile, setNewProfile, profileObj } from "../models/personal-info.js";
import dailyWork from "../models/daily-work.js";

function checkCurrentPage() {
  if (localStorage) {
    //code here later
  }
}

type fadeAnimation = 'in' | 'out';

export function getDomByID(id: number = 1, animationType: fadeAnimation = 'in'): string {
  let dom;
  switch (id) {
    case 1: dom = `    
        <section class="fade-${animationType}-animation" id="startup-${id}">
          <h1 class="startup-title">Welcome, to PaceMaster</h1>
          <p class="startup-subtitle">Please select a language to continue</p>
          <div class="startup-select-wrapper">
            <select class="startup-select startup-select-js input-field">
              <option value="en">English</option>
              <option value="ar">Arabic</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </section>
        <div class="control-buttons">
          <button type="submit" class="startup-continue startup-continue-js">Continue</button>
        </div>
    `; break;
    case 2: dom = `
        <section class="fade-${animationType}-animation" id="startup-${id}">
          <h1 class="startup-title startup-form-title">Please fill up the form<br> bellow</h1>
          <form class="startup-form startup-form-js" autocomplete="off">
            <div class="startup-form-row">
              <div class="startup-form-names">
                <label for="first-name" class="startup-form-label">Name</label>
                <input id="first-name" class="input-field input-field-js startup-form-input input-field-first-name-js" type="text" placeholder="First name"
                  autocomplete="off" required>
                <input id="last-name" class="input-field input-field-js startup-form-input input-field-last-name-js" type="text" placeholder="Last name"
                  autocomplete="off" required>
              </div>
              <div class="startup-form-age">
                <label for="age" class="startup-form-label">Age</label>
                <input id="age" class="input-field input-field-js startup-form-input input-field-age-js" type="number" min="0" max="99" placeholder="18" required>
              </div>
            </div>
            <div class="startup-form-group">
              <label for="email" class="startup-form-label">Email address</label>
              <input id="email" class="input-field input-field-js startup-form-input input-field-email-js" type="email" placeholder="username@example.com" required>
            </div>
            <div class="startup-form-group startup-form-gender-group">
              <span class="startup-form-label">Gender :</span>
              <div>
                <label class="startup-form-radio-label">
                  <input type="radio" name="gender" class="gender-js" value="male">Male
                </label>
                <label class="startup-form-radio-label">
                  <input type="radio" name="gender" class="gender-js" value="female">Female
                </label>
                <label class="startup-form-radio-label">
                  <input type="radio" name="gender" class="gender-js" value="notsay" checked>Prefer not to say
                </label>
              </div>
            </div>
            <div class="startup-form-note startup-form-note-js">
              Please note that this information is saved in your local storage<br>
              You are the only person who can see it
            </div>
          </form>
        </section>
        <div class="control-buttons">
          <button type="button" class="startup-form-prev startup-form-prev-js">Previous</button>
          <button type="submit" class="startup-continue startup-continue-js">Continue</button>
        </div>
      `; break;
    case 3: dom = `
        <section class="fade-${animationType}-animation" id="startup-${id}">
          <h1 class="startup-title">Hi, Loai</h1>
          <div class="startup-description">
            <p>PaceMaster here helping you to organize your time by separating temporary tasks from your daily routine work</p>
            <p>We are also monitoring your daily work, pushing you to be better.</p>
          </div>
          <div class="startup-wireframes-row">
            <div class="startup-wireframe-col">
              <h2 class="startup-wireframe-title">Temporary tasks</h2>
              <div class="startup-wireframe startup-wireframe-temp">
                <div class="startup-wireframe-task">
                  <span class="startup-noncheck-icon">
                  </span>
                  <div class="startup-wireframe-task-content">
                    <span class="startup-wireframe-task-headline"></span>
                    <span class="startup-wireframe-task-p"></span>
                  </div>
                </div>
                <div class="startup-wireframe-task">
                  <span class="startup-noncheck-icon">
                  </span>
                  <div class="startup-wireframe-task-content">
                    <span class="startup-wireframe-task-headline"></span>
                    <span class="startup-wireframe-task-p"></span>
                  </div>
                </div>
                <div class="startup-wireframe-task">
                  <span class="startup-check-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                      class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                      <path
                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                  </span>
                  <div class="startup-wireframe-task-content">
                    <span class="startup-wireframe-task-headline"></span>
                    <span class="startup-wireframe-task-p"></span>
                  </div>
                </div>
              </div>
            </div>
            <div class="startup-wireframe-col">
              <h2 class="startup-wireframe-title">Daily work</h2>
              <div class="startup-wireframe startup-wireframe-daily">
                <div class="startup-wireframe-day">
                  <div class="startup-wireframe-day-label">Saturday</div>
                  <div class="startup-wireframe-daily-task">
                    <div class="startup-wireframe-task-check">
                      <span class="startup-check-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </span>
                      <span class="startup-wireframe-task-headline"></span>
                      <time class="startup-task-time">2 PM</time>
                    </div>
                    <div class="startup-wireframe-task-check">
                      <span class="startup-check-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </span>
                      <span class="startup-wireframe-task-headline"></span>
                      <time class="startup-task-time">4 PM</time>
                    </div>
                    <div class="startup-wireframe-task-check">
                      <span class="startup-noncheck-icon">
                      </span>
                      <span class="startup-wireframe-task-headline"></span>
                      <time class="startup-task-time">9 PM</time>
                    </div>
                  </div>
                </div>
                <div class="startup-wireframe-day">
                  <div class="startup-wireframe-day-label">Sunday</div>
                  <div class="startup-wireframe-daily-task">
                    <div class="startup-wireframe-task-check">
                      <span class="startup-check-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </span>
                      <span class="startup-wireframe-task-headline"></span>
                      <time class="startup-task-time">2 PM</time>
                    </div>
                    <div class="startup-wireframe-task-check">
                      <span class="startup-check-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                          class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                          <path
                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg>
                      </span>
                      <span class="startup-wireframe-task-headline"></span>
                      <time class="startup-task-time">4 PM</time>
                    </div>
                    <div class="startup-wireframe-task-check">
                      <span class="startup-noncheck-icon">
                      </span>
                      <span class="startup-wireframe-task-headline"></span>
                      <time class="startup-task-time">9 PM</time>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div class="control-buttons">
          <button type="button" class="startup-form-prev startup-form-prev-js">Previous</button>
          <button type="submit" class="startup-continue startup-continue-js">Continue</button>
        </div>
      `; break;
    case 4: dom = `
        <section class="fade-${animationType}-animation" id="startup-${id}">
          <h1 class="startup-title">Getting started</h1>
          <div class="startup-subtitles">
            <p class="startup-subtitle">Before joining our experience, please start collecting your day to day work like
              going
              to work or school, studying, going to gymp and so on.</p>
            <p class="startup-subtitle">You can only create two tables <br>first one is permanent and can be edited later
              <br>second one is temporary like going on a summer vacation and need to record your days
            </p>
            <p class="startup-subtitle">But for now you need to initialize your main permanent table</p>
            <p class="startup-subtitle">Once your daily data are collected, start recording it now !
            </p>
          </div>
          <button class="startup-create-table-button startup-create-table-button-js">Create my table</button>
        </section>
        <div class="control-buttons">
          <button type="button" class="startup-form-prev startup-form-prev-js">Previous</button>
          <button type="submit" class="startup-continue startup-continue-js" disabled >Complete</button>
        </div>
      `; break;
  }
  return dom as string;
}

export function continueButton(currentId: number): StartUp {
  if (currentId === 1) {
    const inputVal = (document.querySelector('.startup-select') as HTMLInputElement)?.value;
    new Language(inputVal);
  }
  else if (currentId === 2) {
    const firstName = document.querySelector('.input-field-first-name-js') as HTMLInputElement;
    const lastName = document.querySelector('.input-field-last-name-js') as HTMLInputElement;
    //update later
    const age = document.querySelector('.input-field-age-js') as HTMLInputElement;
    //
    const email = document.querySelector('.input-field-email-js') as HTMLInputElement;
    let gender: string = 'notsay';
    document.querySelectorAll('.gender-js').forEach(radio => {
      if ((radio as HTMLInputElement).checked)
        gender = (radio as HTMLInputElement).value;
    });;

    setNewProfile({
      firstName: firstName?.value,
      lastName: lastName?.value,
      age: Number(age?.value),
      email: email?.value,
      gender: gender as any
    });

  }
  else if (currentId === 4) {
    return new StartUp(currentId, getDomByID(currentId, 'in'));
  }

  const nextId = currentId + 1;
  const nextStartUp = new StartUp(nextId, getDomByID(nextId, 'in'));
  return nextStartUp;
}

export function previousButton(currentId: number): StartUp {
  const previousId = currentId - 1;
  const previousStartUp = new StartUp(previousId, getDomByID(previousId, 'in'));
  return previousStartUp;
}

export function checkFormValidation() {
  const form = document.querySelector('.startup-form-js') as HTMLFormElement;
  if (form)
    if (form.checkValidity()) {
      return true;
    } else {
      form.reportValidity();
    }
}

export function insertFormValues() {
  if (localStorage.getItem('personal-data')) {
    const info = JSON.parse(localStorage.getItem('personal-data'));
    document.querySelector('.input-field-first-name-js').value = info.firstName;
    document.querySelector('.input-field-last-name-js').value = info.lastName;
    //update later
    document.querySelector('.input-field-age-js').value = info.age;
    //
    document.querySelector('.input-field-email-js').value = info.email;
    document.querySelectorAll('.gender-js').forEach(input => {
      if (info.gender === input.value) {
        input.setAttribute('checked', 'checked');
      }
    });
  }
}

export function insertLangValue() {
  if (localStorage.getItem('lang')) {
    const choosenLang = localStorage.getItem('lang');
    document.querySelectorAll('.startup-select-js option').forEach(option => {
      if (option.value === choosenLang)
        option.setAttribute('selected', 'selected');
    });
  }
}

export function addNewDailyTask(targetDay) {
  const tasksList = document.querySelector(`.task-list-${targetDay}-js`);

  tasksList.insertAdjacentHTML('beforeend',
    `
    <div class="task-item new-task-item new-task-item-js">
      <form class="new-task-form-js">
        <div class="new-task-input">
          <input type="text" class="input-field input-field-text-js" placeholder="Task name" name="taskName" required data-day="${targetDay}">
          <input type="time" class="input-field input-field-time input-field-time-js" title="task time" name="taskTime"
            required data-day="${targetDay}">
        </div>
        <button type="submit" class="task-save task-save-js" title="Save task" data-day="${targetDay}">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
            class="bi bi-calendar-check-fill" viewBox="0 0 16 16">
            <path
              d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2m-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708" />
          </svg> Save task
        </button>
        <button type="button" class="task-delete new-task-delete-js" title="Delete task" data-day="${targetDay}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
              fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
    `
  );

  document.querySelector('.new-task-form-js').addEventListener('submit', (e) => {
    e.preventDefault();
    saveTask(targetDay, tasksList);
  });

  cancelNewTask(targetDay, tasksList);
}

function cancelNewTask(targetDay, tasksList) {

  const newTaskFormDel = document.querySelector('.new-task-delete-js');

  if (newTaskFormDel) {
    newTaskFormDel.addEventListener('click', () => {
      const newTaskItem = document.querySelector('.new-task-item-js');
      if (newTaskItem) {
        newTaskItem.classList.add('delete-field');
        setTimeout(() => {
          tasksList.removeChild(newTaskItem);
          document.querySelector(`.add-task-button-js[data-day="${targetDay}"]`).removeAttribute('disabled');
        }, 350);
      }
    });
  }
}

function saveTask(targetDay, tasksList) {
  const nameInput = document.querySelector(`.input-field-text-js[data-day="${targetDay}"]`);
  const timeInput = document.querySelector(`.input-field-time-js[data-day="${targetDay}"]`);

  const taskData = {
    name: nameInput.value.trim(),
    time: timeInput.value
  };

  if (taskData.name.length < 2) {
    alert('Task name must be at least 2 characters long');
    return;
  }

  dailyWork.addTask(taskData, targetDay);

  const newTaskItem = document.querySelector('.new-task-item-js');
  tasksList.removeChild(newTaskItem);

  document.querySelector(`.add-task-button-js[data-day="${targetDay}"]`).removeAttribute('disabled');

  // tasksList.insertAdjacentHTML('beforeend',`
  //   <div class="task-item">
  //     <span class="task-text">${dailyWork[targetDay]}</span>
  //     <div class="task-actions">
  //       <span class="task-time">7:00 PM</span>
  //       <button class="task-delete" title="Delete task">
  //         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
  //             fill="currentColor" />
  //         </svg>
  //       </button>
  //     </div>
  //   </div>
  // `);
}