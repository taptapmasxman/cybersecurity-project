
// Hero Background Animation
document.addEventListener("mousemove", function (e) {
    const hero = document.querySelector(".hero");
    if (hero) {
        const moveX = (e.clientX / window.innerWidth - 1) * 30;
        const moveY = (e.clientY / window.innerHeight - 1) * 30;
        hero.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    }
});

// Smooth Scroll for About Section
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");

    links.forEach(link => {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                event.preventDefault();
                window.scrollTo({
                    top: targetSection.offsetTop - 60, // Adjust to avoid header overlap
                    behavior: "smooth"
                });
            }
        });
    });
});
// script.js
const loginLink = document.querySelector('a[href="/login.html"]');
const loginModal = document.getElementById('loginModal');
const closeBtn = document.querySelector('.close');

// Open modal when login link clicked
loginLink.addEventListener('click', function (event) {
    event.preventDefault();
    loginModal.style.display = 'block';
});

// Close modal when 'X' clicked
closeBtn.addEventListener('click', function () {
    loginModal.style.display = 'none';
});

// Close modal when clicking outside the modal box
window.addEventListener('click', function (event) {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
});

// Handle form submit (POST request)
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const username = this.username.value;
    const password = this.password.value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    });

    const result = await response.text();
    alert(result);
    loginModal.style.display = 'none';
});

