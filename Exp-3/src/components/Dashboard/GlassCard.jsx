import { motion } from "framer-motion";

export default function GlassCard({
  children,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -6,
        scale: 1.01,
      }}
      transition={{
        duration: 0.25,
      }}
      className={`
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-white/10
        bg-[#111111]/70
        backdrop-blur-3xl
        shadow-[0_25px_80px_rgba(0,0,0,.55)]
        transition-all
        duration-300
        hover:border-yellow-500/30
        hover:shadow-[0_30px_90px_rgba(212,175,55,.12)]
        ${className}
      `}
    >

      {/* Top Golden Line */}

      <div className="absolute left-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-60" />

      {/* Glow */}

      <div
        className="
        absolute
        -right-24
        -top-24
        h-56
        w-56
        rounded-full
        bg-yellow-500/10
        blur-[110px]
        transition-all
        duration-500
        group-hover:bg-yellow-500/15
        "
      />

      {/* Glass Reflection */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">

        <div
          className="
          absolute
          left-[-40%]
          top-0
          h-full
          w-[35%]
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/5
          to-transparent
          transition-all
          duration-700
          group-hover:left-[130%]
          "
        />

      </div>

      <div className="relative z-10">

        {children}

      </div>

    </motion.div>
  );
}