'use_strict';

const changeColor = () => {
  const colorBlock = document.getElementById('color'),
        button = document.getElementById('change');

  button.addEventListener('click', () => {
    let rand = Math.random().toString(16);
    rand = '#' + rand.slice(3, 9);

    document.body.style.backgroundColor = rand;
    button.style.color = rand;
    colorBlock.textContent = rand;
  });
  
};

changeColor();