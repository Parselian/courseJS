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
    position: absolute;
    width: ` + this.width + `;
    height: ` + this.height + `;
    background: ` + this.bg + `;
    font-size: ` + this.fontSize + `;
    cursor: pointer;
  `;

  // elem.textContent = 'Любой текст';
  body.appendChild(elem);

  document.addEventListener('keydown', function() {
    let keycode;
    if(event.which) {
      keycode = event.which;
    }
    let computedStyle = getComputedStyle(elem),
        posLeft = parseFloat(computedStyle.left),
        posRight = parseFloat(computedStyle.right),
        posTop = parseFloat(computedStyle.top),
        posBottom = parseFloat(computedStyle.bottom);
    
    switch(keycode) {
      case 37:
        elem.style.right = posRight + 10 + 'px';
        elem.style.left = posLeft - 10 + 'px';
        console.log(posLeft);
        break;
      case 38:
        elem.style.top = posTop - 10 + 'px';
        elem.style.bottom = posBottom + 10 + 'px';
        break;
      case 39:
        elem.style.left = posLeft + 10 + 'px';
        elem.style.right = posRight - 10 + 'px';
        break;
      case 40:
        elem.style.top = posTop + 10 + 'px';
        elem.style.bottom = posBottom - 10 + 'px';
        break;
    }
  });
};

let newElem = new DomElement('#d', '100px', '100px', 'green', '14px');

document.addEventListener('DOMContentLoaded', function() {
  newElem.createElement();
});


