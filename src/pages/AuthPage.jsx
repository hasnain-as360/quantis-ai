import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Lock, Mail, ArrowRight, ShieldCheck, Play } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localMessage, setLocalMessage] = useState(null);

  const { signIn, signUp, loading, error, user } = useAuth();
  const navigate = useNavigate();

  // If already authenticated, redirect straight to /dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Demo prefill option
  useEffect(() => {
    if (searchParams.get('demo') === 'true') {
      setEmail('operations@textile-solar.pk');
      setPassword('QuantisAI2026!');
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalMessage(null);

    if (isSignUp) {
      const res = await signUp(email, password);
      if (res.success) {
        setLocalMessage('Account provisioned in Supabase! Routing to dashboard...');
        setTimeout(() => navigate('/dashboard'), 500);
      }
    } else {
      const res = await signIn(email, password);
      if (res.success) {
        setLocalMessage('Authenticated successfully! Routing to dashboard...');
        setTimeout(() => navigate('/dashboard'), 500);
      }
    }
  };

  const handleBypassDemo = async () => {
    // 1-Click bypass button for evaluators and judges
    await signIn('evaluator.judge@quantis.ai', 'demo123456');
    navigate('/dashboard?mode=sandbox');
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative font-sans selection:bg-[#FFF313] selection:text-black">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Top back navigation */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Back to Overview
        </Link>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header with Uploaded Logo */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-3 group mb-4">
            <img
              src="/logos/logo-marl.png"
              alt="Quantis AI Logo"
              className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,243,19,0.3)] transition-transform group-hover:scale-105"
            />
            <span className="font-accent font-extrabold text-2xl tracking-tight text-white">
              Quantis<span className="text-[#FFF313] ml-0.5">AI</span>
            </span>
          </Link>
          <h2 className="text-3xl font-accent font-extrabold tracking-tight text-white">
            {isSignUp ? 'Register Industrial Plant' : 'Client Access Portal'}
          </h2>
          <p className="mt-2 text-xs text-zinc-400 font-mono uppercase tracking-wider">
            Supabase Enterprise Authentication
          </p>
        </div>

        {/* Minimalist Card */}
        <div className="mt-8 bg-[#111111] border border-white/[0.08] rounded-2xl p-6 sm:p-8 shadow-2xl relative">
          {/* JUDGE & EVALUATOR 1-CLICK BYPASS BUTTON */}
          <div className="mb-6 bg-[#181818] border border-[#FFF313]/30 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#FFF313]">
                <Play size={13} fill="currentColor" />
                <span>HACKATHON QUICK ACCESS</span>
              </div>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Evaluators & judges: Test immediately without registering
              </p>
            </div>
            <button
              onClick={handleBypassDemo}
              type="button"
              className="px-3.5 py-2 rounded-lg bg-[#FFF313] text-black text-xs font-mono font-extrabold uppercase tracking-wider hover:bg-[#E6DB11] transition-all cursor-pointer whitespace-nowrap shadow-md"
            >
              Enter Demo / Sandbox Mode
            </button>
          </div>

          {/* Sign In / Sign Up toggle */}
          <div className="flex border-b border-white/[0.08] mb-6">
            <button
              type="button"
              onClick={() => { setIsSignUp(false); setLocalMessage(null); }}
              className={`flex-1 pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                !isSignUp
                  ? 'text-[#FFF313] border-b-2 border-[#FFF313]'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsSignUp(true); setLocalMessage(null); }}
              className={`flex-1 pb-3 text-xs font-mono font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                isSignUp
                  ? 'text-[#FFF313] border-b-2 border-[#FFF313]'
                  : 'text-zinc-500 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Corporate Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="engineer@textile-solar.pk"
                  className="w-full bg-[#111111] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white font-mono placeholder-[#555555] focus:outline-none focus:border-[#FFF313] transition-colors"
                />
                <Mail size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#111111] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white font-mono placeholder-[#555555] focus:outline-none focus:border-[#FFF313] transition-colors"
                />
                <Lock size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
              </div>
            </div>

            {/* Error or Success notification */}
            {(error || localMessage) && (
              <div
                className={`p-3 rounded-lg text-xs font-mono ${
                  error
                    ? 'bg-red-500/10 border border-red-500/30 text-red-400'
                    : 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                }`}
              >
                {error || localMessage}
              </div>
            )}

            {/* Primary Action Button: #FFF313 with black text */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-[#FFF313] text-black font-accent font-extrabold text-xs uppercase tracking-wider hover:bg-[#E6DB11] transition-all flex items-center justify-center gap-2 cursor-pointer mt-6 disabled:opacity-50 shadow-md"
            >
              {loading ? (
                <span>Validating with Supabase...</span>
              ) : (
                <>
                  <span>{isSignUp ? 'Provision Account & Enter' : 'Authenticate & Enter Dashboard'}</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Supabase Status Footer */}
          <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Supabase RLS Active
            </span>
            <span>Quantis Cloud Grid</span>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-6 text-center">
          <Link
            to="/dashboard?mode=sandbox"
            className="text-xs font-mono text-zinc-400 hover:text-[#FFF313] transition-colors"
          >
            Or jump directly to Sandbox Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
}
