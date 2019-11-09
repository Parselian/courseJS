'use strict';
/* const wrap = (before, after, fn) => (...args) => after(fn(...before(...args)));

const foo = (a, b, c) => {
  console.log('ф-ция выполняется');
  return a + b + c;
};

const before = (...args) => {
  console.dir({before: args});
  return args;
}

const after = (res) => {
  console.dir({after: res});
  return res;
}

const fooWrap = wrap(before, after, foo);

console.log(foo('1', '2', '3'));
console.log(fooWrap('1', '2', '3')); */


/* --------------------------------------------------------------- */
/* const once = (fn) => (...args) => { 

  // сработал rest оператор => args === [1, 2, 3]
  if(!fn) return;
  const res = fn(...args);

  // сработал spread оператор => args === '1, 2, 3'
  fn = null;
  return res;
};

const foo = (a, b, c) => {
  console.log('Выполняется ф-ция с аргументами', {a, b, c});
};

const fooOnce = once(foo);

const maxCall = (count, fn) => {
  let counter = 0;

  return (...args) => {
    if(counter === count) {
      return;
    }
    counter++;
    return fn(...args);
  };
};

const fooMax3 = maxCall(3, foo);
const fooMax5 = maxCall(5, foo);

fooMax5(1, 2, 3);
fooMax5(2, 3, 4);
fooMax5(3, 4, 5);
fooMax5(4, 5, 6);
fooMax5(5, 6, 7);
fooMax5(6, 7, 8); */

/* --------------------------------------------------- */
/* const blockFunc = (fn) => {

  const wrapper = (...args) => {
    if(fn) return fn(...args);
  }

  wrapper.blocked = () => (fn) = null;

  return wrapper;

};

const foo = (arg) => console.log('вызов ф-ции с аргументом', arg);

const blockFoo = blockFunc(foo);
blockFoo(1);
blockFoo(2);
blockFoo.blocked();
blockFoo('Hey');
blockFoo(3);
blockFoo(null); */


/* ----------------------------------------------------- */
/* const timeout = (msec, fn) => {
  let timer = setTimeout(() => {
    if(timer) console.log(`Сброшен таймер ф-ции ${fn.name} с таймером ${msec}`);

    timer = null;
  }, msec);

  return (...args) => {
    if(timer) {
      clearTimeout(timer);
      timer = null; 
      return fn(...args);
    }
  };
};

const foo = (a, callback) => {
  callback(a);
};

const timerFoo1 = timeout(2000, foo);
const timerFoo2 = timeout(4000, foo);

setTimeout(() => {
  timerFoo1('first', (arg) => {
    console.log(`callback ${arg}`);
  });
  timerFoo2('second', (arg) => {
    console.log(`callback ${arg}`);
  });
}, 3000); */

/* ------------------------------------------------- */
/* const wrap = fn => {
  let limit = 0;
  let counter = 0;

  const wrapper = (...args) => {
    if(limit && counter === limit) wrapper.blocked();

    if(fn) {
      const result = fn(...args);
      counter++;
      return result;
    }

    wrapper.blocked = () => {
      fn = null;
      return wrapper;
    };

    wrapper.timeout = (msec) => {
      setTimeout( () => {
        wrapper.blocked();
      }, msec);

      return wrapper;
    };

    wrapper.limit = (count) => {
      limit = count;
      return wrapper;
    };

    return wrapper;

  };
};

const foo = (arg) => {
  console.log('вызов ф-ции');
  console.log(arg);
};

const fooWrap = wrap(foo).limit(2).timeout(2000);

fooWrap('первый');

setTimeout( () => {
  fooWrap('1');
  fooWrap('2');
  fooWrap('3');
  fooWrap.blocked();
  fooWrap('4');
}, 2000); */



/* -------------------------------------------- */
const form = document.querySelector('#form'),
      count = document.querySelector('#count'),
      discount = document.querySelector('#discount'),
      cost = document.querySelector('#cost');

const price = 20;

const calculate = (percent, count) => count * price * (100 - percent) / 100;

// const useCalculate = (percent) => (count) => calculate(count, percent);

const discount50 = calculate.bind(null, 50);
const noDiscount = calculate.bind(null, 0);


form.addEventListener('change', () => {
  if(discount.checked) {
    cost.textContent = discount50(count.value);
  } else {
    cost.textContent = noDiscount(count.value);
  }
});

const curry = (fn, ...par) => {
  const curried = (...args) => (
    fn.length > args.length ?
    curry(fn.bind(null, ...args)) : 
    fn(...args)
  )

  return par.length ? curried(...par) : curried;
};

const sum = (a, b, c) => a + b + c;

const currSum = curry(sum);

console.log(currSum(1,2)(3));

const temp = currSum(1, 2);

console.log(temp(3));







