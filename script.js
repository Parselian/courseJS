window.addEventListener('DOMContentLoaded', () => {
  'use_strict';

  const dogFrame = document.querySelector('.frame-dog'),
        catFrame = document.querySelector('.frame-cat');

  const addContent = (url) => {
    return fetch(url);
  };

  document.body.addEventListener('submit', (e) => {
    e.preventDefault();
    const target = e.target;

    if(target.matches('.wrap-dog')) {
      addContent('https://random.dog/woof.json')
        .then((response) => {
          if(response.status !== 200) {
            throw 'error';
          }
          return response.json();
        })
        .then((response) => {
          dogFrame.src = response.url;
        })
        .catch((error) => {
          console.error(error);
        });
    } else if(target.matches('.wrap-cat')) {
      addContent('https://aws.random.cat/meow')
      .then((response) => {
        if(response.status !== 200) {
          throw 'error';
        }
        return response.json();
      })
      .then((response) => {
        catFrame.src = response.file;
      })
      .catch((error) => {
        console.error(error);
      });
    }
  })
})