'use-strict';

let searchRNA = (DNA) => {
  let string = DNA.toUpperCase(),
      RNA = [],
      counter = 0;

  for( let char of string ) {
    switch(char) {
      case 'G':
        RNA[counter] = 'C';
        break;
      case 'C':
        RNA[counter] = 'G';
        break;
      case 'T':
        RNA[counter] = 'A';
        break;
      case 'A':
        RNA[counter] = 'U';
        break;
      default:
        RNA[counter] = char;
    }

    counter++;
  }

  RNA = RNA.join('');
  return RNA;
};

console.log(searchRNA('ACTGCCAGTGTCA'));