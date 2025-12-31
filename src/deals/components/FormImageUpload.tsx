import { useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface FormImageUploadProps {
  label: string;
  hint?: string;
  maxFiles?: number;
}

const FormImageUpload = ({ label, hint, maxFiles = 5 }: FormImageUploadProps) => {
  const [images, setImages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      if (images.length + newImages.length < maxFiles) {
        const url = URL.createObjectURL(file);
        newImages.push(url);
      }
    });

    setImages((prev) => [...prev, ...newImages]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm font-semibold text-foreground">{label}</label>
      
      <div className="flex flex-wrap gap-3">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-lg overflow-hidden border border-input group"
          >
            <img src={src} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-background" style={{ fontSize: 24 }}>
                delete
              </span>
            </button>
          </div>
        ))}

        {images.length < maxFiles && (
          <label
            className={cn(
              "w-24 h-24 rounded-lg border-2 border-dashed border-input",
              "flex flex-col items-center justify-center gap-1 cursor-pointer",
              "hover:border-primary hover:bg-primary/5 transition-colors"
            )}
          >
            <span className="material-symbols-outlined text-muted-foreground" style={{ fontSize: 28 }}>
              add_photo_alternate
            </span>
            <span className="text-xs text-muted-foreground">Add</span>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="sr-only"
            />
          </label>
        )}
      </div>

      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
};

export default FormImageUpload;
