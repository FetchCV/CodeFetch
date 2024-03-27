"use strict";
//===============================================
// On load
//===============================================
// First check for username
window.addEventListener("load", function () {
    if (localStorage.getItem("savedUsername")) {
        username = JSON.parse(localStorage.getItem("savedUsername"));
        getUserInfo();
    }
    else {
        console.log("No username saved.");
        showError("No username", "Please enter a username.", "bg-blue-800");
    }
});
//===============================================
// Setting username
//===============================================
function newUsername() {
    hideError();
    var usernameElement = document.getElementById("username");
    if (usernameElement) {
        username = usernameElement.value;
        localStorage.setItem("savedUsername", JSON.stringify(username));
        getUserInfo();
    }
}
var usernameInput = document.getElementById("username");
if (usernameInput) {
    usernameInput.addEventListener("keydown", function (event) {
        if (event.key == "Enter") {
            newUsername();
        }
    });
}
//===============================================
// Show user errors
//===============================================
function showError(errorTitle, errorText, color) {
    var errorBox = document.querySelector(".error-box");
    if (errorBox) {
        errorBox.classList.remove("hidden");
        errorBox.classList.remove("bg-green-800");
        errorBox.classList.remove("bg-red-800");
        errorBox.classList.remove("bg-blue-800");
        errorBox.classList.add(color);
    }
    var errorTitleElement = document.querySelector(".error-title");
    var errorTextElement = document.querySelector(".error-text");
    if (errorTitleElement) {
        errorTitleElement.innerHTML = errorTitle;
    }
    if (errorTextElement) {
        errorTextElement.innerHTML = errorText;
    }
}
function hideError() {
    var errorBox = document.querySelector(".error-box");
    if (errorBox) {
        errorBox.classList.add("hidden");
    }
}
