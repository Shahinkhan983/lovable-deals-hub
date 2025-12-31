import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import { useState } from "react";
import DealsSidebar from "./components/DealsSidebar";
import DealsHeader from "./components/DealsHeader";
import Breadcrumbs from "./components/Breadcrumbs";
import FormSection from "./components/FormSection";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextarea from "./components/FormTextarea";
import FormRadioGroup from "./components/FormRadioGroup";
import FormImageUpload from "./components/FormImageUpload";
import FormDateTimePicker from "./components/FormDateTimePicker";
import { Button } from "@/components/ui/button";

const AddDealPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "#" },
    { label: "Deals", href: "#" },
    { label: "Create Deal" },
  ];

  // Form state
  const [applyFor, setApplyFor] = useState("all");
  const [dealType, setDealType] = useState("percentage");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");

  const currencyOptions = [
    { value: "USD", label: "USD - US Dollar" },
    { value: "EUR", label: "EUR - Euro" },
    { value: "GBP", label: "GBP - British Pound" },
    { value: "INR", label: "INR - Indian Rupee" },
    { value: "AED", label: "AED - UAE Dirham" },
  ];

  const applyForOptions = [
    { value: "all", label: "All Products" },
    { value: "specific", label: "Specific Product" },
  ];

  const dealTypeOptions = [
    { value: "percentage", label: "Percentage Discount" },
    { value: "fixed", label: "Fixed Amount" },
    { value: "bogo", label: "Buy One Get One (BOGO)" },
    { value: "free_item", label: "Free Item" },
    { value: "voucher", label: "Voucher" },
  ];

  const showFreeItemName = dealType === "free_item" || dealType === "bogo";
  const showMaxDiscount = dealType === "percentage";
  const showProductName = applyFor === "specific";

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
                  Create New Deal
                </h1>
                <p className="text-muted-foreground text-base font-normal">
                  Configure your deal details, pricing, and validity period.
                </p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* 1. Basic Information */}
              <FormSection title="Basic Information">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Business Name"
                      placeholder="Enter your business name"
                      type="text"
                      required
                    />
                    <FormInput
                      label="Location Label"
                      placeholder="e.g. Downtown Branch"
                      type="text"
                      hint="Optional - helpful if you have multiple locations"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Deal Title"
                      placeholder="e.g. Summer Flash Sale 50% Off"
                      type="text"
                      required
                    />
                    <FormSelect
                      label="Currency"
                      options={currencyOptions}
                      defaultValue="USD"
                    />
                  </div>
                  <FormTextarea
                    label="Description"
                    placeholder="Describe the terms and benefits of this deal..."
                  />
                </div>
              </FormSection>

              {/* 2. Media */}
              <FormSection title="Media">
                <FormImageUpload
                  label="Deal Images"
                  hint="Upload up to 5 images. Recommended size: 800x600px"
                  maxFiles={5}
                />
              </FormSection>

              {/* 3. Deal Scope */}
              <FormSection title="Deal Scope">
                <div className="grid gap-6">
                  <FormRadioGroup
                    label="Apply For"
                    options={applyForOptions}
                    value={applyFor}
                    onChange={setApplyFor}
                    hint="Choose whether this deal applies to all products or a specific one"
                  />
                  
                  {showProductName && (
                    <FormInput
                      label="Product Name"
                      placeholder="Enter the specific product name"
                      type="text"
                      required
                      hint="Required when applying deal to a specific product"
                    />
                  )}
                </div>
              </FormSection>

              {/* 4. Deal Type */}
              <FormSection title="Deal Type">
                <div className="grid gap-6">
                  <FormSelect
                    label="Deal Type"
                    options={dealTypeOptions}
                    value={dealType}
                    onChange={(e) => setDealType(e.target.value)}
                    required
                  />
                  
                  {showFreeItemName && (
                    <FormInput
                      label="Free Item Name"
                      placeholder="e.g. Free Coffee, Complimentary Dessert"
                      type="text"
                      hint={dealType === "bogo" 
                        ? "The item customers get free with their purchase" 
                        : "The free item included with this deal"
                      }
                    />
                  )}
                </div>
              </FormSection>

              {/* 5. Pricing & Discount */}
              <FormSection title="Pricing & Discount">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Original Price"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      hint="The regular price before discount"
                    />
                    <FormInput
                      label="Offer Price"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      hint="The discounted price customers will pay"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label={dealType === "percentage" ? "Discount Percentage (%)" : "Discount Amount"}
                      placeholder={dealType === "percentage" ? "e.g. 25" : "e.g. 10.00"}
                      type="number"
                      min="0"
                      max={dealType === "percentage" ? "100" : undefined}
                      step={dealType === "percentage" ? "1" : "0.01"}
                      hint={dealType === "percentage" 
                        ? "Enter a value between 0 and 100" 
                        : "The flat discount amount in selected currency"
                      }
                    />
                    <FormInput
                      label="Minimum Spend"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      hint="Minimum purchase amount to qualify for this deal"
                    />
                  </div>
                  
                  {showMaxDiscount && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormInput
                        label="Maximum Discount"
                        placeholder="e.g. 50.00"
                        type="number"
                        min="0"
                        step="0.01"
                        hint="Cap on the discount amount (leave empty for no limit)"
                      />
                    </div>
                  )}
                </div>
              </FormSection>

              {/* 6. Validity & Limits */}
              <FormSection title="Validity & Limits">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Validity Days"
                      placeholder="7"
                      type="number"
                      min="1"
                      defaultValue={7}
                      hint="Number of days the deal remains valid after claiming"
                    />
                    <FormInput
                      label="Total Redemptions"
                      placeholder="0 for unlimited"
                      type="number"
                      min="0"
                      hint="Maximum times this deal can be redeemed (0 = unlimited)"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormDateTimePicker
                      label="Start Date & Time"
                      value={startDateTime}
                      onChange={setStartDateTime}
                      required
                      hint="When the deal becomes active"
                    />
                    <FormDateTimePicker
                      label="End Date & Time"
                      value={endDateTime}
                      onChange={setEndDateTime}
                      required
                      hint="When the deal expires"
                    />
                  </div>
                  
                  {startDateTime && endDateTime && new Date(endDateTime) <= new Date(startDateTime) && (
                    <p className="text-sm text-destructive flex items-center gap-1">
                      <span className="material-symbols-outlined" style={{ fontSize: 18 }}>warning</span>
                      End date must be after the start date
                    </p>
                  )}
                </div>
              </FormSection>
              
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
                  Create Deal
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
