import { ShieldCheck, Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10">

      <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-5 px-10 py-8 text-zinc-500 md:flex-row">

        <div>

          <h2 className="text-lg font-semibold tracking-[5px] text-yellow-500">
            AEGIS
          </h2>

          <p className="mt-2 text-sm">
            Enterprise Authentication Dashboard
          </p>

        </div>

        <div className="flex items-center gap-8">

          <div className="flex items-center gap-2">

            <ShieldCheck
              size={18}
              className="text-yellow-500"
            />

            Secure Session

          </div>

          <div className="flex items-center gap-2">

            <Code2 size={18} />

            React + Vite

          </div>

        </div>

      </div>

    </footer>
  );
}