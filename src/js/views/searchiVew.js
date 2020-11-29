import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { elements, clean } from '../helper.js';

//Toogle notification visibility
export const makeVisibleNotifBox = (element) => {
  element.classList.remove('Search__Message-box--invisible');
  element.classList.add('Search__Message-box--visible');
};

export const changeNotifMessage = (element, message) => {
  clean(element);
  let markUp = `<p>${message}<p>`;
  element.innerHTML = markUp;
};

//Append users list if exist
export const showPeople = (element, usersList) => {
  let listMarkUp = ` <ul class="Search__Users-List">
    ${usersList.map((el) => `<li>${el.name} - ${el.age}</li>`).join('')}
    </ul>`;

  clean(element);
  element.insertAdjacentHTML('afterbegin', listMarkUp);
};

// ON FIRST TOUCH EVENT HANDLER
export const onFirstClickEvent = (handler) => {
  elements.searchInput.addEventListener('click', () => {
    handler();
  });
};

// ON SEARCH EVENT HANDLER
const debounce = (func, wait) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

const debounce2 = (callback, wait) => {
  let timeout;

  return (...args) => {
    const later = () => {
      callback(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const onSearchInputEvent = (handler) => {
  elements.searchInput.addEventListener('input', debounce2(handler, 1000));
};
