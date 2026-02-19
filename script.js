// ==========================================
// 2. LOGIN & POP-UP LOGIC
// ==========================================
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const user = usernameInput.value;
    const pass = passwordInput.value;
    const errorDiv = document.getElementById('errorMessage');

    errorDiv.textContent = '';

    if (user === "admin" && pass === "password123") {
        // SUCCESS: Trigger Animation Sequence!
        
        // 1. Hide the main form slightly
        document.getElementById('mainWrapper').style.opacity = '0';
        document.getElementById('mainWrapper').style.transform = 'scale(0.9)';

        // 2. Show the Welcome Pop-up
        const popup = document.getElementById('welcomePopup');
        popup.classList.remove('hidden');
        
        setTimeout(() => {
            popup.classList.add('show');
        }, 50);

        // 3. Redirect to your new file after the animation finishes (3 seconds)
        setTimeout(() => {
            window.location.href = 'buggy1.html'; // <-- UPDATED HERE
        }, 3000);

    } else {
        errorDiv.textContent = 'Access Denied. Try admin / password123';
        passwordInput.value = '';
        updateRunnerPosition();
    }
});