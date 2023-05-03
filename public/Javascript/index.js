// =================== Project Page ======================
if(document.URL.includes("projects" && !document.URL.includes("my-projects"))){

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
if(document.URL.includes("settings")){
    document.querySelector("#cancelChangingPassword").addEventListener("click", changePasswordPopup);
    document.querySelector("#changePassowrdBtn").addEventListener("click", changePasswordPopup);
    function changePasswordPopup(){
        document.querySelector("#changePasswordWindow").classList.toggle("hidePopupWindow")
    }
}



// =================== My Project Page ======================

if(document.URL.includes("my-projects")){
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
    const confirm = document.getElementById('confirm-password');
    
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

  //not ideal
  function tmpToHomePage() {

    let x = document.getElementById("full-name").value;
    let y = document.getElementById("password").value;

    let z= ( x=="admin" && y=="123456");
    console.log(z)


    if(x=="admin" && y=="123456"){
        window.location.href = ("index.html");
    }

  }

// =================== portfolio Page ======================
if(document.URL.includes("portfolio.html")){
    document.querySelector("#add-prev-project").addEventListener("click", () =>{
        document.querySelector("#addPrevProjectPopupWindow").classList.toggle("hidePopupWindow")
    })
    document.querySelector("#cancelAddingPrevProject").addEventListener("click", () =>{
        document.querySelector("#addPrevProjectPopupWindow").classList.toggle("hidePopupWindow")
    })
}
// =================== prevProject Page ======================
// fix below code
if(document.URL.includes("prevProject.html")){
    document.querySelector("#add-teammate-btn").addEventListener("click",()=>{
        popup = document.querySelector("#addTeammatePopupWindow");
        popup.classList.toggle("hidePopupWindow");
        })
    document.querySelector("#cancelAdding").addEventListener("click",()=>{
        document.querySelector("#addTeammatePopupWindow").classList.toggle("hidePopupWindow")
    })
}

// =================== Login Page ======================

function tmpToHomePage() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    if (email === 'admin@admin.com' && password === '123456') {
      window.location.href = 'index.html';
    } else {
      alert('Incorrect email or password');
    }
  }
  
  // const loginForm = document.getElementById('login-form');
  // loginForm.addEventListener('submit', (event) => {
  //   event.preventDefault();
  //   tmpToHomePage();
  // });
