"use client";

import toast from "react-hot-toast";
import { Check, ShoppingCart, X } from "lucide-react";

export const showCartToast = (productName: string) => {
  toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-in fade-in slide-in-from-right-full duration-500" : "animate-out fade-out slide-out-to-right-full duration-500"
        } max-w-sm w-full bg-zinc-950/80 backdrop-blur-md border border-white/10 shadow-[0_0_30px_rgba(255,46,46,0.15)] pointer-events-auto flex flex-col overflow-hidden rounded-md relative group`}
      >
        <div className="absolute top-0 left-0 h-[2px] bg-[#FF2E2E] w-full origin-left animate-[shrink_3000ms_linear]" />

        <div className="flex items-center p-5 gap-4">
          <div className="relative flex-shrink-0">
            <div className="h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-white" strokeWidth={1.5} />
            </div>
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-[#FF2E2E] rounded-full flex items-center justify-center border-2 border-black">
              <Check className="h-2.5 w-2.5 text-white" strokeWidth={4} />
            </div>
          </div>

          {/* টেক্সট সেকশন */}
          <div className="flex-1">
            <h3 className="text-[11px] font-black text-[#FF2E2E] uppercase tracking-[0.2em]">
              System Update
            </h3>
            <div className="flex flex-col mt-0.5">
              <span className="text-[14px] font-bold text-white uppercase tracking-tight leading-tight">
                Item Secured
              </span>
              <span className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest mt-1 truncate max-w-[180px]">
                {productName}
              </span>
            </div>
          </div>

          <button 
            onClick={() => toast.dismiss(t.id)}
            className="p-1 hover:bg-white/5 rounded-full transition-colors text-zinc-600 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="bg-white/[0.02] px-5 py-2 border-t border-white/5 flex justify-between items-center">
          <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-tighter">
            Loc: Warehouse_01
          </span>
          <span className="text-[8px] font-mono text-zinc-600 uppercase">
             Status: Synced
          </span>
        </div>
      </div>
    ),
    { 
      duration: 3000,
      position: "bottom-right" 
    }
  );
};