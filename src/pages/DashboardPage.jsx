import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingDown, 
  DollarSign, 
  Droplets, 
  Radio, 
  RefreshCcw, 
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';
import SimulationInputs from '../components/SimulationInputs';
import DirectiveBanner from '../components/DirectiveBanner';
import MetricCard from '../components/MetricCard';
import TelemetryChart from '../components/TelemetryChart';
import ValidationModal from '../components/ValidationModal';
import { useAuth } from '../hooks/useAuth';

const CITY_METRICS = {
  faisalabad: {
    name: 'Faisalabad',
    label: 'Faisalabad (Textile Corridor)',
    lat: 31.418,
    lon: 73.079,
    tariff: 45,
    washCost: 15000,
    plantId: 'FSD-TEXTILE-MW1',
  },
  lahore: {
    name: 'Lahore',
    label: 'Lahore (Smog Zone AQI 350+)',
    lat: 31.520,
    lon: 74.358,
    tariff: 45,
    washCost: 18000,
    plantId: 'LHE-INDUSTRIAL-MW2',
  },
  karachi: {
    name: 'Karachi',
    label: 'Karachi (Coastal & Port Corridor)',
    lat: 24.860,
    lon: 67.001,
    tariff: 48,
    washCost: 14000,
    plantId: 'KHI-PORT-MW3',
  },
};

function normalizeCityKey(cityParam) {
  if (!cityParam) return 'faisalabad';
  const lower = cityParam.toLowerCase().trim();
  if (lower.includes('lahore')) return 'lahore';
  if (lower.includes('karachi')) return 'karachi';
  return 'faisalabad';
}

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, saveSimulation } = useAuth();

  const cityParam = searchParams.get('city');
  const isSandboxMode = searchParams.get('mode') === 'sandbox';

  const initialCityKey = useMemo(() => normalizeCityKey(cityParam), [cityParam]);
  const initialCityConfig = CITY_METRICS[initialCityKey];

  const [inputs, setInputs] = useState({
    capacity: 1000,
    tariff: initialCityConfig.tariff,
    washCost: initialCityConfig.washCost,
    location: initialCityConfig.name,
    daysSinceWash: 14,
    rain_mm: 2.4,
    pm10_avg: 280,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [showValidationModal, setShowValidationModal] = useState(false);

  // Kimber Calculation State
  const [kimberData, setKimberData] = useState({
    status: 'WASH',
    directive: 'ACTION REQUIRED',
    soilingLoss: 9.1,
    cumulativeBleed: 138915,
    waterSaved: 0,
    dailyDegradationRate: 0.0065,
    rain_mm: 2.4,
    pm10: 280,
    crossoverDay: 11,
    netRoi: 123915,
    isHold: false,
    reasoning: 'Cumulative revenue bleed exceeds manual wash cost with upcoming 3-day rain under 5mm. Immediate wash recovers positive cash ROI.',
  });

  // Call /api/optimize API Route
  const executeOptimization = useCallback(async (currentInputs) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const payload = {
        capacityKw: Number(currentInputs.capacity),
        tariffPkr: Number(currentInputs.tariff),
        washCostPkr: Number(currentInputs.washCost),
        daysSinceWash: Number(currentInputs.daysSinceWash),
        location: currentInputs.location,
      };

      const res = await fetch('/api/optimize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.error || `Server responded with ${res.status}`);
      }

      const data = await res.json();

      // Derived Crossover Day based on Kimber Math
      const dailyLossRate = (payload.capacityKw * 4.5 * payload.tariffPkr) / 100;
      const ratePct = (data.dailyDegradationRate || 0.0065) * 100;
      const crossoverDay = Math.max(1, Math.ceil(Math.sqrt((2 * payload.washCostPkr) / (dailyLossRate * ratePct))));
      const netRoi = Math.max(0, data.cumulativeBleed - payload.washCostPkr);
      const isHold = data.status === 'HOLD';

      // Reasoning narrative
      let reasoningText = '';
      if (data.status === 'HOLD') {
        reasoningText = `Upcoming 3-day precipitation (${data.rain_mm}mm) exceeds 5mm threshold. Natural rain wash will reset soiling to 0%, conserving 15,000L of RO water.`;
      } else if (data.status === 'WASH') {
        reasoningText = `Cumulative revenue bleed (Rs. ${data.cumulativeBleed.toLocaleString()}) exceeds manual wash cost (Rs. ${payload.washCostPkr.toLocaleString()}) with upcoming rain under 5mm (${data.rain_mm}mm). Cleaning today recovers positive cash ROI.`;
      } else {
        reasoningText = `Cumulative revenue bleed (Rs. ${data.cumulativeBleed.toLocaleString()}) is below manual wash cost (Rs. ${payload.washCostPkr.toLocaleString()}). Washing today would yield negative cash ROI. Hold position.`;
      }

      setKimberData({
        status: data.status,
        directive: data.directive,
        soilingLoss: data.soilingLoss,
        cumulativeBleed: data.cumulativeBleed,
        waterSaved: data.waterSaved,
        dailyDegradationRate: data.dailyDegradationRate || 0.0065,
        rain_mm: data.rain_mm,
        pm10: data.pm10,
        crossoverDay,
        netRoi,
        isHold,
        reasoning: reasoningText,
      });

      // Update atmospheric inputs with live returned data
      setInputs((prev) => ({
        ...prev,
        rain_mm: data.rain_mm ?? prev.rain_mm,
        pm10_avg: data.pm10 ?? prev.pm10_avg,
      }));

      // Persist to Supabase if logged in
      if (user && saveSimulation) {
        await saveSimulation({
          ...currentInputs,
          bleed: data.cumulativeBleed,
          loss: data.soilingLoss,
        });
      }
    } catch (err) {
      console.error('Failed to run /api/optimize:', err);
      setErrorMsg(err.message || 'Failed to fetch optimization data. Please check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user, saveSimulation]);

  // Initial load or city param change
  useEffect(() => {
    const key = normalizeCityKey(cityParam);
    const config = CITY_METRICS[key];
    const initial = {
      capacity: 1000,
      tariff: config.tariff,
      washCost: config.washCost,
      location: config.name,
      daysSinceWash: 14,
      rain_mm: 2.4,
      pm10_avg: key === 'lahore' ? 380 : key === 'karachi' ? 120 : 280,
    };
    setInputs(initial);
    executeOptimization(initial);
  }, [cityParam, executeOptimization]);

  // Handle location dropdown change
  const handleLocationChange = (newLocation) => {
    const key = normalizeCityKey(newLocation);
    const config = CITY_METRICS[key];

    setSearchParams((prev) => {
      prev.set('city', key);
      return prev;
    });

    const nextInputs = {
      ...inputs,
      location: config.name,
      tariff: config.tariff,
      washCost: config.washCost,
    };
    setInputs(nextInputs);
    executeOptimization(nextInputs);
  };

  const handleRun = () => {
    executeOptimization(inputs);
  };

  const activeCityKey = normalizeCityKey(inputs.location);
  const activePlantId = CITY_METRICS[activeCityKey]?.plantId || 'QUANTIS-MW1';

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col font-sans selection:bg-[#FFF313] selection:text-black">
      <Navbar />

      <main className="flex-1 pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
        {/* PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 mb-8 border-b border-white/[0.08] gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#FFF313] flex items-center gap-1.5">
                <Sparkles size={13} />
                QUANTIS AI // KIMBER OPTIMIZATION ENGINE
              </span>

              {isSandboxMode && (
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#FFF313]/10 text-[#FFF313] border border-[#FFF313]/30 tracking-wider">
                  SANDBOX MODE ACTIVE
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-accent font-bold tracking-[-0.02em] text-white">
              Soiling & Wash Optimization
            </h1>
            <p className="mt-2 text-sm text-zinc-400 max-w-2xl leading-relaxed">
              Industrial algorithm calculating real-time smog degradation and financial crossover points. Cross-references live Open-Meteo precipitation to prevent wasteful RO washing.
            </p>
          </div>

          {/* Status Badges & Hackathon User-Validation Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowValidationModal(true)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] hover:bg-[#1A1A1A] border border-[#FFF313]/30 text-xs font-mono text-[#FFF313] hover:border-[#FFF313] transition-all cursor-pointer group shadow-lg"
              title="Click to view real Plant Engineer validation findings"
            >
              <CheckCircle2 size={13} className="text-[#FFF313] group-hover:scale-110 transition-transform" />
              <span className="font-semibold">Validated with 3 Plant Engineers</span>
              <span className="text-[10px] text-zinc-400 hidden sm:inline">(Faisalabad & Lahore)</span>
            </button>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-[#FFF313] animate-ping' : 'bg-emerald-500 animate-pulse'}`} />
              <span className="text-white/90 font-medium">Backend API Live</span>
              <span className="text-zinc-500">/api/optimize</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-white/[0.08] text-xs font-mono text-zinc-400">
              <Radio size={13} className="text-[#FFF313]" />
              <span>Plant ID: <strong className="text-white font-mono">{activePlantId}</strong></span>
            </div>
          </div>
        </div>

        {/* Error Alert Banner if fetch fails */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/40 text-red-300 flex items-center justify-between text-xs font-mono"
            >
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
              <button
                onClick={handleRun}
                className="px-3 py-1 rounded bg-red-500/20 hover:bg-red-500/30 text-white font-bold cursor-pointer"
              >
                Retry
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 2-COLUMN RESPONSIVE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[420px_1fr] gap-6 items-start">
          {/* LEFT COLUMN: Simulation & Atmosphere Inputs */}
          <SimulationInputs
            inputs={inputs}
            setInputs={setInputs}
            onRun={handleRun}
            isRunning={isLoading}
            onLocationChange={handleLocationChange}
            isFetchingWeather={isLoading}
          />

          {/* RIGHT COLUMN: AI Directive Banner, Metrics & Telemetry Chart */}
          <div className="flex flex-col gap-6">
            {/* AI Directive Banner with Exact Red / Blue / Green Badge Colors */}
            <DirectiveBanner
              status={kimberData.status}
              reasoning={kimberData.reasoning}
            />

            {/* Metrics Grid: 3 side-by-side cards with tabular numerals */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MetricCard
                icon={TrendingDown}
                label="Current Soiling Loss"
                value={`${kimberData.soilingLoss}%`}
                unit=""
                trend={`PM10: ${kimberData.pm10} µg/m³`}
                detail="Kimber Smog Degradation"
                delay={0.1}
              />

              <MetricCard
                icon={DollarSign}
                label="Cumulative Revenue Bleed"
                value={`Rs. ${kimberData.cumulativeBleed.toLocaleString()}`}
                unit=""
                trend={`Wash Cost: Rs. ${inputs.washCost.toLocaleString()}`}
                detail={`Crossover Day: D${kimberData.crossoverDay}`}
                delay={0.2}
              />

              <MetricCard
                icon={Droplets}
                label="RO Water Conserved"
                value={`${kimberData.waterSaved.toLocaleString()} L`}
                unit=""
                trend={`Rain 3-Day: ${kimberData.rain_mm} mm`}
                detail="Aquifer Protection"
                delay={0.3}
              />
            </div>

            {/* Interactive SVG Yield Degradation vs Recovery Curve Chart */}
            <TelemetryChart
              crossoverDay={kimberData.crossoverDay}
              daysSinceWash={inputs.daysSinceWash}
              soilingRate={kimberData.dailyDegradationRate * 100}
              washCost={inputs.washCost}
              netRoi={kimberData.netRoi}
              isHold={kimberData.isHold}
              status={kimberData.status}
            />
          </div>
        </div>

        {/* Live Operational Status Strip */}
        <div className="mt-8 p-4 rounded-xl bg-[#111111] border border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFF313]" />
              API: /api/optimize · Kimber Mathematical Engine
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="hidden sm:inline">Rain Threshold: 5.0mm (3-Day Horizon)</span>
          </div>

          <div className="flex items-center gap-4">
            <span>Status: <strong className="text-white uppercase">{kimberData.directive}</strong></span>
            <button
              onClick={handleRun}
              disabled={isLoading}
              className="text-[#FFF313] hover:underline flex items-center gap-1 font-bold cursor-pointer disabled:opacity-50"
            >
              <RefreshCcw size={12} className={isLoading ? 'animate-spin' : ''} /> 
              {isLoading ? 'Optimizing...' : 'Run Optimization'}
            </button>
          </div>
        </div>
      </main>

      {/* Slide-over User Validation Modal */}
      <ValidationModal
        isOpen={showValidationModal}
        onClose={() => setShowValidationModal(false)}
      />
    </div>
  );
}
