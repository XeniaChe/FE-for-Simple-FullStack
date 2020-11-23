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

// send the new person
export const sendNewPerson = async (url, newPerson) => {
  if (!newPerson || newPerson.name === '' || newPerson.age === '') {
    console.log(`Person wasn't sent`);
    return;
  }

  try {
    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPerson),
    });
    state.personCreated = result.ok;
    console.log(
      `The person name: '${newPerson.name}' age:${newPerson.age} was successfully sent`
    );
  } catch (error) {
    throw new error();
  }
};

//reset state to prevent unneeded getAllUsers calls
export const resetPersonCreatedState = () => {
  state.personCreated = false;
};
