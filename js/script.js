/*
cordova-plugin-crypt-file
*/

function goToPage(dest) {

   if (dest == "reminders") {
      $("#remindRefresh").removeClass("w3-hide");
   } else {
      $("#remindRefresh").addClass("w3-hide");
   }

   if (dest == 'timetable') {
      $("#homeTitle").html("EcoCredit");

   } else if (dest == 'reminders') {
      $("#homeTitle").html("Reminders");

   } else if (dest == 'links') {
      $("#homeTitle").html("Links");

   } else if (dest == 'courses') {
      $("#homeTitle").html("Courses");

   } else {
      $("#homeTitle").html("EcoCredit");
   }
}

function homeLink() {
   goToPage('timetable');
   $("#homeTime").trigger("click");
   $("#leftpanel").panel("close");
}

function loadTopUp() {
   goToPage('pageTopUp');
   // $("#homeTime").trigger("click");
   $("#leftpanel").panel("close");
}
function loadDashboard() {
   goToPage('pageDashboard');
   // $("#homeTime").trigger("click");
   $("#leftpanel").panel("close");
}
function loadReward() {
   goToPage('pageReward');
   // $("#homeTime").trigger("click");
   $("#leftpanel").panel("close");
}

function appBegin() {

   console.log(">> App begin");

   var passSet = window.localStorage.getItem("sett");
   /*var connStatus;

   if (debug == false) {
      connStatus = checkConnection();
      console.log("connection: " + connStatus);
   }
*/
   //loadUpdatableData();

   if (window.localStorage.getItem("updater_appVersion") != APP_VERSION) {
      // logout
      window.localStorage.setItem("sett", "0");
      $.mobile.changePage("#pageLogin", {
         transition: "fade"
      });

   } else if (passSet == "1") {     // Already logged in
      loadRequired();
      $.mobile.changePage("#pageDashboard", {
         transition: "fade"
      });
      //goToPage('timetable');

   } else {                  // Need to login
      $.mobile.changePage("#pageLogin", {
         transition: "fade"
      });
   }

   updateToken("");
   /*window.FirebasePlugin.getToken(function (token) {
   // save this server-side and use it to push notifications to this device

   if (window.localStorage.getItem("sett") == 1) {
   console.log("Token Update >>");
   console.log(token);
   updateToken(token);
}

}, function (error) {
console.error(error);
});*/

/*window.FirebasePlugin.onNotificationOpen(function (notification) {
console.log(notification);
}, function (error) {
console.error(error);
});*/
}

function loadRequired() {

   loadUserData();
   loadTimetables();
   loadTodayTimetable();
   loadAppLinks();
   loadReminders();
}

function loadUpdatableData() {
   var storage = window.localStorage;

   // If data not found on the storage, load default data
   var timetableFlag = storage.getItem("data_timetable");
   var coursesFlag = storage.getItem("data_subjects");
   var linkFlag = storage.getItem("data_links");

   // Load default timetable, course data and links
   if (timetableFlag == null) {
      $.getJSON("res/data_timetable.json", function (dataT) {
         storage.setItem("updater_timetable", dataT['version']);
         storage.setItem("data_timetable", JSON.stringify(dataT));
      });
   }
   if (coursesFlag == null) {
      $.getJSON("res/data_subjects.json", function (dataT) {
         storage.setItem("updater_subjects", dataT['version']);
         storage.setItem("data_subjects", JSON.stringify(dataT));
      });
   }
   if (linkFlag == null) {
      $.getJSON("res/data_links.json", function (dataT) {
         storage.setItem("updater_links", dataT['version']);
         storage.setItem("data_links", JSON.stringify(dataT));
      });
   }
}

function loginButtonClick() {

   var storage = window.localStorage;
   var uName = $("#uName").val();
   var eNum = $("#eNum").val().toLowerCase();

   if (uName == "" || uName == " ") {
      alert("Please enter a user name");

   } else if (eNum == "" || eNum == " ") {
      alert("Please enter your E-Number");

   } else {
      // Save data
      storage.setItem("user_eNum", eNum);
      storage.setItem("user_uName", uName);
      storage.setItem("sett", "1");
      storage.setItem("reminder", "");
      storage.setItem("reminderDate", "");
      storage.setItem("updater_subjects", "6");
      storage.setItem("updater_timetable", "10");
      storage.setItem("updater_links", "6");
      storage.setItem("updater_appVersion", APP_VERSION);

      appBegin();

      /*FCMPlugin.getToken(function(token) {
      updateToken(token);
   });

   loadRequired();
   goToPage('timetable');

   $.mobile.changePage("#home", {
   transition: "fade"
});
}*/
}
}

function logoutButtonClick() {

   var storage = window.localStorage;
   storage.setItem("sett", "0");
   navigator.app.exitApp();
}

//-----------------------------------------------------------------------------------------

function loadUserData() {
   var storage = window.localStorage;

   eNum = storage.getItem("user_eNum");
   uName = storage.getItem("user_uName");

   $("#eNum").val(eNum);

   $(".eNum").html(eNum);
   $(".uName").html(uName);

   $("#versionSubj").html(storage.getItem("updater_subjects"));
   $("#versionTimetable").html(storage.getItem("updater_timetable"));
   $("#versionLinks").html(storage.getItem("updater_links"));

}

function saveUserData() {
   var storage = window.localStorage;

   var uName = $("#uName").val();
   var eNum = $("#eNum").val();

   if (uName == "" || eNum == "") {

   } else {
      storage.setItem("user_eNum", eNum.toLowerCase());
      storage.setItem("user_uName", uName);
      storage.setItem("sett", "1");
   }
}

function showLoader(message) {
   $.mobile.loading("show", {
      classes: {},
      textonly: false,
      msgtext: "",
      text: "",
      textVisible: true,
      theme: "z",
      html: "<div id='overlay' class='w3-display-container'><div id='loader'></div><span class='w3-display-middle'><br><br><br>" + message + "</span></div>"
   });
}

function hideLoader() {
   $.mobile.loading("hide");
}

function loadCourse(courseId) {

   var courseData = JSON.parse(window.localStorage.getItem("data_subjects"));
   var course = courseData['subjects'][courseId];

   var courseName = course.name;
   var courseContent = course.content;
   var courseAllocation = course.allocation;

   var page = "";

   page += "<div class='nd2-card'><div class='card-title has-supporting-text'>";
   page += "<h5 class='card-primary-title'>" + courseName + "</h5></div>";
   page += "<div class='card-supporting-text'>";
   page += "<i><u>Objectives/ILO:</u></i><br>" + courseContent + "<br><br>(" + courseAllocation + ")";
   page += "</div></div>";

   if (course.marks[0] != "NULL") {
      page += "<br><h3>Marks:</h3>";

      page += "<div class='nd2-card'>";
      page += "<div class='card-supporting-text'>";

      $.each(course.marks, function (key, val) {
         page += "<li>" + key + " : " + val + "% </li>";
      });
      page += "</ul></div></div>";
   }

   if (course.modules[0] != "NULL") {
      page += "<br><h3>Modules:</h3>";
      page += "<div class='nd2-card'>";
      page += "<div class='card-supporting-text'>";

      $.each(course.modules, function (key, val) {
         page += "<li>" + key + "</li>";
      });

      page += "</ul></div></div>";
   }

   if (course.lecturers[0].name != "") {
      page += "<br><h3>Lecturers:</h3>";

      $.each(course.lecturers, function (key, val) {
         page += "<div class='nd2-card'><div class='card-title has-supporting-text'>";
         page += "<h6 class='card-primary-title'>" + val.name + "</h6><h6 class='card-subtitle'>" + val.title + "</h6></div>";
         page += "<div class='card-supporting-text has-action has-title'>";

         if (val.email != "") page += "<br>Email: <a href='mailto:" + val.email + "'>" + val.email + "</a>";
         if (val.teleOffice != "") page += "<br>Tele (Office): <a href='tel:" + val.teleOffice + "'>" + val.teleOffice + "</a>";
         if (val.teleMobile != "") page += "<br>Tele (Mobile): <a href='tel:" + val.teleMobile + "'>" + val.teleMobile + "</a>";

         page += "</div></div>";
      });
   }

   if (course.references[0] != "NULL") {
      page += "<br><h3>References:</h3>";
      page += "<div class='nd2-card'>";
      page += "<div class='card-supporting-text'>";

      $.each(course.references, function (key, val) {
         page += "<li><a href='" + val + "' target='_blank'>" + key + "</a></li>";
      });

      page += "</ul></div></div>";
   }

   $(".subjName").html(courseName);
   $(".subjContent").html(page);

   $.mobile.changePage("#pageCourse", {
      transition: "fade"
   });

}

function loadSubjectIcons() {

   /*
   var courseData = JSON.parse(window.localStorage.getItem("data_subjects"));
   var subjects = courseData['subjects'];

   $.each(subjects, function (key, val) {
   $(".subjImg-" + key).attr("src", val.img).addClass(val.bg);

   //console.log(key + " " + val.img);
});
*/
}

function loadTimetables() {

   data = JSON.parse(window.localStorage.getItem("data_timetable"));
   subjects = data['subjects'];

   for (n = 1; n < 6; n++) {

      timetable = data[weekday[n]];
      var item = "";
      $(".tab" + weekday[n]).html("");

      $.each(timetable, function (key, val) {
         item = "<tr class='" + val.css + "'> <td class='my-date'>" + key + "<br>" + val['to'] + "</td> ";
         item += "<td> <h6 class='" + val.subj + "'>" + subjects[val.subj] + "</h6> </td>";
         item += "<td class='w3-small'>" + val.loc + "</td></tr>";

         $(".tab" + weekday[n]).append(item);
      });

      item = "<tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr>";
      $(".tab" + weekday[n]).append(item);
   }
}

function loadTodayTimetable() {

   var today = "";
   var d = new Date();
   var n = d.getDay();

   console.log(weekday[n]);
   $(".todayText").html(weekday[n]);

   if (n == 0) {
      $(".today").html("<img src='images/sunday.png' class='w3-center w3-image w3-responsive w3-padding-4'>");

   } else if (n == 6) {
      $(".today").html("<img src='images/saturday.png' class='w3-center w3-image w3-responsive w3-padding-4'>");

   } else {
      data = JSON.parse(window.localStorage.getItem("data_timetable"));
      subjects = data['subjects'];
      timetable = data[weekday[n]];
      var item = "";

      $(".todayTimetable").html("");

      $.each(timetable, function (key, val) {
         item = "<tr class='" + val.css + "'> <td class='my-date'>" + key + "<br>" + val['to'] + "</td> ";
         item += "<td> <h6 class='" + val.subj + " my-title'>" + subjects[val.subj] + "</h6> </td>";
         item += "<td class='w3-small'>" + val.loc + "</td></tr>";

         $(".todayTimetable").append(item);
      });
   }
}

function loadAppLinks() {

   var courseData = JSON.parse(window.localStorage.getItem("data_links"));
   var txt = "";
   $("#appLinks").html("");

   $.each(courseData['data'], function (key, val) {

      if (val.role == "list-divider") {
         txt = "<li data-role='list-divider' class='ui-li-divider ui-bar-inherit ui-first-child'>" + key + "</li>";
      } else {
         txt = "<li class='ui-li-has-thumb'>";
         txt += "<a target='" + val.target + "' class='ui-btn waves-effect waves-button waves-effect waves-button' href='" + val.link + "'>";
         txt += "<img src='images/links/" + val.ico + ".png' class='ui-thumbnail ui-thumbnail-circular'/>";

         if (val.target == "_blank") {
            txt += "<h2>" + key + "</h2> <p>" + val.link + "</p> </a> </li>";
         } else {
            txt += "<h2>" + key + "</h2> <p>" + "</p> </a> </li>";
         }
      }

      $("#appLinks").append(txt);
   });
}
