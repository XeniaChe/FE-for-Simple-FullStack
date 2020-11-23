import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const state = {
  searchInputTouced: false,
  people: null,
  newPerson: null,
  personCreated: false,
};

export const getAllUsers = async (url) => {
  try {
    const result = await fetch(url);
    const data = await result.json();
    state.people = data;
    console.log(`People fetched from server  ${JSON.stringify(state.people)}`);
  } catch (error) {
    throw new error();
  }
};

//get new person  from input
export const createNewPerson = (newPerson) => {
  const { name, age } = newPerson;
  state.newPerson = {
    name,
    age,
  };
  console.log(`New person name:'${name}'  age:${age} created`);
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
    console.log(
      `The person name: '${state.newPerson.name}' age:${state.newPerson.age} was successfully sent`
    );
  } catch (error) {
    throw new error();
  }
};

//reset state to prevent unneeded getAllUsers calls
export const resetPersonCreatedState = () => {
  state.personCreated = false;
};
