'use client';

import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Globe2, 
  Cpu, 
  SunMedium, 
  Wind, 
  Droplets, 
  ChevronRight, 
  ArrowUpRight, 
  AlertTriangle, 
  CheckCircle2, 
  Compass, 
  Layers, 
  HeartPulse, 
  Thermometer, 
  Sparkles 
} from 'lucide-react';

export default function HealthrytixWebpage() {
  // WBGT & Heat Engine Interactive State
  const [temp, setTemp] = useState<number>(34); // Dry-bulb temp (°C)
  const [humidity, setHumidity] = useState<number>(68); // Relative humidity (%)
  const [solarExposure, setSolarExposure] = useState<boolean>(true); // Outdoor vs Shaded
  const [activeContextRing, setActiveContextRing] = useState<'env' | 'physio' | 'psycho' | 'intervention'>('env');

  // Stull Wet-Bulb Equation & WBGT Approximation
  const calculation = useMemo(() => {
    const T = temp;
    const RH = humidity;
    // Stull (2011) Empirical Wet-Bulb Formulation
    const Tw = T * Math.atan(0.151977 * Math.pow(RH + 8.313659, 0.5)) +
               Math.atan(T + RH) -
               Math.atan(RH - 1.676331) +
               0.00391838 * Math.pow(RH, 1.5) * Math.atan(0.023101 * RH) -
               4.686035;

    // Globe temperature estimate based on solar exposure
    const Tg = solarExposure ? T + 6.5 : T + 0.8;

    // WBGT: Outdoor = 0.7 Tw + 0.2 Tg + 0.1 Td | Shaded = 0.7 Tw + 0.3 Tg
    const wbgt = solarExposure 
      ? (0.7 * Tw + 0.2 * Tg + 0.1 * T) 
      : (0.7 * Tw + 0.3 * Tg);

    // Risk Classification based on PriSEHAT thresholds
    let riskLevel = 'Low';
    let riskColor = 'text-[#34A843] bg-[#34A843]/10 border-[#34A843]/30';
    let state = 'Balanced';
    let action = 'Standard hydration and routine physical schedules intact.';

    if (wbgt >= 32.2) {
      riskLevel = 'Extreme';
      riskColor = 'text-[#E13B26] bg-[#E13B26]/10 border-[#E13B26]/30';
      state = 'Act';
      action = 'Suspend direct thermal exertion. Trigger autonomic recovery protocol.';
    } else if (wbgt >= 31.1) {
      riskLevel = 'Very High';
      riskColor = 'text-[#E13B26] bg-[#E13B26]/10 border-[#E13B26]/30';
      state = 'Act';
      action = 'Mandate 20-min cooling breaks per hour. Limit active outdoor load.';
    } else if (wbgt >= 29.4) {
      riskLevel = 'High';
      riskColor = 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30';
      state = 'Recover';
      action = 'Reduce aerobic training duration. Shift sessions to shaded/indoor facilities.';
    } else if (wbgt >= 26.7) {
      riskLevel = 'Moderate';
      riskColor = 'text-[#F59E0B] bg-[#F59E0B]/10 border-[#F59E0B]/30';
      state = 'Adapt';
      action = 'Enforce scheduled hydration pacing. Monitor autonomic recovery trends.';
    }

    return {
      tw: Tw.toFixed(1),
      tg: Tg.toFixed(1),
      wbgt: wbgt.toFixed(1),
      riskLevel,
      riskColor,
      state,
      action
    };
  }, [temp, humidity, solarExposure]);

  return (
    <div className="min-h-screen bg-white text-[#022B3A] font-sans antialiased selection:bg-[#34A843]/20 selection:text-[#022B3A] relative overflow-hidden">
      
      {/* Ambient Radial Highlights (Memorae-Style Light Mode Diffused Backdrops) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-tr from-[#34A843]/10 via-[#1C357C]/6 to-transparent rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-[1400px] right-[-150px] w-[650px] h-[650px] bg-[#34A843]/8 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-[2800px] left-[-150px] w-[700px] h-[700px] bg-[#1C357C]/7 rounded-full blur-[180px] pointer-events-none -z-10" />

      {/* Global Planetary Telemetry Ribbon */}
      <div className="w-full bg-[#F8FAFC] border-b border-slate-200/80 px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs font-mono tracking-tight text-slate-600 gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A843] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A843]"></span>
            </span>
            <span className="font-semibold text-[#022B3A]">H.O.W TELEMETRY GRID</span>
            <span className="text-slate-400">|</span>
            <span>4 CONTINENTS // 129 COUNTRIES ACTIVE</span>
          </div>
          <div className="flex items-center gap-4 hidden md:flex">
            <span>CORE ORIGIN: MUMBAI & DELHI, IN</span>
            <span>WBGT ENGINE: ONLINE [STULL-MODIFIED]</span>
            <span className="text-[#34A843] font-medium">ABDM / DPDP READY</span>
          </div>
        </div>
      </div>

      {/* Floating Pill Dock Navigation */}
      <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4">
        <nav className="bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(28,53,124,0.08)] rounded-full px-5 py-3 flex items-center justify-between transition-all">
          {/* Brand Logo & Wordmark */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 flex items-center justify-center">
              {/* SVG Vectorization of the Healthrytix Emblem */}
              <svg viewBox="0 0 100 100" className="w-9 h-9">
                {/* Orbit Navy Ring */}
                <circle cx="50" cy="50" r="42" fill="none" stroke="#1C357C" strokeWidth="9" strokeDasharray="180 85" transform="rotate(-30 50 50)" />
                {/* Planetary Green Interlocking Arm */}
                <path d="M22 28 C 45 10, 65 30, 80 50 C 65 70, 40 90, 20 72" fill="none" stroke="#34A843" strokeWidth="9" strokeLinecap="round" />
                {/* Clinical Cross Nodes (Vitality Coral) */}
                <g fill="#E13B26">
                  <path d="M 47 16 h 6 v 14 h -6 z" />
                  <path d="M 43 20 h 14 v 6 h -14 z" />
                  <path d="M 47 70 h 6 v 14 h -6 z" />
                  <path d="M 43 74 h 14 v 6 h -14 z" />
                </g>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#022B3A] leading-none">Healthrytix</span>
              <span className="text-[10px] font-semibold tracking-wider text-[#1C357C] uppercase">One World Network</span>
            </div>
          </div>

          {/* Center Links */}
          <div className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#prisehat" className="hover:text-[#1C357C] transition-colors">PriSEHAT Engine</a>
            <a href="#corridors" className="hover:text-[#1C357C] transition-colors">Global South Corridors</a>
            <a href="#verticals" className="hover:text-[#1C357C] transition-colors">Integrated Verticals</a>
            <a href="#simulator" className="hover:text-[#1C357C] transition-colors">WBGT Sandbox</a>
            <a href="#governance" className="hover:text-[#1C357C] transition-colors">Clinical Ethics</a>
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-3">
            <a 
              href="https://payments.healthrytix.com" 
              className="hidden sm:inline-flex text-xs font-semibold text-[#1C357C] hover:bg-[#1C357C]/5 px-4 py-2 rounded-full border border-slate-200 transition-all"
            >
              Professional Tier
            </a>
            <a 
              href="https://zcmp.in/1aWg" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#1C357C] text-white hover:bg-[#15275e] px-4 py-2 rounded-full shadow-sm shadow-[#1C357C]/20 transition-all"
            >
              <span>Join Ambassador Cohort</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </nav>
      </header>

      {/* Hero Section: The Convergence Engine */}
      <section className="pt-20 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Narrative Pillar */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#34A843]/10 border border-[#34A843]/25 text-xs font-mono font-semibold text-[#34A843]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLIMATE-AWARE PREVENTIVE HEALTH INTELLIGENCE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#022B3A] leading-[1.12]">
              From Environmental Intelligence to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C357C] via-[#022B3A] to-[#34A843]">Preventive Health Action.</span>
            </h1>

            <p className="text-lg text-slate-600 max-w-2xl font-normal leading-relaxed">
              Healthrytix bridges multi-modal biosignals, planetary heat burdens, and decentralized public health systems. We quantify sub-clinical environmental friction before it manifests as medical illness—empowering healthy populations across 129 countries.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a 
                href="#simulator" 
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1C357C] text-white font-semibold text-sm hover:bg-[#15275e] shadow-lg shadow-[#1C357C]/25 transition-all"
              >
                <span>Launch PriSEHAT Sandbox</span>
                <ChevronRight className="w-4 h-4" />
              </a>
              <a 
                href="#corridors" 
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#022B3A] font-semibold text-sm border border-slate-200 hover:border-[#1C357C]/40 hover:bg-[#F8FAFC] shadow-sm transition-all"
              >
                <span>Explore 4-Continent Network</span>
                <Globe2 className="w-4 h-4 text-[#34A843]" />
              </a>
            </div>

            {/* Stat Micro-Tiles */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-200/80">
              <div>
                <div className="text-2xl font-bold font-mono text-[#1C357C]">129</div>
                <div className="text-xs text-slate-500 font-medium">Global South Nations</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#34A843]">4-Segment</div>
                <div className="text-xs text-slate-500 font-medium">Closed-Loop Engine</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-mono text-[#022B3A]">₹18K + SaaS</div>
                <div className="text-xs text-slate-500 font-medium">Sovereign Unit Architecture</div>
              </div>
            </div>
          </div>

          {/* Right Pillar: Tactile Interactive PriSEHAT Context Ring */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 border border-slate-200/90 rounded-3xl p-7 shadow-[0_12px_40px_-8px_rgba(28,53,124,0.08)] relative">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#1C357C]">Core R&D Architecture</span>
                  <h3 className="text-lg font-bold text-[#022B3A]">The PriSEHAT Context Ring</h3>
                </div>
                <span className="inline-flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full bg-[#34A843]/10 text-[#34A843] border border-[#34A843]/20">
                  <Activity className="w-3 h-3" /> Live Closed Loop
                </span>
              </div>

              {/* Central Vector Loop Diagram */}
              <div className="relative flex items-center justify-center py-6">
                <div className="w-56 h-56 rounded-full border-4 border-dashed border-slate-200 relative flex items-center justify-center">
                  
                  {/* Dynamic Core Indicator */}
                  <div className="text-center p-4 bg-[#F8FAFC] rounded-full w-40 h-40 flex flex-col items-center justify-center border border-slate-200/80 shadow-inner">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">State Vector</span>
                    <span className="text-xl font-extrabold text-[#022B3A] tracking-tight">
                      {activeContextRing === 'env' && 'ENVIRONMENT'}
                      {activeContextRing === 'physio' && 'PHYSIOLOGY'}
                      {activeContextRing === 'psycho' && 'PSYCHOLOGY'}
                      {activeContextRing === 'intervention' && 'INTERVENTION'}
                    </span>
                    <span className="text-[11px] font-medium text-[#34A843] mt-1">Autonomous Sync</span>
                  </div>

                  {/* 4 Interactive Orbital Quadrant Nodes */}
                  <button 
                    onClick={() => setActiveContextRing('env')}
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 p-2.5 rounded-full border transition-all ${
                      activeContextRing === 'env' 
                        ? 'bg-[#34A843] text-white border-[#34A843] shadow-md shadow-[#34A843]/40 scale-110' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#34A843]'
                    }`}
                    title="Environmental Signals"
                  >
                    <SunMedium className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => setActiveContextRing('physio')}
                    className={`absolute top-1/2 -right-3 -translate-y-1/2 p-2.5 rounded-full border transition-all ${
                      activeContextRing === 'physio' 
                        ? 'bg-[#1C357C] text-white border-[#1C357C] shadow-md shadow-[#1C357C]/40 scale-110' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#1C357C]'
                    }`}
                    title="Physiological Vitals"
                  >
                    <HeartPulse className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => setActiveContextRing('psycho')}
                    className={`absolute -bottom-3 left-1/2 -translate-x-1/2 p-2.5 rounded-full border transition-all ${
                      activeContextRing === 'psycho' 
                        ? 'bg-[#022B3A] text-white border-[#022B3A] shadow-md shadow-[#022B3A]/40 scale-110' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#022B3A]'
                    }`}
                    title="Psychological Triage"
                  >
                    <Cpu className="w-5 h-5" />
                  </button>

                  <button 
                    onClick={() => setActiveContextRing('intervention')}
                    className={`absolute top-1/2 -left-3 -translate-y-1/2 p-2.5 rounded-full border transition-all ${
                      activeContextRing === 'intervention' 
                        ? 'bg-[#E13B26] text-white border-[#E13B26] shadow-md shadow-[#E13B26]/40 scale-110' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#E13B26]'
                    }`}
                    title="Adaptive Interventions"
                  >
                    <ShieldCheck className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Dynamic Context Card Details */}
              <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 text-xs space-y-1.5 font-mono">
                {activeContextRing === 'env' && (
                  <div>
                    <div className="font-bold text-[#34A843] flex items-center justify-between">
                      <span>TELEMETRY: AMBIENT HEAT & AQI</span>
                      <span>STAGE 1/4</span>
                    </div>
                    <p className="text-slate-600 font-sans mt-1">
                      Continuous ingestion of Wet-Bulb Globe Temperature (WBGT), PM2.5, NO₂, and NDVI greenery density with ~1.2km privacy geohashing[cite: 1].
                    </p>
                  </div>
                )}
                {activeContextRing === 'physio' && (
                  <div>
                    <div className="font-bold text-[#1C357C] flex items-center justify-between">
                      <span>TELEMETRY: AUTONOMIC STRAIN (z-Scores)</span>
                      <span>STAGE 2/4[cite: 1]</span>
                    </div>
                    <p className="text-slate-600 font-sans mt-1">
                      Extracts baseline deviations across HRV (RMSSD), GSR/EDA sympathetic spikes, and skin-temperature variance calibrated to South Asian phenotypes[cite: 1].
                    </p>
                  </div>
                )}
                {activeContextRing === 'psycho' && (
                  <div>
                    <div className="font-bold text-[#022B3A] flex items-center justify-between">
                      <span>TRIAGE: PRISMA & COGNITIVE VIGILANCE</span>
                      <span>STAGE 3/4[cite: 1]</span>
                    </div>
                    <p className="text-slate-600 font-sans mt-1">
                      Validated GHQ-12, PHQ-9, and conversational triage[cite: 1]. Deterministic Question 9 interlock triggers emergency routing to Tele-MANAS (14416)[cite: 1].
                    </p>
                  </div>
                )}
                {activeContextRing === 'intervention' && (
                  <div>
                    <div className="font-bold text-[#E13B26] flex items-center justify-between">
                      <span>ACTION: DETERMINISTIC PREVENTION ENGINE</span>
                      <span>STAGE 4/4[cite: 1]</span>
                    </div>
                    <p className="text-slate-600 font-sans mt-1">
                      Delivers prioritized micro-adjustments: active hydration pacing, workout rescheduling, cooling protocols, or clinical investigation prompts[cite: 1].
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* The Global South Bioregional Corridors (H.O.W Network Bento Grid) */}
      <section id="corridors" className="py-20 bg-[#F8FAFC] border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#1C357C] uppercase">Bioregional Operational Footprint</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022B3A] tracking-tight mt-1">
                4 Continents. 129 Countries. One Health Matrix.
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-md">
              Connecting ecological biomass, zoonotic early warning, deep-tech AI, and oceanic resilience across decentralized Global South ecosystems.
            </p>
          </div>

          {/* Bento Grid: 4 Interconnected Regional Nodes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Latin America — Brazil (HOW Businix) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#34A843]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#34A843]/10 text-[#34A843] flex items-center justify-center mb-5 font-bold font-mono">
                  01
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-mono font-semibold text-slate-700 mb-3">
                  <Globe2 className="w-3 h-3 text-[#34A843]" /> LATIN AMERICA
                </div>
                <h3 className="text-lg font-bold text-[#022B3A] group-hover:text-[#34A843] transition-colors">
                  Green Density in Brazil
                </h3>
                <span className="text-xs font-mono text-[#1C357C] font-semibold block mt-0.5">HOW Businix Vertical[cite: 1]</span>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Leveraging Amazonian biodiversity and green density to develop nature-backed health enterprises, bio-economy scaling, and resilient clinical supply chains.
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>FOCUS: BIO-ENTERPRISE</span>
                <span className="text-[#34A843] font-bold">NODE: SÃO PAULO</span>
              </div>
            </div>

            {/* 2. Africa — Nigeria & Rwanda (HOW Governix) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#1C357C]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#1C357C]/10 text-[#1C357C] flex items-center justify-center mb-5 font-bold font-mono">
                  02
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-mono font-semibold text-slate-700 mb-3">
                  <Layers className="w-3 h-3 text-[#1C357C]" /> AFRICA
                </div>
                <h3 className="text-lg font-bold text-[#022B3A] group-hover:text-[#1C357C] transition-colors">
                  Policy & Zoonotic Vigilance
                </h3>
                <span className="text-xs font-mono text-[#1C357C] font-semibold block mt-0.5">HOW Governix Vertical[cite: 1]</span>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Decentralized primary health policy across <strong>Nigeria</strong> (West Africa) harmonized with One Health animal-human zoonoses disease surveillance in <strong>Rwanda</strong> (East Africa).
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>FOCUS: ONE HEALTH POLICY</span>
                <span className="text-[#1C357C] font-bold">ABUJA / KIGALI</span>
              </div>
            </div>

            {/* 3. South Asia — India (HOW Innovix) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#34A843]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#34A843]/10 text-[#34A843] flex items-center justify-center mb-5 font-bold font-mono">
                  03
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-mono font-semibold text-slate-700 mb-3">
                  <Cpu className="w-3 h-3 text-[#34A843]" /> SOUTH ASIA
                </div>
                <h3 className="text-lg font-bold text-[#022B3A] group-hover:text-[#34A843] transition-colors">
                  AI Health & PriSEHAT Core
                </h3>
                <span className="text-xs font-mono text-[#1C357C] font-semibold block mt-0.5">HOW Innovix Vertical[cite: 1]</span>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Platform origin in <strong>India</strong>[cite: 1]. Deep-tech health systems engineering, South Asian phenotypic risk calibrations, and empirical WBGT algorithm R&D[cite: 1].
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>FOCUS: DEEP-TECH R&D</span>
                <span className="text-[#34A843] font-bold">MUMBAI / DELHI[cite: 1]</span>
              </div>
            </div>

            {/* 4. Oceania — Pacific Islands (HOW Wellnix) */}
            <div className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-[#022B3A]/40 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-10 h-10 rounded-2xl bg-[#022B3A]/10 text-[#022B3A] flex items-center justify-center mb-5 font-bold font-mono">
                  04
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-[11px] font-mono font-semibold text-slate-700 mb-3">
                  <Compass className="w-3 h-3 text-[#022B3A]" /> OCEANIA
                </div>
                <h3 className="text-lg font-bold text-[#022B3A] group-hover:text-[#022B3A] transition-colors">
                  Blue Oceanic Resilience
                </h3>
                <span className="text-xs font-mono text-[#1C357C] font-semibold block mt-0.5">HOW Wellnix Vertical[cite: 1]</span>
                <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                  Navigating sea-level thermal stress and island micro-climates through nature-based social prescribing, holistic workforce recovery, and community wellness[cite: 1].
                </p>
              </div>
              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>FOCUS: WORKFORCE WELLNESS[cite: 1]</span>
                <span className="text-[#022B3A] font-bold">SUVA / PACIFIC</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Interactive PriSEHAT WBGT & Heat Engine Simulator */}
      <section id="simulator" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono font-bold text-[#34A843] uppercase tracking-widest">
            Empirical Biophysical Modeling
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#022B3A] tracking-tight mt-1">
            Wet-Bulb Globe Temperature (WBGT) Engine
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Standard dry-bulb thermometers isolate ambient air while completely ignoring sweat evaporative cooling[cite: 1]. PriSEHAT synthesizes natural wet-bulb (Tnw), radiant globe load (Tg), and ambient temperature (Td) into a single preventive index[cite: 1].
          </p>
        </div>

        {/* Workbench Grid */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_8px_30px_-4px_rgba(28,53,124,0.06)] grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#022B3A] flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-[#E13B26]" /> Ambient Air Temperature ($T_d$)[cite: 1]
                </label>
                <span className="font-mono text-base font-extrabold text-[#1C357C]">{temp}°C</span>
              </div>
              <input 
                type="range" 
                min="20" 
                max="50" 
                value={temp} 
                onChange={(e) => setTemp(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1C357C]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>20°C (Mild)</span>
                <span>35°C (High Heat)</span>
                <span>50°C (Severe)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-bold text-[#022B3A] flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-[#34A843]" /> Relative Humidity ($RH$)[cite: 1]
                </label>
                <span className="font-mono text-base font-extrabold text-[#34A843]">{humidity}%</span>
              </div>
              <input 
                type="range" 
                min="15" 
                max="95" 
                value={humidity} 
                onChange={(e) => setHumidity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#34A843]"
              />
              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1">
                <span>15% (Arid)</span>
                <span>65% (Tropical Monsoonal)</span>
                <span>95% (Saturated)</span>
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-[#022B3A] block mb-2">Solar Radiant Load Status[cite: 1]</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSolarExposure(true)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                    solarExposure 
                      ? 'bg-[#1C357C] text-white border-[#1C357C] shadow-sm' 
                      : 'bg-[#F8FAFC] text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <SunMedium className="w-4 h-4" /> Outdoor (Direct Sun)[cite: 1]
                </button>
                <button
                  type="button"
                  onClick={() => setSolarExposure(false)}
                  className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-2 ${
                    !solarExposure 
                      ? 'bg-[#1C357C] text-white border-[#1C357C] shadow-sm' 
                      : 'bg-[#F8FAFC] text-slate-600 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <Wind className="w-4 h-4" /> Shaded / Indoor[cite: 1]
                </button>
              </div>
            </div>

            {/* Formula Transparency Callout */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 text-xs font-mono text-slate-600">
              <span className="font-bold text-[#022B3A] block mb-1">MATHEMATICAL FORMULATION[cite: 1]:</span>
              {solarExposure ? (
                <span>WBGT = 0.7 T_{'{nw}'} + 0.2 T_g + 0.1 T_d (70% Weight on Evaporative Loss)[cite: 1]</span>
              ) : (
                <span>WBGT = 0.7 T_{'{nw}'} + 0.3 T_g (Indoor / Shaded Environment)[cite: 1]</span>
              )}
            </div>
          </div>

          {/* Real-time Computed HUD Output */}
          <div className="lg:col-span-6 bg-[#F8FAFC] border border-slate-200/90 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase">Calculated Output</span>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${calculation.riskColor}`}>
                  {calculation.riskLevel} Thermal Load[cite: 1]
                </span>
              </div>

              <div className="my-6 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <span className="text-[11px] font-mono text-slate-400 block">COMPUTED WBGT[cite: 1]</span>
                  <span className="text-3xl font-extrabold font-mono text-[#022B3A]">{calculation.wbgt}°C</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">True Thermal Strain[cite: 1]</span>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm">
                  <span className="text-[11px] font-mono text-slate-400 block">STULL WET-BULB ($T_w$)[cite: 1]</span>
                  <span className="text-3xl font-extrabold font-mono text-[#1C357C]">{calculation.tw}°C</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Sweat Evaporative Boundary[cite: 1]</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">PriSEHAT Health State:[cite: 1]</span>
                  <span className="font-bold text-[#022B3A] px-2.5 py-0.5 rounded bg-white border border-slate-200">
                    {calculation.state}[cite: 1]
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white border border-slate-200/80 text-xs">
                  <span className="font-bold text-[#022B3A] block mb-0.5">Recommended Operational Protocol:[cite: 1]</span>
                  <span className="text-slate-600">{calculation.action}[cite: 1]</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A843]" /> Non-Diagnostic Guardrail[cite: 1]
              </span>
              <span>ICMR AI & DPDPA Compliant[cite: 1]</span>
            </div>
          </div>

        </div>
      </section>

      {/* The 4 H.O.W Integrated Verticals */}
      <section id="verticals" className="py-20 bg-[#F8FAFC] border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold text-[#1C357C] uppercase tracking-widest">
              Execution Architecture
            </span>
            <h2 className="text-3xl font-extrabold text-[#022B3A] tracking-tight mt-1">
              The Four H.O.W Institutional Verticals[cite: 1]
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Transforming policy mandates, deep-tech research, and market dynamics into frontline healthcare delivery[cite: 1].
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Innovix */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#34A843]/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#34A843]/10 text-[#34A843] flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#022B3A]">H.O.W Innovix[cite: 1]</h3>
              <p className="text-xs font-mono text-[#34A843] font-semibold mt-1">Tech Incubation & R&D[cite: 1]</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Supports practitioners in healthtech development, Tell-Show-Do (TSD) innovation challenges, and clinical SaaS validation[cite: 1].
              </p>
              <a href="https://how-network.healthrytix.com/about/innovix/" className="inline-flex items-center gap-1 text-xs font-bold text-[#1C357C] mt-4 hover:underline">
                Explore Innovix <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Businix */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#1C357C]/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#1C357C]/10 text-[#1C357C] flex items-center justify-center mb-5">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#022B3A]">H.O.W Businix[cite: 1]</h3>
              <p className="text-xs font-mono text-[#1C357C] font-semibold mt-1">System & Market Literacy[cite: 1]</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Equips medical leaders with practice automation, sustainable bio-economy scaling, and enterprise healthcare operations[cite: 1].
              </p>
              <a href="https://how-network.healthrytix.com/about/businix/" className="inline-flex items-center gap-1 text-xs font-bold text-[#1C357C] mt-4 hover:underline">
                Explore Businix <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Governix */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#022B3A]/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#022B3A]/10 text-[#022B3A] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#022B3A]">H.O.W Governix[cite: 1]</h3>
              <p className="text-xs font-mono text-[#022B3A] font-semibold mt-1">Policy, Ethics & Consent[cite: 1]</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Builds system capacity for navigating national digital health architectures (ABDM), DPDPA compliance, and One Health governance[cite: 1].
              </p>
              <a href="https://how-network.healthrytix.com/about/governix/" className="inline-flex items-center gap-1 text-xs font-bold text-[#1C357C] mt-4 hover:underline">
                Explore Governix <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Wellnix */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200/90 shadow-sm hover:border-[#E13B26]/50 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E13B26]/10 text-[#E13B26] flex items-center justify-center mb-5">
                <HeartPulse className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#022B3A]">H.O.W Wellnix[cite: 1]</h3>
              <p className="text-xs font-mono text-[#E13B26] font-semibold mt-1">Workforce Resilience[cite: 1]</p>
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                Strengthens healthcare workforce wellbeing through lifestyle medicine, stress mitigation, and rural nature-based immersions[cite: 1].
              </p>
              <a href="https://how-network.healthrytix.com/about/wellnix/" className="inline-flex items-center gap-1 text-xs font-bold text-[#1C357C] mt-4 hover:underline">
                Explore Wellnix <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Clinical Governance & Phenotypic Trust Architecture */}
      <section id="governance" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-mono font-bold text-[#1C357C] uppercase tracking-wider">
                Ethical AI & Clinical Governance[cite: 1]
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#022B3A]">
                Calibrated for South Asian Phenotypes. Guarded by Strict Determinism.[cite: 1]
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Most consumer health algorithms rely on Western demographic defaults[cite: 1]. PriSEHAT embeds localized thresholds for central adiposity (WHtR ≥ 0.5 and Asian-specific BMI cutoffs ≥ 23 kg/m²)[cite: 1]. The platform employs deterministic safety rules for risk categorization, while generative reasoning (GPT OSS 120B) is strictly restricted to plain-language contextual explanations[cite: 1].
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-[#F8FAFC] px-3.5 py-2 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#34A843]" /> Tele-MANAS (14416) Interlock Active[cite: 1]
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-[#F8FAFC] px-3.5 py-2 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#34A843]" /> DPDP Act 2023 Consent Schema[cite: 1]
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-700 bg-[#F8FAFC] px-3.5 py-2 rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-[#34A843]" /> Geohash Resolution (~1.2 km)[cite: 1]
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 text-xs space-y-3 font-mono">
              <div className="font-bold text-[#022B3A] flex items-center gap-1.5 pb-2 border-b border-slate-200">
                <AlertTriangle className="w-4 h-4 text-[#E13B26]" /> Emergency Safety Gate[cite: 1]
              </div>
              <p className="text-slate-600 font-sans text-xs">
                In compliance with the Mental Healthcare Act 2017, self-harm signals (PHQ-9 Question 9) instantly freeze standard software interactions and route directly to certified national crisis counselors[cite: 1]:
              </p>
              <div className="bg-white p-2.5 rounded-lg border border-slate-200 text-[#E13B26] font-bold">
                Tele-MANAS Helpline: 14416 / 1800-891-4416[cite: 1]
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutional Footer */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-12 text-sm text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-200/80">
          
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#1C357C] text-white flex items-center justify-center font-bold font-mono text-sm">
                H
              </div>
              <span className="text-lg font-bold text-[#022B3A]">Healthrytix Healthtech Solutions</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              Healthrytix One World Network operates at the convergence of planetary health, climate telemetry, and preventive medicine across 129 Global South nations[cite: 1].
            </p>
            <div className="text-xs font-mono text-slate-400">
              CIN / Corporate Registration: Healthrytix Healthtech Solutions Pvt. Ltd.[cite: 1]
            </div>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#022B3A] uppercase tracking-wider">Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#prisehat" className="hover:text-[#1C357C]">PriSEHAT SaaS PoC-1[cite: 1]</a></li>
              <li><a href="https://how-network.healthrytix.com/about/innovix/" className="hover:text-[#1C357C]">HOW Innovix[cite: 1]</a></li>
              <li><a href="https://how-network.healthrytix.com/about/businix/" className="hover:text-[#1C357C]">HOW Businix[cite: 1]</a></li>
              <li><a href="https://how-network.healthrytix.com/about/governix/" className="hover:text-[#1C357C]">HOW Governix[cite: 1]</a></li>
              <li><a href="https://how-network.healthrytix.com/about/wellnix/" className="hover:text-[#1C357C]">HOW Wellnix[cite: 1]</a></li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#022B3A] uppercase tracking-wider">Governance</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#governance" className="hover:text-[#1C357C]">DPDPA 2023 Notice[cite: 1]</a></li>
              <li><a href="#governance" className="hover:text-[#1C357C]">ICMR AI Guidelines[cite: 1]</a></li>
              <li><a href="#governance" className="hover:text-[#1C357C]">Telemedicine Ethics[cite: 1]</a></li>
              <li><a href="#governance" className="hover:text-[#1C357C]">Clinical Disclaimers[cite: 1]</a></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#022B3A] uppercase tracking-wider">Corporate Hubs</h4>
            <p className="text-xs text-slate-500">
              <strong>India Operations:</strong> Goregaon East, Mumbai 400063 & Delhi NCR Hub[cite: 1]
            </p>
            <p className="text-xs text-slate-500">
              <strong>Direct Dispatch:</strong> how-network@healthrytix.com[cite: 1]
            </p>
            <div className="pt-2">
              <a 
                href="https://chat.whatsapp.com/KYAGON3y3EGJk0ru0c0QCV" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#34A843] bg-[#34A843]/10 px-3 py-1.5 rounded-full border border-[#34A843]/30"
              >
                Join Global Open WhatsApp[cite: 1]
              </a>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 HEALTHRYTIX HEALTHETCH SOLUTIONS PVT. LTD. All Global Rights Reserved.[cite: 1]</p>
          <div className="flex gap-6 font-mono text-[11px]">
            <span>MUMBAI</span>
            <span>ABUJA</span>
            <span>KIGALI</span>
            <span>SÃO PAULO</span>
            <span>SUVA</span>
          </div>
        </div>
      </footer>

    </div>
  );
}