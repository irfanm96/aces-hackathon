function openBrowser(url) {
  var target = "_blank";
  var options = "location=yes,zoom=no,hidden=yes,useWideViewPort=yes";
  console.log('Browser Openning');
  showLoader("Connecting");

  inAppBrowserRef = cordova.InAppBrowser.open(url, target, options);
  inAppBrowserRef.addEventListener('loadstart', loadStartCallBack);
  inAppBrowserRef.addEventListener('loadstop', loadStopCallBack);
  inAppBrowserRef.addEventListener('loaderror', loadErrorCallBack);
}

function loadStartCallBack() {
  console.log('loadStartCallBack()');

}
function loadStopCallBack() {
  hideLoader();
  if (inAppBrowserRef != undefined) {
    $('#status-message').text("");
    inAppBrowserRef.show();
  }
}
function loadErrorCallBack(params) {
  hideLoader();
  $('#status-message').text("Sorry we cannot open that page");

  var scriptErrorMesssage =
  "alert('Sorry we cannot open that page. Message from the server is : "
  + params.message + "');"
  
  console.log('loadErrorCallBack()' + params);

  inAppBrowserRef.executeScript({code: scriptErrorMesssage}, executeScriptCallBack);
  inAppBrowserRef.close();
  inAppBrowserRef = undefined;
}

function executeScriptCallBack(params) {
  if (params[0] == null) {
    $('#status-message').text(
      "Sorry we couldn't open that page. Message from the server is : '"
      + params.message + "'");
    }
  }
