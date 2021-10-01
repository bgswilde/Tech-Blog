const failSignup = document.getElementById('failed-signup');
const failLogin = document.getElementById('failed-login');
const signupForm = document.getElementById('signup')
const loginForm = document.getElementById('signup')

async function signupFormHandler(event) {
    event.preventDefault();

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
        
        // check the response status
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

        if (response.ok) {
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