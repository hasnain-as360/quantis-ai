import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Shield, Globe, Award, CheckCircle2 } from 'lucide-react';
import ValidationModal from './ValidationModal';

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#FFF313] text-black pt-20 pb-12 px-6 sm:px-8 lg:px-12 border-t border-black/10 select-none">
        <div className="max-w-7xl mx-auto">
          {/* Top Pill: User-Validation Badge */}
          <div className="mb-8">
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-[#FFF313] hover:bg-black/85 text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer shadow-md group"
            >
              <Award size={14} className="text-[#FFF313] group-hover:scale-110 transition-transform" />
              <span>Validated with 3 Plant Engineers (Faisalabad & Lahore Industrial Belts)</span>
              <span className="text-white/60 text-[10px] ml-1">→ View Audit</span>
            </button>
          </div>

          {/* Massive Headline / Brand Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-black/20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/logos/logo-marl.png"
                  alt="Quantis AI Logo"
                  className="w-10 h-10 object-contain invert"
                />
                <span className="font-accent font-extrabold text-2xl tracking-tight text-black">
                  Quantis<span className="opacity-70 ml-0.5">AI</span>
                </span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-7xl font-accent font-extrabold tracking-tight leading-[0.95] text-black">
                PROTECT EVERY <br /> MEGAWATT.
              </h2>
              <p className="mt-6 text-base sm:text-lg font-medium text-black/80 max-w-xl leading-relaxed">
                Empowering megawatt-scale industrial solar plants across Pakistan with precision algorithmic wash schedules and RO water conservation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-black text-[#FFF313] font-mono font-bold text-sm tracking-wide uppercase hover:bg-black/85 transition-all shadow-xl"
              >
                Open Engine Dashboard
                <ArrowUpRight size={18} />
              </Link>
              <Link
                to="/dashboard?mode=sandbox"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border-2 border-black text-black font-mono font-bold text-sm tracking-wide uppercase hover:bg-black hover:text-[#FFF313] transition-all"
              >
                Launch Sandbox Mode
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-black/20 text-black">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-black/60 mb-4">
                Core Engine
              </h3>
              <ul className="space-y-2.5 text-sm font-semibold font-mono">
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Kimber Soiling Model
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Open-Meteo 72h Lookahead
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    RO Water Conservation
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" className="hover:underline">
                    Degradation Crossover Curve
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-black/60 mb-4">
                Regional Corridors
              </h3>
              <ul className="space-y-2.5 text-sm font-semibold font-mono">
                <li>
                  <Link to="/dashboard?city=faisalabad" className="hover:underline">
                    Faisalabad (Textile Cluster)
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard?city=lahore" className="hover:underline">
                    Lahore (High Smog Zone)
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard?city=karachi" className="hover:underline">
                    Karachi (Port & Coastal)
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-black/60 mb-4">
                Standards & SLA
              </h3>
              <ul className="space-y-2.5 text-sm font-semibold">
                <li>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Shield size={14} /> IEC 61724 Standards
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Globe size={14} /> NREL Kimber Formulation
                  </span>
                </li>
                <li>
                  <span className="flex items-center gap-1.5 font-mono">
                    <CheckCircle2 size={14} /> Enterprise Accuracy 99.4%
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-mono uppercase tracking-[0.2em] font-bold text-black/60 mb-4">
                Enterprise Access
              </h3>
              <ul className="space-y-2.5 text-sm font-semibold font-mono">
                <li>
                  <Link to="/auth" className="hover:underline">
                    Client Login
                  </Link>
                </li>
                <li>
                  <Link to="/auth?mode=register" className="hover:underline">
                    Register Plant Installation
                  </Link>
                </li>
                <li>
                  <span className="text-xs text-black/70">
                    support@quantis.ai
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Giant Monogram & Copyright Footer */}
          <div className="pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/logos/logo-marl.png"
                alt="Quantis Mark"
                className="w-8 h-8 object-contain invert"
              />
              <div>
                <span className="font-accent font-extrabold text-xl tracking-tight text-black">
                  Quantis AI™
                </span>
                <p className="text-[11px] font-mono text-black/70">
                  Precision Industrial Energy Optimization · All Rights Reserved.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono font-bold uppercase tracking-wider text-black/75">
              <span>PK-GRID-2026</span>
              <span>POWERED BY OPEN-METEO & KIMBER</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Validation Slide-over Modal */}
      <ValidationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
