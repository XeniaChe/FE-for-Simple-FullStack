//DOM ELEMENTS
export const elements = {
  notificationBox: document.querySelector('#notifBox'),
  searchInput: document.querySelector('#search-iput'),
};

export const clean = (element) => {
  element.innerHTML = '';
};
