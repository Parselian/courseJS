window.addEventListener('DOMContentLoaded', () => {

  function timer(deadline, hour, minute, second) {
    const timerHours = document.querySelector(hour),
          timerMinutes = document.querySelector(minute),
          timerSeconds = document.querySelector(second);
    
    // while(new Date(deadline).getTime() <= new Date().getTime()) {
    //   deadline = new Date().getTime() + 86400000;
    // }

    function calcTime() {
      let currDate = new Date().getTime(),
          endTime = new Date(deadline).getTime(),
          timeRemaining = 24 - ((currDate / 1000 / 60 / 60) % 24 + 6),
          // hours = Math.floor((timeRemaining / 60) / 60),
          minutes = Math.floor((timeRemaining - Math.floor(timeRemaining)) * 60), 
          seconds = Math.ceil(60 - (currDate / 1000 ) % 60),
          hours = Math.floor(timeRemaining);
      
      return {seconds, minutes, hours, timeRemaining};
    }

    function updateClock() {
      let timer = calcTime();
      
      timerHours.textContent = timer.hours;
      if( timer.hours < 10 ) {
        timerHours.textContent = '0' + timer.hours;
      }

      timerMinutes.textContent = timer.minutes;
      if( timer.minutes < 10 ) {
        timerMinutes.textContent = '0' + timer.minutes;
      } 

      timerSeconds.textContent = timer.seconds;
      if( timer.seconds < 10 ) {
        timerSeconds.textContent = '0' + timer.seconds;
      } 
      
      // if( timer.timeRemaining <= 0 ) {
      //   clearInterval(intervalId);
      //   timerHours.textContent = '00';
      //   timerMinutes.textContent = '00';
      //   timerSeconds.textContent = '00';
      // }
      
      

    }
    
    let intervalId = setInterval(updateClock, 1000);

    intervalId;
  }

timer('7 november 2019', '#timer-hours', '#timer-minutes', '#timer-seconds');
});