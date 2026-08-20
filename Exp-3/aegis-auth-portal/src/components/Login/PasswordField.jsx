import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordField({
  value,
  onChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-zinc-400">
        Password
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          value={value}
          onChange={onChange}
          className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-black/40
          px-5
          py-4
          pr-14
          text-white
          outline-none
          transition-all
          duration-300
          placeholder:text-zinc-600
          focus:border-yellow-500
          focus:ring-2
          focus:ring-yellow-500/20
          "
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="
          absolute
          right-5
          top-1/2
          -translate-y-1/2
          text-zinc-500
          hover:text-yellow-500
          transition
          "
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>

      </div>

    </div>
  );
}