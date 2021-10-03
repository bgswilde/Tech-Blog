const failSignup = document.getElementById('failed-signup');
const failLogin = document.getElementById('failed-login');
const signupForm = document.getElementById('signup')
const loginForm = document.getElementById('login')

// function to add the data from the front end form to the user model on the backend (async to handle the fetch request)
async function signupFormHandler(event) {
    event.preventDefault();

    // user input data
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        
        // check the response status, send the user to the dashboard when they are logged in
        if (response.ok) {
            console.log('Signup Worked!');
            document.location.replace('/dashboard');
        } else {
            signupForm.reset();
            failedSignupMessage();
            alert(response.statusText);
        }
    }
}

// function to use the data from the front end form to verify a user identity and log in (async to handle the fetch request)
async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        // check the response status, send the user to the dashboard when they are logged in
        if (response.ok) {
            console.log(response)
            debugger;
            document.location.replace('/dashboard');
        } else {
            loginForm.reset();
            failedLoginMessage();
            alert(response.statusText);
        }
    }
}

function failedLoginMessage() {
    failLogin.classList.remove("hidden");
    setTimeout(function() {
        failLogin.classList.add("hidden")
    }, 4000)
}

function failedSignupMessage() {
    failSignup.classList.remove("hidden");
    setTimeout(function() {
        failSignup.classList.add("hidden")
    }, 4000)
}

signupForm.addEventListener('submit', signupFormHandler);
loginForm.addEventListener('submit', loginFormHandler);