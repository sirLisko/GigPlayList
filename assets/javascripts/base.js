function barGrow (max) {
  return track => {
    setTimeout(() => {
      const count = track.querySelector('[data-count]').getAttribute('data-count')
      track.querySelector('.track__percentage').style.opacity = count / max
    }, 0)
  }
}

function animate () {
  const tracks = document.querySelectorAll('.track')
  const max = tracks[0].querySelector('[data-count]').getAttribute('data-count');
  [].forEach.call(tracks, barGrow(max))
}

function onSearchSubmit (e) {
  e.preventDefault()

  const artist = document.querySelector('.search input').value
  if (artist !== '') {
    window.location = artist
  }
}

document.querySelector('.search').addEventListener('submit', onSearchSubmit)

animate()
