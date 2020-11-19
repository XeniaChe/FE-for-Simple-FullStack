import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const state = {
  searchInputTouced: false,
  people: null,
};

//TODO
// pass proper error from the server

export const getAllUsers = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    state.people = data;
    console.log(state.people);
  } catch (error) {
    console.log(error);
  }
};
