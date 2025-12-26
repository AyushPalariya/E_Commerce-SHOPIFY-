// Backend base URL
const BASE_URL = "http://localhost:8080/users";

// Handle Register
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const userData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  };

  try {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData)
    });

 if (res.ok) {
  const data = await res.json(); // backend should return user object
  localStorage.setItem("user", JSON.stringify({ email: data.email, name: data.name }));
  alert("Registration successful!");
  window.location.href = "index.html";
    }
 else {
      alert("Registration failed!");
    }
  } catch (err) {
    console.error(err);
    alert("Error during registration");
  }
});

// Handle Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const loginData = {
    email: document.getElementById("loginEmail").value,
    password: document.getElementById("loginPassword").value
  };

  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginData)
    });

if (res.ok) {
  const data = await res.json(); // backend should return user object
  localStorage.setItem("user", JSON.stringify({ email: data.email, name: data.name }));
  alert("Login successful!");
  window.location.href = "index.html"; // redirect to home
} else {
  alert("Invalid credentials!");
}

  } catch (err) {
    console.error(err);
    alert("Error during login");
  }
});
