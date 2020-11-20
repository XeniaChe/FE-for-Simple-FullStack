import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { elements, clean } from '../helper.js';

//Toogle notification visibility
const makeVisibleNotifBox = (element) => {
  element.classList.remove('Search__Message-box--invisible');
  element.classList.add('Search__Message-box--visible');
};

// ON TOUCHED EVENT HANDLER
export const onFirstTouchHandler = (touchedState) => {
  //change touched state
  touchedState = true;

  //change notification visibility
  if (touchedState) {
    makeVisibleNotifBox(elements.notificationBox);
  }
};

/// SEARCH USERS
const getSearchedUser = (query, db) => {
  let filteredPeople = [];

  if (query) {
    filteredPeople = db.filter((el) => el.name.toLowerCase().includes(query));
  }

  return filteredPeople;
};

// Change notif  messgae
const changeNotifMessage = (element, message) => {
  clean(element);
  let markUp = `<p>${message}<p>`;
  element.innerHTML = markUp;
};

//Append users list if exist
const showPeople = (element, usersList) => {
  let listMarkUp = ` <ul class="Search__Users-List">
    ${usersList.map((el) => `<li>${el.name} - ${el.age}</li>`).join('')}
    </ul>`;

  clean(element);
  element.insertAdjacentHTML('afterbegin', listMarkUp);
};

//SEARCH INPUT HANDLER
export const onInputHandler = (db) => {
  // let query = event.target.value;

  let query = elements.searchInput.value;

  //Get filtered users
  const persons = getSearchedUser(query, db);
  console.log('Filtered persons', persons);

  //Show notification message accordigly
  if (query.length === 0) {
    changeNotifMessage(elements.notificationBox, 'Nothing to find');
  }
  if (persons.length === 0 && query.length > 0) {
    changeNotifMessage(elements.notificationBox, 'Nothing found');
  }
  if (persons.length > 0 && query.length !== 0) {
    showPeople(elements.notificationBox, persons);
  }
};
