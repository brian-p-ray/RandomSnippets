(function($) {
  function metricTime() {
    // get current time
    var d = new Date(),
        hours = d.getHours(),
        minutes = d.getMinutes(),
        seconds = d.getSeconds();

    // calculate seconds passed so far today
    var secondsPassed = (hours * 60 * 60) + (minutes * 60) + seconds;

    // calculate how many seconds in decimal hour/minute
    var secondsInDay = 60 * 60 * 24,
        secondsInHour = secondsInDay / 100,
        secondsInMinute = secondsInDay / 100 / 100,
        secondsInSecond = secondsInDay / 100 / 100 / 100;

    // calculate current decimal hour/minute
    // hours
    var hoursPassed = Math.floor(secondsPassed / secondsInHour).toString();
    secondsPassed = secondsPassed - (hoursPassed * secondsInHour);
    // minutes
    var minutesPassed = Math.floor(secondsPassed / secondsInMinute).toString();
    if(minutesPassed.length < 2) {
      minutesPassed = '0' + minutesPassed;
    }
    secondsPassed = secondsPassed - (minutesPassed * secondsInMinute);
    // seconds
    var secondssecondsPassed = Math.floor(secondsPassed / secondsInSecond).toString();
    if(secondssecondsPassed.length < 2) {
      secondssecondsPassed = '0' + secondssecondsPassed;
    }

    // output time
    $('.hours').text(hoursPassed);
    $('.minutes').text(minutesPassed);
    $('.seconds').text(secondssecondsPassed);

    // blink separator
    if($('.separator').hasClass('hidden')) {
      $('.separator').removeClass('hidden');
    }
    else {
      $('.separator').addClass('hidden');
    }

    // set body color
    $('body').css({background: 'rgb(' + hoursPassed + ',' + minutesPassed + ',' + secondssecondsPassed + ')'});
  }
  setInterval(metricTime, 500);
})(jQuery);