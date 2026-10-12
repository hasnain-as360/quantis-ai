import { motion } from 'framer-motion';
import { 
  Zap, 
  DollarSign, 
  Droplets, 
  MapPin, 
  Calendar, 
  Play, 
  ChevronDown,
  CloudRain,
  Wind,
  SlidersHorizontal
} from 'lucide-react';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

function InputField({ id, label, icon: Icon, value, onChange, unit, min, max, step }) {
  return (
    <motion.div variants={itemVariants} className="bg-[#141414] border border-white/10 rounded-xl p-4 transition-all duration-200 focus-within:border-[#FFF313]/60 focus-within:shadow-[0_0_15px_rgba(255,243,19,0.1)]">
      <label htmlFor={id} className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#999999]">
          <Icon size={14} className="text-[#FFF313]" />
          {label}
        </span>
        {unit && (
          <span className="text-[11px] font-mono text-[#666666] uppercase">
            {unit}
          </span>
        )}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step}
          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-3.5 py-2.5 text-white font-mono text-base font-bold
                     focus:outline-none focus:border-[#FFF313] transition-colors tabular"
        />
      </div>
    </motion.div>
  );
}

function LocationSelect({ id, value, onChange }) {
  return (
    <motion.div variants={itemVariants} className="bg-[#141414] border border-white/10 rounded-xl p-4 transition-all duration-200 focus-within:border-[#FFF313]/60">
      <label htmlFor={id} className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#999999]">
          <MapPin size={14} className="text-[#FFF313]" />
          Plant Location
        </span>
        <span className="text-[11px] font-mono text-[#666666]">PAKISTAN</span>
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-[#0A0A0A] border border-white/10 rounded-lg px-3.5 py-2.5 text-white font-mono text-sm font-semibold
                     focus:outline-none focus:border-[#FFF313] transition-colors cursor-pointer"
        >
          <option value="Faisalabad">Faisalabad (Textile Corridor)</option>
          <option value="Lahore">Lahore (Smog Zone AQI 350+)</option>
          <option value="Karachi">Karachi (Coastal & Port)</option>
        </select>
        <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#777777] pointer-events-none" />
      </div>
    </motion.div>
  );
}

function DaysSlider({ id, value, onChange }) {
  const percentage = ((value - 1) / 29) * 100;

  return (
    <motion.div variants={itemVariants} className="bg-[#141414] border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#999999]">
          <Calendar size={14} className="text-[#FFF313]" />
          Days Since Last Wash
        </span>
        <span className="text-sm font-mono font-bold text-[#FFF313] bg-[#FFF313]/10 px-2 py-0.5 rounded border border-[#FFF313]/30 tabular">
          {value} DAYS
        </span>
      </div>

      <div className="relative py-2">
        <input
          id={id}
          type="range"
          min={1}
          max={30}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer bg-[#0A0A0A]
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:w-4
                     [&::-webkit-slider-thumb]:h-4
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-[#FFF313]
                     [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(255,243,19,0.7)]
                     [&::-webkit-slider-thumb]:cursor-pointer
                     [&::-webkit-slider-thumb]:border-2
                     [&::-webkit-slider-thumb]:border-black
                     [&::-moz-range-thumb]:w-4
                     [&::-moz-range-thumb]:h-4
                     [&::-moz-range-thumb]:rounded-full
                     [&::-moz-range-thumb]:bg-[#FFF313]
                     [&::-moz-range-thumb]:border-2
                     [&::-moz-range-thumb]:border-black"
          style={{
            background: `linear-gradient(to right, #FFF313 0%, #FFF313 ${percentage}%, #222222 ${percentage}%, #222222 100%)`
          }}
        />
        <div className="flex justify-between mt-2 text-[10px] font-mono text-[#666666]">
          <span>Day 1</span>
          <span>Day 7</span>
          <span>Day 15</span>
          <span>Day 22</span>
          <span>Day 30</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function SimulationInputs({ inputs, setInputs, onRun, isRunning, onLocationChange, isFetchingWeather }) {
  const update = (key) => (val) => setInputs((prev) => ({ ...prev, [key]: val }));

  const handleLocationChange = (loc) => {
    if (onLocationChange) {
      onLocationChange(loc);
    } else {
      if (loc === 'Lahore') {
        setInputs((prev) => ({ ...prev, location: loc, tariff: 45, washCost: 18000 }));
      } else if (loc === 'Karachi') {
        setInputs((prev) => ({ ...prev, location: loc, tariff: 48, washCost: 14000 }));
      } else {
        setInputs((prev) => ({ ...prev, location: loc, tariff: 45, washCost: 15000 }));
      }
    }
  };

  return (
    <aside className="bg-[#111111] border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FFF313] animate-pulse" />
          <h2 className="text-sm font-bold font-mono tracking-wider uppercase text-white">
            System & Atmosphere
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isFetchingWeather && (
            <span className="text-[10px] font-mono text-cyan-400 animate-pulse">
              Syncing Open-Meteo...
            </span>
          )}
          <span className="text-[10px] font-mono text-[#777777] uppercase bg-[#181818] px-2 py-1 rounded border border-white/10">
            TELEMETRY
          </span>
        </div>
      </div>

      {/* Input Cards */}
      <div className="flex flex-col gap-3">
        <InputField
          id="capacity"
          label="System Capacity"
          icon={Zap}
          value={inputs.capacity}
          onChange={update('capacity')}
          unit="kW"
          min={50}
          max={100000}
          step={50}
        />

        <InputField
          id="tariff"
          label="Grid Tariff"
          icon={DollarSign}
          value={inputs.tariff}
          onChange={update('tariff')}
          unit="PKR / kWh"
          min={5}
          max={200}
          step={1}
        />

        <InputField
          id="washCost"
          label="Manual Wash Cost"
          icon={Droplets}
          value={inputs.washCost}
          onChange={update('washCost')}
          unit="PKR"
          min={1000}
          max={500000}
          step={500}
        />

        <LocationSelect
          id="location"
          value={inputs.location}
          onChange={handleLocationChange}
        />

        <DaysSlider
          id="daysSinceWash"
          value={inputs.daysSinceWash}
          onChange={update('daysSinceWash')}
        />

        {/* Environmental Data Row */}
        <div className="pt-2 pb-1 border-t border-white/10">
          <span className="text-[10px] font-mono uppercase text-[#777777] tracking-wider block mb-2">
            Atmospheric Telemetry Feeds
          </span>
          <div className="grid grid-cols-2 gap-2.5">
            <InputField
              id="rain_mm"
              label="Rain (3 Days)"
              icon={CloudRain}
              value={inputs.rain_mm}
              onChange={update('rain_mm')}
              unit="mm"
              min={0}
              max={150}
              step={0.5}
            />
            <InputField
              id="pm10_avg"
              label="PM10 Smog"
              icon={Wind}
              value={inputs.pm10_avg}
              onChange={update('pm10_avg')}
              unit="µg/m³"
              min={10}
              max={999}
              step={10}
            />
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button
        id="run-optimization"
        onClick={onRun}
        disabled={isRunning}
        className="w-full mt-2 py-4 rounded-xl bg-[#FFF313] text-black font-extrabold text-xs tracking-wider uppercase
                   hover:bg-[#E6DB11] transition-all duration-200 neon-glow cursor-pointer
                   disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
      >
        {isRunning ? (
          <>
            <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
            <span>Consulting Quantis AI Kimber LLM...</span>
          </>
        ) : (
          <>
            <Play size={16} fill="black" />
            <span>Run Optimization Engine</span>
          </>
        )}
      </button>

      {/* Mathematical caption */}
      <div className="pt-2 text-center">
        <p className="text-[10px] font-mono text-[#666666]">
          Powered by Gemini 3.6 Flash · Real-Time Kimber Model
        </p>
      </div>
    </aside>
  );
}
