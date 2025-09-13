import { continueButton, previousButton, getDomByID, checkFormValidation, insertFormValues, insertLangValue, addNewDailyTask } from "../controllers/startup-controllers.js";

export default class StartUp {
  #id
  #dom
  constructor(id, dom) {
    this.#id = id;
    this.#dom = dom;
  }

  getId() {
    return this.#id;
  }

  getDom() {
    return this.#dom;
  }
}

let currentId;
[...document.querySelector('.startup-container-js section').id].forEach(digit => {
  if (Number(digit)) {
    currentId = Number(digit);
  }
});

let currentPage = new StartUp(currentId, getDomByID(currentId, 'in'));

function activeContinueButton() {
  document.querySelector('.startup-continue-js').addEventListener('click', () => {

    nextPageCheck(renderNextPage);

    function renderNextPage() {
      const startupContainer = document.querySelector('.startup-container-js');
      const startupSection = document.querySelector('.startup-container-js section');

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        startupSection.classList.add('fade-out-animation');
        startupContainer.classList.add('startup-container-no-height');
      }

      setTimeout(() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          startupContainer.classList.remove('startup-container-no-height');
        }
        currentPage = continueButton(currentPage.getId());
        startupContainer.innerHTML = currentPage.getDom();
        activeStartUpButtons();
      }, 340);
    }
  });
}

function activePreviousButton() {
  document.querySelector('.startup-form-prev-js').addEventListener('click', () => {

    previousPageCheck(renderPreviousPage);

    function renderPreviousPage() {
      const startupContainer = document.querySelector('.startup-container-js');
      const startupSection = document.querySelector('.startup-container-js section');

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        startupSection.classList.add('fade-out-animation');
        startupContainer.classList.add('startup-container-no-height');
      }

      setTimeout(() => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          startupContainer.classList.remove('startup-container-no-height');
        }
        currentPage = previousButton(currentPage.getId());
        startupContainer.innerHTML = currentPage.getDom();

        activeStartUpButtons();
      }, 340);
    }
  });
}

function activeStartUpButtons() {
  activeContinueButton();
  if (currentPage.getId() !== 1)
    activePreviousButton();
}

function nextPageCheck(renderPage) {
  if (currentPage.getId() === 1) {
    renderPage();
    setTimeout(() => { insertFormValues(); }, 350);
  }
  else if (currentPage.getId() === 2) {
    checkFormValidation();
    if (checkFormValidation()) {
      renderPage();
    }
    else {
      checkFormValidation();
    }
  }
  else if (currentPage.getId() === 3) {
    renderPage();
    setTimeout(() => { activeCreateTableButton(); }, 350);
  }
  else {
    renderPage();
  }
}

function previousPageCheck(renderPage) {
  if (currentPage.getId() === 3) {
    renderPage();
    setTimeout(() => { insertFormValues(); }, 350);
  }
  else if (currentPage.getId() === 2) {
    renderPage();
    setTimeout(() => { insertLangValue(); }, 350);
  }
  else {
    renderPage();
  }
}

function renderDailyWork() {
  document.querySelector('body').insertAdjacentHTML('beforeend', `
    <section class="overlay">
    <div class="overlay-backdrop"></div>
    <div class="overlay-content">
      <!-- Header Section -->
      <div class="daily-work-header">
        <h1 class="daily-work-title">Daily work</h1>
        <div class="day-selector">
          <span class="day-selector-label">Weekend :</span>
          <div class="day-buttons">
            <button class="day-button" data-day="saturday">Saturday</button>
            <button class="day-button" data-day="sunday">Sunday</button>
            <button class="day-button" data-day="monday">Monday</button>
            <button class="day-button" data-day="tuesday">Tuesday</button>
            <button class="day-button" data-day="wednesday">Wednesday</button>
            <button class="day-button active" data-day="thursday">Thursday</button>
            <button class="day-button active" data-day="friday">Friday</button>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="daily-work-content">
        <!-- Saturday Card -->
        <div class="day-card">
          <h2 class="day-card-title">Saturday</h2>
          <div class="task-list task-list-saturday-js">
            <div class="task-item">
              <span class="task-text">Working on my career</span>
              <div class="task-actions">
                <span class="task-time">2:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="task-item">
              <span class="task-text">Going to the Gym</span>
              <div class="task-actions">
                <span class="task-time">7:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="task-item">
              <span class="task-text">Studying for faculty</span>
              <div class="task-actions">
                <span class="task-time">9:30 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="add-task-button add-task-button-js" data-day="saturday">Add new</button>
        </div>

        <!-- Sunday Card -->
        <div class="day-card">
          <h2 class="day-card-title">Sunday</h2>
          <div class="task-list">
            <div class="task-item">
              <span class="task-text">Problem solving</span>
              <div class="task-actions">
                <span class="task-time">2:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="task-item">
              <span class="task-text">Going to the Gym</span>
              <div class="task-actions">
                <span class="task-time">7:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="task-item">
              <span class="task-text">Studying for faculty</span>
              <div class="task-actions">
                <span class="task-time">9:30 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="add-task-button">Add new</button>
        </div>

        <!-- Monday Card -->
        <div class="day-card">
          <h2 class="day-card-title">Monday</h2>
          <div class="task-list">
            <div class="task-item">
              <span class="task-text">Working on my career</span>
              <div class="task-actions">
                <span class="task-time">2:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="task-item">
              <span class="task-text">Washing the car</span>
              <div class="task-actions">
                <span class="task-time">6:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="task-item">
              <span class="task-text">Chilling outside</span>
              <div class="task-actions">
                <span class="task-time">7:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="task-item">
              <span class="task-text">Studying for faculty</span>
              <div class="task-actions">
                <span class="task-time">9:30 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="add-task-button">Add new</button>
        </div>

        <!-- Tuesday Card -->
        <div class="day-card">
          <h2 class="day-card-title">Tuesday</h2>
          <div class="task-list">
            <div class="task-item">
              <span class="task-text">Problem solving</span>
              <div class="task-actions">
                <span class="task-time">2:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="add-task-button">Add new</button>
        </div>

        <!-- Wednesday Card -->
        <div class="day-card">
          <h2 class="day-card-title">Wednesday</h2>
          <div class="task-list">
            <div class="task-item">
              <span class="task-text">Working on my career</span>
              <div class="task-actions">
                <span class="task-time">2:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="add-task-button">Add new</button>
        </div>

        <!-- Thursday Card (Active) -->
        <div class="day-card active">
          <h2 class="day-card-title">Thursday</h2>
          <div class="task-list">
            <div class="task-item">
              <span class="task-text">Problem solving</span>
              <div class="task-actions">
                <span class="task-time">2:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="add-task-button">Add new</button>
        </div>
        <div class="day-card active">
          <h2 class="day-card-title">Friday</h2>
          <div class="task-list">
            <div class="task-item">
              <span class="task-text">Problem solving</span>
              <div class="task-actions">
                <span class="task-time">2:00 PM</span>
                <button class="task-delete" title="Delete task">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                      fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <button class="add-task-button">Add new</button>
        </div>
      </div>

      <!-- Close Button -->
      <button class="daily-work-close" title="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
            fill="currentColor" />
        </svg>
      </button>
      <button class="daily-work-save" title="save">Save</button>
    </div>
  </section>
  `);

  const addTaskButtons = document.querySelectorAll('.add-task-button-js');
  addTaskButtons.forEach(button => {
    button.addEventListener('click', () => {
      addNewDailyTask(button.dataset.day);
      button.setAttribute('disabled', 'disabled');
    });
  });
}

function activeCreateTableButton() {
  document.querySelector('.startup-create-table-button-js').addEventListener('click', renderDailyWork);
}

activeStartUpButtons();