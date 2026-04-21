document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    // Populate user banner
    document.getElementById("profileName").innerText = user.name || "User";
    document.getElementById("profileEmail").innerText = user.email || "";
    document.getElementById("profilePhone").innerText = user.phone || "No Phone Number Provided";

    // Logout logic
    document.getElementById("logoutBtn").addEventListener("click", () => {
        localStorage.removeItem("user");
        window.location.href = "index.html";
    });
});
