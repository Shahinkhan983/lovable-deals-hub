import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import DealsSidebar from "./components/DealsSidebar";
import DealsHeader from "./components/DealsHeader";
import Breadcrumbs from "./components/Breadcrumbs";
import FormSection from "./components/FormSection";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextarea from "./components/FormTextarea";
import TieredPricingTable from "./components/TieredPricingTable";
import { Button } from "@/components/ui/button";

const AddDealPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "#" },
    { label: "Deals", href: "#" },
    { label: "Add Deal" },
  ];

  const dealTypeOptions = [
    { value: "percentage", label: "Percentage Discount" },
    { value: "fixed", label: "Fixed Amount Discount" },
    { value: "specific", label: "Specific Item Pricing" },
    { value: "bogo", label: "Buy One Get One (BOGO)" },
    { value: "gift", label: "Free Gift" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <div className="flex h-screen w-full overflow-hidden font-display bg-background">
      {/* Google Material Symbols font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      
      <DealsSidebar />
      
      <main className="flex flex-col flex-1 h-full overflow-hidden relative">
        <DealsHeader />
        
        <div className="flex-1 overflow-y-auto bg-background p-6 lg:p-10">
          <div className="max-w-5xl mx-auto flex flex-col gap-6 pb-20">
            <Breadcrumbs items={breadcrumbItems} />
            
            {/* Page Heading */}
            <div className="flex flex-wrap justify-between items-end gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-foreground text-3xl lg:text-4xl font-black leading-tight tracking-[-0.033em]">
                  Add New Deal
                </h1>
                <p className="text-muted-foreground text-base font-normal">
                  Configure deal details, constraints, and tiered pricing.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Basic Information */}
              <FormSection title="Basic Information">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormSelect
                      label="Deal Type"
                      options={dealTypeOptions}
                    />
                    <FormInput
                      label="Deal Name"
                      placeholder="e.g. Summer Mega Sale 2024"
                      type="text"
                    />
                  </div>
                  <FormTextarea
                    label="Description"
                    placeholder="Describe the terms and benefits of this deal..."
                  />
                </div>
              </FormSection>
              
              {/* Constraints & Validity */}
              <FormSection title="Constraints & Validity">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Minimum Purchase Requirement ($)"
                      placeholder="0.00"
                      type="number"
                    />
                    <FormInput
                      label="Maximum Discount Cap ($)"
                      placeholder="No limit"
                      type="number"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-foreground">Validity Period</label>
                      <div className="flex items-center gap-2">
                        <input
                          type="date"
                          className="w-full h-11 rounded-lg border border-input bg-card text-foreground px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                        <span className="text-muted-foreground text-sm">to</span>
                        <input
                          type="date"
                          className="w-full h-11 rounded-lg border border-input bg-card text-foreground px-4 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <FormInput
                      label="Claim Validity (Days)"
                      placeholder="e.g. 30"
                      type="number"
                      hint="Days valid after user claims the deal"
                    />
                  </div>
                </div>
              </FormSection>
              
              {/* Tiered Pricing */}
              <TieredPricingTable />
              
              {/* Footer Actions */}
              <div className="flex items-center justify-end gap-4 mt-4 py-4 bg-background sticky bottom-0 z-10 border-t border-border lg:border-none lg:static">
                <Button
                  type="button"
                  variant="outline"
                  className="h-11 px-6 font-bold"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="h-11 px-8 font-bold shadow-lg shadow-primary/30"
                >
                  Save Deal
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddDealPage;
