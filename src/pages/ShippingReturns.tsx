import React from 'react';
import { SectionHeader } from '../components/ui/SharedUI';
import { Truck, RotateCcw } from 'lucide-react';

export const ShippingReturns = () => {
  return (
    <section id="shipping" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#041a18] text-[#f0ede6]">
      <div className="max-w-4xl mx-auto w-full mt-12">
        <SectionHeader tag="Customer Service" title="Shipping & Returns" colorClass="text-[#e8a020]" />

        <div className="space-y-8">
          <div className="theme-card">
            <div className="flex items-center gap-3 mb-4 text-[#e8a020]">
              <Truck size={24} />
              <h3 className="text-xl font-display font-black italic uppercase">Courier Pricing Tiers (3kg Weight)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#9abcb6]">
              <div className="bg-[#041a18]/40 p-5 rounded-xl border border-slate-700/50">
                <h4 className="text-white font-bold mb-2">Local (Gauteng)</h4>
                <p>• Overnight Courier: <b>R151.00</b></p>
                <p>• Same Day (Before 10:30): <b>R190.00</b></p>
              </div>
              <div className="bg-[#041a18]/40 p-5 rounded-xl border border-slate-700/50">
                <h4 className="text-white font-bold mb-2">Inland (Truck)</h4>
                <p>• Economy Courier: <b>R174.00</b></p>
                <p>• Overnight Courier: <b>R242.00</b></p>
              </div>
              <div className="bg-[#041a18]/40 p-5 rounded-xl border border-slate-700/50">
                <h4 className="text-white font-bold mb-2">Coastal (Flight)</h4>
                <p>• Economy Courier: <b>R174.00</b></p>
                <p>• Overnight Courier: <b>R283.00</b></p>
              </div>
            </div>
            <p className="text-xs text-[#9abcb6]/70 mt-4 font-mono">Package Dimension Specifications: 106 x 87 x 2 cm | Total Weight: 3.0 kg</p>
          </div>

          <div className="theme-card">
            <div className="flex items-center gap-3 mb-4 text-[#00c9a7]">
              <RotateCcw size={24} />
              <h3 className="text-xl font-display font-black italic uppercase">Return & Replacement Policy</h3>
            </div>
            <p className="text-[#9abcb6] leading-relaxed text-sm">
              We take extreme pride in the handcrafted quality of our wooden Ludo boards. If your board arrives damaged, warped, or with transit-related structural defects, you are eligible for a <b>100% free exchange or full refund</b> within 14 days of receipt.
            </p>
            <p className="text-[#9abcb6] leading-relaxed text-sm mt-3">
              Please email your courier dispatch slip and a photo of the defect to <b>info@ludoleague.co.za</b>. Once verified, our team will coordinate a replacement board delivery and retrieve the damaged unit free of charge.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
