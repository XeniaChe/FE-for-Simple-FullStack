import 'core-js/stable';
import 'regenerator-runtime/runtime';

export const state = {
  searchInputTouced: false,
  people: null,
};

//TODO

// Load DB items from server (Fetch request)

export const db = {
  people: [
    { name: 'John', age: 27 },
    { name: 'Jack', age: 19 },
    { name: 'Mack', age: 51 },
    { name: 'Sasin', age: 70 },
    { name: 'Richard', age: 34 },
    { name: 'Andrew', age: 42 },
  ],
};
