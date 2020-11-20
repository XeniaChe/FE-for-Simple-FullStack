import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const state = {
  searchInputTouced: false,
  people: null,
  newPerson: null,
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

//TODO

//get new person  from input
export const getNewPerson = (newPerson) => {
  const { name, age } = newPerson;
  state.newPerson = {
    name,
    age,
  };
};

// send a new person

export const sendNewPerson = async (url) => {
  if (!state.newPerson) return;

  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.newPerson),
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
