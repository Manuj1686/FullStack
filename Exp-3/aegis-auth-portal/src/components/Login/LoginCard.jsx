import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

import InputField from "./InputField";
import PasswordField from "./PasswordField";
import LoginButton from "./LoginButton";

import { login } from "../../utils/auth";

export default function LoginCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  function handleLogin(e) {
    e.preventDefault();

    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);

      if (result.success) {
        toast.success("Login Successful");

        navigate("/dashboard");
      } else {
        toast.error(result.message);
      }

      setLoading(false);
    }, 1000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
      relative
      w-[470px]
      overflow-hidden
      rounded-[32px]
      border
      border-white/10
      bg-[#111111]/70
      backdrop-blur-3xl
      shadow-[0_30px_80px_rgba(0,0,0,.65)]
      "
    >
      {/* Top Accent */}

      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* Glow */}

      <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-yellow-500/10 blur-[100px]" />

      {/* Glass Reflection */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">

        <div
          className="
          absolute
          left-[-45%]
          top-0
          h-full
          w-[40%]
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/5
          to-transparent
          "
        />

      </div>

      <form
        onSubmit={handleLogin}
        className="relative p-10"
      >

        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs tracking-[2px] text-yellow-400">

          <ShieldCheck size={15} />

          SECURE LOGIN

        </div>

        <h1 className="mt-8 text-4xl font-bold text-white">

          Welcome Back

        </h1>

        <p className="mt-3 text-zinc-400">

          Sign in to continue to your dashboard.

        </p>

        <div className="mt-10 space-y-6">

          <InputField
            label="Email Address"
            placeholder="admin@aegis.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

        </div>

        <LoginButton loading={loading} />

        {/* Demo Credentials */}

        <div
          className="
          mt-8
          rounded-2xl
          border
          border-yellow-500/20
          bg-yellow-500/5
          p-5
          "
        >

          <p className="font-semibold text-yellow-500">

            Demo Credentials

          </p>

          <div className="mt-3 space-y-2 text-sm text-zinc-400">

            <p>Email : admin@aegis.com</p>

            <p>Password : 123456</p>

          </div>

        </div>

        <div className="my-8 h-px bg-white/10" />

        <div className="flex justify-between text-xs uppercase tracking-[2px] text-zinc-500">

          <span>JWT Demo</span>

          <span>Secure</span>

          <span>v1.0</span>

        </div>

      </form>
    </motion.div>
  );
}