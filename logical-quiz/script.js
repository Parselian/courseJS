function getAngles(hour, minute) {
  let calculation = ((hour + minute / 60) * 30) - (minute * 6);
  
  if(calculation > 180) {
    calculation = 360 - calculation;
  }
  
  let answer = Math.abs(calculation);
  return answer;
}

console.log(getAngles(08, 35));