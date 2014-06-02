function adjustTimes() {
  var els = document.getElementsByClassName("sports-status");
  for (var i=0; i<els.length; i++) {
    var data = els[i].innerHTML.match(/(\d{1,2}):(\d{2})\s(\w*)\s(\w*)/);
    if (data) {
      els[i].innerHTML = adjustTimeToLocalTime.apply(this, data);
    }
  }
}

function adjustTimeToLocalTime(_, hour, minute, am_pm, tz) {
  var tzs = { HAST: 10, HADT: 9, AKST: 9, AKDT: 8, PST: 8, PDT: 7, MST: 7, MDT: 6, CST: 6, CDT: 5, EST: 5, EDT: 4 };
  var localTime = new Date();
  var hours = parseInt(hour) % 12;
  hours += (am_pm == 'PM' ? 12 : 0) + tzs[tz] - localTime.getTimezoneOffset() / 60;
  localTime.setHours(hours);
  localTime.setMinutes(minute);
  return formatTime(localTime);
}

function formatTime(time) {
  return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })
}

document.addEventListener('DOMContentLoaded', function() {
  adjustTimes();
  var target = document.querySelector(".rt-col");

  if (target) {
    var config = { subtree: true, childList: true };
    new MutationObserver(function(mutations) {
      this.disconnect();
      adjustTimes();
      this.observe(target, config);
    }).observe(target, config);
  }
});
