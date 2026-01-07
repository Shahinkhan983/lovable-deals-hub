import { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = (result: SearchResult) => {
    onSelect(result);
    setOpen(false);
    inputRef.current?.blur();
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    const first = parts[0]?.[0] ?? "";
    const last = parts[1]?.[0] ?? "";
    return (first + last).toUpperCase();
  };

  const SkeletonRow = () => (
    <div className="px-3 py-2 flex items-center gap-3 animate-pulse">
      <div className="w-9 h-9 rounded-full bg-muted" />
      <div className="flex-1 space-y-1.5">
        <div className="h-4 bg-muted rounded w-32" />
        <div className="h-3 bg-muted rounded w-48" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      
      <Popover open={open} onOpenChange={(isOpen) => {
        // Only allow closing via onOpenChange, not opening (we handle open via input events)
        if (!isOpen) setOpen(false);
      }}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-colors",
              open ? "text-primary" : "text-muted-foreground"
            )} />
            <input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onFocus={() => setOpen(true)}
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
          className="w-[var(--radix-popover-trigger-width)] p-0 rounded-lg overflow-hidden border bg-popover shadow-lg"
          align="start"
          sideOffset={4}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {/* Header */}
          <div className="px-3 py-2 border-b bg-muted/30">
            {isLoading ? (
              <span className="text-xs text-muted-foreground">Searching…</span>
            ) : (
              <span className="text-xs text-muted-foreground">
                {results.length} result{results.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          {/* Results */}
          <div className="max-h-64 overflow-y-auto">
            {isLoading ? (
              <div className="py-1">
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
              </div>
            ) : results.length === 0 ? (
              <div className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              <ul className="py-1">
                {results.map((result) => {
                  const isSelected = selectedId === result.id;
                  
                  return (
                    <li
                      key={result.id}
                      onClick={() => handleSelect(result)}
                      className={cn(
                        "px-3 py-2 cursor-pointer flex items-center gap-3",
                        "hover:bg-accent transition-colors",
                        isSelected && "bg-accent"
                      )}
                    >
                      {/* Avatar */}
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
                        {getInitials(result.name)}
                      </div>

                      {/* Name + email */}
                      <div className="flex-1 min-w-0 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <div className={cn(
                            "text-sm font-medium truncate",
                            isSelected ? "text-primary" : "text-foreground"
                          )}>
                            {result.name}
                          </div>
                          {result.email && (
                            <div className="text-xs text-muted-foreground truncate">
                              {result.email}
                            </div>
                          )}
                          {result.activeDeals !== undefined && (
                            <div className="text-xs text-muted-foreground/70">
                              {result.activeDeals} active deal{result.activeDeals !== 1 ? "s" : ""}
                            </div>
                          )}
                        </div>

                        <span className="text-xs text-primary font-medium flex-shrink-0">
                          Select
                        </span>
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
