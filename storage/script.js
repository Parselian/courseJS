'use strict';

// Добавление данных в LocalStorage/sessionStorage
const input = document.querySelector('#myText'),
      button = document.querySelector('#myBtn'),
      text = document.querySelector('#text');

const remindMessage = () => {
  text.textContent = localStorage.input;
};

button.addEventListener('click', () => {
  localStorage.input = input.value;
  remindMessage();
});

remindMessage();


// Добавление куков
function setCookie(key, value, year, month, day, domain, path, secure) {
  let cookieStr = `${encodeURI(key)}=${encodeURI(value)}`;

  if(year) {
    const expires = new Date(year, month-1, day);
    cookieStr += `; expires=${expires.toGMTString()}`;
  }

  cookieStr += domain ? `; domain=${encodeURI(domain)}` : ``;
  cookieStr += path ?  `; path=${encodeURI(path)}` : ``;
  cookieStr += secure ? `; secure` : ``;

  document.cookie = cookieStr;
  console.log(decodeURI(cookieStr));
}

setCookie('тест', 'интерполяции', '2020', '1', '1');

