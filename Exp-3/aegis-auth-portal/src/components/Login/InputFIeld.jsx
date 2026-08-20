export default function InputField({
  label,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>

      <label className="mb-2 block text-sm font-medium text-zinc-400">
        {label}
      </label>

      <input
        type="email"
        placeholder={placeholder}
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

    </div>
  );
}