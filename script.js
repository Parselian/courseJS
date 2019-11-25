window.addEventListener('DOMContentLoaded', () => {
  'use_strict';

  const dogFrame = document.querySelector('.frame-dog'),
        catFrame = document.querySelector('.frame-cat');

  const addContent = (url, frame) => {
    return fetch(url, {
      method: 'GET',
      credentials: 'same-origin',  
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  document.body.addEventListener('click', (e) => {
    const target = e.target;

    if(target.matches('.dog-btn')) {
      addContent('https://random.dog/woof.json', dogFrame)
        .then((response) => {
          if(response.status !== 20) {
            throw 'error network status isn`t 200';
          } 
        })
        .catch((error) => {
          console.error(error);
        });
    } else if(target.matches('.cat-btn')) {
      addContent('https://aws.random.cat/meow', catFrame);
    }
  })
})