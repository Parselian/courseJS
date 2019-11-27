document.addEventListener('DOMContentLoaded', () => {
  'use_strict';

  const cardWrap = document.querySelector('.wrap'), 
      card = document.querySelector('.card');
  
  const addBlocks = (data) => {
    for(let key in data) {
      const cloneCard = card.cloneNode('true');

      const addInfo = (block) => {
        switch(block.className) {
          case 'card-img__img': 
            // block.src = data[key].photo;
            break;
          case 'card-img__title':
            block.textContent = data[key].name;
            break;
          case 'card-img__info':
        }
      }

      cloneCard.childNodes.forEach((item) => {
        if(item.className === 'card-img') {
          for(let i = 0; i < item.children.length; i++) {
            addInfo(item.children[i]);
          }
        } else if(item.className === 'card-info') {
          for(let i = 0; i < item.children.length; i++) {
            console.log(item.children[i].children[i]);
            addInfo(item.children[i]);
          }
        }
      });


      // getProp(cloneCard.children);

      // filling card-img
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
    card.remove();
  };

  const getData = () => {
    return fetch('dbHeroes.json', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  getData()
    .then((response) => {
      if(response.status !== 200) {
        throw new Error('error, network status isn`t 200');
      }

      return response.json();
    })
    .then((response) => {
      addBlocks(response);
    })
    .catch((error) => {
      card.remove();
      console.error(error);
    });
});