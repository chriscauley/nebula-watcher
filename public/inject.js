const script1 = document.createElement('script')
script1.src = chrome.runtime.getURL('nebula-watcher.umd.min.js')
const script2 = document.createElement('script')
script2.src = chrome.runtime.getURL('preload.js')
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = chrome.runtime.getURL('nebula-watcher.css')

const start = new Date().valueOf()
chrome.extension.sendMessage({}, function(response) {
  document.head.appendChild(script2)
  document.head.appendChild(link)
  // TODO not sure if I want to get rid of this just yet.
  var readyStateCheckInterval = setInterval(function() {
    if (document.body) {
      clearInterval(readyStateCheckInterval);
      document.head.appendChild(script1)
      console.log(`Injecting nebula watcher after ${new Date().valueOf() - start}ms`);
    }
  }, 10);
});