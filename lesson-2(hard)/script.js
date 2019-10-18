let num = '266219',
    result = 1,
    i;

for( i = 0; i < num.length; i++) {
  result *= num[i];
}
console.log('Произведение чисел числа 266219: ' + result);

let pow = result ** 3;

console.log('Произведение чисел числа 266219 в степени 3: ' + pow);

alert(String(pow).slice(0, 2));