var myNavigation = Navigation('&#9898', '&#9899')
window.onload = myNavigation

//:: _ -> HTMLElement div
function createNavElement() {
  var nav = document.createElement('nav')
  nav.classList.add('flex-row')
  return nav
}

//:: _ -> _ (Side-effect)
function Navigation(inactiveHTML, activeHTML) {
  return function() {
    var slides = Array.prototype.slice.call(document.querySelectorAll('section'))
    var nav = createNavElement()

    var dots = addNavDots(nav)
    var idx = 0;

    nav.addEventListener('click', function(e) {
      for (var i = 0; i < dots.length; i++) {
        if (dots[i] === e.target) {
          changeSlide(i)
          break
        }
      }
    })

    // hide all Slides which are not the first Slide
    for (var i = 1; i < slides.length; i++) {
      slides[i].style.display = "none"
    }

    // change first nav dot to active style
    dots[0].innerHTML = activeHTML

    // change slides with arrow up and arrow down
    window.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.keyCode === '39') next(e)
      else if (e.key === 'ArrowLeft' || e.keyCode === '37') prev(e)
    })

    var mytouchstart = null
    window.addEventListener('touchstart', function(e) {
      mytouchstart = e.changedTouches[0].pageX
    })
    window.addEventListener('touchend', function(e) {
      if (mytouchstart !== null) {
        var release = e.changedTouches[0].pageX
        if (mytouchstart < release) {
          if (mytouchstart + 100 < release) prev()
        }
        else if (mytouchstart > release) {
          if (mytouchstart - 100 > release) next()
        }
        mytouchstart = null
      }
    })

    document.querySelector('body').appendChild(nav)

    ///////////////////////////////////////////////
    function next(e) {
      changeSlide(idx + 1)
      if (e !== undefined) e.preventDefault();
      }
    function prev(e) {
      changeSlide(idx - 1)
      if (e !== undefined) e.preventDefault()
    }

    //:: HTMLElement -> [HTMLElement span]
    function addNavDots($nav) {
      for (var i = 0; i < slides.length; i++) {
        var span = document.createElement('span')
        span.innerHTML = inactiveHTML
        $nav.appendChild(span)
      }

      return Array.prototype.slice.call(nav.childNodes)
    }

    //:: Int -> _ (Side-Effect)
    function changeSlide(new_idx) {
      if (slides[new_idx] !== undefined) {
        window.requestAnimationFrame(function() {
          changeDOM()
          idx = new_idx
        })
      }

      //:: _ -> _ (Side-effect)
      function changeDOM() {
        dots[idx].innerHTML = inactiveHTML
        dots[new_idx].innerHTML = activeHTML
        slides[idx].style.display = "none"
        slides[new_idx].style.display = "initial"
      }
    }
  }
}
