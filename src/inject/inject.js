const S = `'use strict';
const xhr = XMLHttpRequest.prototype;
  function banana(xhrInstance) {
try {
const json = JSON.parse(xhrInstance.responseText);
    json.response.length && console.log('Monkey RS: ', json.response);
} catch (e) {}
  }
  var send = xhr.send;
  xhr.send = function(data) {
    var rsc = this.onreadystatechange;
    if (rsc) {
      this.onreadystatechange = function() {
        banana(this);
        return rsc.apply(this, arguments);
      };
    }
    return send.apply(this, arguments);
  }
`

const script = document.createElement('script')
script.innerText = S
  console.log(document.querySelectorAll('script').length)

chrome.extension.sendMessage({}, function(response) {
  document.head.appendChild(script)
  console.log(document.querySelectorAll('script').length)
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      // ----------------------------------------------------------
      // This part of the script triggers when page is done loading
      console.log("Hello. This message was sent from scripts/inject.js");
      // ----------------------------------------------------------

    }
  }, 10);
});