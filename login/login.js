console.log("Loginpage");

console.log("His",loginPage);

const loginBtn = document.getElementById('login-btn');
const email = document.getElementById('email');
const password = document.getElementById('password');




function checkCredentials(emailInput, passwordInput) {
    var users = JSON.parse(localStorage.getItem('users'));
    
    var obj = users.find(userObj => {
        return userObj.email === emailInput && userObj.password === passwordInput;
    });

    if (obj) {
        sessionStorage.setItem('loggedInUser', JSON.stringify(obj));
        return true;
    }
    return false;
}


loginBtn.addEventListener("click", (event) => {
    event.preventDefault();

    if (email.value.trim() === "" || password.value.trim() === "") {
        alert("All fields are required!");
        return;
    }

    var users = JSON.parse(localStorage.getItem('users'));
    if (users === null){
        alert("User not found!");
        return;
    }
    else {
        if (checkCredentials(email.value.trim(), password.value.trim())) {
            // console.log("yesssssssssssssssss");
            email.value = "";
            password.value = "";
            password.type = "password";
            password.checked = false;
            // loginPage.style.display = "none";
            sessionStorage.setItem('loginDisplay', 'none');
            sessionStorage.setItem('signUpDisplay', 'none');
            sessionStorage.setItem('myCartDisplay', 'block');
            sessionStorage.setItem('profileDisplay', 'block');
            sessionStorage.setItem('indexPointerEvents', 'none');
            // signUp.style.display = "none";
            location.href = `../home`;
            // alert("Successfully Logged In!");
        }
        else {
            alert("User not found!");
        }
    }
});


function showPassword() {
    if (password.type === "password") {
      password.type = "text";
    }
    else {
      password.type = "password";
    }
}


function forgottenPassword() {
    var userEmail = prompt('Enter your email :').trim();
    // console.log(userEmail.length);
    var users = JSON.parse(localStorage.getItem('users'));
    var obj = users.find(userObj => {
        return userObj.email === userEmail;
    });
    if (obj) {
        // console.log("hello")
        sessionStorage.setItem('resetPassword', userEmail);
        location.href = `../profile`;
    }
    else {
        alert("User not found!");
    }
}
