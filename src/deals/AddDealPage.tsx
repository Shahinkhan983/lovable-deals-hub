import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import DealsSidebar from "./components/DealsSidebar";
import DealsHeader from "./components/DealsHeader";
import Breadcrumbs from "./components/Breadcrumbs";
import FormSection from "./components/FormSection";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormTextarea from "./components/FormTextarea";
import TieredPricingTable from "./components/TieredPricingTable";
import FormRadioGroup from "./components/FormRadioGroup";
import FormImageUpload from "./components/FormImageUpload";
import FormDateTimePicker from "./components/FormDateTimePicker";
import FormSearchInput from "./components/FormSearchInput";
import { Button } from "@/components/ui/button";
import { dealFormSchema, type DealFormData } from "./schemas/dealFormSchema";

const defaultTiers = [
  { id: "silver", name: "Silver", symbol: "AG", gradient: "from-gray-300 to-gray-400", value: "" },
  { id: "gold", name: "Gold", symbol: "AU", gradient: "from-yellow-300 to-yellow-500", value: "" },
  { id: "platinum", name: "Platinum", symbol: "PT", gradient: "from-slate-300 to-slate-400", value: "" },
  { id: "titanium", name: "Titanium", symbol: "TI", gradient: "from-gray-700 to-gray-900", value: "" },
  { id: "diamond", name: "Diamond", symbol: "DM", gradient: "from-cyan-300 to-blue-400", value: "" },
];

const AddDealPage = () => {
  const breadcrumbItems = [
    { label: "Home", href: "#" },
    { label: "Deals", href: "#" },
    { label: "Create Deal" },
  ];

  // Images state (separate from form as it handles File objects)
  const [images, setImages] = useState<string[]>([]);

  // Tiered pricing state
  const [tieredEnabled, setTieredEnabled] = useState(true);
  const [tiers, setTiers] = useState(defaultTiers);

  // Deal owner search state
  const [dealOwnerSearch, setDealOwnerSearch] = useState("");
  const [dealOwnerResults, setDealOwnerResults] = useState<{ id: string; name: string; email?: string; activeDeals?: number }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState<{ id: string; name: string; email?: string; activeDeals?: number } | null>(null);

  // Mock search function - replace with actual API call
  const handleDealOwnerSearch = (query: string) => {
    setDealOwnerSearch(query);
    
    if (query.length < 2) {
      setDealOwnerResults([]);
      return;
    }

    setIsSearching(true);
    // Simulate API delay
    setTimeout(() => {
      const mockUsers = [
        { id: "1", name: "John Smith", email: "john.smith@example.com", activeDeals: 12 },
        { id: "2", name: "Jane Doe", email: "jane.doe@example.com", activeDeals: 8 },
        { id: "3", name: "Bob Johnson", email: "bob.johnson@example.com", activeDeals: 3 },
        { id: "4", name: "Alice Williams", email: "alice.w@example.com", activeDeals: 25 },
        { id: "5", name: "Charlie Brown", email: "charlie.b@example.com", activeDeals: 1 },
      ];
      
      const filtered = mockUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(query.toLowerCase()) ||
          (user.email && user.email.toLowerCase().includes(query.toLowerCase()))
      );
      setDealOwnerResults(filtered);
      setIsSearching(false);
    }, 300);
  };

  const handleDealOwnerSelect = (result: { id: string; name: string; email?: string; activeDeals?: number }) => {
    setSelectedOwner(result);
    setDealOwnerSearch("");
    setValue("dealOwnerId", result.id);
    setValue("dealOwnerName", result.name);
    setDealOwnerResults([]);
  };

  const handleDealOwnerClear = () => {
    setSelectedOwner(null);
    setDealOwnerSearch("");
    setValue("dealOwnerId", "");
    setValue("dealOwnerName", "");
  };


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

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DealFormData>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: {
      currency: "USD",
      applyFor: "all",
      dealType: "percentage",
      validityDays: 7,
      totalRedemptions: 0,
      tieredPricingEnabled: true,
      tiers: defaultTiers,
    },
  });

  const applyFor = watch("applyFor") ?? "all";
  const dealType = watch("dealType") ?? "percentage";
  const startDateTime = watch("startDateTime") ?? "";
  const endDateTime = watch("endDateTime") ?? "";

  const showFreeItemName = dealType === "free_item" || dealType === "bogo";
  const showMaxDiscount = dealType === "percentage";
  const showProductName = applyFor === "specific";

  const onSubmit = (data: DealFormData) => {
    // Include images and tiers in final data
    const finalData = {
      ...data,
      images,
      tieredPricingEnabled: tieredEnabled,
      tiers: tieredEnabled ? tiers : [],
    };
    
    console.log("Form submitted:", finalData);
    toast.success("Deal created successfully!", {
      description: `"${data.dealTitle}" has been saved.`,
    });
  };

  const onError = () => {
    toast.error("Please fix the errors in the form", {
      description: "Some required fields are missing or invalid.",
    });
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
            
            <form onSubmit={handleSubmit(onSubmit, onError)} className="flex flex-col gap-6">
              {/* 1. Basic Information */}
              <FormSection title="Basic Information">
                <div className="grid gap-6">
                  <FormSearchInput
                    label="Deal Owner"
                    placeholder="Search deal owners..."
                    hint="Search by name or email"
                    value={dealOwnerSearch}
                    onChange={handleDealOwnerSearch}
                    onSelect={handleDealOwnerSelect}
                    onClear={handleDealOwnerClear}
                    results={dealOwnerResults}
                    isLoading={isSearching}
                    selectedOwner={selectedOwner}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Business Name"
                      placeholder="Enter your business name"
                      type="text"
                      required
                      {...register("businessName")}
                      error={errors.businessName?.message}
                    />
                    <FormInput
                      label="Location Label"
                      placeholder="e.g. Downtown Branch"
                      type="text"
                      hint="Optional - helpful if you have multiple locations"
                      {...register("locationLabel")}
                      error={errors.locationLabel?.message}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Deal Title"
                      placeholder="e.g. Summer Flash Sale 50% Off"
                      type="text"
                      required
                      {...register("dealTitle")}
                      error={errors.dealTitle?.message}
                    />
                    <FormSelect
                      label="Currency"
                      options={currencyOptions}
                      {...register("currency")}
                      error={errors.currency?.message}
                    />
                  </div>
                  <FormTextarea
                    label="Description"
                    placeholder="Describe the terms and benefits of this deal..."
                    {...register("description")}
                    error={errors.description?.message}
                  />
                </div>
              </FormSection>

              {/* 2. Media */}
              <FormSection title="Media">
                <FormImageUpload
                  label="Deal Images"
                  hint="Upload up to 5 images. Recommended size: 800x600px"
                  maxFiles={5}
                  images={images}
                  onImagesChange={setImages}
                />
              </FormSection>

              {/* 3. Deal Scope */}
              <FormSection title="Deal Scope">
                <div className="grid gap-6">
                  <FormRadioGroup
                    label="Apply For"
                    options={applyForOptions}
                    value={applyFor}
                    onChange={(value) => setValue("applyFor", value as "all" | "specific")}
                    hint="Choose whether this deal applies to all products or a specific one"
                    error={errors.applyFor?.message}
                  />
                  
                  {showProductName && (
                    <FormInput
                      label="Product Name"
                      placeholder="Enter the specific product name"
                      type="text"
                      required
                      hint="Required when applying deal to a specific product"
                      {...register("productName")}
                      error={errors.productName?.message}
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
                    required
                    {...register("dealType")}
                    error={errors.dealType?.message}
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
                      {...register("freeItemName")}
                      error={errors.freeItemName?.message}
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
                      {...register("originalPrice")}
                      error={errors.originalPrice?.message}
                    />
                    <FormInput
                      label="Offer Price"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      hint="The discounted price customers will pay"
                      {...register("offerPrice")}
                      error={errors.offerPrice?.message}
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
                      {...register("discountAmount")}
                      error={errors.discountAmount?.message}
                    />
                    <FormInput
                      label="Minimum Spend"
                      placeholder="0.00"
                      type="number"
                      min="0"
                      step="0.01"
                      hint="Minimum purchase amount to qualify for this deal"
                      {...register("minimumSpend")}
                      error={errors.minimumSpend?.message}
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
                        {...register("maxDiscount")}
                        error={errors.maxDiscount?.message}
                      />
                    </div>
                  )}
                </div>
              </FormSection>

              {/* 7. Tiered Pricing */}
              <TieredPricingTable
                enabled={tieredEnabled}
                onEnabledChange={setTieredEnabled}
                tiers={tiers}
                onTiersChange={setTiers}
              />

              {/* 6. Validity & Limits */}
              <FormSection title="Validity & Limits">
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormInput
                      label="Validity Days"
                      placeholder="7"
                      type="number"
                      min="1"
                      hint="Number of days the deal remains valid after claiming"
                      {...register("validityDays")}
                      error={errors.validityDays?.message}
                    />
                    <FormInput
                      label="Total Redemptions"
                      placeholder="0 for unlimited"
                      type="number"
                      min="0"
                      hint="Maximum times this deal can be redeemed (0 = unlimited)"
                      {...register("totalRedemptions")}
                      error={errors.totalRedemptions?.message}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormDateTimePicker
                      label="Start Date & Time"
                      value={startDateTime || ""}
                      onChange={(value) => setValue("startDateTime", value)}
                      required
                      hint="When the deal becomes active"
                      error={errors.startDateTime?.message}
                    />
                    <FormDateTimePicker
                      label="End Date & Time"
                      value={endDateTime || ""}
                      onChange={(value) => setValue("endDateTime", value)}
                      required
                      hint="When the deal expires"
                      error={errors.endDateTime?.message}
                    />
                  </div>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating..." : "Create Deal"}
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
