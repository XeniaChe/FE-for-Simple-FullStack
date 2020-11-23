import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { elements, clean } from '../helper.js';

export const getInput = () => {
  let name = elements.nameInput.value;
  let age = elements.ageInput.value;

  return { name, age };
};

export const showNotification = (status, newPerson) => {
  let { name, age } = newPerson;
  const markUp1 = `<li class="Notification__Item--Success">SUCCESS: Person added</li>`;
  // const markUp2 = `<li class="Notification__Item--Error">${errorMessage}</li>`;
  const markUp3 = `<li class="Notification__Item--Error">ERROR: Name or age is missing</li>`;

  if (status && name !== '' && age !== '') {
    elements.addNewNotifList.insertAdjacentHTML('beforeend', markUp1);
  }
  /*
  if (!status && errorMessage) {
    elements.addNewNotifList.insertAdjacentHTML('afterbegin', markUp2);
  }
  */
  if (name === '' || age === '') {
    elements.addNewNotifList.insertAdjacentHTML('beforeend', markUp3);
  }

  setTimeout(() => {
    clean(elements.addNewNotifList);
  }, 1500);
};

export const clearInput = () => {
  elements.nameInput.value = '';
  elements.ageInput.value = '';
};

export const FormSubmitHandler = (handler) =>
  elements.addNewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handler();
  });
