/*

Required
> null

Installation
> cordova plugin add cordova-plugin-dialogs

navigator.notification.alert(message, alertCallback, [title], [buttonName])

navigator.notification.alert();
navigator.notification.confirm();
navigator.notification.prompt();
navigator.notification.beep();

*/

$(document).ready(function () {

  $("#btnAlert").on("click", function () {
    console.log("Alert");
    alertNotification();
  });

  $("#btnConfirm").on("click", function () {
    console.log("Alert");
    confirmNotification();
  });

  $("#btnPrompt").on("click", function () {
    console.log("Alert");
    promptNotification();
  });

  $("#btnBeep").on("click", function () {
    console.log("Alert");
    beepNotification();
  });


  function alertNotification() {
    navigator.notification.alert(
      'You are the winner!',  // message
      alertDismissed,         // callback
      'Game Over',            // title
      'Done'                  // buttonName
    );
  }

  function confirmNotification() {
    navigator.notification.confirm(
      'You are the winner!', // message
      onConfirm,            // callback to invoke with index of button pressed
      'Game Over',           // title
      ['Restart', 'Exit']     // buttonLabels
    );
  }

  function promptNotification() {
    navigator.notification.prompt(
      'Please enter your name',  // message
      onPrompt,                  // callback to invoke
      'Registration',            // title
      ['Ok', 'Exit'],             // buttonLabels
      'Jane Doe'                 // defaultText
    );
  }

  function beepNotification() {
    // Beep twice!
    navigator.notification.beep(2);
  }

});

// Callback functions

function alertDismissed() {
  alert('Alert!\nDismissed');
}

function onConfirm(buttonIndex) {
  alert('Confirmed!\nYou selected button ' + buttonIndex);
}

function onPrompt(results) {
  alert("Prompt!\nYou selected button number " + results.buttonIndex + " and entered " + results.input1);
}
