const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
const loginCardFooter = document.getElementById("login-card-footer");
let status = 'login';
loginButton.addEventListener('click', () => {
    document.querySelector("#flipper").classList.toggle("flip");
    loginCardFooter.style.display = 'block';
    status = 'login';
});
registerButton.addEventListener('click', () => {
    document.querySelector("#flipper").classList.toggle("flip");
    loginCardFooter.style.display = 'none';
    status = 'signup';

});

document.onsubmit = (e) => {
    e.preventDefault();

    if (status == 'login') {
        const form = document.getElementById('form');
        console.log(form.elements['username'].value);
        console.log(form.elements['password'].value);
    } else {
        const form = document.getElementById('signup-form');
        console.log(form.elements['username'].value);
        console.log(form.elements['firstname'].value);
        console.log(form.elements['lastname'].value);
        console.log(form.elements['email'].value);
        console.log(form.elements['address'].value);
        console.log(form.elements['gender'].value);
        console.log(form.elements['job'].value);
        console.log(form.elements['description'].value);
        console.log(form.elements['password'].value);

    }

}
