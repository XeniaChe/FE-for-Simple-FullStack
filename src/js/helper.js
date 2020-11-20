//DOM ELEMENTS
export const elements = {
  notificationBox: document.querySelector('#notifBox'),
  searchInput: document.querySelector('#search-iput'),
  addNewForm: document.querySelector('#addNew-form'),
  nameInput: document.querySelector('#name-input'),
  ageInput: document.querySelector('#age-input'),
  addNewNotifList: document.querySelector('.Notification__List'),
};

export const clean = (element) => {
  element.innerHTML = '';
};

export const clearInput = (element) => {
  element.value = '';
};
