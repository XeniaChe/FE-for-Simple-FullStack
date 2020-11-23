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

const getAllUsersInitial = async () => {
  try {
    //Fetch all users
    await model.getAllUsers(API_URL);
  } catch (error) {
    console.log(error);
  }
};

const onFirstTouchHandler = () => {
  //change touched state
  model.state.searchInputTouced = true;

  //change notification box visibility
  if (model.state.searchInputTouced) {
    searchView.makeVisibleNotifBox(elements.notificationBox);
  }
};

const searchControl = () => {
  let query = elements.searchInput.value;

  // search users
  let filteredPeople = [];
  if (query) {
    filteredPeople = model.state.people.filter((el) =>
      el.name.toLowerCase().includes(query)
    );
  }
  console.log('Filtered persons', filteredPeople);

  //Show notification message accordigly
  if (query.length === 0) {
    searchView.changeNotifMessage(elements.notificationBox, 'Nothing to find');
  }
  if (filteredPeople.length === 0 && query.length > 0) {
    searchView.changeNotifMessage(elements.notificationBox, 'Nothing found');
  }
  if (filteredPeople.length > 0 && query.length !== 0) {
    searchView.showPeople(elements.notificationBox, filteredPeople);
  }
};

const addNewControl = async () => {
  try {
    let name = elements.nameInput.value;
    let age = elements.ageInput.value;

    let newPerson = { name, age };
    if (name !== '' && age !== '') {
      console.log(`New person name:'${name}'  age:${age} created`);
    }

    if (name === '' || age === '') {
      console.log(`Person's name or age is missing`);
    }

    await model.sendNewPerson(API_URL, newPerson);
    addNewView.clearInput();

    addNewView.showNotification(model.state.personCreated, newPerson);

    if (model.state.personCreated) {
      //Refresh all users list
      await model.getAllUsers(API_URL);
      model.resetPersonCreatedState();
    }
    console.log('Form submitted');
  } catch (error) {
    console.log(error);
  }
};

const init = async () => {
  searchView.onFirstClickEvent(onFirstTouchHandler);
  await getAllUsersInitial();
  searchView.onSearchInputEvent(searchControl);

  addNewView.FormSubmitHandler(addNewControl);
};
init();
