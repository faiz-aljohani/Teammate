// =================== Project Page ======================
if(document.URL.includes("project.html")){

    // Application form popup window (Apply Button)
    document.querySelector("#cancelApplication").addEventListener("click", popup);
    document.querySelector("#applicationBtn").addEventListener("click", popup);
    function popup(){
        document.getElementById("applicationWindow").classList.toggle("hidePopupWindow")
    }

    // Accepting An application Popup window (Accept Button)
    let acceptButtons = document.getElementsByClassName("acceptBtn")
    document.querySelector("#cancelAccepting").addEventListener("click", acceptPopup);

    for(i = 0; i<acceptButtons.length;i++){
        acceptButtons[i].addEventListener("click", acceptPopup);
    }
    function acceptPopup(){
        document.querySelector("#acceptPopupWindow").classList.toggle("hidePopupWindow")
    }


    // Removing An application Popup window (Remove Button)
    let removeButtons = document.getElementsByClassName("removeBtn") //Multible Elements
    document.querySelector("#cancelRemoving").addEventListener("click", removePopup);

    for(i = 0; i<removeButtons.length;i++){
        removeButtons[i].addEventListener("click", removePopup);
    }
    function removePopup(){
        document.querySelector("#removePopupWindow").classList.toggle("hidePopupWindow")
    }

    // Removing An application Popup window (Remove Button)
    let portfolioButtons = document.getElementsByClassName("portfolioBtn") //Multible Elements

    for(i = 0; i<removeButtons.length;i++){
        portfolioButtons[i].addEventListener("click", () => {
            window.location.href="portfolio.html";
        });
    }
    


}

// =================== Setting Page ======================
if(document.URL.includes("settings.html")){
    document.querySelector("#cancelChangingPassword").addEventListener("click", changePasswordPopup);
    document.querySelector("#changePassowrdBtn").addEventListener("click", changePasswordPopup);
    function changePasswordPopup(){
        document.querySelector("#changePasswordWindow").classList.toggle("hidePopupWindow")
    }
}



// =================== My Project Page ======================

if(document.URL.includes("my_projects.html")){
    document.querySelector("#add-project-btn").addEventListener("click", () =>{
        document.querySelector("#addProjectPopupWindow").classList.toggle("hidePopupWindow")
    })

    document.querySelector("#cancelAddingProject").addEventListener("click", () =>{
        document.querySelector("#addProjectPopupWindow").classList.toggle("hidePopupWindow")
    })
}

