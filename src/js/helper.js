//DOM ELEMENTS
export const elements = {
  notificationBox: document.querySelector('#notifBox'),
  searchInput: document.querySelector('#search-iput'),
  addNewForm: document.querySelector('#addNew-form'),
  nameInput: document.querySelector('#name-input'),
  ageInput: document.querySelector('#age-input'),
};

export const clean = (element) => {
  element.innerHTML = '';
};
