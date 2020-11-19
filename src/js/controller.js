import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import * as searchView from './searchiVew.js';
import { elements } from './helper';

const init = () => {
  elements.searchInput.addEventListener('input', () =>
    searchView.onInputHandler(model.db)
  );

  //SEARCH INPUT ON TOUCHED EVENT HANDLER
  elements.searchInput.addEventListener('click', () => {
    searchView.onFirstTouchHandler(model.state.searchInputTouced);
  });
};
init();
