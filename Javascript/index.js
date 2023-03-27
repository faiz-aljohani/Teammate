
// =================== Project Page ======================

// Removing An application Popup window
let removeButtons = document.getElementsByClassName("removeBtn")
document.getElementById("cancelRemoving").addEventListener("click", removePopup);

for(i = 0; i<removeButtons.length;i++){
    removeButtons[i].addEventListener("click", removePopup);
}
function removePopup(){
    document.getElementById("removePopupWindow").classList.toggle("hidePopupWindow")
}

// Accepting An application Popup window
let acceptButtons = document.getElementsByClassName("acceptBtn")
document.getElementById("cancelAccepting").addEventListener("click", acceptPopup);

for(i = 0; i<acceptButtons.length;i++){
    acceptButtons[i].addEventListener("click", acceptPopup);
}
function acceptPopup(){
    document.getElementById("acceptPopupWindow").classList.toggle("hidePopupWindow")
}

// Application form popup window
document.getElementById("cancelApplication").addEventListener("click", popup);
document.getElementById("applicationBtn").addEventListener("click", popup);
function popup(){
    document.getElementById("applicationWindow").classList.toggle("hidePopupWindow")
}


// =================== Setting Page ======================
document.getElementById("cancelChangingPassword").addEventListener("click", popup);
document.getElementById("changePassowrdBtn").addEventListener("click", popup);
function popup(){
    document.getElementById("changePasswordWindow").classList.toggle("hidePopupWindow")
}