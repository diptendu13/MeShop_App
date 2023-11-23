const indexPage = document.getElementById('index');
const homePage = document.getElementById('home');
const loginPage = document.getElementById('login');
const signUpPage = document.getElementById('signUp');
const myCartPage = document.getElementById('myCart');
const profilePage = document.getElementById('profile');

const indexLogin = document.getElementById('index-login');
const indexSignUp = document.getElementById('index-signUp');


indexPage.addEventListener("click", gotoPage);
homePage.addEventListener("click", gotoPage);
loginPage.addEventListener("click", gotoPage);
signUpPage.addEventListener("click", gotoPage);
myCartPage.addEventListener("click", gotoPage);
profilePage.addEventListener("click", gotoPage);


try{
    indexLogin.addEventListener("click", gotoPageViaButtons);
}
catch(e) {
    console.log("OK");
}
try{
    indexSignUp.addEventListener("click", gotoPageViaButtons);
}
catch(e) {
    console.log("OK");
}

sessionStorage.setItem("prevHref", window.location.href);

function gotoPage(e) {
    console.log(e.target.id);

    localStorage.removeItem('showProductFlag');

    if (e.target.id === 'home' || e.target.id === 'login' || e.target.id === 'signUp' || e.target.id === 'myCart' || e.target.id === 'profile') {
        if (sessionStorage.getItem("prevHref").includes("index.html")){
            location.href = `./${e.target.id}`;
            
        }
        else{
            location.href = `../${e.target.id}`;
        }
    }
    else{
        location.href = `../${e.target.id}.html`;
    }
    // sessionStorage.setItem("prevHref", window.location.href);
}

function gotoPageViaButtons(e) {
    var locHref = e.target.id.split('-')[1];
    console.log(locHref);
    location.href = `./${locHref}`;
}

if (sessionStorage.getItem('loggedInUser')){
    loginPage.style.display = sessionStorage.getItem('loginDisplay');
    signUpPage.style.display = sessionStorage.getItem('signUpDisplay');
    myCartPage.style.display = sessionStorage.getItem('myCartDisplay');
    profilePage.style.display = sessionStorage.getItem('profileDisplay');
    indexPage.style.pointerEvents = sessionStorage.getItem('indexPointerEvents');
}