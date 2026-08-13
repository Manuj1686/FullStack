import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export default function Hero({ user }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111111] p-8"
    >

      {/* Glow */}

      <div className="pointer-events-none absolute right-[-100px] top-[-100px] h-[300px] w-[300px] rounded-full bg-yellow-500/10 blur-[120px]" />

      <div className="relative">

        {/* Session */}

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10 text-yellow-500">
            <ShieldCheck size={21} />
          </div>

          <p className="text-sm font-medium tracking-[4px] text-yellow-500">
            SECURE SESSION
          </p>

        </div>

        {/* Greeting */}

        <h1 className="mt-6 text-5xl font-bold text-white">
          Hey {user?.name || "User"} 👋
        </h1>

        <p className="mt-4 text-lg text-zinc-400">
          Welcome to your AEGIS workspace.
        </p>

        {/* User Details */}

        <div className="mt-8 flex flex-wrap gap-4">

          <div className="rounded-xl border border-white/10 bg-black/20 px-5 py-3">

            <p className="text-xs uppercase tracking-[2px] text-zinc-600">
              Role
            </p>

            <p className="mt-1 font-medium text-yellow-500">
              {user?.role || "Unknown"}
            </p>

          </div>

          <div className="rounded-xl border border-white/10 bg-black/20 px-5 py-3">

            <p className="text-xs uppercase tracking-[2px] text-zinc-600">
              Email
            </p>

            <p className="mt-1 text-zinc-300">
              {user?.email || "Unknown"}
            </p>

          </div>

        </div>

      </div>

    </motion.section>
  );
}