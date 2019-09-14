/*
 Required
 > Nothing

 Installation
 > cordova plugin add cordova-plugin-device

 */

function showDeviceInfo() {

    setTimeout(function () {

        var cordova = device.cordova;
        var model = device.model;
        var platform = device.platform;
        var uuid = device.uuid;
        var version = device.version;
        var manufacturer = device.manufacturer;
        var isVirtual = device.isVirtual;
        var serial = device.serial;

        var infoHTML = "";

        infoHTML += "<p>Cordova Version: " + cordova + "</p>";
        infoHTML += "<p>Model: " + model + "</p>";
        infoHTML += "<p>Platform: " + platform + "</p>";
        infoHTML += "<p>UUID: " + uuid + "</p>";
        infoHTML += "<p>Version: " + version + "</p>";
        infoHTML += "<p>Manufacturer: " + manufacturer + "</p>";
        infoHTML += "<p>isVirtual: " + isVirtual + "</p>";
        infoHTML += "<p>Serial: " + serial + "</p>";

        $$("#deviceInfo").html(infoHTML);

    }, 1500);
}

/*

 var devicePlatform = device.platform;
 // Depending on the device, a few examples are:
 //   - "Android"
 //   - "BlackBerry 10"
 //   - "browser"
 //   - "iOS"
 //   - "WinCE"
 //   - "Tizen"
 //   - "Mac OS X"


 */
