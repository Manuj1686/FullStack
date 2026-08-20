<<<<<<< HEAD
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

=======
// Demo User
const DEMO_USER = {
   name: "Manuj",
  email: "admin@aegis.com",
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
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
export function logout() {
  localStorage.removeItem("token");
}

<<<<<<< HEAD
export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) {
    return false;
  }
=======
// Check Login
export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (!token) return false;
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)

  try {
    const user = JSON.parse(atob(token));

<<<<<<< HEAD
    if (!user.exp || Date.now() >= user.exp) {
=======
    if (Date.now() > user.exp) {
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
      localStorage.removeItem("token");
      return false;
    }

    return true;
  } catch {
<<<<<<< HEAD
    localStorage.removeItem("token");
=======
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
    return false;
  }
}

<<<<<<< HEAD
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
=======
// Get User
export function getUser() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return JSON.parse(atob(token));
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
  } catch {
    return null;
  }
}