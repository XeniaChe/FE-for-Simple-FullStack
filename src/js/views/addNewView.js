import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { elements } from '../helper.js';

export const getInput = () => {
  let name = elements.nameInput.value;
  let age = elements.ageInput.value;

  return { name, age };
};
