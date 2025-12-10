import { supabase } from "@/integrations/supabase/client";

export interface DiscountCode {
  id: string;
  code: string;
  discount_type: "percentage" | "fixed" | "override";
  discount_value: number;
  max_uses: number | null;
  used_count: number;
  valid_from: string;
  valid_until: string | null;
  is_active: boolean;
  description: string | null;
}

export const discountService = {
  async validateCode(code: string): Promise<{ valid: boolean; discount?: DiscountCode; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("discount_codes")
        .select("*")
        .eq("code", code.trim().toLowerCase())
        .eq("is_active", true)
        .maybeSingle();

      if (error) {
        console.error("Error validating discount code:", error);
        return { valid: false, error: "Failed to validate code" };
      }

      if (!data) {
        return { valid: false, error: "Invalid discount code" };
      }

      // Check if code has expired
      if (data.valid_until && new Date(data.valid_until) < new Date()) {
        return { valid: false, error: "This discount code has expired" };
      }

      // Check if code has reached max uses
      if (data.max_uses !== null && data.used_count >= data.max_uses) {
        return { valid: false, error: "This discount code has reached its usage limit" };
      }

      return { valid: true, discount: data };
    } catch (error) {
      console.error("Error in validateCode:", error);
      return { valid: false, error: "An error occurred while validating the code" };
    }
  },

  async incrementUsage(codeId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.rpc("increment_discount_usage", {
        code_id: codeId
      });

      if (error) {
        console.error("Error incrementing discount usage:", error);
        return { success: false, error: "Failed to apply discount" };
      }

      return { success: true };
    } catch (error) {
      console.error("Error in incrementUsage:", error);
      return { success: false, error: "An error occurred while applying the discount" };
    }
  },

  calculateDiscountedPrice(originalPrice: number, discount: DiscountCode): number {
    switch (discount.discount_type) {
      case "percentage":
        return originalPrice * (1 - discount.discount_value / 100);
      case "fixed":
        return Math.max(0, originalPrice - discount.discount_value);
      case "override":
        return discount.discount_value;
      default:
        return originalPrice;
    }
  }
};