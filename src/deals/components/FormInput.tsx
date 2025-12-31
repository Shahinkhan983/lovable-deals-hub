import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  required?: boolean;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, hint, required, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
        <input
          ref={ref}
          className={cn(
            "w-full h-11 rounded-lg border border-input bg-card text-foreground px-4",
            "placeholder:text-muted-foreground",
            "focus:border-primary focus:ring-1 focus:ring-primary outline-none",
            "transition-colors",
            error && "border-destructive focus:border-destructive focus:ring-destructive",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-destructive">{error}</p>}
        {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
