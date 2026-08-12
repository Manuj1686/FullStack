import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-white">

      {/* Top Glow */}

      <div className="absolute left-1/2 top-[-320px] h-[850px] w-[850px] -translate-x-1/2 rounded-full bg-yellow-500/10 blur-[190px]" />

      {/* Left Glow */}

      <div className="absolute bottom-[-180px] left-[-150px] h-[420px] w-[420px] rounded-full bg-yellow-500/5 blur-[160px]" />

      {/* Right Glow */}

      <div className="absolute right-[-180px] top-[150px] h-[350px] w-[350px] rounded-full bg-yellow-500/5 blur-[150px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
          linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "55px 55px",
        }}
      />

      {/* Content */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .7 }}
        className="relative z-10"
      >
        {children}
      </motion.div>

    </main>
  );
}