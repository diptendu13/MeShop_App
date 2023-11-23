console.log("profilepage");

console.log(window.history);


// onload = () => {
//     if (sessionStorage.getItem('loggedInUser') && ){
//         location.href = window.location.href;
//     }
// }

const saveInfoBtn = document.getElementById('saveInfo-btn');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');

const editPasswordBtn = document.getElementById('editPassword-btn');
const logoutBtn = document.getElementById('logout-btn');
const oldPassword = document.getElementById('oldPassword');
const newPassword = document.getElementById('newPassword');
const confirmNewPassword = document.getElementById('confirmNewPassword');

const showOldPass = document.getElementById('showOldPass');
const showNewPass = document.getElementById('showNewPass');
const showConfNewPass = document.getElementById('showConfNewPass');


let currentUser = JSON.parse(sessionStorage.getItem('loggedInUser'));


if (sessionStorage.getItem('resetPassword')){
    var myProfile = document.getElementsByTagName('form')[0];
    var editPassword = document.getElementsByTagName('form')[1];
    console.log();
    myProfile.style.display = 'none';
    myProfile.previousElementSibling.style.display = 'none';
    editPassword.firstElementChild.style.display = 'none';
    editPassword.lastElementChild.lastElementChild.style.display = 'none';
    newPassword.disabled = true;
    confirmNewPassword.disabled = true;

    // oldPassword.value = sessionStorage.getItem('resetPassword');
    // oldPassword.disabled = true;

    // sessionStorage.removeItem('resetPassword');
}





if (currentUser) {
    firstName.value = currentUser.firstName;
    lastName.value = currentUser.lastName;
    oldPassword.value = currentUser.password;
    firstName.disabled = true;
    lastName.disabled = true;
    oldPassword.disabled = true;
    newPassword.disabled = true;
    confirmNewPassword.disabled = true;
}

let saveInfoFlag = false;
saveInfoBtn.addEventListener("click", (event) => {
    event.preventDefault();
    if (firstName.value.trim() === "" || lastName.value.trim() === ""){
        alert("Edited fields cannot be empty. Please enter a value to save.");
        return;
    }

    if (saveInfoFlag){
        let users = JSON.parse(localStorage.getItem('users'));
        let obj = users.find(userObj => {
            return userObj.email === currentUser.email;
        });

        let fName = firstName.value.trim();
        let lName = lastName.value.trim()
        obj.firstName = fName;
        obj.lastName = lName;
        localStorage.setItem('users', JSON.stringify(users));

        currentUser.firstName = fName;
        currentUser.lastName = lName;
        sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser));

        firstName.blur();
        lastName.blur();
        firstName.disabled = true;
        lastName.disabled = true;

        saveInfoBtn.innerText = "Edit Info";
        saveInfoBtn.style.backgroundColor = "black";
        saveInfoBtn.style.color = "white";
        // saveInfoBtn.style.border = "none";

        saveInfoFlag = false;

        return;
    }

    saveInfoBtn.innerText = "Save Info";
    saveInfoBtn.style.backgroundColor = "white";
    saveInfoBtn.style.color = "black";
    // saveInfoBtn.style.border = "1px solid black";


    firstName.disabled = false;
    lastName.disabled = false;
    firstName.focus();

    saveInfoFlag = true;

});


logoutBtn.addEventListener("click", (event) => {
    event.preventDefault();
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('loginDisplay');
    sessionStorage.removeItem('signUpDisplay');
    sessionStorage.removeItem('myCartDisplay');
    sessionStorage.removeItem('profileDisplay');
    sessionStorage.removeItem('indexPointerEvents');
    alert("You have successfully logged out!");
    location.href = `../index.html`;
});

let savePassFlag = false;
editPasswordBtn.addEventListener("click", (event) => {
    event.preventDefault();


    if (savePassFlag){

        let users = JSON.parse(localStorage.getItem('users'));
        // var promptUser;
        let newPass = newPassword.value.trim();
        let newConfPass = confirmNewPassword.value.trim();
    
    
    
        if (newPass === "" || newConfPass === ""){
            alert("All fields required to reset password!");
            return;
        }
        if (newPass !== newConfPass) {
            alert("Password not matching!");
            return;
        }
        if (currentUser){
            if (currentUser.password === newPass) {
                alert("New password cannot be same as old password!");
                return;
            }
            else {
                let obj = users.find(userObj => {
                    return userObj.email === currentUser.email;
                });
            
                obj.password = newPass;
                localStorage.setItem('users', JSON.stringify(users));
    
                currentUser.password = newPass;
                sessionStorage.setItem('loggedInUser', JSON.stringify(currentUser));

                oldPassword.disabled = false;
                oldPassword.value = newPass;
                oldPassword.type = "password";
                showOldPass.checked = false;
                oldPassword.disabled = true;

                newPassword.value = "";
                newPassword.type = "password";
                showNewPass.checked = false;
                confirmNewPassword.value = "";
                confirmNewPassword.type = "password";
                showConfNewPass.checked = false;
                newPassword.blur();
                confirmNewPassword.blur();
                newPassword.disabled = true;
                confirmNewPassword.disabled = true;

                editPasswordBtn.innerText = "Edit Password";
                editPasswordBtn.style.backgroundColor = "black";
                editPasswordBtn.style.color = "white";
                // editPasswordBtn.style.border = "none";

                savePassFlag = false;

                return;
            }
        }
        else {
            let promptUser = users.find(userObj => {
                return userObj.email === sessionStorage.getItem('resetPassword');
            });
            if (promptUser.password === newPass) {
                alert("New password cannot be same as old password!");
                return;
            }
            else {
                promptUser.password = newPass;
                localStorage.setItem('users', JSON.stringify(users));
                sessionStorage.removeItem('resetPassword');

                newPassword.value = "";
                newPassword.type = "password";
                showNewPass.checked = false;
                confirmNewPassword.value = "";
                confirmNewPassword.type = "password";
                showConfNewPass.checked = false;
                newPassword.blur();
                confirmNewPassword.blur();
                newPassword.disabled = true;
                confirmNewPassword.disabled = true;

                editPasswordBtn.innerText = "Edit Password";
                editPasswordBtn.style.backgroundColor = "black";
                editPasswordBtn.style.color = "white";
                // editPasswordBtn.style.border = "none";

                savePassFlag = false;

                alert('Password changed successfully! Login to continue.');

                location.href = `../login`;

                return;
            }
        }

    }

    editPasswordBtn.innerText = "Save Password";
    editPasswordBtn.style.backgroundColor = "white";
    editPasswordBtn.style.color = "black";
    // editPasswordBtn.style.border = "1px solid black";


    newPassword.disabled = false;
    confirmNewPassword.disabled = false;
    newPassword.focus();

    savePassFlag = true;

});



function showOldPassword() {
    if (oldPassword.type === "password") {
        oldPassword.type = "text";
    }
    else {
        oldPassword.type = "password";
    }
}

function showNewPassword() {
    if (newPassword.type === "password") {
        newPassword.type = "text";
    }
    else {
        newPassword.type = "password";
    }
}

function showConfirmNewPassword() {
    if (confirmNewPassword.type === "password") {
        confirmNewPassword.type = "text";
    }
    else {
        confirmNewPassword.type = "password";
    }
}
