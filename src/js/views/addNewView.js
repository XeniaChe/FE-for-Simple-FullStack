import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { elements } from '../helper.js';

export const getInput = () => {
  let name = elements.nameInput.value;
  let age = elements.ageInput.value;

  return { name, age };
};

export const showNotification = (status, errorMessage) => {
  const markUp1 = `<li class="Notification__Item--Success">Person added</li>`;
  const markUp2 = `<li class="Notification__Item--Error">${errorMessage}</li>`;

  if (status) {
    elements.addNewNotifList.insertadjacenthtml('afterbegin', markUp1);
  }

  if (!status) {
    elements.addNewNotifList.insertadjacenthtml('afterbegin', markUp2);
  }
};

export const clearInput = () => {
  elements.nameInput.value = '';
  elements.ageInput.value = '';
};
