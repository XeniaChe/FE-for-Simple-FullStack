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

const searchControl = async () => {
  try {
    //Fetch all users
    await model.getAllUsers(API_URL);
  } catch (error) {
    console.log(error);
  }
};

const addNewControl = async () => {
  try {
    let newPerson = addNewView.getInput();
    model.createNewPerson(newPerson);

    await model.sendNewPerson(API_URL);
    addNewView.clearInput();

    addNewView.showNotification(model.state.personCreated, newPerson);

    if (model.state.personCreated) {
      //Refresh all users list
      await model.getAllUsers(API_URL);
      model.resetPersonCreatedState();
    }
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  elements.searchInput.addEventListener('click', () => {
    searchView.onFirstTouchHandler(model.state.searchInputTouced);
  });

  searchControl();

  elements.searchInput.addEventListener('input', () =>
    searchView.onInputHandler(model.state.people)
  );

  elements.addNewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addNewControl();
    console.log('Form submitted');
  });
};
init();
