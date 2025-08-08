import { continueButton, previousButton, getDomByID, checkFormValidation, insertFormValues, insertLangValue } from "../controllers/startup-controllers.js";

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

activeStartUpButtons();