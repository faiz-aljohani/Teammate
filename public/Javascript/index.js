

function stopProject(){
  document.getElementById("stopProjectPopupWindow").classList.toggle("hidePopupWindow")
}

function applyPopup(){
  document.getElementById("applicationWindow").classList.toggle("hidePopupWindow")
}

function completeProject(){
  document.querySelector("#completePopupWindow").classList.toggle("hidePopupWindow") 
}

function removeProject(){
    document.querySelector("#removeProjectPopupWindow").classList.toggle("hidePopupWindow") 
}

function establishProject(){
  document.querySelector("#establishProjectPopupWindow").classList.toggle("hidePopupWindow") 
}

// =================== Setting Page ======================
if(document.URL.includes("settings")){
    document.querySelector("#cancelChangingPassword").addEventListener("click", changePasswordPopup);
    document.querySelector("#changePassowrdBtn").addEventListener("click", changePasswordPopup);
    function changePasswordPopup(){
        document.querySelector("#changePasswordWindow").classList.toggle("hidePopupWindow")
    }
}

function changePasswordValidation(){
    let newPassword = document.querySelector("#newPassword").value;
    let confirmNewPassword = document.querySelector("#confirmNewPassword").value;

    if(newPassword != confirmNewPassword){
      alert("new Passworn and confirm password must be the same")
      return false;
    } return true;

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
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirm-password');
    
    // Allow Minimum eight characters, at least one letter and one number:
    let pattern =/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    
console.log(password.checkValidity())
    console.log(pattern.test(password.value))
    console.log((confirm.value === password.value) && pattern.test(password.value))
    console.log(confirm.value !== password.value)
    if ((confirm.value === password.value) && pattern.test(password.value)) {
      confirm.setCustomValidity('');
    } else if(confirm.value !== password.value) {
      confirm.setCustomValidity('Passwords do not match');
    }else{
      confirm.setCustomValidity('Minimum eight characters, at least one letter and one number');
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

//   //not ideal
//   function tmpToHomePage() {

//     let x = document.getElementById("full-name").value;
//     let y = document.getElementById("password").value;

//     let z= ( x=="admin" && y=="123456");
//     console.log(z)


//     if(x=="admin" && y=="123456"){
//         window.location.href = ("index.html");
//     }

//   }

// =================== portfolio Page ======================
if(document.URL.includes("portfolio")){
    document.querySelector("#add-prev-project").addEventListener("click", () =>{
        document.querySelector("#addPrevProjectPopupWindow").classList.toggle("hidePopupWindow")
    })
    document.querySelector("#cancelAddingPrevProject").addEventListener("click", () =>{
        document.querySelector("#addPrevProjectPopupWindow").classList.toggle("hidePopupWindow")
    })
    
    document.querySelector("#edit-about-me").addEventListener("click", () =>{
      document.getElementById("about-me-text").focus();
      
    })

    // document.querySelector("#delete-prev-project").addEventListener("click", (e) =>{
    //   console.log(e)
    // })

    document.getElementById("about-me-text").addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          document.getElementById("about-me-text").blur();
      }
      });
}

  const saveChnageInAboutMe = async ()=>{
  
    let data = await document.getElementById("about-me-text").textContent

    // console.log(data)
    // console.log(      document.getElementById("about-me-text").textContent    )


    let req = fetch("http://localhost:3000/portfolio/updateDescription",{
      method: 'post',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "description": `${data}`
      })
    })
  }
  const deletePrevProject = async (projectId)=>{

    console.log(projectId)
    document.getElementById(projectId.split("-").at(-1)).style.visibility="hidden";
  
    console.log(projectId.split("-").at(-1))

    let req = fetch("http://localhost:3000/portfolio/deleteProject",{
      method: 'post',
      headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "projectId": `${projectId.split("-").at(-1)}`
      })
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

// Chat page

// function sendMessage(){
//   let url = document.URL.split("?")[0]
//   fetch(url + "/send", {
//     method: "PUT",
//     data: "Hello",
//     headers: {
//       "content-Type": 'application/x-www-form-urlencoded'
//   }
//   }).then((result)=>{
//     // let likesNb = document.querySelector(".likes-number");
//     // likesNb.innerHTML = parseInt(likesNb.innerHTML) + 1;
//     return result;    
//     })
//   }