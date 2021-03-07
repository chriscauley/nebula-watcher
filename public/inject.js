const start = new Date().valueOf()
const addLink = (href) => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = href
  document.head.appendChild(link)
}

const addScript = src => {
  const script = document.createElement('script')
  script.src = src
  document.head.appendChild(script)
}

chrome.extension.sendMessage({}, function(response) {
  addLink('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css')
  addLink(chrome.runtime.getURL('nebula-watcher.css'))
  addScript(chrome.runtime.getURL('preload.js'))

  // TODO not sure if I want to get rid of this just yet.
  var readyStateCheckInterval = setInterval(function() {
    if (document.body) {
      clearInterval(readyStateCheckInterval);
      addScript(chrome.runtime.getURL('nebula-watcher.umd.min.js'))
      console.log(`Injecting nebula watcher after ${new Date().valueOf() - start}ms`);
    }
  }, 10);
});