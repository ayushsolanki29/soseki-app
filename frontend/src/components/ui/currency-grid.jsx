import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CURRENCIES } from "@/lib/currencies";

export function CurrencyGrid({ value, onChange, disabled }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {CURRENCIES.map((currency) => (
        <button
          key={currency.code}
          type="button"
          onClick={() => onChange(currency.code)}
          disabled={disabled}
          className={cn(
            "relative flex items-center justify-center gap-3 h-14 px-3 rounded-2xl border transition-all outline-none focus-visible:ring-4 focus-visible:ring-primary/10 group",
            value === currency.code
              ? "border-primary ring-1 ring-primary shadow-sm bg-primary/5"
              : "border-muted-foreground/20 hover:border-primary/40 bg-transparent"
          )}
        >
          {/* Round Flag Icon */}
          <div className="shrink-0 size-10 rounded-full overflow-hidden border border-muted/50 shadow-sm bg-muted/20">
            <img 
              src={`https://flagcdn.com/w80/${currency.country}.png`} 
              alt={currency.code}
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Content */}
          <div className="flex flex-col items-start justify-center">
            <span className="font-semibold text-[15px] leading-tight text-foreground">{currency.code}</span>
            <span className="text-xs font-medium text-muted-foreground leading-tight mt-0.5">{currency.symbol}</span>
          </div>
          
          {/* Active Indicator */}
          {value === currency.code && (
            <div className="absolute top-0 right-0 -mt-1.5 -mr-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm ring-2 ring-background">
              <CheckIcon className="size-3" strokeWidth={3} />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
