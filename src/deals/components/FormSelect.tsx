import { SelectHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  hint?: string;
  required?: boolean;
  error?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, options, hint, required, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full h-11 rounded-lg border border-input bg-card text-foreground px-4 py-2.5",
              "focus:border-primary focus:ring-1 focus:ring-primary outline-none",
              "appearance-none cursor-pointer transition-colors",
              error && "border-destructive focus:border-destructive focus:ring-destructive",
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
        {error && <p className="text-xs text-destructive">{error}</p>}
        {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
