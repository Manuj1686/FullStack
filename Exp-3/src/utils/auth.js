const DEMO_USERS = [
  {
    name: "Manuj",
    email: "admin@aegis.com",
    password: "123456",
    role: "Administrator",
  },
  {
    name: "Alex",
    email: "editor@aegis.com",
    password: "123456",
    role: "Editor",
  },
  {
    name: "Viewer",
    email: "viewer@aegis.com",
    password: "123456",
    role: "Viewer",
  },
];

export function login(email, password) {
  const cleanEmail = String(email).trim().toLowerCase();
  const cleanPassword = String(password);

  const user = DEMO_USERS.find(
    (item) =>
      item.email.toLowerCase() === cleanEmail &&
      item.password === cleanPassword
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const payload = {
    name: user.name,
    email: user.email,
    role: user.role,
    exp: Date.now() + 60 * 60 * 1000,
  };

  const token = btoa(JSON.stringify(payload));

  localStorage.setItem("token", token);

  return {
    success: true,
    token,
    user: payload,
  };
}

export function logout() {
  localStorage.removeItem("token");
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }

  try {
    const user = JSON.parse(atob(token));

    if (!user.exp || Date.now() >= user.exp) {
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem("token");
    return false;
  }
}

export function getUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }

  try {
    const user = JSON.parse(atob(token));

    if (!user.exp || Date.now() >= user.exp) {
      localStorage.removeItem("token");
      return null;
    }

    return user;
  } catch {
    return null;
  }
}