const script = document.createElement('script')
script.src = chrome.runtime.getURL('src/inject/main.js')

chrome.extension.sendMessage({}, function(response) {
  document.head.appendChild(script)
  // TODO not sure if I want to get rid of this just yet.
  // var readyStateCheckInterval = setInterval(function() {
  //   if (document.readyState === "complete") {
  //     clearInterval(readyStateCheckInterval);
  //     console.log("Hello. This message was sent from scripts/inject.js");
  //   }
  // }, 10);
});