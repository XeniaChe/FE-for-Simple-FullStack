import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import * as searchView from './views/searchiVew.js';
import * as addNewView from './views/addNewView.js';
import { elements } from './helper';
import { API_URL } from './config.js';

if (module.hot) {
  module.hot.accept();
}

const onFirstTouchHandler = () => {
  //change touched state
  model.state.searchInputTouced = true;

  //change notification box visibility
  if (model.state.searchInputTouced) {
    searchView.makeVisibleNotifBox(elements.notificationBox);
  }
};

const searchControl = async () => {
  let query = elements.searchInput.value.toLowerCase();
  let queryCheck = model.inputAlphabeticCheck(query);

  if (query && queryCheck) {
    await model.getSearchedUsers(API_URL, query);
  }

  //Show notification message accordigly

  if (query.length === 0 || !queryCheck) {
    searchView.changeNotifMessage(elements.notificationBox, 'Nothing to find');
  }
  if (model.state.filteredPeople.length === 0 && query.length > 0) {
    searchView.changeNotifMessage(elements.notificationBox, 'Nothing found');
  }
  if (
    model.state.filteredPeople.length > 0 &&
    query.length !== 0 &&
    queryCheck
  ) {
    searchView.showPeople(elements.notificationBox, model.state.filteredPeople);
  }
};

const addNewControl = async () => {
  try {
    let name = elements.nameInput.value;
    let age = elements.ageInput.value;

    const nameCheck = model.inputAlphabeticCheck(name);

    let newPerson = { name, age };

    if (name === '' || age === '') {
      console.log(`Person's name or age is missing`);
    }

    if (!nameCheck && age !== '' && name !== '') {
      console.log(`Invalid name format`);
    }

    await model.sendNewPerson(API_URL, newPerson, nameCheck);

    addNewView.showNotification(
      model.state.personCreated,
      newPerson,
      nameCheck
    );

    if (model.state.personCreated) {
      addNewView.clearInput();
      model.resetPersonCreatedState();
    }

    console.log('Form submitted');
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  searchView.onFirstClickEvent(onFirstTouchHandler);
  searchView.onSearchInputEvent(searchControl);
  addNewView.FormSubmitHandler(addNewControl);
};
init();
