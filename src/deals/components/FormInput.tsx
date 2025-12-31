import { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
}

const FormInput = ({ label, hint, className, ...props }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <input
        className={cn(
          "w-full h-11 rounded-lg border border-input bg-card text-foreground px-4",
          "placeholder:text-muted-foreground",
          "focus:border-primary focus:ring-1 focus:ring-primary outline-none",
          "transition-colors",
          className
        )}
        {...props}
      />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};

export default FormInput;
