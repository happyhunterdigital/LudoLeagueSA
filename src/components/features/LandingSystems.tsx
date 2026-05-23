import React from 'react';
import { Target, Shield, Landmark } from 'lucide-react';
import { SectionHeader } from '../ui/SharedUI';

export const LandingSystems: React.FC = () => {
  return (
    <div className="w-full relative z-10 flex flex-col">
      {/* Section 6 - Core Systems */}
      <section className="py-24 px-6 md:px-10 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 space-y-6 text-[#001F3F]">
            <SectionHeader tag="Core Infrastructure" title="A Professional Sporting Structure" colorClass="text-[#0EA5E9]" />
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="p-3 bg-[#0EA5E9]/10 rounded-xl h-12 text-[#0EA5E9]"><Target size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">10-Month Season</h4>
                  <p className="text-slate-600 text-sm">20 registered professional clubs compete in 38 weekly matches.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-[#0EA5E9]/10 rounded-xl h-12 text-[#0EA5E9]"><Shield size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg">Standardized Rules</h4>
                  <p className="text-slate-600 text-sm">Standardized, screen-free time-controls and licensed, physical referees.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-xl">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1778074844/Ludo_League_SA_awards_dwmmoi.jpg" alt="Sporting Structure" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Section 7 - Secondary Features */}
      <section className="py-24 px-6 md:px-10 bg-[#FFFDF5]">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 rounded-[20px] overflow-hidden shadow-xl">
            <img src="https://res.cloudinary.com/dkyg07qvv/image/upload/v1776949475/Ludo_League_SA_Africa_Playing_tq1eth.jpg" alt="Club Franchise" className="w-full h-full object-cover" />
          </div>
          <div className="md:w-1/2 space-y-6 text-[#001F3F]">
            <SectionHeader tag="Business Model" title="Club Ownership (RTP)" colorClass="text-[#D32F2F]" />
            <div className="flex gap-4">
              <div className="p-3 bg-red-100 rounded-xl h-12 text-[#D32F2F]"><Landmark size={24} /></div>
              <div>
                <h4 className="font-bold text-lg">Right to Participate (RTP)</h4>
                <p className="text-slate-600 leading-relaxed text-sm">
                  Entrepreneurs and owners can purchase an RTP status to register and manage one of our 20 league franchises, modeling the highly successful business structures of the PSL.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
