import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Cpu, 
  CloudSunRain, 
  Factory, 
  TrendingUp, 
  ChevronRight,
  Award,
  Sparkles,
  Zap,
  ArrowUpRight,
  Activity,
  CheckCircle2
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ValidationModal from '../components/ValidationModal';

const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.25, 1, 0.5, 1] } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

export default function LandingPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const coreFeatures = [
    {
      title: 'Kimber Mathematical Engine',
      desc: 'Validated crossover equations calculating the exact threshold where cumulative financial bleed exceeds cleaning costs.',
      icon: Cpu,
      tag: 'MATHEMATICAL ENGINE',
      metric: '±0.4% Crossover Accuracy',
      image: '/inspo/frame_01.jpg'
    },
    {
      title: 'Hyper-Local Smog & Precipitation',
      desc: 'Ingests real-time PM10 smog density and 72-hour precipitation sum from Open-Meteo to halt washing before rain.',
      icon: CloudSunRain,
      tag: 'ATMOSPHERIC TELEMETRY',
      metric: '72h Weather Override',
      image: '/inspo/frame_05.jpg'
    },
    {
      title: 'Megawatt-Scale Grid Deployment',
      desc: 'Purpose-built for large-scale textile mills and industrial rooftops operating in heavy winter particulate zones.',
      icon: Factory,
      tag: 'ENTERPRISE DEPLOYMENT',
      metric: '1.48 GW Monitored',
      image: '/inspo/frame_07.jpg'
    },
  ];

  const regionalMetrics = [
    {
      city: 'Faisalabad',
      slug: 'faisalabad',
      corridor: 'Textile Industry Corridor',
      soilingRate: '0.55%/day',
      winterLoss: '28.4%',
      waterSaved: '42,000 L / MW'
    },
    {
      city: 'Lahore',
      slug: 'lahore',
      corridor: 'Industrial Smog Zone (AQI 350+)',
      soilingRate: '0.65%/day',
      winterLoss: '31.2%',
      waterSaved: '54,000 L / MW'
    },
    {
      city: 'Karachi',
      slug: 'karachi',
      corridor: 'Coastal & Port Corridor',
      soilingRate: '0.35%/day',
      winterLoss: '19.8%',
      waterSaved: '32,000 L / MW'
    }
  ];

  const handleScrollToEngine = (e) => {
    e.preventDefault();
    const elem = document.getElementById('algorithmic-architecture');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-[#FFF313] selection:text-black">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION (MATCHING VIDEO INSPIRATION FRAME 1) */}
        <section className="relative min-h-[92vh] flex flex-col justify-between px-4 sm:px-6 lg:px-8 pt-28 pb-12 overflow-hidden border-b border-white/[0.08]">
          {/* Background Video with Clean Dark Masking */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-35 filter contrast-125 brightness-90"
              src="/home-hero.mp4"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-[#030303]/80" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030303]/50 to-[#030303]" />
          </div>

          {/* Top Hero Content: Main Headline */}
          <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 sm:pt-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-md border border-white/10 text-xs font-mono uppercase tracking-wider mb-6">
                <span className="w-2 h-2 rounded-full bg-[#FFF313] animate-pulse" />
                <span className="text-white font-bold">Quantis AI™</span>
                <span className="text-[#FFF313] border-l border-white/15 pl-2 font-mono">Kimber Engine v2.1</span>
              </div>

              <h1 className="font-accent text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.03em] leading-[1.04] text-white text-balance">
                Grid-Safe Power for Industrial Solar.
              </h1>
            </motion.div>
          </div>

          {/* Bottom Hero Layout: Left Description + Right Floating Neon Yellow Card */}
          <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 pt-12">
            {/* Bottom-Left Subtext */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-xl"
            >
              <p className="text-base sm:text-lg text-zinc-300 font-normal leading-relaxed text-balance">
                Quantis AI: an algorithmic optimization engine engineered to protect megawatt-scale solar installations from severe smog degradation and eliminate wasteful RO wash cycles.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href="#algorithmic-architecture"
                  onClick={handleScrollToEngine}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#FFF313] hover:underline"
                >
                  Explore the Engine ↓
                </a>
                <span className="text-zinc-600">|</span>
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white"
                >
                  <CheckCircle2 size={13} className="text-[#FFF313]" />
                  Validated with 3 Plant Engineers
                </button>
              </div>
            </motion.div>

            {/* Bottom-Right Floating Neon Yellow Card (Iconic Video Inspo Element) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full sm:w-[440px] shrink-0"
            >
              <Link
                to="/dashboard?mode=sandbox"
                className="group block p-6 rounded-2xl bg-[#FFF313] text-black shadow-[0_0_50px_rgba(255,243,19,0.25)] hover:bg-[#F2E711] transition-all duration-300 relative overflow-hidden"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 font-mono text-[11px] font-black uppercase tracking-wider">
                      <span className="w-2 h-2 rounded-full bg-black" />
                      <span>EXPLORE QUANTIS AI</span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-black/90 leading-snug">
                      The first Kimber soiling optimizer purpose-built for extreme South Asian smog corridors.
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider">
                      <span>Launch Sandbox</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Thumbnail Badge Box */}
                  <div className="w-20 h-20 rounded-xl bg-black/10 border border-black/20 p-2 flex flex-col justify-between shrink-0 font-mono text-[10px]">
                    <Activity size={18} className="text-black" />
                    <span className="font-bold tabular">99.4% FIT</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* EXPANDING FULL-WIDTH NEON YELLOW IMPACT BANNER (MATCHING VIDEO INSPIRATION FRAME 3) */}
        <section className="bg-[#FFF313] text-black py-20 sm:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="max-w-5xl"
            >
              <h2 className="font-accent text-3xl sm:text-5xl md:text-6xl font-black tracking-[-0.03em] leading-[1.08] text-balance">
                With multiple gigawatts under seasonal smog in Pakistan, we are eliminating uncalculated revenue bleed today.
              </h2>
              <p className="mt-6 text-sm sm:text-base font-mono font-bold tracking-wide uppercase text-black/80 max-w-2xl">
                Real-time Kimber equations cross-referenced with 72-hour precipitation to halt wasteful RO washing before rain.
              </p>
            </motion.div>
          </div>
        </section>

        {/* EDITORIAL "ONE FOCUS" ARCHITECTURE SECTION (MATCHING VIDEO INSPIRATION FRAME 7) */}
        <section id="algorithmic-architecture" className="py-28 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] bg-[#070707] scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            {/* Section Header with Left Two-Line Headline & Right Editorial Text */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mb-20">
              <div>
                <span className="text-xs font-mono text-[#FFF313] uppercase tracking-[0.2em] font-bold block mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFF313]" />
                  OUR EXPERTISE
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-accent font-extrabold tracking-[-0.02em] text-white leading-[1.06]">
                  One Focus:<br />
                  All we do is solar optimization.
                </h2>
              </div>

              <div>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
                  Hardware telemetry and atmospheric data operating as one unified system, reducing integration ambiguity and the operational risk inherent in calendar-based washing schedules.
                </p>
                <div className="mt-6 flex items-center gap-6 text-xs font-mono text-zinc-400">
                  <span className="text-[#FFF313] font-bold">100% Deterministic</span>
                  <span>·</span>
                  <span>Open-Meteo Synced</span>
                  <span>·</span>
                  <span>RO Water Protected</span>
                </div>
              </div>
            </div>

            {/* Core Features Grid with Crisp Subtext Contrast (text-zinc-400) */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {coreFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.title}
                    variants={fadeInUp}
                    className="group bg-[#111111] hover:bg-[#141414] border border-white/[0.08] hover:border-[#FFF313]/50 p-7 rounded-2xl transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-11 h-11 rounded-xl bg-black border border-white/15 flex items-center justify-center group-hover:border-[#FFF313] transition-colors">
                          <Icon size={20} className="text-[#FFF313]" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                          {feat.tag}
                        </span>
                      </div>

                      <h3 className="text-xl font-accent font-bold tracking-tight text-white mb-3 group-hover:text-[#FFF313] transition-colors">
                        {feat.title}
                      </h3>

                      <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                        {feat.desc}
                      </p>
                    </div>

                    <div className="mt-8 pt-5 border-t border-white/[0.08] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#FFF313] font-semibold">
                        {feat.metric}
                      </span>
                      <Link
                        to="/dashboard"
                        className="w-8 h-8 rounded-full bg-black/60 border border-white/10 group-hover:border-[#FFF313] flex items-center justify-center text-zinc-400 group-hover:text-[#FFF313] transition-colors"
                      >
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* REGIONAL CORRIDOR BENCHMARKS SECTION */}
        <section id="expertise" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] bg-[#030303]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-mono text-[#FFF313] uppercase tracking-[0.2em] font-bold block mb-3 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFF313]" />
                REGIONAL CORRIDORS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-accent font-extrabold tracking-[-0.02em] text-white">
                Pakistan Industrial Belts Analysis.
              </h2>
              <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                During November to February, industrial smog and textile carbon particulate degrade rooftop solar output by up to 30%. Quantis AI ingests live particulate data from Open-Meteo to calculate optimal wash days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {regionalMetrics.map((region) => (
                <div
                  key={region.city}
                  className="bg-[#111111] border border-white/[0.08] rounded-2xl p-6 relative overflow-hidden group hover:border-[#FFF313]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-accent font-bold text-white">{region.city}</h3>
                      <span className="text-[10px] font-mono uppercase bg-[#1A1A1A] text-[#FFF313] px-2.5 py-1 rounded border border-[#FFF313]/20">
                        LIVE CORRIDOR
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-6 font-mono">{region.corridor}</p>

                    <div className="space-y-4 pt-4 border-t border-white/[0.08] text-sm font-mono">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Avg. Soiling Rate</span>
                        <span className="font-bold text-white tabular">{region.soilingRate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Peak Smog Degradation</span>
                        <span className="font-bold text-[#EF4444] tabular">{region.winterLoss}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400">Water Saved / MW</span>
                        <span className="font-bold text-cyan-400 tabular">{region.waterSaved}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.08]">
                    <Link
                      to={`/dashboard?city=${region.slug}`}
                      className="w-full py-3 px-4 rounded-xl bg-[#1A1A1A] hover:bg-[#FFF313] text-zinc-300 hover:text-black font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 border border-white/10 hover:border-[#FFF313]"
                    >
                      <span>Run Simulation for {region.city}</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE MATHEMATICAL EDGE */}
        <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-b border-white/[0.08] bg-[#0A0A0A]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-mono text-[#FFF313] uppercase tracking-[0.2em] font-bold block mb-3">
                  // THE MATHEMATICAL EDGE
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-accent font-extrabold tracking-[-0.02em] text-white leading-tight">
                  Why fixed calendar wash cycles bleed capital.
                </h2>
                <p className="mt-6 text-zinc-400 leading-relaxed text-base">
                  Fixed bi-weekly washing schedules create two severe financial bottlenecks:
                </p>
                <div className="mt-6 space-y-4 font-mono">
                  <div className="flex gap-4 p-4 rounded-xl bg-[#111111] border border-white/[0.08]">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 font-bold">
                      ✕
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Negative ROI Washing (Too Early)</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        When particulate accumulation is slight, spending Rs. 15,000 on cleaning recovers only Rs. 2,500 of power.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-[#111111] border border-white/[0.08]">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 font-bold">
                      ✕
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Washing Before Unpredicted Rain</h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        Washing 3,000 panels 24 hours before a 10mm precipitation event wastes 15,000L of RO water and labor costs.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-xl bg-[#111111] border border-[#FFF313]/30">
                    <div className="w-8 h-8 rounded-lg bg-[#FFF313]/10 text-[#FFF313] flex items-center justify-center shrink-0 font-bold">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#FFF313]">Quantis AI Crossover Optimization</h4>
                      <p className="text-xs text-zinc-300 mt-1">
                        Detects the exact hour when cumulative revenue loss crosses the wash cost line, overridden by Open-Meteo rain forecasts.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#FFF313] text-black font-accent font-bold text-xs uppercase tracking-wider hover:bg-[#E6DB11] transition-all"
                  >
                    Open Live Kimber Sandbox <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Graphic Card */}
              <div className="card-raised p-8 border border-white/[0.08] relative">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Zap size={16} className="text-[#FFF313]" />
                    <span className="text-xs font-mono font-bold uppercase text-white">Kimber Crossover Mathematics</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    REAL-TIME CONVERGENCE
                  </span>
                </div>

                {/* SVG Visual */}
                <div className="h-64 w-full relative grid-bg p-4 flex flex-col justify-end bg-black/40 rounded-xl border border-white/5">
                  <div className="absolute top-4 left-4 text-xs font-mono text-zinc-400">
                    Condition: Cumulative Revenue Bleed &gt; Wash Cost (Rs. 15,000)
                  </div>
                  <svg viewBox="0 0 400 160" className="w-full h-full">
                    <line x1="0" y1="40" x2="400" y2="40" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                    <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                    <line x1="0" y1="120" x2="400" y2="120" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
                    
                    <line x1="0" y1="70" x2="400" y2="70" stroke="#FFF313" strokeWidth="1.5" strokeDasharray="6 3" />
                    <text x="390" y="65" textAnchor="end" fill="#FFF313" fontSize="9" fontFamily="monospace">
                      WASH COST THRESHOLD (RS. 15,000)
                    </text>

                    <path
                      d="M 20 140 Q 180 130 250 70 T 380 15"
                      fill="none"
                      stroke="#EF4444"
                      strokeWidth="2.5"
                    />

                    <circle cx="250" cy="70" r="5" fill="#FFF313" stroke="#000" strokeWidth="2" />
                    <text x="250" y="95" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontFamily="monospace" fontWeight="bold">
                      CROSSOVER (DAY 14)
                    </text>
                  </svg>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-400">Array: 1,000 kW Industrial Rooftop</span>
                  <span className="text-[#FFF313] font-bold">ROI Recovery: +Rs. 38,400</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ValidationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
