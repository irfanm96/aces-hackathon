$(document).ready(function () {

   //onDeviceReady();
    console.log("im in");

    //
    // $('#num').click(function () {
    //
    // });

    function getNumber(){
        console.log("button clicked");
        var num = $(this);
        var text = $.trim(num.find('.txt').clone().children().remove().end().text());
        var telNumber = $('#telNumber');
        $(telNumber).val(telNumber.val() + text);
    }


    //------- Login related functions ---------------------------------------------------------------
    $("#loginBtn").on('click', function () {
        loginButtonClick();
    });

    $("#btnLogout").on('click', function () {
        logoutButtonClick();
    });

    //-- Other Buttons ----------------------------------------------------------------------------

    $("#btnSaveLogin").click(function () {
        saveUserData();
    });

    $("#remindRefresh").click(function () {
        loadReminders();
    });

    $("#contactForm").submit(function (event) {
        event.preventDefault();

        var userName = $($.parseHTML($("#userName").val())).text();
        var userEmail = $($.parseHTML($("#userEmail").val())).text();
        var userMessage = $($.parseHTML($("#userMessage").val())).text();

        sendEmail(userName, userEmail, userMessage)

    });

    $("#contactSendButton").on("click", function () {
        var userName = $($.parseHTML($("#userName").val())).text();
        var userEmail = $($.parseHTML($("#userEmail").val())).text();
        var userMessage = $($.parseHTML($("#userMessage").html())).text();
    });

    //-- Other  ----------------------------------------------------------------------------

    $("#pageReminder").on("swiperight", function () {
        $.mobile.changePage("#home", {transition: "fade"});
    });

});

$(document).on("pagebeforeshow", "#pageWelcome", function () {
    // Close app if back button pressed
    if (appLoading == true) {
        navigator.app.exitApp();
    }
});

$(document).on("pageshow", "#pageAcademicCalender", function () {
    $("#calenderSem5").trigger("click");
});

$(document).on("pageshow", "#pageTimetable", function () {
    var d = new Date();
    var n = d.getDay();

    if (n == 0 || n == 6) {
        n = 1;
    }

    $("#day" + n).trigger("click");
});

$(document).on("pageshow", "#pageAbout", function () {

});
