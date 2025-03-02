document.addEventListener("DOMContentLoaded", function () {
    const testButton = document.getElementById("testButton");

    testButton.addEventListener("click", function () {
        testButton.style.transform = "scale(0.9)";
        testButton.style.backgroundColor = "#ffcc00";

        fetch("http://localhost:3000/run-test", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "start_security_test" })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            alert("Security test started and logged on the server!");
        })
        .catch(error => console.error("Error:", error));

        setTimeout(() => {
            testButton.style.transform = "scale(1)";
            testButton.style.backgroundColor = "#007BFF";
        }, 200);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("darkModeToggle");
    const body = document.body;

    // Load Dark Mode Preference
    if (localStorage.getItem("dark-mode") === "enabled") {
        body.classList.add("dark-mode");
        toggleButton.innerText = "☀️";
    }

    // Toggle Dark Mode
    toggleButton.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        // Save Mode to Local Storage
        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("dark-mode", "enabled");
            toggleButton.innerText = "☀️"; // Change to Sun Icon
        } else {
            localStorage.setItem("dark-mode", "disabled");
            toggleButton.innerText = "🌙"; // Change to Moon Icon
        }
    });
});
document.addEventListener("mousemove", function (e) {
    const hero = document.querySelector(".hero");
    const moveX = (e.clientX / window.innerWidth - 0.5) * 30;  // Adjust sensitivity
    const moveY = (e.clientY / window.innerHeight - 0.5) * 30;

    hero.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
});

