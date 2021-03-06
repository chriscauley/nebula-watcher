// https://stackoverflow.com/questions/12575572/monkey-patch-xmlhttprequest-onreadystatechange
(function() {
  window.__NW = {
    interceptXHR: (parsed_xhr) => {
      window.__NW.xhr_backlog.push(parsed_xhr)
    },
    xhr_backlog: [],
  }
  const XHR = XMLHttpRequest.prototype;
  function banana(xhr) {
    try {
      const json = JSON.parse(xhr.responseText);
      json.response.length && window.__NW.interceptXHR({
        response: json.response,
        url: xhr.responseURL,
      })
    } catch (e) {}
  }
  const send = XHR.send;
  XHR.send = function() {
    const rsc = this.onreadystatechange;
    if (rsc) {
      this.onreadystatechange = function() {
        banana(this);
        return rsc.apply(this, arguments);
      };
    }
    return send.apply(this, arguments);
  }
})()