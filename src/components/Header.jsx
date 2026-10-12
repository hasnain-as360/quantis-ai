import { motion } from 'framer-motion';
import { Sun, Wifi, Bell } from 'lucide-react';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-border"
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-crimson to-wine flex items-center justify-center
                        shadow-[0_0_20px_rgba(220,38,38,0.2)]">
          <Sun size={18} className="text-white" />
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-xl border border-crimson/30 animate-ping opacity-30" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold tracking-tight text-text-primary leading-none">
            ClearVolt<span className="text-crimson"> AI</span>
          </h1>
          <p className="text-[9px] font-semibold tracking-[0.2em] uppercase text-text-muted mt-0.5">
            Solar Soiling Engine
          </p>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Connection status */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-panel border border-border">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 pulse-ring" />
          <span className="text-[10px] text-text-muted font-medium">Weather API Live</span>
          <Wifi size={12} className="text-text-muted" />
        </div>

        {/* Notification bell */}
        <button
          id="notifications-btn"
          className="relative w-9 h-9 rounded-xl bg-panel border border-border flex items-center justify-center
                     hover:bg-panel-hover transition-colors duration-200 cursor-pointer"
        >
          <Bell size={16} className="text-text-secondary" />
          <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-crimson border-2 border-obsidian" />
        </button>
      </div>
    </motion.header>
  );
}
