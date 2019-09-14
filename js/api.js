var homeURL = "http://68.183.188.135/EcoCredit/api/v1";

function loadReminders() {

   /*showLoader("");
   $("#remindRefresh").addClass("w3-hide");

   var eNum = window.localStorage.getItem("user_eNum");
   var deviceSerial = window.localStorage.getItem("deviceSerial");

   var getURL = homeURL + "/get/?u=" + eNum+ "&d=" + deviceSerial;
   */
   /*$.ajax({
   type: "GET",
   url: getURL,
   dataType: "html",
   timeout: 5000, // in milliseconds
   success: function (data) {

   $("#reminderContent").html(data);

   var dte = new Date().getTime();

   // Save data internally
   window.localStorage.setItem("reminder", data);
   window.localStorage.setItem("reminderDate", dte);

   $("#remindRefresh").removeClass("w3-hide");
   hideLoader();
},
error: function (request, status, err) {

// Load previous data
var reminder = window.localStorage.getItem("reminder");
var txt = "<br><div class='w3-center'><span class='w3-text-red'>Unable to load data from the server.</span><br><span class='w3-text-yellow'>Last Update</span></div>" + reminder;

$("#reminderContent").html(txt);
$("#remindRefresh").removeClass("w3-hide");
hideLoader();
}
});*/
}

function updateToken(token) {

   var eNum = window.localStorage.getItem("user_eNum");
   var uName = window.localStorage.getItem("user_uName");

   var postURL = homeURL + "/update/";


   window.localStorage.setItem("deviceSerial", 0);

   postData = {"eNum": eNum, "uName": uName, "token": token,"model":"", "serial": "0",
   "manufacturer":"0", "androidVersion":"0"};

   $.ajax({
      type: "POST",
      url: postURL,
      data: postData,
      dataType: "json",
      timeout: 5000, // in milliseconds

      success: function (data) {

         var dataAr = data;
         var newSubjects = dataAr.subjects;
         var newTimetable = dataAr.timetable;
         var newLink = dataAr.links;
         var version = dataAr.version;
         var systemMessage = dataAr.message;

         var oldSubjects = window.localStorage.getItem("updater_subjects");
         var oldTimetable = window.localStorage.getItem("updater_timetable");
         var oldLink = window.localStorage.getItem("updater_links");
         var oldVersion = window.localStorage.getItem("updater_appVersion");
         var passSet = window.localStorage.getItem("sett");

         console.log(">> subjects: v" + newSubjects + " timetable: v" + newTimetable + " links: v" + newLink + " version: v" + version);

         if(systemMessage != ""){
            console.log(systemMessage);

            navigator.notification.alert(
               systemMessage,
               function () {
                  // Nothing
               },
               'Notice',
               'Done'
            );
         }

      },
      error: function (request, status, err) {

      }
   });
}

function updateVersion(buttonIndex) {

   if (buttonIndex == 1) {
      version = window.localStorage.getItem("newAppVersion");
      window.localStorage.setItem("updater_appVersion", version);

      window.location.replace('market://details?id=e15.computing.ceykod');
   }
}

function updateRemoteData(buttonIndex) {

   if (buttonIndex == 1) {

      updateTimetable();
      updateSubjects();
      updateLinks();

      loadSubjectIcons();
      loadTodayTimetable();
      loadAppLinks();

      // Adding a little delay to better user experience
      setTimeout(function () {
         navigator.notification.alert(
            'contents updated !!!',
            function () {
               loadTimetables();
            },
            'Success',
            'Done'
         );
      }, 2500);
   }
}

function updateSubjects() {

   $.getJSON(homeURL + "/data/?subjects", function (dataT) {
      window.localStorage.setItem("updater_subjects", dataT.version);
      dataT = JSON.stringify(dataT);
      window.localStorage.setItem("data_subjects", dataT);
   });
}
function topUp() {
   var telNumber = $('#telNumber');

   var telText= $(telNumber).val();
   var telNum= telText.replace('-','');
   $.ajax({
      type: "GET",
      url: homeURL + "/send/?tele="+telNum,
      dataType: "json",
      timeout: 10000,
      success: function (data) {
         var dataAr = data;
         var statusCode = dataAr.statusCode;
         var statusDetail = dataAr.statusDetail;
         if (statusCode == "S1000") {

            alert(statusDetail);
            $.mobile.changePage("#pageTopUp", {transition: "fade"});
         } else {
            alert(statusDetail);
            $.mobile.changePage("#pageTopUp", {transition: "fade"});
         }
      },
      error: function (request, status, err) {

         alert("Sorry, an unexpected error occurred while delivering your message.");

      }
   });


}

function updateTimetable() {
   $.getJSON(homeURL + "/data/?timetable", function (dataT) {
      window.localStorage.setItem("updater_timetable", dataT.version);
      dataT = JSON.stringify(dataT);
      window.localStorage.setItem("data_timetable", dataT);
   });
}

function updateLinks() {
   $.getJSON(homeURL + "/data/?links", function (dataT) {
      window.localStorage.setItem("updater_links", dataT.version);
      dataT = JSON.stringify(dataT);
      window.localStorage.setItem("data_links", dataT);
   });
}

function updateMyWorks(assignment, status) {

   var xhttp;
   if (window.XMLHttpRequest) {
      xhttp = new XMLHttpRequest();
   } else {
      xhttp = new ActiveXObject("Microsoft.XMLHTTP");
   }

   var eNum = window.localStorage.getItem("user_eNum");
   var getURL = homeURL + "/set/?u=" + eNum + "&a=" + assignment + "&s=" + status;

   xhttp.open("GET", getURL, true);
   xhttp.send();

   setTimeout(function () {
      loadReminders();
   }, 1000);
}

function adminLogin() {

   var connStatus = checkConnection();
   var eNum = window.localStorage.getItem("user_eNum");

   if (connStatus == true) {
      openBrowser('https://apps.ceykod.com/login/?un=e15uop@ceykod.com&pw=e15coeeem&token=qshd231fjh43h&eNum=' + eNum);
   } else {
      noInternetWarning();
   }

   $("#leftpanel").panel("close");
}

function sendEmail(userName, userEmail, userMessage) {
   var connStatus = checkConnection();

   if (connStatus == true) {
      var postURL = "https://api.ceykod.com/contact/v1/send/?token=1d5dg478fhh953&app=e15computing&" + deviceId;
      postData = {
         "from": "e15@ceykod.com", "to": "ceykod@gmail.com", "cc": "", "bcc": "",
         "subject": "Contact - " + userName, "reply-to": userEmail, "body": userMessage, "compileHTML": "false"
      };

      showLoader("Sending your request...");

      $.ajax({
         type: "POST",
         url: postURL,
         dataType: "json",
         data: JSON.stringify(postData),
         timeout: 10000,
         success: function (data) {
            hideLoader();

            var dataAr = data;
            var statusCode = dataAr.statusCode;
            var statusDetails = dataAr.statusDetails;
            if (statusCode == "S1000") {
               navigator.notification.alert(
                  'Your request was sent success. We will reply you as soon as possible',  // message
                  function () {
                     $.mobile.changePage("#home", {transition: "fade"});
                  },
                  'Success',
                  'Done'
               );
            } else {
               navigator.notification.confirm(
                  "Sorry, an unexpected error occurred while delivering your message.",
                  function (buttonIndex) {
                     if (buttonIndex == 2) {
                        sendEmail(userName, userEmail, userMessage);
                     } else {
                        $.mobile.changePage("#home", {transition: "fade"});
                     }
                  },
                  "Send Failed",
                  ['Exit', 'Try again']
               );
            }
         },
         error: function (request, status, err) {
            hideLoader();
            navigator.notification.confirm(
               "Sorry, an unexpected error occurred while delivering your message.",
               function (buttonIndex) {
                  if (buttonIndex == 2) {
                     sendEmail(userName, userEmail, userMessage);
                  } else {
                     $.mobile.changePage("#home", {transition: "fade"});
                  }
               },
               "Send Failed",
               ['Exit', 'Try again']
            );
         }
      });
   } else {
      noInternetWarning();
   }
}

function noInternetWarning() {
   navigator.notification.alert(
      'Please enable WiFi or mobile data.',
      function () {
         // callback
      },
      'Warning',
      'Ok'
   );
}
