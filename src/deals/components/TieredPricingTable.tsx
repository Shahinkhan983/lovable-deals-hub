interface Tier {
  id: string;
  name: string;
  symbol: string;
  gradient: string;
  value: string;
}

interface TieredPricingTableProps {
  enabled: boolean;
  onEnabledChange: (enabled: boolean) => void;
  tiers: Tier[];
  onTiersChange: (tiers: Tier[]) => void;
}

const TieredPricingTable = ({ enabled, onEnabledChange, tiers, onTiersChange }: TieredPricingTableProps) => {
  const updateTierValue = (id: string, value: string) => {
    onTiersChange(tiers.map(tier => 
      tier.id === id ? { ...tier, value } : tier
    ));
  };

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-bold text-foreground">Tiered Pricing</h2>
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onEnabledChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary-foreground after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-card after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
          <span className="ms-3 text-sm font-medium text-foreground">Enable</span>
        </label>
      </div>
      
      {enabled && (
        <div className="p-6">
          <p className="text-sm text-muted-foreground mb-6">
            Set specific offer values or discounts for each customer loyalty tier.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-sm font-semibold text-muted-foreground w-1/3">Tier Level</th>
                  <th className="py-3 px-4 text-sm font-semibold text-muted-foreground">Offer Value / Discount</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tiers.map((tier) => (
                  <tr 
                    key={tier.id} 
                    className="group hover:bg-muted/50 transition-colors border-b border-border last:border-b-0"
                  >
                    <td className="py-4 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div 
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${tier.gradient} shadow-sm flex items-center justify-center text-white text-[10px] font-bold`}
                        >
                          {tier.symbol}
                        </div>
                        <span className="font-bold text-foreground">{tier.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <input
                        type="text"
                        value={tier.value}
                        onChange={(e) => updateTierValue(tier.id, e.target.value)}
                        placeholder={`e.g. ${(tiers.indexOf(tier) + 1) * 5}%`}
                        className="w-full max-w-xs h-10 rounded-lg border border-input bg-card px-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none placeholder:text-muted-foreground transition-colors"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TieredPricingTable;
