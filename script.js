document.addEventListener('DOMContentLoaded', () => {
  'use_strict';

  const cardWrap = document.querySelector('.wrap'), 
      card = document.querySelector('.card');

  const addBlocks = (response) => {
    const data = JSON.parse(response);

    for(let key in data) {
      const cloneCard = card.cloneNode('true');
      console.log(cloneCard);

      //filling card-img
      cloneCard.children[0].children[0].src = data[key].photo;
      cloneCard.children[0].children[1].textContent = data[key].name;
      cloneCard.children[0].children[2].children[0].textContent = `${data[key].species}, ${data[key].genger}`;
      cloneCard.children[0].children[2].children[2].textContent = `(${data[key].birthDay} - ${data[key].deathDay}`;

      //filling card-info
      cloneCard.children[1].children[0].children[1].textContent = data[key].realName;
      cloneCard.children[1].children[1].children[1].textContent = data[key].status;
      cloneCard.children[1].children[2].children[1].textContent = data[key].actors;
      cloneCard.children[1].children[3].children[1].textContent = data[key].citizenship;
      cloneCard.children[1].children[4].children[1].textContent = data[key].movies;

      cardWrap.appendChild(cloneCard);
    }
  };

  const getData = () => {
    const request = new XMLHttpRequest();

    request.open('GET', 'dbHeroes.json');
    request.setRequestHeader('Content-Type', 'application/json');
    request.send();

    request.addEventListener('readystatechange', () => {
      if(request.readyState !== 4) {
        return;
      }

      if(request.status === 200) {
        const response = request.responseText;
        addBlocks(response);
      } else {
        console.error(request.statusText);
      }
    });
  };

  getData();
});