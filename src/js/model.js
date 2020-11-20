import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const state = {
  searchInputTouced: false,
  people: null,
  newPerson: null,
  personCreated: false,
  // serverError: null,
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
    throw new error();
  }
};

//TODO

//get new person  from input
export const createNewPerson = (newPerson) => {
  const { name, age } = newPerson;
  state.newPerson = {
    name,
    age,
  };
};

// send a new person
export const sendNewPerson = async (url) => {
  if (
    !state.newPerson ||
    state.newPerson.name === '' ||
    state.newPerson.age === ''
  )
    return;

  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(state.newPerson),
    });
    state.personCreated = result.ok;
  } catch (error) {
    throw new error();
    // state.serverError = error.response.data.error;
    // console.log(error.response.data.error);
  }
};

//reset state to prevent unneeded getAllUsers calls
export const resetPersonCreatedState = () => {
  state.personCreated = false;
};
