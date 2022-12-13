const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const loginCardFooter = document.getElementById("login-card-footer");

loginButton.addEventListener('click', ()=>{
    document.querySelector("#flipper").classList.toggle("flip");
    loginCardFooter.style.display = 'block';
});
registerButton.addEventListener('click' , ()=>{
    document.querySelector("#flipper").classList.toggle("flip");
    loginCardFooter.style.display = 'none';

});
