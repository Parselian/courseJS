let body = document.querySelector('body');

function DomElement(selector, width, height, bg, fontSize) {
  this.selector = selector;
  this.width = width;
  this.height = height;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createElement = function() {
  let elem;
  
  switch(this.selector.charAt(0)) {
    case '.':
      elem = document.createElement('div');
      elem.classList.add(this.selector.slice(1));
      break;
    case '#':
      elem = document.createElement('p');
      elem.setAttribute('id', this.selector.slice(1));
      break;
  }

  elem.style.cssText = `
    width: ` + this.width + `;
    height: ` + this.height + `;
    background: ` + this.bg + `;
    font-size: ` + this.fontSize + `;
  `;

  elem.textContent = 'Любой текст';
  
  body.appendChild(elem);
};

let newElem = new DomElement('#d', '100px', '200px', 'green', '14px');

newElem.createElement();

// console.dir(DomElement);
// DomElement.prototype.createElement();
console.log(newElem);