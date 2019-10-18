let num = 266219,
    result,
    i;

let arr = num.toString().split('');
console.log('arr: ', arr);

result = arr.reduce(function(sum, current) {
  return sum * current;
});

console.log('Произведение чисел числа 266219: ' + result);

let pow = result ** 3;

console.log('Произведение чисел числа 266219 в степени 3: ' + pow);

alert(String(pow).slice(0, 2));