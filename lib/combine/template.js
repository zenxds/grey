(function() {
  var match = /grey_ratio=(\d+)/.exec(location.href)
  var ratio = match ? parseInt(match[1]) : {{ RATIO }}
  if (ratio < {{ BASE }} && bingo(ratio, {{ BASE }})) {
    {{ GREY_CODE }}
  } else {
    {{ STABLE_CODE }}
  }
  function random(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1))
  }
  function bingo(val, base) {
    return random(1, base) <= val
  }
})();