<<<<<<< HEAD
import { ArrowRight, Loader2 } from "lucide-react";

export default function LoginButton({ loading }) {
  return (
    <button
      type="submit"
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
=======
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
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
      "
    >
      {loading ? (
        <>
<<<<<<< HEAD
          <Loader2
            size={22}
            className="animate-spin"
          />
          AUTHENTICATING
=======
          <LoaderCircle size={20} className="animate-spin" />
          AUTHENTICATING...
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
        </>
      ) : (
        <>
          ACCESS SYSTEM
<<<<<<< HEAD
          <ArrowRight size={24} />
        </>
      )}
    </button>
=======
          <ArrowRight size={18} />
        </>
      )}
    </motion.button>
>>>>>>> parent of 7dbcf92 (Delete Exp-3 directory)
  );
}