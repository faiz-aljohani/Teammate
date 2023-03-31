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

// =================== Register Page ======================

function passwordValidation() {
    const password = document.querySelector('input[name=password]');
    const confirm = document.querySelector('input[name=confirm-password]');
    if (confirm.value === password.value) {
      confirm.setCustomValidity('');
    } else {
      confirm.setCustomValidity('Passwords do not match');
    }
  }

  function showPassword() {
    let x = document.querySelector('input[id=password]');
    let y = document.querySelector('input[id=confirm-password]');

    if (x.type === "password") {
      x.type = "text";
      y.type = "text"
    } else {
      x.type = "password";
      y.type = "password"
    }
  }

  function tmpToHomePage() {

    let x = document.getElementById("full-name").value;
    let y = document.getElementById("password").value;

    let z= ( x=="admin" && y=="123456");
    console.log(z)


    if(x=="admin" && y=="123456"){
        window.location.href = ("index.html");
    }
    
        // window.location.replace("RegisterPage.html");
        // return false

  }



// =================== portfolio Page ======================
if(document.URL.includes("portfolio.html")){
    document.querySelector("#add-prev-project").addEventListener("click", () =>{
        document.querySelector("#addPrevProjectPopupWindow").classList.toggle("hidePopupWindow")
    })
    document.querySelector("#cancelAddingPrevProject").addEventListener("click", () =>{
        document.querySelector("#addPrevProjectPopupWindow").classList.toggle("hidePopupWindow")
    })
    let prevProjectForm = document.getElementById("addPrevProjectForm");
    prevProjectForm.addEventListener("submit",function(event){
        let title = document.getElementById("title").value;
        let desc = document.getElementById("description").value;
        let link = document.getElementById("link").value;
        let skills = document.getElementById("skills").value;
        let img = document.getElementById("chooseImg").value;
        let date = document.getElementById("completeDate").value;
        // let type = document.getElementById("type") find how to get this element
        console.log(title, desc,link, skills,img, date);
        let projectString = `<div class="row">
        <div class="btn card col col-2 m-3 mt-5 mb-1">
            <a class="card-btn" href="project.html">         
                <div class="img-container">
                    <img src="images/1.png" class="card-img-top" alt="...">
                </div>        
                <div class="card-body">
                    <h5 class="card-title mb-3">${title}</h5>
                    <p class="card-text">${desc}</p>
                </div>

                <div class="tags">
                    <a href=""><span class="tag tag-firestore tag-md me-3 mb-2">${skills}</span></a>
                    <a href=""><span class="tag tag-firestore tag-md me-3 mb-2">${skills}</span></a>
                    <a href=""><span class="tag tag-firestore tag-md me-3 mb-2">${skills}</span></a>
                </div>
            </a>
        </div>

    </div>`;
        document.getElementById("Managed").innerHTML = projectString;
    })
}   