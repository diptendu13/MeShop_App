console.log("signuppage");


const signUpBtn = document.getElementById('signUp-btn');
const redirectLoginBtn = document.getElementById('redirect-login-btn');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const showPass = document.getElementById('showPass');
const showConfPass = document.getElementById('showConfPass');


function checkIfUserExists(email) {
  var users = JSON.parse(localStorage.getItem('users'));
  var obj = users.find(userObj => {
    return userObj.email === email;
  });
  // console.log(obj);
  if (obj){
    return true;
  }
  return false;
}


function saveUser(fName, lName, emailInput, passwordInput) {
  var userObj = {
      firstName : fName,
      lastName : lName,
      email : emailInput,
      password : passwordInput
  }

  var users = JSON.parse(localStorage.getItem('users'));
  if (users === null){
    users = [];
  }
  users.push(userObj); // added new user in the users array
  localStorage.setItem('users', JSON.stringify(users)); // updated the users array in localStorage

  // now we write a logic which shows the user is logged in
  sessionStorage.setItem('loggedInUser', JSON.stringify(userObj));

  // finally, clear all fields after signup is done
  firstName.value = "";
  lastName.value = "";
  email.value = "";
  password.value = "";
  password.type = "password";
  showPass.checked = false;
  confirmPassword.value = "";
  confirmPassword.type = "password";
  showConfPass.checked = false;

  sessionStorage.setItem('loginDisplay', 'none');
  sessionStorage.setItem('signUpDisplay', 'none');
  sessionStorage.setItem('myCartDisplay', 'block');
  sessionStorage.setItem('profileDisplay', 'block');
  sessionStorage.setItem('indexPointerEvents', 'none');

  alert("SignUp Successful!");

  window.location.href = `../home`;
}


// checkIfUserExists("hello");


signUpBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // if any of the fields is empty
    if (firstName.value.trim() === "" || lastName.value.trim() === "" || email.value.trim() === "" || password.value.trim() === "" || confirmPassword.value.trim() === "") {
        alert("All fields required!");
    }
    else{
        if (password.value.trim() !== confirmPassword.value.trim()) {
            alert("Password not matching!");
            password.value = "";
            confirmPassword.value = "";
        }
        else {
            if (localStorage.getItem('users')){
              if (checkIfUserExists(email.value)) {
                alert("This email is already linked with another account!");
                location.href = `../signUp`;
              }
              else {
                saveUser(firstName.value, lastName.value, email.value, password.value);
              }
            }
            else{
              saveUser(firstName.value, lastName.value, email.value, password.value);
            }
        }
    }
});

redirectLoginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  location.href = `../login`;
})


function showPassword() {
    if (password.type === "password") {
      password.type = "text";
    }
    else {
      password.type = "password";
    }
}

function showConfirmPassword() {
    if (confirmPassword.type === "password") {
      confirmPassword.type = "text";
    }
    else {
      confirmPassword.type = "password";
    }
}

