# MR Fintech — Personal Finance & Budget Manager

A React + Vite frontend with a Java Spring Boot backend and MongoDB persistence.

## What's included
- Clean white and ice-blue dashboard with restrained blue accents and subtle glass panels
- Minimal overview with three key figures and two spending charts; secondary details stay in their own sections
- Quick-add expense modal (also available with Ctrl/Cmd + N), interactive chart range selector and chart hover tooltips
- Transaction search, category filtering, CSV export, and delete confirmation
- Responsive layouts, keyboard focus states, reduced-motion support, and subtle interaction feedback
- Transactions, budgets, analytics, savings goals, and admin views remain available through the sidebar
- Login and registration flow, with backend API calls preserved
- Team credit: **Manuj & Rudransh**

## Run locally

### 1. Start MongoDB
If you created the Docker container previously:

```bash
docker start pocketwise-mongo
```

If the container does not exist yet:

```bash
docker run -d --name pocketwise-mongo -p 27017:27017 -v pocketwise-data:/data/db mongo:7
```

### 2. Start the Spring Boot backend
Open a terminal in `backend` and run:

```bash
mvn spring-boot:run
```

The backend is expected at `http://localhost:8080`.

### 3. Start the React frontend
Open another terminal in `frontend` and run:

```bash
npm install
npm run dev
```

Open the Vite URL printed in the terminal, normally `http://localhost:5173`.

## Admin sign-in

The backend seeds an administrator account when it does not already exist:

- **Email:** `admin@mrfintech.local`
- **Password:** `MRFintech@2026`

You can override these using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables before starting Spring Boot. If an older administrator account already exists in your MongoDB database, it is not overwritten; use the new MR Fintech credentials for the newly seeded account.

## Notes
- The frontend API helper targets `http://localhost:8080/api` for local development. MongoDB keeps the existing `student_expense_manager` database name to preserve compatibility with the previous project data.
- MongoDB must be running for persistent backend storage.
- The dashboard displays data returned by the backend; the initial sample expenses are only a fallback preview when the API is unavailable.
- The month progress and forecast are calculated from recorded expenses and the configured budget; they are not external bank data or a trained prediction model.
- Do not expose MongoDB's port publicly when sharing the app with teammates.
