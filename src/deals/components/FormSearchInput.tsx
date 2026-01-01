import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Check } from "lucide-react";

interface SearchResult {
  id: string;
  name: string;
  email?: string;
  activeDeals?: number;
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
  selectedId?: string;
}

const FormSearchInput = ({
  label,
  placeholder = "Search deal owners...",
  hint,
  required,
  error,
  value,
  onChange,
  onSelect,
  results,
  isLoading,
  selectedId,
}: FormSearchInputProps) => {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value.length > 0 && results.length > 0) {
      setOpen(true);
    } else if (value.length === 0) {
      setOpen(false);
    }
  }, [value, results]);

  const handleSelect = (result: SearchResult) => {
    onSelect(result);
    setOpen(false);
  };

  const handleInputFocus = () => {
    if (value.length > 0 && results.length > 0) {
      setOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative group">
            <Search className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 pointer-events-none transition-colors duration-200",
              open ? "text-primary" : "text-muted-foreground group-hover:text-primary/70"
            )} />
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={handleInputFocus}
              placeholder={placeholder}
              className={cn(
                "w-full h-12 pl-12 pr-4 rounded-[25px] border-0 bg-background text-foreground text-sm",
                "placeholder:text-muted-foreground",
                "shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
                "transition-all duration-300 ease-out",
                error && "ring-2 ring-destructive/30"
              )}
            />
            {selectedId && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Check className="h-5 w-5 text-primary animate-in zoom-in-50 duration-200" />
              </div>
            )}
          </div>
        </PopoverTrigger>
        
        <PopoverContent 
          className={cn(
            "w-[var(--radix-popover-trigger-width)] p-0 rounded-2xl overflow-hidden",
            "shadow-[0_8px_30px_rgba(0,0,0,0.12)] border-0 bg-background"
          )}
          align="start"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="max-h-72 overflow-y-auto">
            {isLoading ? (
              <div className="px-5 py-4 text-sm text-muted-foreground flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                <span>Searching...</span>
              </div>
            ) : results.length === 0 && value.length > 0 ? (
              <div className="px-5 py-4 text-sm text-muted-foreground">
                No results found for "{value}"
              </div>
            ) : (
              <ul className="py-2">
                {results.map((result) => {
                  const isSelected = selectedId === result.id;
                  const isHovered = hoveredId === result.id;
                  
                  return (
                    <li
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setHoveredId(result.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={cn(
                        "px-5 py-3 cursor-pointer flex items-center justify-between gap-3",
                        "transition-all duration-200 ease-out",
                        isSelected 
                          ? "bg-primary/5" 
                          : "hover:bg-accent/50"
                      )}
                    >
                      <div className="flex-1 min-w-0">
                        <div className={cn(
                          "font-semibold text-foreground truncate",
                          isSelected && "text-primary"
                        )}>
                          {result.name}
                        </div>
                        {result.email && (
                          <div className="text-xs text-muted-foreground mt-0.5 truncate">
                            {result.email}
                          </div>
                        )}
                        {result.activeDeals !== undefined && (
                          <div className="text-xs text-muted-foreground/70 mt-0.5">
                            {result.activeDeals} active deal{result.activeDeals !== 1 ? 's' : ''}
                          </div>
                        )}
                      </div>
                      
                      <div className={cn(
                        "flex-shrink-0 transition-all duration-200",
                        (isSelected || isHovered) ? "opacity-100 scale-100" : "opacity-0 scale-75"
                      )}>
                        <Check className={cn(
                          "h-5 w-5",
                          isSelected ? "text-primary" : "text-muted-foreground"
                        )} />
                      </div>
                    </li>
                  );
                })}
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
