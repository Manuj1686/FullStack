import { ShieldCheck } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center">

      <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-yellow-500/20 bg-yellow-500/10">

        <ShieldCheck
          size={38}
          className="text-yellow-500"
        />

      </div>

      <h1 className="mt-6 text-4xl font-bold tracking-[8px] text-white">
        AEGIS
      </h1>

      <p className="mt-2 uppercase tracking-[4px] text-zinc-500">
        Secure Authentication
      </p>

    </div>
  );
}