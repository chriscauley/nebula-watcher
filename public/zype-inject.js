const LS_KEY = 'nebula-watcher/zype'

const settings = JSON.parse(localStorage.getItem(LS_KEY) || '{"playbackRate":1, "autoplay":true}')

const updateSettings = (data) => {
  Object.assign(settings, data)
  localStorage.setItem(LS_KEY, JSON.stringify(settings))
}

if (window.location.search.match(/autoplay=(undefined|false)/)) {
  window.location = window.location.href.replace(/autoplay=(undefined|false)/, 'autoplay=true')
}

let muteTimeout

window.addEventListener('load', () => {
  const observer = new MutationObserver((mutations, observer) => {
    mutations.forEach(m => {
      if (m.type === 'childList' && m.addedNodes.length) {
        m.addedNodes.forEach(node => {
          if (node.tagName === 'VIDEO') {
            node.addEventListener('ratechange', (e) => {
              const { playbackRate } = e.target
              updateSettings({ playbackRate })
            })
            node.addEventListener('play', (e) => {
              const { playbackRate } = e.target
              if (playbackRate !== settings.playbackRate) {
                const q = `.theo-menu-item[aria-label="Set video speed to ${settings.playbackRate}"]`
                document.querySelector(q).click()
              }
              clearTimeout(muteTimeout)
            })
            node.addEventListener('playing', (e) => {
              if (e.target.muted) {
                // TODO should be tied into a setting, probably need to just make my own controls
                // for some reason zype likes to mute videos when autoplay = true /shrug
                document.querySelector('.vjs-button.vjs-vol-0').click()
              }
            })
          }
        })
      }
    })
  })
  const config = { attributes: true, childList: true, subtree: true };
  observer.observe(document.body, config);
})