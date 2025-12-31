import { z } from "zod";

export const dealFormSchema = z.object({
  // Basic Information
  businessName: z.string().min(1, "Business name is required").max(100, "Max 100 characters"),
  locationLabel: z.string().max(100, "Max 100 characters").optional(),
  dealTitle: z.string().min(1, "Deal title is required").max(150, "Max 150 characters"),
  description: z.string().max(1000, "Max 1000 characters").optional(),
  currency: z.string().default("USD"),

  // Deal Scope
  applyFor: z.enum(["all", "specific"]),
  productName: z.string().max(100, "Max 100 characters").optional(),

  // Deal Type
  dealType: z.enum(["percentage", "fixed", "bogo", "free_item", "voucher"]),
  freeItemName: z.string().max(100, "Max 100 characters").optional(),

  // Pricing & Discount
  originalPrice: z.coerce.number().min(0, "Must be 0 or greater").optional(),
  offerPrice: z.coerce.number().min(0, "Must be 0 or greater").optional(),
  discountAmount: z.coerce.number().min(0, "Must be 0 or greater").optional(),
  minimumSpend: z.coerce.number().min(0, "Must be 0 or greater").optional(),
  maxDiscount: z.coerce.number().min(0, "Must be 0 or greater").optional(),

  // Tiered Pricing
  tieredPricingEnabled: z.boolean().default(true),
  tiers: z.array(z.object({
    id: z.string(),
    name: z.string(),
    symbol: z.string(),
    gradient: z.string(),
    value: z.string(),
  })).optional(),

  // Validity & Limits
  validityDays: z.coerce.number().min(1, "Must be at least 1 day").default(7),
  totalRedemptions: z.coerce.number().min(0, "Must be 0 or greater").default(0),
  startDateTime: z.string().min(1, "Start date & time is required"),
  endDateTime: z.string().min(1, "End date & time is required"),
}).refine((data) => {
  // Product name required when applyFor is specific
  if (data.applyFor === "specific" && (!data.productName || data.productName.trim() === "")) {
    return false;
  }
  return true;
}, {
  message: "Product name is required when applying to a specific product",
  path: ["productName"],
}).refine((data) => {
  // Discount percentage max 100
  if (data.dealType === "percentage" && data.discountAmount && data.discountAmount > 100) {
    return false;
  }
  return true;
}, {
  message: "Percentage must be between 0 and 100",
  path: ["discountAmount"],
}).refine((data) => {
  // End date must be after start date
  if (data.startDateTime && data.endDateTime) {
    return new Date(data.endDateTime) > new Date(data.startDateTime);
  }
  return true;
}, {
  message: "End date must be after start date",
  path: ["endDateTime"],
});

export type DealFormData = z.infer<typeof dealFormSchema>;
