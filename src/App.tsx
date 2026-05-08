/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Terminal, 
  Plus, 
  X, 
  Activity, 
  Globe, 
  Lock, 
  Unlock,
  Cpu,
  Wifi,
  Trash2,
  AlertTriangle,
  Zap,
  RefreshCcw,
  Crosshair,
  Skull,
  Target,
  Settings,
  Download,
  Upload,
  Save,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Packet, AppConfig } from './types';
import { defaultConfig } from './config';

// --- Utils ---

const generateIp = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const PROTOCOLS: ('TCP' | 'UDP' | 'ICMP')[] = ['TCP', 'UDP', 'ICMP'];

// --- Components ---

const StatCard = ({ label, value, icon: Icon, color, border }: { label: string, value: string | number, icon: any, color: string, border: string }) => (
  <div className={`bg-black/20 border ${border} p-4 rounded-xl flex items-center gap-4 group hover:bg-black/30 transition-all`}>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">{label}</p>
      <p className="text-xl font-bold text-white font-mono">{value}</p>
    </div>
  </div>
);

export default function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('aegisgrid_config');
    return saved ? JSON.parse(saved) : defaultConfig;
  });
  
  const [blockedIps, setBlockedIps] = useState<Set<string>>(new Set(config.defaultBlockedIps));
  const [logs, setLogs] = useState<Packet[]>([]);
  const [newIp, setNewIp] = useState('');
  const [networkLoad, setNetworkLoad] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('aegisgrid_config', JSON.stringify(config));
  }, [config]);

  // Sync blockedIps with config if needed (or just keep them independent after init)
  // For this app, let's say "Save" manually updates the defaultBlockedIps in config
  
  // Stats
  const totalPackets = logs.length;
  const blockedPackets = logs.filter(l => l.status === 'blocked').length;

  // Simulation Logic
  useEffect(() => {
    if (!isRunning) {
      setNetworkLoad(0);
      return;
    }

    const interval = setInterval(() => {
      const isThreat = Math.random() < 0.15;
      const blockedArray = Array.from(blockedIps);
      const src: string = (isThreat && blockedArray.length > 0) 
        ? (blockedArray[Math.floor(Math.random() * blockedArray.length)] as string)
        : generateIp();
      const isBlocked = blockedIps.has(src);
      
      const newPacket: Packet = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString(),
        source: src,
        destination: '127.0.0.1',
        port: Math.floor(Math.random() * 65535),
        protocol: PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)],
        size: Math.floor(Math.random() * 1500),
        status: isBlocked ? 'blocked' : 'allowed',
        type: isThreat ? 'threat' : 'normal'
      };

      setLogs(prev => [newPacket, ...prev].slice(0, config.logRetention));
      setNetworkLoad(Math.floor(Math.random() * 100));
    }, config.refreshRate);

    return () => clearInterval(interval);
  }, [isRunning, blockedIps, config.logRetention, config.refreshRate]);

  const addIp = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (newIp && !blockedIps.has(newIp)) {
      setBlockedIps(prev => new Set([...prev, newIp]));
      setNewIp('');
    }
  };

  const removeIp = (ip: string) => {
    setBlockedIps(prev => {
      const next = new Set(prev);
      next.delete(ip);
      return next;
    });
  };

  const toggleFirewall = () => {
    setIsRunning(!isRunning);
  };

  const exportConfig = () => {
    const currentConfig: AppConfig = {
      ...config,
      defaultBlockedIps: Array.from(blockedIps)
    };
    const blob = new Blob([JSON.stringify(currentConfig, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aegisgrid_config.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const importConfig = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string) as AppConfig;
        setConfig(imported);
        setBlockedIps(new Set(imported.defaultBlockedIps));
        setSaveStatus('Imported Successfully');
        setTimeout(() => setSaveStatus(null), 3000);
      } catch (err) {
        setSaveStatus('Invalid Config File');
        setTimeout(() => setSaveStatus(null), 3000);
      }
    };
    reader.readAsText(file);
  };

  const saveCurrentAsDefault = () => {
    setConfig(prev => ({
      ...prev,
      defaultBlockedIps: Array.from(blockedIps)
    }));
    setSaveStatus('Saved to Defaults');
    setTimeout(() => setSaveStatus(null), 3000);
  };

  // --- Theme Mapping ---
  const themeStyles = useMemo(() => {
    switch (config.theme) {
      case 'combat-gray':
        return {
          bg: 'bg-[#1a1b1e]',
          surface: 'bg-[#25262b]',
          header: 'bg-[#2c2e33]',
          border: 'border-[#373a40]',
          accent: 'text-orange-500',
          accentBg: 'bg-orange-500',
          accentBorder: 'border-orange-500/30',
          accentShadow: 'shadow-[0_0_15px_rgba(249,115,22,0.2)]'
        };
      case 'high-viz-green':
        return {
          bg: 'bg-[#000000]',
          surface: 'bg-[#050505]',
          header: 'bg-[#0a0a0a]',
          border: 'border-[#00ff41]/20',
          accent: 'text-[#00ff41]',
          accentBg: 'bg-[#00ff41]',
          accentBorder: 'border-[#00ff41]/40',
          accentShadow: 'shadow-[0_0_20px_rgba(0,255,65,0.3)]'
        };
      default: // tactical-dark
        return {
          bg: 'bg-[#0a0a0c]',
          surface: 'bg-[#0d0e11]',
          header: 'bg-[#0d0e11]',
          border: 'border-[#1d1e22]',
          accent: 'text-emerald-500',
          accentBg: 'bg-emerald-500',
          accentBorder: 'border-emerald-500/20',
          accentShadow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]'
        };
    }
  }, [config.theme]);

  return (
    <div className={`min-h-screen ${themeStyles.bg} text-gray-300 font-sans selection:bg-emerald-500/30 transition-colors duration-500`}>
      {/* Top Banner / Header */}
      <header className={`border-b ${themeStyles.border} ${themeStyles.header} px-4 md:px-6 py-3 md:px-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-50 gap-4 md:gap-0`}>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative">
            <div className={`bg-[#151619] border-2 ${themeStyles.accentBorder} p-2.5 rounded-lg ${themeStyles.accentShadow} relative overflow-hidden group`}>
              {/* Tactical scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
              <div className="relative flex items-center justify-center">
                <Shield className={`w-6 h-6 ${themeStyles.accent}`} />
                <Crosshair className={`w-4 h-4 ${themeStyles.accent} absolute opacity-60 animate-[spin_4s_linear_infinite]`} />
              </div>
            </div>
            {/* HUD Corner Accents */}
            <div className={`absolute -top-1 -left-1 w-2 h-2 border-t border-l ${themeStyles.accentBorder.replace('border-', 'border-')}`} />
            <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b border-r ${themeStyles.accentBorder.replace('border-', 'border-')}`} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-[0.25em] font-mono flex items-center gap-1">
              AEGIS<span className={`${themeStyles.accent} drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]`}>GRID</span>
              <span className={`text-[10px] ${themeStyles.accentBg.replace('bg-', 'bg-opacity-10 ')} ${themeStyles.accent} px-1.5 py-0.5 border ${themeStyles.accentBorder} ml-2 rounded font-normal tracking-tight`}>v1.2 // OPS</span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? `${themeStyles.accentBg} ${themeStyles.accentShadow.replace('0.2', '0.8')}` : 'bg-rose-500'} transition-all duration-500`} />
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-gray-500">
                SEC_LINK: {isRunning ? 'ENCRYPTED' : 'OFFLINE'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto justify-between md:justify-end">
          <div className="flex gap-2">
            <button 
              onClick={() => setLogs([])}
              className={`p-2 hover:${themeStyles.surface} rounded-lg transition-colors text-gray-500 hover:text-white border ${themeStyles.border}`}
              title="Clear Logs"
            >
              <RefreshCcw className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2 hover:${themeStyles.surface} rounded-lg transition-colors text-gray-500 hover:text-white border ${themeStyles.border}`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
          <button 
            onClick={toggleFirewall}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-mono text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 flex-1 md:flex-none ${
              isRunning 
                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20' 
                : `${themeStyles.accentBg} text-[#0a0a0c] font-bold hover:opacity-90`
            }`}
          >
            {isRunning ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            <span className="hidden xs:inline">{isRunning ? 'Deactivate' : 'Activate Protection'}</span>
            <span className="xs:hidden">{isRunning ? 'Lock' : 'Go Live'}</span>
          </button>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
        {/* Settings Modal */}
        <AnimatePresence>
          {isSettingsOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsSettingsOpen(false)}
                className="absolute inset-0 bg-[#0a0a0c]/80 backdrop-blur-sm" 
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative ${themeStyles.surface} border ${themeStyles.border} w-full max-w-md rounded-2xl shadow-2xl overflow-hidden`}
              >
                <div className={`p-6 border-b ${themeStyles.border} flex items-center justify-between`}>
                  <div className={`flex items-center gap-2 ${themeStyles.accent}`}>
                    <Settings className="w-5 h-5" />
                    <h2 className="text-lg font-bold text-white font-mono uppercase">System Config</h2>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className={`p-1 hover:${themeStyles.bg} rounded-md transition-colors text-gray-500 hover:text-white`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  {/* Appearance */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest border-b border-white/5 pb-1">Appearance</h3>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase text-gray-500">Visual Theme</label>
                      <select 
                        value={config.theme}
                        onChange={(e) => setConfig(prev => ({ ...prev, theme: e.target.value as any }))}
                        className={`bg-[#151619] border ${themeStyles.border} px-3 py-2 rounded-lg text-sm font-mono text-gray-300 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer`}
                      >
                        <option value="tactical-dark">Tactical Dark</option>
                        <option value="combat-gray">Combat Gray</option>
                        <option value="high-viz-green">High-Viz Green</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono uppercase text-gray-500">Log Retention</label>
                        <span className={`text-xs font-mono ${themeStyles.accent}`}>{config.logRetention} items</span>
                      </div>
                      <input 
                        type="range" min="10" max="200" step="10"
                        value={config.logRetention}
                        onChange={(e) => setConfig(prev => ({ ...prev, logRetention: parseInt(e.target.value) }))}
                        className={`accent-emerald-500 bg-[#151619] h-1.5 rounded-full outline-none cursor-pointer`}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <label className="text-xs font-mono uppercase text-gray-500">Refresh Rate</label>
                        <span className={`text-xs font-mono ${themeStyles.accent}`}>{config.refreshRate}ms</span>
                      </div>
                      <input 
                        type="range" min="100" max="2000" step="100"
                        value={config.refreshRate}
                        onChange={(e) => setConfig(prev => ({ ...prev, refreshRate: parseInt(e.target.value) }))}
                        className={`accent-emerald-500 bg-[#151619] h-1.5 rounded-full outline-none cursor-pointer`}
                      />
                    </div>
                  </div>

                  {/* Persistence Actions */}
                  <div className="space-y-3">
                    <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest border-b border-white/5 pb-1">Persistence</h3>
                    
                    <button 
                      onClick={saveCurrentAsDefault}
                      className={`w-full flex items-center justify-between p-3 bg-[#151619] border border-[#2d2e32] rounded-xl hover:${themeStyles.accentBorder} transition-all text-sm font-mono group`}
                    >
                      <div className="flex items-center gap-2">
                        <Save className={`w-4 h-4 ${themeStyles.accent}`} />
                        <span>Save Defaults</span>
                      </div>
                      <span className="text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">Local Storage</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={exportConfig}
                        className="flex items-center justify-center gap-2 p-3 bg-[#151619] border border-[#2d2e32] rounded-xl hover:border-blue-500/30 transition-all text-sm font-mono"
                      >
                        <Download className="w-4 h-4 text-blue-500" />
                        <span>Export</span>
                      </button>
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center justify-center gap-2 p-3 bg-[#151619] border border-[#2d2e32] rounded-xl hover:border-orange-500/30 transition-all text-sm font-mono"
                      >
                        <Upload className="w-4 h-4 text-orange-500" />
                        <span>Import</span>
                      </button>
                      <input 
                        ref={fileInputRef}
                        type="file" 
                        accept=".json"
                        className="hidden"
                        onChange={importConfig}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-[#111216] border-t border-[#1d1e22] flex items-center justify-center min-h-[44px]">
                  {saveStatus && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-emerald-500 text-[10px] font-mono uppercase tracking-widest"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {saveStatus}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        
        {/* Left Column: Controls and Stats */}
        <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Total Traffic" value={totalPackets} icon={Activity} color="bg-blue-500" border={themeStyles.border} />
            <StatCard label="Threats Blocked" value={blockedPackets} icon={ShieldAlert} color="bg-rose-500" border={themeStyles.border} />
            <StatCard label="Network Load" value={`${networkLoad}%`} icon={Cpu} color="bg-orange-500" border={themeStyles.border} />
            <StatCard label="Active Policies" value={blockedIps.size} icon={Terminal} color={isRunning ? themeStyles.accentBg : 'bg-gray-500'} border={themeStyles.border} />
          </div>

          {/* Blocklist Manager */}
          <section className={`${themeStyles.surface} border ${themeStyles.border} rounded-2xl overflow-hidden shadow-xl`}>
            <div className={`p-4 border-b ${themeStyles.border} flex items-center justify-between`}>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-500" />
                <h2 className="text-xs uppercase font-mono tracking-widest text-gray-400">Blocklist Manager</h2>
              </div>
            </div>
            
            <div className="p-4">
              <form onSubmit={addIp} className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  value={newIp}
                  onChange={(e) => setNewIp(e.target.value)}
                  placeholder="Enter IP (e.g. 192.168.1.1)"
                  className={`${themeStyles.bg} border ${themeStyles.border} px-3 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors font-mono`}
                />
                <button 
                  type="submit"
                  className={`${themeStyles.accentBg.replace('bg-', 'bg-opacity-10 ')} ${themeStyles.accent} p-2 rounded-lg border ${themeStyles.accentBorder} hover:${themeStyles.accentBg} hover:text-[#0a0a0c] transition-all`}
                >
                  <Plus className="w-5 h-5" />
                </button>
              </form>

              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {Array.from(blockedIps).map((ip: string) => (
                    <motion.div 
                      key={ip}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className={`flex items-center justify-between p-3 ${themeStyles.bg} border ${themeStyles.border} rounded-xl hover:border-rose-500/30 transition-colors group`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                        <span className="text-sm font-mono text-gray-300">{ip}</span>
                      </div>
                      <button 
                        onClick={() => removeIp(ip)}
                        className="text-gray-600 hover:text-rose-500 p-1 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {blockedIps.size === 0 && (
                  <div className="py-8 text-center text-gray-600 text-xs italic font-mono">
                    No active block rules
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* System Info */}
          <div className={`${themeStyles.surface} border ${themeStyles.accentBorder} p-4 rounded-2xl flex items-center gap-4 ${themeStyles.accentShadow.replace('0.2', '0.05')}`}>
            <div className={`${themeStyles.accentBg.replace('bg-', 'bg-opacity-10 ')} p-3 rounded-full`}>
              <Wifi className={`w-6 h-6 ${themeStyles.accent}`} />
            </div>
            <div>
              <h3 className="text-white text-sm font-bold">Encrypted Tunnel</h3>
              <p className="text-[10px] text-gray-500 font-mono">TLS 1.3 | AES-256-GCM | AUTO-RECOVERY</p>
            </div>
          </div>
        </div>

        {/* Right Column: Traffic Logs */}
        <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2">
          
          <section className={`${themeStyles.surface} border ${themeStyles.border} rounded-2xl flex flex-col h-[400px] md:h-[700px] shadow-2xl relative overflow-hidden`}>
            
            {/* Terminal Header */}
            <div className={`p-4 border-b ${themeStyles.border} bg-black/20 flex items-center justify-between`}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500/30" />
                  <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.accentBg.replace('bg-', 'bg-opacity-30 ')}`} />
                </div>
                <div className={`h-4 w-px ${themeStyles.border} mx-2`} />
                <h2 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 flex items-center gap-2">
                  <Zap className={`w-3 h-3 ${themeStyles.accent}`} />
                  Live Traffic Feed
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className={`${themeStyles.accentBg.replace('bg-', 'bg-opacity-10 ')} border ${themeStyles.accentBorder.replace('0.2', '0.5')} px-2 py-0.5 rounded text-[9px] font-mono ${themeStyles.accent} uppercase tracking-tighter`}>
                  Real-time
                </div>
              </div>
            </div>

            {/* Log Area */}
            <div className={`flex-1 overflow-y-auto p-2 custom-scrollbar ${themeStyles.bg}`}>
              {!isRunning && logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                  <Activity className={`w-12 h-12 mb-4 ${themeStyles.accent} opacity-20`} />
                  <p className="font-mono text-sm uppercase tracking-widest text-white/60">Awaiting System Engagement...</p>
                  <p className="text-[10px] mt-2 text-gray-600">Activate the firewall to begin vulnerability monitoring.</p>
                </div>
              ) : (
                <div className="space-y-1 font-mono text-[11px]">
                  <AnimatePresence mode="popLayout">
                    {logs.map((log) => (
                      <motion.div 
                        key={log.id}
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`group grid grid-cols-12 gap-2 p-2 rounded-lg border transition-all ${
                          log.status === 'blocked' 
                            ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                            : `bg-transparent border-transparent text-gray-500 hover:${themeStyles.surface} hover:${themeStyles.border}`
                        }`}
                      >
                        <div className="col-span-2 opacity-50">[{log.timestamp}]</div>
                        <div className="col-span-1 font-bold text-center">
                          <span className={`${log.protocol === 'TCP' ? 'text-blue-400' : log.protocol === 'UDP' ? 'text-orange-400' : 'text-purple-400'}`}>
                            {log.protocol}
                          </span>
                        </div>
                        <div className="col-span-3 truncate text-gray-400">{log.source}</div>
                        <div className="col-span-1 text-center opacity-50">→</div>
                        <div className="col-span-3 truncate text-gray-400 font-bold">{log.destination}:{log.port}</div>
                        <div className="col-span-2 text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            log.status === 'blocked' ? 'bg-rose-500 text-[#0a0a0c]' : `${themeStyles.accent} border ${themeStyles.accentBorder}`
                          }`}>
                            {log.status}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Visualizer Footer Overlay */}
            <div className={`absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-${themeStyles.bg.replace('bg-', '')} to-transparent`} />
          </section>

          {/* Footer Metrics */}
          <div className={`${themeStyles.surface} border ${themeStyles.border} p-6 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8`}>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">IP Reputation</span>
              <div className={`h-1.5 w-full ${themeStyles.bg} rounded-full overflow-hidden`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isRunning ? '94%' : '0%' }}
                  className={`h-full ${themeStyles.accentBg}`} 
                />
              </div>
              <span className={`text-right text-[10px] font-mono ${themeStyles.accent}`}>94.2% TRUSTED</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">Malware Filter</span>
              <div className={`h-1.5 w-full ${themeStyles.bg} rounded-full overflow-hidden`}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isRunning ? '100%' : '0%' }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
              <span className="text-right text-[10px] font-mono text-blue-500">100.0% ACTIVE</span>
            </div>
            <div className="flex flex-col gap-2 border-l border-white/5 pl-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600 font-bold">Operation Mode</span>
              <div className="flex items-center gap-3">
                 <Skull className={`w-4 h-4 ${isRunning ? 'text-rose-500' : 'text-gray-600'}`} />
                 <span className={`text-xs font-mono font-bold ${isRunning ? 'text-white' : 'text-gray-600'}`}>
                    {isRunning ? 'HUNT_MODE_ACTIVE' : 'PASSIVE_MONITOR'}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1d1e22;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2d2e32;
        }
      `}</style>
    </div>
  );
}
