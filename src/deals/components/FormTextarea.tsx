import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

const FormTextarea = ({ label, className, ...props }: FormTextareaProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      <div className="border border-input rounded-lg overflow-hidden focus-within:border-primary focus-within:ring-1 focus-within:ring-primary bg-card">
        <div className="flex items-center gap-1 p-2 bg-muted border-b border-input">
          {["format_bold", "format_italic", "format_underlined"].map((icon) => (
            <button
              key={icon}
              type="button"
              className="p-1.5 rounded hover:bg-secondary text-muted-foreground transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
            </button>
          ))}
          <div className="w-px h-5 bg-border mx-1" />
          {["format_list_bulleted", "link"].map((icon) => (
            <button
              key={icon}
              type="button"
              className="p-1.5 rounded hover:bg-secondary text-muted-foreground transition-colors"
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
            </button>
          ))}
        </div>
        <textarea
          className={cn(
            "w-full h-32 p-4 bg-transparent outline-none text-foreground resize-none",
            "placeholder:text-muted-foreground",
            className
          )}
          {...props}
        />
      </div>
    </div>
  );
};

export default FormTextarea;
