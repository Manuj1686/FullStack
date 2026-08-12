// Demo User
const DEMO_USER = {
   name: "Rudransh",
  email: "i.am.rudransh18@gmail.com",
  password: "123456",
  role: "Administrator",
};

// Login
export function login(email, password) {
  if (
    email === DEMO_USER.email &&
    password === DEMO_USER.password
  ) {
    const payload = {
      name: DEMO_USER.name,
      email: DEMO_USER.email,
      role: DEMO_USER.role,
      exp: Date.now() + 60 * 60 * 1000, // 1 hour
    };

    const token = btoa(JSON.stringify(payload));

    localStorage.setItem("token", token);

    return {
      success: true,
      token,
    };
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
}

// Logout
export function logout() {
  localStorage.removeItem("token");
}

// Check Login
export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;

  try {
    const user = JSON.parse(atob(token));

    if (Date.now() > user.exp) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Get User
export function getUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return JSON.parse(atob(token));
  } catch {
    return null;
  }
}