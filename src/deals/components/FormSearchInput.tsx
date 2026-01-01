import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

interface SearchResult {
  id: string;
  name: string;
  email?: string;
}

interface FormSearchInputProps {
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
  error?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (result: SearchResult) => void;
  results: SearchResult[];
  isLoading?: boolean;
}

const FormSearchInput = ({
  label,
  placeholder = "Search...",
  hint,
  required,
  error,
  value,
  onChange,
  onSelect,
  results,
  isLoading,
}: FormSearchInputProps) => {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 0 && results.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [value, results]);

  const handleSelect = (result: SearchResult) => {
    onSelect(result);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => {
                if (value.length > 0 && results.length > 0) {
                  setOpen(true);
                }
              }}
              placeholder={placeholder}
              className={cn(
                "w-full h-11 pl-10 pr-4 rounded-lg border bg-background text-foreground text-sm",
                "placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary",
                "transition-colors",
                error ? "border-destructive" : "border-input"
              )}
            />
          </div>
        </PopoverTrigger>
        
        <PopoverContent 
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-60 overflow-y-auto">
            {isLoading ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                Searching...
              </div>
            ) : results.length === 0 ? (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              <ul className="py-1">
                {results.map((result) => (
                  <li
                    key={result.id}
                    onClick={() => handleSelect(result)}
                    className={cn(
                      "px-4 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground",
                      "transition-colors text-sm"
                    )}
                  >
                    <div className="font-medium text-foreground">{result.name}</div>
                    {result.email && (
                      <div className="text-xs text-muted-foreground">{result.email}</div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </PopoverContent>
      </Popover>
      
      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
      {error && (
        <p className="text-xs text-destructive">{error}</p>
      )}
    </div>
  );
};

export default FormSearchInput;
