import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, CheckCircle2, Factory, Sun, Zap, Users, ArrowUpRight } from 'lucide-react';

export default function ValidationModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const feedbackItems = [
    {
      id: 1,
      role: 'Textile Mill General Manager',
      location: 'Faisalabad Textile Corridor (1.2 MW Rooftop)',
      quote: 'Needs monetary loss front-and-center, not just percentage loss. Plant owners care about daily PKR bleed, not abstract efficiency ratings.',
      solution: 'Implemented prominent Cumulative Financial Bleed (PKR) metric directly alongside soiling loss percentage.',
      icon: Factory,
      tag: 'FINANCIAL IMPACT',
    },
    {
      id: 2,
      role: 'Solar O&M Engineering Lead',
      location: 'Lahore Industrial Belt (3.5 MW Ground Mount)',
      quote: 'Fixed 14-day wash cycles were wasting tens of thousands of liters of RO water right before winter rains washed the panels naturally anyway.',
      solution: 'Solved via real-time 72-hour precipitation forecast override from Open-Meteo, automatically triggering HOLD state when rain > 5mm.',
      icon: Sun,
      tag: 'WATER CONSERVATION',
    },
    {
      id: 3,
      role: 'Commercial Facility Energy Administrator',
      location: 'Karachi Industrial Port Grid (800 kW Commercial)',
      quote: 'Grid tariff rates vary significantly between off-peak and peak industrial billing across distribution companies (DISCOs).',
      solution: 'Added dynamic Grid Tariff input (PKR/kWh) allowing precise site-specific customization from Rs. 20 to Rs. 70/kWh.',
      icon: Zap,
      tag: 'TARIFF ACCURACY',
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Slide-over Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-xl h-full bg-[#0A0A0A] border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto shadow-2xl z-10"
        >
          <div>
            {/* Header */}
            <div className="flex items-start justify-between pb-6 border-b border-white/10">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF313]/10 border border-[#FFF313]/30 text-xs font-mono font-bold text-[#FFF313] mb-3">
                  <Award size={13} />
                  HACKATHON FIELD VALIDATION
                </div>
                <h3 className="text-2xl font-extrabold text-white tracking-tight">
                  Validated with Plant Engineers
                </h3>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  Real industrial feedback from Faisalabad & Lahore solar arrays
                </p>
              </div>

              <button
                onClick={onClose}
                className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Cards */}
            <div className="mt-6 space-y-5">
              {feedbackItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="p-5 rounded-xl bg-[#111111] border border-white/10 hover:border-[#FFF313]/30 transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-black border border-white/10 flex items-center justify-center">
                          <Icon size={14} className="text-[#FFF313]" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.role}</h4>
                          <span className="text-[11px] text-zinc-400 font-mono block">
                            {item.location}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-[#FFF313] border border-[#FFF313]/20">
                        {item.tag}
                      </span>
                    </div>

                    {/* Quote */}
                    <div className="p-3 rounded-lg bg-black/60 border-l-2 border-[#FFF313] mb-3">
                      <p className="text-xs text-zinc-300 italic leading-relaxed">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* Implemented Solution */}
                    <div className="flex items-start gap-2 text-xs text-emerald-400 font-medium">
                      <CheckCircle2 size={14} className="shrink-0 mt-0.5 text-emerald-400" />
                      <span>{item.solution}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Engineering Field Trials · Q1 2026</span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#FFF313] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#E6DB11] transition-all cursor-pointer"
            >
              Done Reviewing
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
