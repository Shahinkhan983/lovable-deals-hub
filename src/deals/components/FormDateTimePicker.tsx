import { cn } from "@/lib/utils";

interface FormDateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  error?: string;
}

const FormDateTimePicker = ({ label, value, onChange, hint, required, error }: FormDateTimePickerProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        type="datetime-local"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "w-full h-11 rounded-lg border border-input bg-card text-foreground px-4",
          "focus:border-primary focus:ring-1 focus:ring-primary outline-none",
          "transition-colors",
          error && "border-destructive focus:border-destructive focus:ring-destructive"
        )}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {!error && hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};

export default FormDateTimePicker;
