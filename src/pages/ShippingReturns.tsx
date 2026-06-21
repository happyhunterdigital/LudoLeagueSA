import { SectionHeader } from '../components/ui/SharedUI';
import { Truck, RotateCcw, Image as ImageIcon } from 'lucide-react';

export const ShippingReturns = () => {
  return (
    <section id="shipping" className="min-h-screen w-full relative flex flex-col justify-center py-24 px-4 md:px-10 bg-[#041a18] text-[#f0ede6]">
      <div className="max-w-4xl mx-auto w-full mt-12">
        <SectionHeader tag="Customer Service" title="Shipping & Returns" colorClass="text-[#e8a020]" />

        <div className="space-y-8">
          
          {/* Calculated Courier Rates (From Handwritten Note) */}
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

          {/* Prints Shipping Policy (From PDF Page 1) */}
          <div className="theme-card">
            <div className="flex items-center gap-3 mb-4 text-[#00c9a7]">
              <ImageIcon size={24} />
              <h3 className="text-xl font-display font-black italic uppercase">Prints Shipping Policy</h3>
            </div>
            <p className="text-[#9abcb6] leading-relaxed text-sm">
              We at Ludo League South Africa are committed to delivering your prints to you in a timely and safe manner. We offer shipping for print orders within South Africa. For International orders please send an email to <b>info@ludoleague.co.za</b> for shipping rates. Please allow up to 5 business days for us to process and ship your order. Prints are carefully packaged and shipped unframed to ensure their safe arrival. If you have any questions about our shipping methods or costs, please contact us.
            </p>
          </div>

          {/* Return & Exchange Policy (From PDF Pages 1-2) */}
          <div className="theme-card">
            <div className="flex items-center gap-3 mb-4 text-[#e8a020]">
              <RotateCcw size={24} />
              <h3 className="text-xl font-display font-black italic uppercase">Return & Exchange Policy</h3>
            </div>
            <p className="text-[#9abcb6] leading-relaxed text-sm">
              We want you to be completely satisfied with your Ludo League Ludo Boards and Tokens. If for any reason you are not happy with your purchase, please contact us within 7 days of receiving your order to initiate a return or exchange. Please note that for return or exchange requests, customers are responsible for covering the shipping costs. Items and prints must be returned in their original condition and packaging.
            </p>
            <p className="text-[#9abcb6] leading-relaxed text-sm mt-3">
              Returns will be processed within 5 business days of receipt and a refund will be issued to the original form of payment. Exchanges will be shipped within 5 business days of receipt of the returned item. If you have any questions about our return and exchange policy, please contact us.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
