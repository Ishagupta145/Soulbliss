document.addEventListener('DOMContentLoaded', () => {
    // Handle login form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const rememberCheckbox = document.getElementById('remember');

        loginForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const email = emailInput?.value.trim();
            const password = passwordInput?.value.trim();
            const remember = rememberCheckbox?.checked;

            if (!email || !password) {
                alert('Please fill in both fields.');
                return;
            }

            fetch('http://localhost:3000/login', { // Use full backend URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, remember }),
            })
                .then(response => response.text()) // Parse response as plain text
                .then(data => {
                    if (data.includes('successful')) {
                        alert('Login successful!');
                        window.location.href = 'index.html'; // Redirect on success
                    } else {
                        alert('Login failed: ' + data);
                    }
                })
                .catch(error => {
                    console.error('Error during login:', error);
                    alert('An error occurred. Please try again later.');
                });
        });
    }

    // Handle signup form
    const signupForm = document.querySelector('.signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const email = document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value.trim();
            const confirmPassword = document.getElementById('confirm-password')?.value.trim();

            if (!email || !password || !confirmPassword) {
                alert('Please fill in all fields.');
                return;
            }

            if (password !== confirmPassword) {
                alert('Passwords do not match.');
                return;
            }

            fetch('http://localhost:3000/signup', { // Use full backend URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
                .then(response => response.text()) // Parse response as plain text
                .then(data => {
                    if (data.includes('successfully')) {
                        alert('Signup successful!');
                        window.location.href = 'login.html'; // Redirect on success
                    } else {
                        alert('Signup failed: ' + data);
                    }
                })
                .catch(error => {
                    console.error('Error during signup:', error);
                    alert('An error occurred. Please try again later.');
                });
        });
    }
});
