const loginButton = document.getElementById("loginButton");
const registerButton = document.getElementById("registerButton");
let status = 'login';
const host = window.location.origin;

//bringing the pic from cloudinary.

document.addEventListener("DOMContentLoaded", function () {
    let myImages = document.getElementsByClassName("my-image");
    myImages[0].src = "https://res.cloudinary.com/dm2gqkilw/image/upload/v1674659084/users_profile/may-i_orgnc7.png";
    myImages[1].src = "https://res.cloudinary.com/dm2gqkilw/image/upload/v1674659084/users_profile/may-i_orgnc7.png";
});

loginButton.addEventListener('click', () => {
    document.querySelector("#flipper").classList.toggle("flip");
    status = 'login';
});
registerButton.addEventListener('click', () => {
    document.querySelector("#flipper").classList.toggle("flip");
    status = 'signup';

});

let imageFile;

async function loadimg() {
    const file = document.getElementById('signup-form').elements['image'].files[0];
    console.log(file);
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    reader.onloadend = () => {
        imageFile = reader.result;
        console.log(imageFile);
    }
}

document.onsubmit = (e) => {

    e.preventDefault();

    console.log(imageFile);

    let path, data, form

    if (status == 'login') {
        form = document.getElementById('form');
        path = "login";
        data = {
            email: form.elements['email'].value,
            password: form.elements['password'].value,
        }
    } else {
        form = document.getElementById('signup-form');
        path = "signUp"
        data = {
            username: form.elements['username'].value,
            firstname: form.elements['firstname'].value,
            lastname: form.elements['lastname'].value,
            type: "user",
            email: form.elements['email'].value,
            address: form.elements['address'].value,
            gender: form.elements['gender'].value,
            job: form.elements['job'].value,
            description: form.elements['description'].value,
            image: imageFile,
            loginDate: new Date(),
            password: form.elements['password'].value,
        }
    }
    console.log(data);
    genericFetch(data, path)
        .then(retVal => {

            const body = retVal.json()
            if (body.message) {
                alert((body.message));
                location.reload();
            }

            window.location.replace(retVal.url)

        })
        .catch(e => {
            console.log("ERROR!!")
        })
}

const genericFetch = async (data, path) => {

    console.log(`${host}/${path}`)
    return fetch(`${host}/${path}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })

}
