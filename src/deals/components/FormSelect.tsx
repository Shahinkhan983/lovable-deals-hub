import { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

const FormSelect = ({ label, options, className, ...props }: FormSelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="relative">
        <select
          className={cn(
            "w-full h-11 rounded-lg border border-input bg-card text-foreground px-4 py-2.5",
            "focus:border-primary focus:ring-1 focus:ring-primary outline-none",
            "appearance-none cursor-pointer transition-colors",
            className
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>expand_more</span>
        </div>
      </div>
    </div>
  );
};

export default FormSelect;
