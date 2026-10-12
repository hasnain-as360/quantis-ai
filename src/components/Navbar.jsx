import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', href: '/#expertise' },
    { name: 'Solutions', href: '/#algorithmic-architecture' },
    { name: 'Architecture', href: '/#algorithmic-architecture' },
    { name: 'Field Trials', href: '/#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Left: Brand Logo in Frosted Capsule */}
        <Link 
          to="/" 
          className="flex items-center gap-2.5 px-3 py-2 rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/[0.08] hover:border-white/20 transition-all duration-200 group shadow-lg"
        >
          <div className="w-7 h-7 rounded-lg bg-[#FFF313] flex items-center justify-center font-accent font-black text-xs text-black shadow-[0_0_10px_rgba(255,243,19,0.4)]">
            Q
          </div>
          <span className="font-accent font-extrabold text-sm tracking-tight text-white pr-2">
            Quantis<span className="text-[#FFF313]">AI</span>
          </span>
        </Link>

        {/* Center: Segmented Frosted Capsule Bar (Matching Inspiration Video) */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/[0.08] shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-1.5 text-xs font-mono font-medium tracking-wide uppercase text-zinc-300 hover:text-white hover:bg-white/[0.06] rounded-full transition-all duration-150"
            >
              {link.name}
            </a>
          ))}
          <Link
            to="/dashboard"
            className={`px-4 py-1.5 text-xs font-mono font-bold tracking-wide uppercase rounded-full transition-all duration-150 flex items-center gap-1.5 ${
              location.pathname === '/dashboard'
                ? 'bg-[#FFF313] text-black shadow-[0_0_12px_rgba(255,243,19,0.3)]'
                : 'text-zinc-300 hover:text-white hover:bg-white/[0.06]'
            }`}
          >
            Dashboard
            <span className={`w-1.5 h-1.5 rounded-full ${location.pathname === '/dashboard' ? 'bg-black' : 'bg-[#FFF313]'}`} />
          </Link>
        </nav>

        {/* Right: Auth & Neon Yellow CTA Button */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#111111]/80 backdrop-blur-xl border border-white/[0.08] text-xs font-mono">
              <span className="text-zinc-400 truncate max-w-[120px]">{user.email}</span>
              <button onClick={signOut} className="text-zinc-500 hover:text-white ml-1 cursor-pointer">
                ✕
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="px-3.5 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white transition-colors"
            >
              Client Login
            </Link>
          )}

          <Link
            to="/dashboard?mode=sandbox"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-mono font-black tracking-wider uppercase bg-[#FFF313] text-black hover:bg-[#E6DB11] transition-all duration-200 shadow-[0_0_20px_rgba(255,243,19,0.3)] cursor-pointer"
          >
            Get In Touch
            <ArrowUpRight size={13} strokeWidth={2.5} />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            to="/dashboard"
            className="px-3 py-1.5 text-xs font-mono font-bold uppercase bg-[#FFF313] text-black rounded-full"
          >
            Engine
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full bg-[#111111]/90 border border-white/10 text-zinc-300 hover:text-white"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-2xl border border-white/10 bg-[#0E0E0E]/95 backdrop-blur-xl p-5 space-y-3 pointer-events-auto shadow-2xl"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-xs font-mono uppercase tracking-wider text-[#FFF313] flex items-center justify-between"
              >
                Engine Dashboard
                <span className="text-[10px] bg-[#FFF313]/10 text-[#FFF313] px-2 py-0.5 rounded border border-[#FFF313]/30">
                  LIVE
                </span>
              </Link>
            </div>
            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <Link
                to="/auth"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2 text-xs font-mono font-semibold uppercase tracking-wider text-white border border-white/15 rounded-full"
              >
                Client Login
              </Link>
              <Link
                to="/dashboard?mode=sandbox"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 text-xs font-mono font-bold uppercase tracking-wider bg-[#FFF313] text-black rounded-full"
              >
                Launch Sandbox
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
