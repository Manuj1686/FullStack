import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

<<<<<<< HEAD
=======
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import LoginButton from "./LoginButton";

>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
import { login } from "../../utils/auth";

export default function LoginCard() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);

  function selectAccount(accountEmail) {
    setEmail(accountEmail);
    setPassword("123456");
  }
=======

  const [loading, setLoading] = useState(false);
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)

  function handleLogin(e) {
    e.preventDefault();

<<<<<<< HEAD
    if (loading) return;

    if (!email.trim() || !password) {
      toast.error("Enter email and password");
      return;
    }

    setLoading(true);

    const result = login(email, password);

    if (!result.success) {
      toast.error(result.message);
      setLoading(false);
      return;
    }

    toast.success(`Welcome ${result.user.name}`);

    // Give toast time to display, then navigate.
    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 300);
=======
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
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="
<<<<<<< HEAD
        relative
        w-[470px]
        max-w-[92vw]
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#111111]/70
        backdrop-blur-3xl
        shadow-[0_30px_80px_rgba(0,0,0,.65)]
      "
    >

      {/* TOP ACCENT */}

      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent" />

      {/* GLOW */}

      <div className="absolute -right-20 -top-24 h-56 w-56 rounded-full bg-yellow-500/10 blur-[100px]" />

      {/* REFLECTION */}
=======
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
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)

      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">

        <div
          className="
<<<<<<< HEAD
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
=======
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
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
          "
        />

      </div>

      <form
        onSubmit={handleLogin}
        className="relative p-10"
      >

<<<<<<< HEAD
        {/* BADGE */}

=======
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
        <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-4 py-2 text-xs tracking-[2px] text-yellow-400">

          <ShieldCheck size={15} />

          SECURE LOGIN

        </div>

<<<<<<< HEAD
        {/* TITLE */}

        <h1 className="mt-8 text-4xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-3 text-zinc-400">
          Sign in to continue to your dashboard.
        </p>

        {/* EMAIL */}

        <div className="mt-10">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Email Address
          </label>

          <input
            type="email"
            value={email}
            placeholder="admin@aegis.com"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-[#080808]
              px-5
              py-4
              text-white
              placeholder:text-zinc-600
              transition
              focus:border-yellow-500/40
              focus:ring-1
              focus:ring-yellow-500/20
            "
          />

        </div>

        {/* PASSWORD */}

        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium text-zinc-300">
            Password
          </label>

          <input
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-[#080808]
              px-5
              py-4
              text-white
              placeholder:text-zinc-600
              transition
              focus:border-yellow-500/40
              focus:ring-1
              focus:ring-yellow-500/20
            "
=======
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
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
          />

        </div>

<<<<<<< HEAD
        {/* LOGIN BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            rounded-2xl
            bg-yellow-500
            px-6
            py-4
            text-lg
            font-semibold
            tracking-[3px]
            text-black
            transition-all
            duration-300
            hover:bg-yellow-400
            hover:shadow-[0_0_35px_rgba(212,175,55,.35)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          {loading ? "AUTHENTICATING..." : "ACCESS SYSTEM →"}
        </button>

        {/* DEMO ACCOUNTS */}

        <div className="mt-8 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">

          <p className="font-semibold text-yellow-500">
            Demo Accounts
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            Click an account to autofill credentials.
          </p>

          <div className="mt-4 space-y-3">

            {/* ADMIN */}

            <button
              type="button"
              onClick={() => selectAccount("admin@aegis.com")}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
                text-left
                transition-all
                hover:border-yellow-500/40
                hover:bg-yellow-500/5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-semibold text-white">
                    Administrator
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    admin@aegis.com
                  </p>

                </div>

                <span className="rounded-full border border-yellow-500/20 bg-yellow-500/10 px-3 py-1 text-xs text-yellow-500">
                  Full Access
                </span>

              </div>

            </button>

            {/* EDITOR */}

            <button
              type="button"
              onClick={() => selectAccount("editor@aegis.com")}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
                text-left
                transition-all
                hover:border-blue-500/40
                hover:bg-blue-500/5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-semibold text-white">
                    Editor
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    editor@aegis.com
                  </p>

                </div>

                <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
                  Edit Access
                </span>

              </div>

            </button>

            {/* VIEWER */}

            <button
              type="button"
              onClick={() => selectAccount("viewer@aegis.com")}
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-black/20
                p-4
                text-left
                transition-all
                hover:border-green-500/40
                hover:bg-green-500/5
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="font-semibold text-white">
                    Viewer
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    viewer@aegis.com
                  </p>

                </div>

                <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs text-green-400">
                  View Only
                </span>

              </div>

            </button>

          </div>

          <p className="mt-4 text-center text-xs text-zinc-600">
            Password for all accounts: 123456
          </p>

        </div>

        {/* FOOTER */}

        <div className="my-8 h-px bg-white/10" />

        <div className="flex justify-between text-xs uppercase tracking-[2px] text-zinc-500">
          <span>JWT Demo</span>
          <span>Role Based</span>
          <span>v1.0</span>
        </div>

      </form>

=======
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
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
    </motion.div>
  );
}