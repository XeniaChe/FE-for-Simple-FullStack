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
  elements.searchInput.addEventListener('click', () => {
    searchView.onFirstTouchHandler(model.state.searchInputTouced);
  });

  //Fetch all users
  await model.getAllUsers(API_URL);

  elements.searchInput.addEventListener('input', () =>
    searchView.onInputHandler(model.state.people)
  );
};

const addNewControl = async () => {
  //On form submitt send new person obj to state
  elements.addNewForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let newPerson = addNewView.getInput();
    model.getNewPerson(newPerson);
    console.log(newPerson);
    console.log(model.state.newPerson);

    model.sendNewPerson(API_URL);
  });
};

const init = () => {
  searchControl();
  addNewControl();
};
init();
