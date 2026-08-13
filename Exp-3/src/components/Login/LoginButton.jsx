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
      "
    >
      {loading ? (
        <>
          <Loader2
            size={22}
            className="animate-spin"
          />
          AUTHENTICATING
        </>
      ) : (
        <>
          ACCESS SYSTEM
          <ArrowRight size={24} />
        </>
      )}
    </button>
  );
}