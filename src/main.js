const xhr = XMLHttpRequest.prototype;
function banana(xhrInstance) {
  try {
    const json = JSON.parse(xhrInstance.responseText);
    // console.log(xhrInstance);
    json.response.length && console.log('Monkey RS: ', json.response);
  } catch (e) {}
}
const send = xhr.send;
xhr.send = function(data) {
  const rsc = this.onreadystatechange;
  if (rsc) {
    this.onreadystatechange = function() {
      banana(this);
      return rsc.apply(this, arguments);
    };
  }
  return send.apply(this, arguments);
}