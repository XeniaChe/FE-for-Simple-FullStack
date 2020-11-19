import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as helpers from './helper.js';

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
    makeVisibleNotifBox(helpers.elements.notificationBox);
  }
};

/// SEARCH USERS
//Find elemnet in DB based on user's input
const getSearchedUser = (query, db) => {
  let filteredUsers = [];

  if (query) {
    filteredUsers = db.people.filter((el) =>
      el.name.toLowerCase().includes(query)
    );
  }

  return filteredUsers;
};

// Change notif  messgae
const changeNotifMessage = (element, message) => {
  helpers.clean(element);
  let markUp = `<p>${message}<p>`;
  element.innerHTML = markUp;
};

//Append users list if exist
const showUsers = (element, usersList) => {
  let listMarkUp = ` <ul class="Search__Users-List">
    ${usersList.map((el) => `<li>${el.name} - ${el.age}</li>`).join('')}
    </ul>`;

  helpers.clean(element);
  element.insertAdjacentHTML('afterbegin', listMarkUp);
};

//SEARCH INPUT HANDLER
export const onInputHandler = (db) => {
  // Get user's input
  let query = event.target.value;

  //Get filtered users
  const users = getSearchedUser(query, db);
  console.log('Filtered users', users);

  //Show notification message accordigly
  if (query.length === 0) {
    changeNotifMessage(helpers.elements.notificationBox, 'Nothing to find');
  }
  if (users.length === 0 && query.length > 0) {
    changeNotifMessage(helpers.elements.notificationBox, 'Nothing found');
  }
  if (users.length > 0 && query.length !== 0) {
    showUsers(helpers.elements.notificationBox, users);
  }
};
