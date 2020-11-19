import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import * as searchView from './searchiVew.js';
import { elements } from './helper';
import { API_URL } from './config.js';

const searchControl = async () => {
  //Fetch all users
  await model.getAllUsers(API_URL);

  elements.searchInput.addEventListener('input', () =>
    searchView.onInputHandler(model.state.people)
  );

  elements.searchInput.addEventListener('click', () => {
    searchView.onFirstTouchHandler(model.state.searchInputTouced);
  });
};

const init = () => {
  searchControl();
};
init();
