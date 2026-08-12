import { ArrowRight, LoaderCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function LoginButton({ loading }) {
  return (
    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={loading}
      className="
      mt-8
      flex
      w-full
      items-center
      justify-center
      gap-3
      rounded-2xl
      bg-yellow-500
      py-4
      font-semibold
      tracking-[3px]
      text-black
      transition-all
      duration-300
      hover:bg-yellow-400
      hover:shadow-[0_0_30px_rgba(212,175,55,.35)]
      disabled:cursor-not-allowed
      disabled:opacity-70
      "
    >
      {loading ? (
        <>
          <LoaderCircle size={20} className="animate-spin" />
          AUTHENTICATING...
        </>
      ) : (
        <>
          ACCESS SYSTEM
          <ArrowRight size={18} />
        </>
      )}
    </motion.button>
  );
}