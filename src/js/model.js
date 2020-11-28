import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const state = {
  searchInputTouced: false,
  filteredPeople: [],
  newPerson: null,
  personCreated: false,
};

export const getSearchedUsers = async (url, query) => {
  try {
    let queryParam = `?searcQuery=${query}`;
    const result = await fetch(url + queryParam);
    const data = await result.json();
    state.filteredPeople = data;
    console.log(`search fired`);
    console.log(
      ` Fetched from server people for query "${query}": ${JSON.stringify(
        state.filteredPeople
      )}`
    );
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

export const inputAlphabeticCheck = (q) => {
  const regEx = /[a-zA-Z ]+/;
  return regEx.test(q);
};
