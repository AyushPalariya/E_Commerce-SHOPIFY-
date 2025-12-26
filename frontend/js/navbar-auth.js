document.addEventListener("DOMContentLoaded", () => {
  const authSection = document.getElementById("authSection");
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    // Replace Login with user dropdown
    authSection.innerHTML = `
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-bs-toggle="dropdown">
          <i class="fa-solid fa-user"></i> ${user.name || "User"}
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="orders.html">My Orders</a></li>
          <li><a class="dropdown-item" href="myProfile.html">My Profile</a></li>
          <li><hr class="dropdown-divider"></li>
          <li><a class="dropdown-item text-danger" href="#" id="logoutBtn">Logout</a></li>
        </ul>
      </li>
    `;

    // Logout Functionality
    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("user");
      location.reload(); // refresh page to show login button again
    });
  }
});
