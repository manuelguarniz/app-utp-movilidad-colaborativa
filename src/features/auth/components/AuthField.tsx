type AuthFieldProps = {
  label: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  rightAction?: React.ReactNode;
  autoComplete?: string;
};

export function AuthField({
  label,
  type = "text",
  value,
  placeholder,
  onChange,
  icon,
  rightAction,
  autoComplete,
}: AuthFieldProps) {
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between gap-4">
        <label className="text-[1.05rem] font-black uppercase tracking-[0.04em] text-[#3a2f2f]">
          {label}
        </label>
        {rightAction}
      </div>

      <div className="flex items-center gap-3 rounded-2xl border-[3px] border-[#d95a5f] bg-[#f5efef] px-4 py-3 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)]">
        {icon && (
          <div className="flex h-7 w-7 items-center justify-center text-[#d93a43]">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className="w-full border-none bg-transparent text-[1.12rem] font-medium text-[#2f2a2a] placeholder:text-[#7a6d6d] focus:outline-none"
        />
        {rightAction && type === "password" ? (
          <div className="ml-auto">{rightAction}</div>
        ) : null}
      </div>
    </div>
  );
}
