function rapeRow(string) {
  let raped;

  if(typeof(string) != 'string') {
    alert('WTF?!? I need ROW, man!');
  }

  raped = string.trim();

  if(raped.length > 30) {
    raped = raped.slice(0, 30) + '...';
  }

  return raped;
}

console.log(rapeRow(' 123456789101234567892012345678930 '));