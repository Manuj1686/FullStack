import { FileText, ShieldCheck, Clock } from "lucide-react";

export default function StatsCards({ posts }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">

      <div
        className="
        rounded-3xl
        border
        border-yellow-500/15
        bg-[#111111]
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-yellow-500/40
        hover:shadow-[0_20px_50px_rgba(212,175,55,.18)]
        "
      >
        <FileText className="text-yellow-500" size={32} />

        <h3 className="mt-6 text-xl font-semibold">
          Total Posts
        </h3>

        <p className="mt-2 text-3xl font-bold">
          {posts.length}
        </p>
      </div>

      <div
        className="
        rounded-3xl
        border
        border-yellow-500/15
        bg-[#111111]
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-yellow-500/40
        hover:shadow-[0_20px_50px_rgba(212,175,55,.18)]
        "
      >
        <ShieldCheck className="text-yellow-500" size={32} />

        <h3 className="mt-6 text-xl font-semibold">
          JWT Status
        </h3>

        <p className="mt-2 text-green-400">
          Active
        </p>
      </div>

      <div
        className="
        rounded-3xl
        border
        border-yellow-500/15
        bg-[#111111]
        p-6
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-yellow-500/40
        hover:shadow-[0_20px_50px_rgba(212,175,55,.18)]
        "
      >
        <Clock className="text-yellow-500" size={32} />

        <h3 className="mt-6 text-xl font-semibold">
          Session
        </h3>

        <p className="mt-2 text-zinc-400">
          Active
        </p>
      </div>

    </div>
  );
}