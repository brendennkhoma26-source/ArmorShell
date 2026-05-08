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
  RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---

interface Packet {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  port: number;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  size: number;
  status: 'allowed' | 'blocked';
  type?: 'threat' | 'normal';
}

// --- Utils ---

const generateIp = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const PROTOCOLS: ('TCP' | 'UDP' | 'ICMP')[] = ['TCP', 'UDP', 'ICMP'];

// --- Components ---

const StatCard = ({ label, value, icon: Icon, color }: { label: string, value: string | number, icon: any, color: string }) => (
  <div className="bg-[#151619] border border-[#2d2e32] p-4 rounded-xl flex items-center gap-4">
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
  const [blockedIps, setBlockedIps] = useState<Set<string>>(new Set(['192.168.1.100', '10.0.0.5']));
  const [logs, setLogs] = useState<Packet[]>([]);
  const [newIp, setNewIp] = useState('');
  const [networkLoad, setNetworkLoad] = useState(0);
  
  const logEndRef = useRef<HTMLDivElement>(null);

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

      setLogs(prev => [newPacket, ...prev].slice(0, 50));
      setNetworkLoad(Math.floor(Math.random() * 100));
    }, 800);

    return () => clearInterval(interval);
  }, [isRunning, blockedIps]);

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

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-300 font-sans selection:bg-emerald-500/30">
      {/* Top Banner / Header */}
      <header className="border-b border-[#1d1e22] bg-[#0d0e11] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 p-2 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <Shield className="w-6 h-6 text-[#0a0a0c]" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight">ArmorShell<span className="text-emerald-500">Firewall</span></h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
              <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-gray-500">
                System Status: {isRunning ? 'Active' : 'Offline'}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setLogs([])}
            className="p-2 hover:bg-[#1d1e22] rounded-lg transition-colors text-gray-500 hover:text-white"
            title="Clear Logs"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
          <button 
            onClick={toggleFirewall}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-xs uppercase tracking-widest transition-all duration-300 ${
              isRunning 
                ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20 hover:bg-rose-500/20' 
                : 'bg-emerald-500 text-[#0a0a0c] font-bold hover:bg-emerald-400'
            }`}
          >
            {isRunning ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
            {isRunning ? 'Deactivate' : 'Activate Protection'}
          </button>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Controls and Stats */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <StatCard label="Total Traffic" value={totalPackets} icon={Activity} color="bg-blue-500" />
            <StatCard label="Threats Blocked" value={blockedPackets} icon={ShieldAlert} color="bg-rose-500" />
            <StatCard label="Network Load" value={`${networkLoad}%`} icon={Cpu} color="bg-orange-500" />
            <StatCard label="Active Policies" value={blockedIps.size} icon={Terminal} color="bg-emerald-500" />
          </div>

          {/* Blocklist Manager */}
          <section className="bg-[#0d0e11] border border-[#1d1e22] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-[#1d1e22] flex items-center justify-between">
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
                  className="bg-[#151619] border border-[#2d2e32] px-3 py-2 rounded-lg text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors font-mono"
                />
                <button 
                  type="submit"
                  className="bg-emerald-500/10 text-emerald-400 p-2 rounded-lg border border-emerald-500/20 hover:bg-emerald-500 hover:text-[#0a0a0c] transition-all"
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
                      className="flex items-center justify-between p-3 bg-[#151619] border border-[#2d2e32] rounded-xl hover:border-rose-500/30 transition-colors group"
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
          <div className="bg-[#0d0e11] border border-emerald-500/20 p-4 rounded-2xl flex items-center gap-4 shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <div className="p-3 bg-emerald-500/10 rounded-full">
              <Wifi className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-white text-sm font-bold">Encrypted Tunnel</h3>
              <p className="text-[10px] text-gray-500 font-mono">TLS 1.3 | AES-256-GCM | AUTO-RECOVERY</p>
            </div>
          </div>
        </div>

        {/* Right Column: Traffic Logs */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          <section className="bg-[#0d0e11] border border-[#1d1e22] rounded-2xl flex flex-col h-[700px] shadow-2xl relative overflow-hidden">
            
            {/* Terminal Header */}
            <div className="p-4 border-b border-[#1d1e22] bg-[#111216] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-orange-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30" />
                </div>
                <div className="h-4 w-px bg-[#2d2e32] mx-2" />
                <h2 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 flex items-center gap-2">
                  <Zap className="w-3 h-3 text-emerald-500" />
                  Live Traffic Feed
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-900/50 text-[9px] font-mono text-emerald-500 uppercase tracking-tighter">
                  Real-time
                </div>
              </div>
            </div>

            {/* Log Area */}
            <div className="flex-1 overflow-y-auto p-2 custom-scrollbar bg-[#0d0e11]">
              {!isRunning && logs.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                  <Activity className="w-12 h-12 mb-4 text-emerald-500 opacity-20" />
                  <p className="font-mono text-sm uppercase tracking-widest">Awaiting System Engagement...</p>
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
                            : 'bg-transparent border-transparent text-gray-500 hover:bg-[#151619] hover:border-[#2d2e32]'
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
                            log.status === 'blocked' ? 'bg-rose-500 text-[#0a0a0c]' : 'text-emerald-500 border border-emerald-500/20'
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
            <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-t from-[#0a0a0c] to-transparent" />
          </section>

          {/* Footer Metrics */}
          <div className="bg-[#151619] border border-[#2d2e32] p-6 rounded-2xl grid grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">IP Reputation</span>
              <div className="h-1.5 w-full bg-[#2d2e32] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isRunning ? '94%' : '0%' }}
                  className="h-full bg-emerald-500" 
                />
              </div>
              <span className="text-right text-[10px] font-mono text-emerald-500">94.2% TRUSTED</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">Malware Filter</span>
              <div className="h-1.5 w-full bg-[#2d2e32] rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: isRunning ? '100%' : '0%' }}
                  className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" 
                />
              </div>
              <span className="text-right text-[10px] font-mono text-blue-500">100.0% ACTIVE</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">Sync Latency</span>
              <div className="flex items-end justify-between">
                <div className="flex gap-0.5">
                  {[4, 7, 5, 8, 12, 10, 15, 8, 12, 6, 9].map((h, i) => (
                    <motion.div 
                      key={i}
                      animate={{ height: isRunning ? h : 2 }}
                      className="w-1 bg-[#2d2e32] rounded-t-sm"
                    />
                  ))}
                </div>
                <span className="text-[10px] font-mono text-gray-500">{isRunning ? '12ms' : '-'}</span>
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
