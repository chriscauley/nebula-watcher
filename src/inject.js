const script1 = document.createElement('script')
script1.src = chrome.runtime.getURL('dist/nebula-watcher.umd.min.js')
const script2 = document.createElement('script')
script2.src = chrome.runtime.getURL('public/preload.js')
const link = document.createElement('link')
link.rel = 'stylesheet'
link.href = chrome.runtime.getURL('dist/nebula-watcher.css')

chrome.extension.sendMessage({}, function(response) {
  document.head.appendChild(script2)
  document.head.appendChild(link)
  // TODO not sure if I want to get rid of this just yet.
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
      console.log("Hello. This message was sent from scripts/inject.js");
      document.head.appendChild(script1)
    }
  }, 10);
});