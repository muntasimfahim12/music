"use client";

import toast from "react-hot-toast";
import { Check } from "lucide-react";

export const showCartToast = (productName: string) => {
  toast.custom((t) => (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-[#0A0A0A] border-l-4 border-[#FF2E2E] shadow-2xl pointer-events-auto flex items-center p-4 rounded-sm`}
    >
      <div className="flex-shrink-0 pt-0.5">
        <div className="h-10 w-10 rounded-full bg-[#FF2E2E]/10 flex items-center justify-center">
          <Check className="h-5 w-5 text-[#FF2E2E]" strokeWidth={3} />
        </div>
      </div>
      <div className="ml-4 flex-1">
        <p className="text-[14px] font-inter font-bold text-white uppercase tracking-tight">
          Added to Cart
        </p>
        <p className="mt-0.5 text-[11px] font-inter font-medium text-zinc-500 uppercase tracking-widest">
           {productName} has been added.
        </p>
      </div>
    </div>
  ), { duration: 3000 });
};