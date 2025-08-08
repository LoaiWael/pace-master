import StartUp from "../views/startup-view.js";
import Language from "../models/language.js";
import { Profile, setNewProfile, profileObj } from "../models/personal-info.js";

function checkDom() {
  if (localStorage) {
    //code here later
  }
}

export function getDomByID(id = 1, animationType = 'in') {
  let dom;
  switch (id) {
    case 1: dom = `    
        <section class="fade-${animationType}-animation" id="startup-${id}">
          <h1 class="startup-title">Welcome, to PlanIt</h1>
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
            <p>PlanIt here helping you to organize your time by separating temporary tasks from your daily routine work</p>
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
          <button class="startup-create-table-button">Create my table</button>
        </section>
        <div class="control-buttons">
          <button type="button" class="startup-form-prev startup-form-prev-js">Previous</button>
          <button type="submit" class="startup-continue startup-continue-js" disabled >Complete</button>
        </div>
      `; break;
  }
  return dom;
}

export function continueButton(currentId) {
  if (currentId === 1) {
    const inputVal = document.querySelector('.startup-select').value;
    new Language(inputVal);
  }
  else if (currentId === 2) {
    const firstName = document.querySelector('.input-field-first-name-js');
    const lastName = document.querySelector('.input-field-last-name-js');
    //update later
    const age = document.querySelector('.input-field-age-js');
    //
    const email = document.querySelector('.input-field-email-js');
    let gender;
    document.querySelectorAll('.gender-js').forEach(radio => {
      if (radio.checked)
        gender = radio;
    });;

    setNewProfile({
      firstName: firstName.value,
      lastName: lastName.value,
      age: age.value,
      email: email.value,
      gender: gender.value
    });

  }
  else if (currentId === 4) {
    return new StartUp(currentId, getDomByID(currentId, 'in'));
  }

  const nextId = currentId + 1;
  const nextStartUp = new StartUp(nextId, getDomByID(nextId, 'in'));
  return nextStartUp;
}

export function previousButton(currentId) {
  const previousId = currentId - 1;
  const previousStartUp = new StartUp(previousId, getDomByID(previousId, 'in'));
  return previousStartUp;
}

export function checkFormValidation() {
  const form = document.querySelector('.startup-form-js');

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