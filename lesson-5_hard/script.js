'use strict';

/* ЗАДАНИЕ 1 */
let arr = ['32235', '2352345', '345223', '27643', '9456', '754645', '4563'],
    i;

function filterNumbers() {
  
  for( i = 0; i < arr.length; i++ ) {
    let con;

    con = arr[i].substr(0, 1);

    if(con === '2' || con === '4') {
      console.log(arr[i]);
    }

    con = 0;
  }

}

filterNumbers();



/*  ЗАДАНИЕ 2  */
function findPrimeNums(num) {

  if(num < 2) {
    return false;
  }
  for (let i = 2; i < num; i++) {
    if( num % i == 0 ) {
      return false;
    }
  }
  return true;
}

for(let i = 1; i < 100; i++) {
  if(findPrimeNums(i)) {
    console.log(i);
  }
}

findPrimeNums();



// function showSimpleNums() {
//   let i,
//       arr = [],
//       x = 0;

//   /* ИЗБАВЛЯЕМСЯ ОТ ЧЕТНЫХ */
//   for( i = 1; i <= 100; i++ ) {
//     x++;
//     if(i !== 2 && i % 2 === 0) {
//       continue;           
//     } else {
//       // console.log(i);
//       arr[x] = i;
//     }
//   }

//   x = 0;

//   /* ИЗБАВЛЯЕМСЯ ОТ КРАТНЫХ 3 */
//   for (i = 1; i <= 100; i++ ) {
//     x++;
//     if( arr[i] !== 3 && arr[i] % 3 === 0 ) {
//       delete arr[i];
//     } else {
//       // console.log(arr[i]);
//     }
//   }

//   x = 0;

//   /* ИЗБАВЛЯЕМСЯ ОТ КРАТНЫХ 5 */
//   for (i = 1; i <= 100; i++ ) {
//     x++;
//     if(arr[i] !== 5 && arr[i] % 5 === 0 ) {
//       delete arr[i];
//     } else {
//       // console.log(arr[i]);
//     }
//   }

//   x = 0;

//   /* ИЗБАВЛЯЕМСЯ ОТ КРАТНЫХ 7 */
//   for (i = 1; i <= 100; i++ ) {
//     x++;
//     if( arr[i] !== 7 && arr[i] % 7 === 0 ) {
//       delete arr[i];
//     } else {
//       console.log(arr[i]);
//     }
//   }

//   // console.log(arr.length);
//   console.log(arr);
// }


// showSimpleNums();