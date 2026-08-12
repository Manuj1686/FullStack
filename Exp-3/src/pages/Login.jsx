import { Navigate } from "react-router-dom";
import LoginCard from "../components/Login/LoginCard";
import { isAuthenticated } from "../utils/auth";

export default function Login() {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505]">

      {/* Main Glow */}
      <div className="absolute left-1/2 top-[-300px] h-[800px] w-[800px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[180px] animate-pulse" />

      {/* Left Glow */}
      <div className="absolute bottom-[-120px] left-[-120px] h-[350px] w-[350px] rounded-full bg-yellow-500/5 blur-[120px]" />

      {/* Right Glow */}
      <div className="absolute right-[-120px] top-[120px] h-[300px] w-[300px] rounded-full bg-yellow-500/5 blur-[120px]" />

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <LoginCard />

      <p className="absolute bottom-6 text-sm text-zinc-600">
        © 2026 AEGIS Authentication Portal
      </p>

    </main>
  );
}