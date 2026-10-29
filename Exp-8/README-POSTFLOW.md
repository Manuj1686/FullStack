# Postflow — EXP-8 visual refresh

This update refreshes the frontend UI while keeping the existing Spring Boot REST endpoints and Kafka flow intact.

## What's new
- Mac-inspired dark glass panels, subtle ambient gradients, and a responsive layout.
- Live status summary cards and a live backend connection indicator.
- Search and status filters for the post queue.
- Character counter, scheduling preview, submit feedback, and retry/refresh controls.
- Auto-refresh continues every 3 seconds; existing API routes and request payload are preserved.

## Run the project

1. Start Docker Desktop and wait until the engine is ready.
2. From this directory, start Kafka:

   ```powershell
   docker compose up -d
   ```

3. Start the Spring Boot backend in a separate terminal:

   ```powershell
   cd backend
   .\mvnw.cmd spring-boot:run
   ```

4. Start the frontend in another terminal:

   ```powershell
   cd frontend
   npm install
   npm run dev
   ```

5. Open the local URL printed by Vite (typically `http://localhost:5173`).

The frontend expects the backend at `http://localhost:8080` and uses `GET /api/posts` plus `POST /api/posts/schedule`, as before.
