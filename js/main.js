window.onload = function() {
  var segments = Array.prototype.slice.call(document.querySelectorAll('.segment'))
  var idx = 0

  for (var i = 1; i < segments.length; i++) {
    segments[i].style.display = "none"
  }

  function nextSegment() {
    if (segments[idx + 1] !== undefined) {
      window.requestAnimationFrame(function() {
        segments[idx].style.display = "none"
        segments[++idx].style.display = "initial"
      })
    }
  }

  function previousSegment() {
    if (segments[idx - 1] !== undefined) {
      window.requestAnimationFrame(function() {
        segments[idx].style.display = "none"
        segments[--idx].style.display = "initial"
      })
    }
  }

  window.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' || e.keyCode === '37') {
      previousSegment()
      e.preventDefault()
    }
    if (e.key === 'ArrowRight' || e.keyCode === '39') {
      nextSegment()
      e.preventDefault()
    }
  })
}
