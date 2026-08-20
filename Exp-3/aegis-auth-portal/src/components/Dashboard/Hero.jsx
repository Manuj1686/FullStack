import { LogOut, LayoutDashboard, FileText, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ user, onLogout }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="
      sticky
      top-0
      z-50
      border-b
      border-white/10
      bg-[#111111]/70
      backdrop-blur-3xl
      "
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-10 py-5">

        {/* Logo */}

        <div>

          <h1 className="text-3xl font-bold tracking-[8px] text-yellow-500">
            AEGIS
          </h1>

          <p className="mt-1 text-xs tracking-[5px] text-zinc-500">
            AUTH PORTAL
          </p>

        </div>

        {/* Navigation */}

        <div className="hidden items-center gap-10 md:flex">

          <button className="group flex items-center gap-2 text-zinc-400 transition hover:text-yellow-500">

            <LayoutDashboard size={18} />

            <span>Dashboard</span>

            <div className="absolute mt-8 h-[2px] w-0 bg-yellow-500 transition-all duration-300 group-hover:w-20"></div>

          </button>

          <button className="group flex items-center gap-2 text-zinc-400 transition hover:text-yellow-500">

            <FileText size={18} />

            <span>Posts</span>

          </button>

          <button className="group flex items-center gap-2 text-zinc-400 transition hover:text-yellow-500">

            <Activity size={18} />

            <span>Activity</span>

          </button>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-5">

          <div className="flex items-center gap-3">

            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gradient-to-br
              from-yellow-400
              to-yellow-600
              text-lg
              font-bold
              text-black
              shadow-[0_0_25px_rgba(212,175,55,.35)]
              "
            >
              {user?.name?.charAt(0)}
            </div>

            <div>

              <p className="font-semibold text-white">
                {user?.name}
              </p>

              <p className="text-sm text-zinc-500">
                {user?.role}
              </p>

            </div>

          </div>

          <button
            onClick={onLogout}
            className="
            flex
            items-center
            gap-2
            rounded-2xl
            border
            border-yellow-500/20
            bg-yellow-500/10
            px-5
            py-3
            text-yellow-500
            transition-all
            duration-300
            hover:bg-yellow-500
            hover:text-black
            hover:shadow-[0_0_30px_rgba(212,175,55,.35)]
            "
          >
            <LogOut size={18} />

            Logout

          </button>

        </div>

      </div>

    </motion.nav>
  );
}