import { cn } from "@/lib/utils";

interface RadioOption {
  value: string;
  label: string;
}

interface FormRadioGroupProps {
  label: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  error?: string;
}

const FormRadioGroup = ({ label, options, value, onChange, hint, required, error }: FormRadioGroupProps) => {
  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all",
              value === option.value
                ? "border-primary bg-primary/10 text-foreground"
                : "border-input bg-card text-muted-foreground hover:border-primary/50",
              error && "border-destructive"
            )}
          >
            <input
              type="radio"
              name={label.replace(/\s/g, "_")}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <div
              className={cn(
                "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                value === option.value ? "border-primary" : "border-muted-foreground"
              )}
            >
              {value === option.value && (
                <div className="w-2 h-2 rounded-full bg-primary" />
              )}
            </div>
            <span className="text-sm font-medium">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};

export default FormRadioGroup;
