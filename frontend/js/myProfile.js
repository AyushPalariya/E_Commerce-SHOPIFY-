document.addEventListener("DOMContentLoaded", () => {
  const profileInfo = document.getElementById("profileInfo");
  
  if (profileInfo) {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
      profileInfo.innerHTML = `
        <p><strong>Name:</strong> ${user.name || "N/A"}</p>
        <p><strong>Email:</strong> ${user.email}</p>
      `;
    } else {
      profileInfo.innerHTML = `<p>You are not logged in. <a href="login.html">Login</a></p>`;
    }
  }

  // Profile page logout
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "login.html";
    });
  }
});
