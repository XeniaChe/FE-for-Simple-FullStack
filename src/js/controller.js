import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import * as searchView from './searchiVew.js';
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

const init = () => {
  searchControl();
};
init();
