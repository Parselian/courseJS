function rapeRow(string) {
  let raped;

  if(typeof(string) != 'string') {
    return ('WTF?!? I need ROW, man!');
  } else {
    raped = string.trim();

    if(raped.length > 30) {
      raped = raped.slice(0, 30) + '...';
    }

    return raped;
  }
}

console.log(rapeRow(100));