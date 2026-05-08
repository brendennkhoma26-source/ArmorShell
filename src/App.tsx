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
  AlertTriangle,
  Zap,
  RefreshCcw,
  RefreshCw,
  Trash2,
  Crosshair,
  Skull,
  Target,
  Settings,
  Download,
  Upload,
  Save,
  CheckCircle2,
  Fingerprint,
  Radio,
  Eye,
  EyeOff,
  Database,
  Key,
  HelpCircle,
  Info,
  Network,
  Bell,
  ZapOff,
  AlertOctagon,
  ChevronRight,
  TrendingUp,
  Map,
  MapPin,
  Navigation
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Packet, AppConfig, Language, AuthStep } from './types';
import { defaultConfig } from './config';
import { translations } from './translations';

// --- Utils ---

const generateIp = () => {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
};

const PROTOCOLS: ('TCP' | 'UDP' | 'ICMP')[] = ['TCP', 'UDP', 'ICMP'];

const LOCATIONS = ['Moscow, RU', 'Beijing, CN', 'Nairobi, KE', 'Frankfurt, DE', 'Silicon Valley, US', 'Seoul, KR', 'Sao Paulo, BR', 'London, UK'];
const SIGNATURES = ['SQL_INJECTION', 'XSS_VECTOR', 'BUFFER_OVERFLOW', 'RCE_EXPLOIT', 'MALWARE_C2_CALLBACK', 'DNS_TUNNELING', 'LOG4J_VULN'];
const FLAGS = ['SYN', 'ACK', 'FIN', 'PUH', 'RST'];

const Radar = ({ intensity }: { intensity: number }) => {
  const [targets, setTargets] = useState<{ id: number, x: number, y: number }[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const id = Math.random();
        setTargets(prev => [...prev, { 
          id, 
          x: 20 + Math.random() * 60, 
          y: 20 + Math.random() * 60 
        }].slice(-4));
        
        setTimeout(() => {
          setTargets(prev => prev.filter(t => t.id !== id));
        }, 2500);
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-square bg-black/40 rounded-full border border-emerald-500/10 overflow-hidden shadow-inner">
      {/* Sweep */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-emerald-500/5 to-transparent origin-center rounded-full z-10"
        style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}
      />
      
      {/* Grid Lines */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-[1px] h-full bg-emerald-500/30 absolute left-1/2" />
        <div className="h-[1px] w-full bg-emerald-500/30 absolute top-1/2" />
        {[20, 40, 60, 80].map(radius => (
          <div key={radius} className="border border-emerald-500/20 rounded-full absolute" style={{ width: `${radius}%`, height: `${radius}%` }} />
        ))}
      </div>

      {/* Targets */}
      <AnimatePresence>
        {targets.map(target => (
          <motion.div
            key={target.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 1], 
              opacity: [0, 1, 0.8, 0],
              filter: ['brightness(1)', 'brightness(2)', 'brightness(1)']
            }}
            exit={{ opacity: 0, scale: 2 }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="absolute w-2 h-2 z-20"
            style={{ left: `${target.x}%`, top: `${target.y}%` }}
          >
            <div className="absolute inset-0 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.9)]" />
            <motion.div 
              animate={{ scale: [1, 2], opacity: [0.5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="absolute -inset-1 border border-rose-500 rounded-full"
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Center Point */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] z-30" />
      
      <div className="absolute inset-x-0 bottom-6 text-center z-40">
        <motion.span 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[7px] font-mono text-emerald-500 font-bold uppercase tracking-[0.4em]"
        >
          // Tactical_Sweep //
        </motion.span>
      </div>
    </div>
  );
};

const ThreatMap = () => {
  const [activePoints, setActivePoints] = useState<{ id: string; x: number; y: number; info: string }[]>([]);

  useEffect(() => {
    const generatePoint = () => {
      const id = Math.random().toString(36).substr(2, 9);
      const cities = ['Moscow', 'Beijing', 'London', 'Berlin', 'Tokyo', 'Sydney', 'New York', 'São Paulo'];
      const city = cities[Math.floor(Math.random() * cities.length)];
      
      setActivePoints(prev => [
        ...prev, 
        { 
          id, 
          x: 10 + Math.random() * 80, 
          y: 20 + Math.random() * 60,
          info: city
        }
      ].slice(-3));

      setTimeout(() => {
        setActivePoints(prev => prev.filter(p => p.id !== id));
      }, 6000);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.7) generatePoint();
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full aspect-video bg-black/60 rounded-2xl border border-white/5 overflow-hidden group shadow-2xl">
      {/* World Map Backdrop (Stylized) */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-center bg-no-repeat bg-contain" />
      
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <AnimatePresence>
        {activePoints.map(point => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 2 }}
            className="absolute z-20"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <div className="relative">
               <MapPin className="w-4 h-4 text-rose-500" />
               <motion.div 
                 animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                 transition={{ duration: 2, repeat: Infinity }}
                 className="absolute inset-0 bg-rose-500 rounded-full blur-sm"
               />
               <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 bg-black/80 border border-rose-500/30 rounded text-[7px] font-mono whitespace-nowrap text-rose-400 font-bold uppercase tracking-widest">
                 {point.info}_ACCESS_BLK
               </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute bottom-4 left-4 z-30">
        <div className="flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10">
          <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          <span className="text-[8px] font-mono text-gray-400 uppercase tracking-widest font-black font-mono">Threat_Origins_Active</span>
        </div>
      </div>
    </div>
  );
};

const TacticalGlitch = () => {
  const [numbers, setNumbers] = useState<string[]>([]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newNums = [...Array(10)].map(() => Math.floor(Math.random() * 1000000).toString(16).toUpperCase());
      setNumbers(newNums);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[500] pointer-events-none overflow-hidden bg-black/60 backdrop-blur-md flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0)_50%,rgba(0,0,0,0.5)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
      
      <div className="relative flex flex-col items-center gap-12 max-w-lg w-full">
        {/* Rapid Numbers Columns */}
        <div className="absolute inset-0 flex justify-between opacity-10 blur-[1px]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex flex-col gap-2 font-mono text-[8px] text-emerald-500">
              {numbers.map((n, idx) => <span key={idx}>{n}</span>)}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center z-10">
          <motion.div 
            animate={{ 
                scale: [1, 1.05, 1],
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
            }}
            transition={{ duration: 0.1, repeat: Infinity }}
            className="text-emerald-500 font-mono text-6xl font-black italic tracking-tighter"
          >
            SYS_ENGAGED
          </motion.div>
          <div className="flex items-center gap-2 mt-4">
             <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, ease: "linear" }}
                 className="h-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
               />
             </div>
             <motion.span 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="text-[10px] font-mono text-emerald-500 font-bold"
             >
               100.0%
             </motion.span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-x-12 gap-y-4 z-10">
           {[
             { label: 'VECTOR_ALRT', val: 'ALPHA_RED' },
             { label: 'NODES_ACTR', val: 'TRUE' },
             { label: 'CRYPT_SYNC', val: 'ESTABLISHED' },
             { label: 'G_FORCE_RT', val: '9.81 M/S' }
           ].map((item, i) => (
             <div key={i} className="flex flex-col border-l-2 border-emerald-500/30 pl-3">
               <span className="text-[8px] font-mono text-gray-500 font-black">{item.label}</span>
               <span className="text-[10px] font-mono text-white font-bold">{item.val}</span>
             </div>
           ))}
        </div>
      </div>
    </motion.div>
  );
};

// --- Components ---

const StatCard = ({ label, value, icon: Icon, color, border, subValue }: { label: string, value: string | number, icon: any, color: string, border: string, subValue?: string }) => (
  <div className={`bg-black/20 border ${border} p-4 rounded-xl flex items-center gap-4 group hover:bg-black/30 transition-all`}>
    <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
      <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div className="flex-1">
      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">{label}</p>
      <p className="text-xl font-bold text-white font-mono">{value}</p>
      {subValue && <p className="text-[9px] text-gray-600 font-mono mt-0.5">{subValue}</p>}
    </div>
  </div>
);

export default function App() {
  const [showBoot, setShowBoot] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authStep, setAuthStep] = useState<AuthStep>('fingerprint');
  const [retinaScanning, setRetinaScanning] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const [isHackerMode, setIsHackerMode] = useState(false);
  const [shieldClickCount, setShieldClickCount] = useState(0);
  const shieldClickTimerRef = useRef<any>(null);
  const [hackerCommand, setHackerCommand] = useState('');
  const [hackerLogs, setHackerLogs] = useState<string[]>(['INITIALIZING VIGIL_OS...', 'CORE_LOAD: OK', 'READY FOR COMMANDS']);
  const [config, setConfig] = useState<AppConfig>(() => {
    const saved = localStorage.getItem('obsidianvigil_config');
    const parsed = saved ? JSON.parse(saved) : {};
    return { ...defaultConfig, ...parsed };
  });
  
  const [blockedIps, setBlockedIps] = useState<Set<string>>(new Set(config.defaultBlockedIps));
  const [logs, setLogs] = useState<Packet[]>([]);
  const [newIp, setNewIp] = useState('');
  const [networkLoad, setNetworkLoad] = useState(0);
  const [threatIntensity, setThreatIntensity] = useState(0);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isManualOpen, setIsManualOpen] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [alerts, setAlerts] = useState<{ id: string; msg: string; type: 'warning' | 'info' | 'critical' }[]>([]);
  const [activeTab, setActiveTab] = useState<'traffic' | 'intel' | 'topology' | 'system'>('traffic');
  const [interceptEvent, setInterceptEvent] = useState<{ url: string; threat: string; id: string } | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatePhase, setUpdatePhase] = useState<'backup' | 'patch' | 'complete'>('backup');
  const [lastBackup, setLastBackup] = useState<string>(new Date().toLocaleTimeString());
  const [shieldPressTimer, setShieldPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [showSecretKeypad, setShowSecretKeypad] = useState(false);
  const [secretPin, setSecretPin] = useState('');

  const [kernelLogs, setKernelLogs] = useState<{ time: string; msg: string; level: 'info' | 'warn' | 'crit' }[]>([]);
  const [cpuCores, setCpuCores] = useState<number[]>([12, 45, 23, 67]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuCores(prev => prev.map(c => Math.max(5, Math.min(95, c + (Math.random() * 20 - 10)))));
      
      const systems = ['NETWORK', 'KERNEL', 'IO_BUFFER', 'CRYPT_CORE', 'PERIPHERAL'];
      const actions = ['Initialized', 'Handshake_Complete', 'Secure_Link_Established', 'Data_Packet_Analyzed', 'Interception_Successful'];
      
      const newLog = {
        time: new Date().toLocaleTimeString(),
        msg: `${systems[Math.floor(Math.random() * systems.length)]} // ${actions[Math.floor(Math.random() * actions.length)]}`,
        level: Math.random() > 0.8 ? 'warn' : 'info'
      } as const;
      
      setKernelLogs(prev => [newLog, ...prev].slice(0, 50));
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  
  const addAlert = (msg: string, type: 'warning' | 'info' | 'critical' = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setAlerts(prev => [{ id, msg, type }, ...prev].slice(0, 5));
    setTimeout(() => {
      setAlerts(prev => prev.filter(a => a.id !== id));
    }, 5000);
  };
  
  const t = translations[config.language || 'en'] || translations.en;
  
  useEffect(() => {
    const timer = setTimeout(() => setShowBoot(false), 6000); // 6 seconds for full boot sequence
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      const lucky = Math.random();
      if (lucky > 0.95) {
        addAlert(`CRITICAL: Unauthorized entry attempt from ${generateIp()}`, 'critical');
        setThreatIntensity(1);
        setTimeout(() => setThreatIntensity(0), 4000);
      } else if (lucky > 0.85) {
        addAlert(`WARINING: Unusual traffic spike detected in region ${['NA','EU','ASIA'][Math.floor(Math.random()*3)]}`, 'warning');
        setThreatIntensity(0.5);
        setTimeout(() => setThreatIntensity(0), 2000);
      }

      // Simulation of Automatic Blocker intercepting a dangerous site attempt
      if (lucky > 0.92) {
        const dangerousSites = ['dark-meta-exploit.xyz', 'credential-stealer.net', 'malware-hub.ru', 'phishing-login.com'];
        const threats = ['DRIVE_BY_DOWNLOAD', 'PHISHING_ATTEMPT', 'XSS_EXPLOIT', 'MALICIOUS_REDIRECT'];
        const site = dangerousSites[Math.floor(Math.random() * dangerousSites.length)];
        const threat = threats[Math.floor(Math.random() * threats.length)];
        
        setInterceptEvent({ url: site, threat, id: Math.random().toString(36).substr(2, 9) });
        addAlert(`AUTO-BLOCKER: Intercepted malicious request to ${site}`, 'critical');
        
        setTimeout(() => setInterceptEvent(null), 5000);
      }

      // Simulation of Auto-Backup and Update
      if (lucky > 0.95 && !isUpdating) {
        setIsUpdating(true);
        setUpdatePhase('backup');
        addAlert(`MAINTENANCE: ${t.backupSystem} started`, 'info');
        
        setTimeout(() => {
          setUpdatePhase('patch');
          addAlert(`MAINTENANCE: ${t.applyingPatches}`, 'warning');
          
          setTimeout(() => {
            setUpdatePhase('complete');
            setLastBackup(new Date().toLocaleTimeString());
            addAlert(`MAINTENANCE: ${t.systemUpToDate}`, 'info');
            
            setTimeout(() => {
              setIsUpdating(false);
            }, 3000);
          }, 4000);
        }, 4000);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Retina Scan Camera Logic
  useEffect(() => {
    if (!isAuthorized && authStep === 'retina') {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
              facingMode: 'user',
              width: { ideal: 640 },
              height: { ideal: 480 }
            } 
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Camera access denied:", err);
          // Fallback if camera fails
          setTimeout(() => setRetinaScanning(true), 1000);
          setTimeout(() => setIsAuthorized(true), 3000);
        }
      };
      startCamera();

      return () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject as MediaStream;
          stream.getTracks().forEach(track => track.stop());
        }
      };
    }
  }, [isAuthorized, authStep]);

  useEffect(() => {
    if (authStep === 'retina' && !isAuthorized) {
      const timer = setTimeout(() => {
        setRetinaScanning(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [authStep, isAuthorized]);

  // Save config to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('obsidianvigil_config', JSON.stringify(config));
  }, [config]);

  // Stats
  const totalPackets = logs.length;
  const blockedPackets = logs.filter(l => l.status === 'blocked').length;
  const integrity = Math.max(0, 100 - (logs.filter(l => l.type === 'threat' && l.status === 'allowed').length * 5));

  // Simulation Logic
  useEffect(() => {
    if (!isRunning) {
      setNetworkLoad(0);
      setThreatIntensity(0);
      return;
    }

    const interval = setInterval(() => {
      const isAttack = Math.random() < 0.25;
      const isHighVolume = Math.random() < 0.1;
      
      const newPackets: Packet[] = [];
      const batchSize = isHighVolume ? Math.floor(Math.random() * 8) + 5 : isAttack ? 3 : 1;

      for (let i = 0; i < batchSize; i++) {
        const isThreat = isAttack || Math.random() < 0.15;
        const blockedArray = Array.from(blockedIps);
        
        let src: string;
        if (isThreat && blockedArray.length > 0 && Math.random() < 0.6) {
          src = (blockedArray[Math.floor(Math.random() * blockedArray.length)] as string);
        } else {
          src = generateIp();
        }

        let isBlocked = blockedIps.has(src);
        
        const complexity = isHighVolume ? 10 : isAttack ? (Math.floor(Math.random() * 4) + 6) : 1;
        const signature = isThreat ? SIGNATURES[Math.floor(Math.random() * SIGNATURES.length)] : undefined;
        const flags = [FLAGS[Math.floor(Math.random() * FLAGS.length)]];

        // 100% Accuracy simulation: If it's a threat and autoMitigate is on, we block it
        if (!isBlocked && config.autoMitigate && isThreat) {
          isBlocked = true;
          // In a real system we might not add it to permanent blocklist immediately
          // but for simulation we do
          setBlockedIps(prev => new Set([...prev, src]));
        }

        newPackets.push({
          id: Math.random().toString(36).substring(7),
          timestamp: new Date().toLocaleTimeString(),
          source: src,
          destination: '127.0.0.1',
          location: isThreat ? LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)] : undefined,
          port: Math.floor(Math.random() * 65535),
          protocol: PROTOCOLS[Math.floor(Math.random() * PROTOCOLS.length)],
          size: isHighVolume ? Math.floor(Math.random() * 50000) : Math.floor(Math.random() * 2500),
          status: isBlocked ? 'blocked' : 'allowed',
          type: isThreat ? 'threat' : 'normal',
          complexity,
          signature,
          flags
        });
      }

      setLogs(prev => [...newPackets, ...prev].slice(0, config.logRetention));
      setNetworkLoad(Math.min(100, Math.floor(Math.random() * 20) + (isHighVolume ? 70 : isAttack ? 40 : 10)));
      setThreatIntensity(Math.min(100, (logs.filter(l => l.status === 'blocked').length * 2)));
    }, config.refreshRate);

    return () => clearInterval(interval);
  }, [isRunning, blockedIps, config.logRetention, config.refreshRate, config.autoMitigate, logs.length]);

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
    if (!isRunning) {
      setIsActivating(true);
      setTimeout(() => {
        setIsRunning(true);
        setIsActivating(false);
      }, 1500); // Tactical Delay
    } else {
      setIsRunning(false);
    }
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
    link.download = 'obsidianvigil_config.json';
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

  const handleAuthFinalize = (e: React.FormEvent) => {
    e.preventDefault();
    // Tactical Key: 'alpha_vigil_2026'
    const authorizedKeys = ['admin', 'alpha_vigil_2026', 'alpha_operator'];
    if (authorizedKeys.includes(password.toLowerCase())) {
      setAuthError(false);
      setIsAuthorized(true);
    } else {
      setAuthError(true);
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const handleShieldPressStart = () => {
    const timer = setTimeout(() => {
      setShowSecretKeypad(true);
      setShieldPressTimer(null);
    }, 3000);
    setShieldPressTimer(timer);
  };

  const handleShieldPressEnd = () => {
    if (shieldPressTimer) {
      clearTimeout(shieldPressTimer);
      setShieldPressTimer(null);
    }
  };

  const handleSecretPinSubmit = (val: string) => {
    if (val === '0726') {
      setIsHackerMode(true);
      setShowSecretKeypad(false);
      setSecretPin('');
    } else {
      setSecretPin('');
      // Optional: add a fake error
    }
  };

  const handleShieldClick = () => {
    // No longer used for mode entry, but could be used for subtle feedback
  };

  const handleHackerCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = hackerCommand.toUpperCase().trim();
    if (!cmd) return;

    setHackerLogs(prev => [`> ${cmd}`, ...prev]);
    setHackerCommand('');

    setTimeout(() => {
      let response = '';
      switch (cmd) {
        case 'HELP':
          response = 'PROTOCOLS: PURGE, OVERRIDE, DECRYPT, STEALTH_ON, STEALTH_OFF, DEMO, EXIT';
          break;
        case 'PURGE':
          setLogs([]);
          response = 'LOG_BUFFER PURGED SUCCESSFULLY';
          break;
        case 'OVERRIDE':
          setIsRunning(true);
          response = 'SYSTEM_PROTECTION OVERRIDE: ACTIVE';
          break;
        case 'DEMO':
          response = 'INITIATING TACTICAL SHOWCASE SEQUENCE...';
          // Sequence: Reboot -> Auth -> Go Live -> Keypad
          setTimeout(() => {
            setShowBoot(true);
            setTimeout(() => setShowBoot(false), 4000);
          }, 1000);
          
          setTimeout(() => {
            setHackerLogs(prev => ['> BYPASSING BIOMETRIC_LOCK... GRANTED', ...prev]);
            setIsAuthorized(true);
          }, 4500);

          setTimeout(() => {
            setHackerLogs(prev => ['> TRIGGERING VIGIL_CORE_ENGAGEMENT...', ...prev]);
            toggleFirewall();
          }, 6000);

          setTimeout(() => {
            setHackerLogs(prev => ['> OPENING RESTRICTED_NODE_ACCESS...', ...prev]);
            setShowSecretKeypad(true);
          }, 9500);

          setTimeout(() => {
            setShowSecretKeypad(false);
            setHackerLogs(prev => ['> SHOWCASE_COMPLETE. SYSTEM_OPTIMIZED.', ...prev]);
          }, 13000);
          break;
        case 'STEALTH_ON':
          setConfig(prev => ({ ...prev, stealthMode: true }));
          response = 'MIL-SPEC STEALTH: ENABLED';
          break;
        case 'STEALTH_OFF':
          setConfig(prev => ({ ...prev, stealthMode: false }));
          response = 'MIL-SPEC STEALTH: DISABLED';
          break;
        case 'REBOOT':
          setShowBoot(true);
          setIsAuthorized(false);
          setAuthStep('fingerprint');
          response = 'SYSTEM REBOOT INITIATED... WELCOME BACK, ALPHA_LEAD';
          setTimeout(() => setShowBoot(false), 6000);
          break;
        case 'EXIT':
          setIsHackerMode(false);
          return;
        default:
          response = `COMMAND NOT RECOGNIZED: ${cmd}`;
      }
      setHackerLogs(prev => [response, ...prev]);
    }, 400);
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
    <div className={`min-h-screen ${themeStyles.bg} text-gray-300 font-sans selection:bg-emerald-500/30 transition-colors duration-500 overflow-x-hidden`}
      onKeyDown={(e) => {
        if (e.ctrlKey && e.key === '`') {
          setIsHackerMode(true);
        }
      }}
    >
      <motion.div
        animate={threatIntensity > 0.8 ? {
          x: [0, -2, 2, -2, 2, 0],
          y: [0, 1, -1, 1, -1, 0],
          filter: ['brightness(1) contrast(1)', 'brightness(1.5) contrast(1.2) hue-rotate(10deg)', 'brightness(1) contrast(1)']
        } : {}}
        transition={{ duration: 0.2, repeat: threatIntensity > 0.8 ? Infinity : 0 }}
        className="min-h-screen flex flex-col relative"
      >
        {/* Threat Level Overlay */}
        <AnimatePresence>
          {isActivating && <TacticalGlitch />}
          {threatIntensity > 0.5 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-rose-500 z-[100] pointer-events-none mix-blend-overlay"
            />
          )}
        </AnimatePresence>
      
      {/* Tactical Boot Sequence (Samsung inspired) */}
      <AnimatePresence>
        {showBoot && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="relative mb-24 h-64 w-64 flex items-center justify-center">
              <div className="absolute inset-0 bg-emerald-500 blur-[150px] opacity-10" />
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                  className="absolute border border-emerald-500/10 rounded-full"
                  style={{ width: `${100 + i * 40}%`, height: `${100 + i * 40}%` }}
                />
              ))}
              <motion.div 
                animate={{ y: ["-200%", "200%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-[-100%] h-[2px] bg-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,1)] z-10"
              />
            </div>

            <div className="absolute bottom-12 left-12 font-mono text-[9px] text-emerald-500/40 space-y-1">
               <p>{'>'} STAGE_1: KERNEL_INIT... DONE</p>
               <p>{'>'} STAGE_2: TACTICAL_DRIVERS... OK</p>
               <p>{'>'} STAGE_3: NEURAL_LINK_SYNC... ACTIVE</p>
               <p>{'>'} STAGE_4: VIGIL_CORE_BOOT... 100%</p>
            </div>

            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative flex flex-col items-center pt-24">
                <div className="relative mb-6">
                  <Shield className="w-16 h-16 text-white" />
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border-t-2 border-emerald-500 rounded-full"
                  />
                </div>
                
                <div className="flex flex-col items-center gap-1">
                  <motion.h1 
                    initial={{ letterSpacing: "2em", opacity: 0 }}
                    animate={{ letterSpacing: "0.8em", opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="text-2xl font-mono font-bold text-white ml-[0.8em]"
                  >
                    OBSIDIAN
                  </motion.h1>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 }}
                    className="text-[10px] font-mono text-emerald-500 tracking-[1em] font-black uppercase"
                  >
                    Vigilance System
                  </motion.span>
                </div>

                <div className="w-64 h-[2px] bg-white/5 mt-12 relative overflow-hidden rounded-full">
                  <motion.div 
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "easeInOut" }}
                    className="absolute h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Tactical System Checks */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full max-w-sm px-8">
               <div className="space-y-2">
                 {[
                   { label: "KERNEL_CORE", color: "text-emerald-500" },
                   { label: "BIO_HANDSHAKE", color: "text-blue-500" },
                   { label: "CRYPT_WRAPPERS", color: "text-amber-500" },
                   { label: "DPI_SENSORS", color: "text-emerald-500" }
                 ].map((check, i) => (
                   <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + (i * 0.4) }}
                    className="flex items-center justify-between font-mono text-[9px] uppercase tracking-widest"
                   >
                     <span className="text-gray-500">{check.label}</span>
                     <span className={`${check.color} font-bold`}>[ OK ]</span>
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-12 text-center space-y-2">
               <div className="flex items-center justify-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-mono text-gray-400 tracking-widest font-bold">TACTICAL_OS v2.0</span>
               </div>
               <p className="text-[8px] text-gray-600 font-mono tracking-widest uppercase">Proprietary Software // User Auth Required</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alert Toasts */}
      <div className="fixed bottom-24 left-6 z-[150] space-y-2 pointer-events-none">
        <AnimatePresence>
          {alerts.map(alert => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`p-4 rounded-xl border flex items-center gap-4 shadow-2xl backdrop-blur-xl ${
                alert.type === 'critical' ? 'bg-rose-500/20 border-rose-500/50' :
                alert.type === 'warning' ? 'bg-amber-500/20 border-amber-500/50' : 'bg-blue-500/20 border-blue-500/50'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                alert.type === 'critical' ? 'bg-rose-500' :
                alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
              }`}>
                {alert.type === 'critical' ? <AlertOctagon className="w-5 h-5 text-white" /> : 
                 alert.type === 'warning' ? <AlertTriangle className="w-5 h-5 text-black" /> : 
                 <Bell className="w-5 h-5 text-white" />}
              </div>
              <div>
                <p className="text-[10px] font-mono font-black text-white/50 uppercase tracking-widest">{alert.type}</p>
                <p className="text-sm font-mono text-white font-bold">{alert.msg}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Biometric Authorization Overlay */}
      <AnimatePresence>
        {!showBoot && !isAuthorized && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="fixed inset-0 z-[100] bg-[#0a0a0c] flex items-center justify-center p-4"
          >
            <div className="max-w-md w-full space-y-8 flex flex-col items-center">
              {authStep === 'fingerprint' ? (
                <div className="relative group cursor-pointer" onClick={() => setAuthStep('retina')}>
                  <div className={`absolute -inset-4 bg-emerald-500/20 rounded-full blur-2xl group-hover:bg-emerald-500/40 transition-all duration-500 animate-pulse`} />
                  <div className={`relative w-32 h-32 rounded-full border-2 border-emerald-500/30 flex items-center justify-center bg-black/40 backdrop-blur-xl group-active:scale-95 transition-transform overflow-hidden`}>
                    <Fingerprint className="w-16 h-16 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
                    
                    {/* Scan Line */}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-0.5 bg-emerald-500 shadow-[0_0:15px_rgba(16,185,129,1)] z-10"
                    />
                  </div>
                </div>
              ) : authStep === 'retina' ? (
                <div className="relative group">
                  <div className={`absolute -inset-4 bg-blue-500/20 rounded-full blur-2xl transition-all duration-500 animate-pulse`} />
                  <div className={`relative w-48 h-48 rounded-full border-2 border-blue-500/30 flex items-center justify-center bg-black/40 backdrop-blur-xl overflow-hidden`}>
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted 
                      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale scale-x-[-1]"
                    />
                    
                    {/* Retina HUD Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-full h-full border-[20px] border-black/80 rounded-full" />
                      <div className="absolute inset-0 border border-blue-500/30 rounded-full m-8 animate-[ping_3s_linear_infinite]" />
                      <div className="absolute inset-0 border border-blue-500/20 rounded-full m-12 animate-[reverse-spin_10s_linear_infinite]">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-500" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-blue-500" />
                      </div>
                      <Eye className={`w-8 h-8 text-blue-500 ${retinaScanning ? 'scale-150 opacity-100' : 'opacity-20'} transition-all duration-1000`} />
                    </div>

                    {/* Scanning Beam */}
                    {retinaScanning && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, scale: [1, 1.2, 1] }}
                        className="absolute inset-0 bg-blue-500/10 pointer-events-none"
                      />
                    )}
                    <motion.div 
                      animate={{ top: ['0%', '100%', '0%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-x-0 h-1 bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,1)] z-10"
                    />
                  </div>
                  
                  {/* Click to confirm retina success and go to password */}
                  {retinaScanning && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={() => setAuthStep('password')}
                      className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-blue-500 text-black px-4 py-2 rounded font-mono text-[10px] font-bold tracking-widest hover:bg-blue-400 transition-colors"
                    >
                      CONFIRM IDENTITY
                    </motion.button>
                  )}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full space-y-6"
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-xl border border-rose-500/30 flex items-center justify-center bg-rose-500/5">
                      <Key className={`w-8 h-8 text-rose-500 ${authError ? 'animate-shake' : ''}`} />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-mono text-white font-bold tracking-widest">{t.authPassword}</h3>
                      <p className="text-[10px] text-gray-500 font-mono uppercase mt-1">{t.authPasswordSub}</p>
                    </div>
                  </div>

                  <form onSubmit={handleAuthFinalize} className="space-y-4">
                    <div className="relative">
                      <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="ENTER TACTICAL KEY"
                        className={`w-full bg-[#151619] border ${authError ? 'border-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.3)]' : 'border-white/10'} px-4 py-3 rounded-xl text-center font-mono text-white focus:outline-none focus:border-rose-500 transition-all selection:bg-rose-500/30`}
                        autoFocus
                      />
                      {authError && (
                        <p className="text-[10px] text-rose-500 font-mono text-center mt-2 font-bold select-none">ACCESS DENIED // INCORRECT KEY</p>
                      )}
                    </div>
                    <button 
                      type="submit"
                      className="w-full bg-white text-black py-4 rounded-xl font-mono font-bold tracking-[0.2em] hover:bg-gray-200 transition-all active:scale-[0.98]"
                    >
                      {t.authUnlock}
                    </button>
                  </form>
                </motion.div>
              )}
              
              <div className="text-center space-y-2">
                <h2 className="text-xl font-mono text-white tracking-[0.3em] font-bold">
                  {authStep === 'fingerprint' ? t.authTitle : t.authTitle}
                </h2>
                <p className="text-xs text-gray-400 font-mono tracking-widest uppercase">
                  {authStep === 'fingerprint' ? t.authPrimary : t.authSecondary}
                </p>
                {authStep === 'retina' && retinaScanning && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-blue-400 font-mono mt-4 font-bold"
                  >
                    {t.authIdentifying} {t.authMatchFound}
                  </motion.p>
                )}
              </div>

              <div className="flex gap-1">
                {[...Array(30)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ height: [4, Math.random() * 20 + 10, 4] }}
                    transition={{ duration: Math.random() * 0.5 + 0.5, repeat: Infinity }}
                    className="w-1 bg-emerald-500/20"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hacker Interbase Console */}
      <AnimatePresence>
        {isHackerMode && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-0 inset-x-0 z-[100] p-6 flex justify-center pointer-events-none"
          >
            <div className="max-w-4xl w-full bg-[#0a0a0c]/98 border-t-2 border-x-2 border-rose-500/40 rounded-t-3xl backdrop-blur-3xl shadow-[0_-20px_50px_rgba(244,63,94,0.15)] p-6 space-y-4 pointer-events-auto relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent opacity-50" />
              <div className="flex items-center justify-between border-b border-rose-500/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Terminal className="w-5 h-5 text-rose-500" />
                    <div className="absolute inset-0 bg-rose-500 blur-md opacity-30 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-sm font-mono text-white font-bold tracking-widest uppercase">{t.hackerTitle}</h3>
                    <p className="text-[10px] text-rose-500/80 font-mono tracking-widest uppercase">CLASSIFICATION: TOP_SECRET // OPERATOR: ALPHA_VIGIL</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsHackerMode(false)}
                  className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                   <div className="flex justify-between items-center px-1">
                     <h4 className="text-[9px] font-mono font-black text-gray-500 uppercase tracking-widest">{t.threatTracker}</h4>
                     <div className="flex items-center gap-1.5">
                       <Navigation className="w-2.5 h-2.5 text-rose-500 animate-pulse" />
                       <span className="text-[8px] font-mono text-rose-500 font-bold uppercase">{t.originTrace}</span>
                     </div>
                   </div>
                   <ThreatMap />
                   <div className="flex justify-between items-center pt-1 px-1">
                     <span className="text-[7px] font-mono text-gray-600 uppercase font-bold">{t.coordinates}</span>
                     <span className="text-[7px] font-mono text-rose-500/60 font-black">40.7128° N, 74.0060° W</span>
                   </div>
                </div>

                <div className="h-48 md:h-auto overflow-y-auto font-mono text-[11px] space-y-1.5 flex flex-col-reverse custom-scrollbar p-3 bg-black/60 rounded-xl border border-white/5 relative">
                   <div className="absolute top-2 right-2 flex items-center gap-2 opacity-50">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => <div key={i} className="w-1 h-2 bg-rose-500/30" />)}
                      </div>
                      <span className="text-[7px]">SIGNAL_STRENGTH</span>
                   </div>
                  {hackerLogs.map((log, i) => (
                    <div key={i} className={`${log.startsWith('>') ? 'text-amber-500/80 font-bold' : log.includes('WARNING') ? 'text-rose-500' : 'text-emerald-500/70'}`}>
                      <span className="opacity-30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleHackerCommand} className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 font-mono font-bold text-xs">{'>'}</div>
                <input 
                  type="text"
                  value={hackerCommand}
                  onChange={(e) => setHackerCommand(e.target.value)}
                  placeholder={t.hackerHint}
                  className="w-full bg-black border border-amber-500/30 rounded-xl py-3 pl-8 pr-4 text-xs font-mono text-amber-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/30 transition-all selection:bg-amber-500/30"
                  autoFocus
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Secret Keypad Modal */}
      <AnimatePresence mode="wait">
        {showSecretKeypad && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-black flex items-center justify-center p-4"
          >
            {/* Grid background for technical feel */}
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(244,63,94,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-xs w-full bg-[#151619] border-2 border-rose-500/30 rounded-[2rem] p-8 relative shadow-[0_0_50px_rgba(244,63,94,0.1)]"
            >
              <div className="absolute top-4 right-4">
                 <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                  <Lock className="w-8 h-8 text-rose-500" />
                </div>
                <h3 className="text-white font-mono font-black text-xl uppercase tracking-widest">
                  ACCESS_NODE
                </h3>
                <p className="text-[9px] font-mono text-rose-500 font-bold uppercase tracking-[0.3em] mt-2">
                  VERIFICATION_SEQUENCE_REQ
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, 'X'].map((key, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ backgroundColor: 'rgba(244, 63, 129, 0.2)', scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      if (key === 'C') setSecretPin('');
                      else if (key === 'X') setShowSecretKeypad(false);
                      else if (secretPin.length < 4) {
                        const newPin = secretPin + key.toString();
                        setSecretPin(newPin);
                        if (newPin.length === 4) {
                          handleSecretPinSubmit(newPin);
                        }
                      }
                    }}
                    className={`h-14 rounded-2xl border ${key === 'X' ? 'border-rose-500/50 text-rose-500 bg-rose-500/5' : 'border-white/5 bg-white/5 text-white'} text-lg font-mono font-black transition-all flex items-center justify-center`}
                  >
                    {key}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center gap-6 py-4 bg-black/40 rounded-2xl border border-white/5">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={i < secretPin.length ? { scale: [1, 1.3, 1], backgroundColor: '#f43f5e' } : {}}
                    className={`w-3 h-3 rounded-full border border-rose-500/40 ${i < secretPin.length ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,1)]' : 'bg-transparent'}`}
                  />
                ))}
              </div>

              <div className="mt-8 text-center">
                 <p className="text-[7px] font-mono text-gray-600 uppercase tracking-widest">ENCRYPTION: AES_256_TAC</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Banner / Header */}
      <header className={`border-b ${themeStyles.border} ${themeStyles.header} px-4 md:px-6 py-3 md:px-4 flex flex-col md:flex-row items-center justify-between sticky top-0 z-50 gap-4 md:gap-0`}>
        {/* Confidentiality Watermark */}
        <div className="absolute top-0 right-1/2 translate-x-1/2 pointer-events-none opacity-20 hidden lg:block">
           <span className="text-[10px] font-mono text-gray-500 uppercase tracking-[1em]">Classification: TOP_SECRET // EYES_ONLY</span>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative">
            <div 
              onPointerDown={handleShieldPressStart}
              onPointerUp={handleShieldPressEnd}
              onPointerLeave={handleShieldPressEnd}
              className={`bg-[#151619] border-2 ${themeStyles.accentBorder} p-2.5 rounded-lg ${themeStyles.accentShadow} relative overflow-hidden group cursor-pointer active:scale-95 transition-transform`}
            >
              {/* Tactical scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.1)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
              <div className="relative flex items-center justify-center">
                <Shield className={`w-6 h-6 ${isRunning ? themeStyles.accent : 'text-rose-500'} transition-all duration-700`} />
                <Crosshair className={`w-4 h-4 ${themeStyles.accent} absolute opacity-40 animate-[spin_4s_linear_infinite]`} />
                <motion.div 
                  animate={{ opacity: [0.1, 0.5, 0.1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="absolute inset-x-[-50%] h-[1px] bg-emerald-500/20 rotate-45" 
                />
              </div>
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-emerald-500/40" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-emerald-500/40" />
            </div>
            {/* HUD Corner Accents */}
            <div className={`absolute -top-1 -left-1 w-2 h-2 border-t border-l ${themeStyles.accentBorder.replace('border-', 'border-')}`} />
            <div className={`absolute -bottom-1 -right-1 w-2 h-2 border-b border-r ${themeStyles.accentBorder.replace('border-', 'border-')}`} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-[0.25em] font-mono flex items-center gap-1 group">
              <span className="relative">
                OBSIDIAN
                <motion.span 
                  animate={{ opacity: [0.1, 0.4, 0.1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -top-1 -left-2 text-[8px] opacity-20"
                >
                  SEC_X
                </motion.span>
              </span>
              <span className={`${themeStyles.accent} drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] relative`}>VIGIL
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -right-1 -top-1 w-1 h-1 bg-rose-500 rounded-full shadow-[0_0_5px_rgba(244,63,94,1)]"
                />
              </span>
              <span className={`text-[10px] ${themeStyles.accentBg.replace('bg-', 'bg-opacity-10 ')} ${themeStyles.accent} px-1.5 py-0.5 border ${themeStyles.accentBorder} ml-2 rounded font-normal tracking-tight flex items-center gap-1`}>
                <Target className="w-2.5 h-2.5" />
                v2.0 // TAC
              </span>
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isRunning ? `${themeStyles.accentBg} ${themeStyles.accentShadow.replace('0.2', '0.8')}` : 'bg-rose-500'} transition-all duration-500`} />
              <span className="text-[9px] uppercase tracking-[0.3em] font-mono text-gray-500">
                SEC_LINK: {isRunning ? t.secStatusEncrypted : t.secStatusOffline}
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
              onClick={() => setIsManualOpen(true)}
              className={`p-2 rounded-lg border ${themeStyles.border} hover:${themeStyles.accentBorder} transition-all`}
              title="Manual"
            >
              <HelpCircle className="w-4 h-4 text-gray-500 hover:text-white" />
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
            <span className="hidden xs:inline">{isRunning ? t.deactivate : t.activate}</span>
            <span className="xs:hidden">{isRunning ? t.lock : t.goLive}</span>
          </button>
        </div>
      </header>

      <main className="p-6 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative">
        
          {isManualOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsManualOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className={`relative max-w-lg w-full ${themeStyles.surface} border ${themeStyles.border} rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]`}
            >
              <div className={`p-6 border-b ${themeStyles.border} flex items-center justify-between`}>
                <div className={`flex items-center gap-2 ${themeStyles.accent}`}>
                  <Info className="w-5 h-5" />
                  <h2 className="text-lg font-bold text-white font-mono uppercase">{t.manualTitle}</h2>
                </div>
                <button 
                  onClick={() => setIsManualOpen(false)}
                  className="p-1 hover:bg-white/5 rounded text-gray-500 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar">
                <section className="space-y-4">
                  <h3 className="text-sm font-mono text-white font-bold flex items-center gap-2 uppercase">
                    <Lock className="w-4 h-4 text-blue-500" />
                    {t.manualAuth}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { icon: Fingerprint, text: t.manualAuthStep1, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                      { icon: Eye, text: t.manualAuthStep2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                      { icon: Key, text: t.manualAuthStep3, color: 'text-amber-500', bg: 'bg-amber-500/10' }
                    ].map((step, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/5 items-start">
                        <div className={`p-2 rounded-lg ${step.bg}`}>
                          <step.icon className={`w-4 h-4 ${step.color}`} />
                        </div>
                        <p className="text-[11px] font-mono text-gray-300 leading-relaxed pt-0.5">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-mono text-white font-bold flex items-center gap-2 uppercase">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    {t.manualTraffic}
                  </h3>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[11px] font-mono text-gray-400 leading-relaxed italic">
                      {t.manualTrafficDesc}
                    </p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-mono text-white font-bold flex items-center gap-2 uppercase">
                    <EyeOff className="w-4 h-4 text-purple-400" />
                    {t.manualStealth}
                  </h3>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[11px] font-mono text-gray-400 leading-relaxed">
                      {t.manualStealthDesc}
                    </p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-mono text-white font-bold flex items-center gap-2 uppercase">
                    <RefreshCw className="w-4 h-4 text-emerald-500" />
                    {t.manualInspiration}
                  </h3>
                  <p className="text-[10px] font-mono text-gray-400 leading-relaxed italic">
                    {t.manualInspirationDesc}
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-sm font-mono text-emerald-500 font-bold flex items-center gap-2 uppercase">
                    <CheckCircle2 className="w-4 h-4" />
                    {t.manualCredits}
                  </h3>
                  <div className="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                    <p className="text-[11px] font-mono text-emerald-500 font-bold tracking-widest text-center uppercase">
                      Core Operations Protocol by<br/>
                      <span className="text-white text-sm">ALPHA_OPERATOR_LEAD</span>
                    </p>
                  </div>
                </section>
                
                <section className="mt-8 p-4 border border-rose-500/20 bg-rose-500/5 rounded-xl">
                  <p className="text-[10px] font-mono text-rose-500 font-bold text-center uppercase tracking-[0.2em]">
                    // WARNING //
                  </p>
                  <p className="text-[9px] font-mono text-gray-400 mt-2 text-center uppercase">
                    ALL INTERFACE INTERACTIONS ARE LOGGED AND ENCRYPTED. UNAUTHORIZED ACCESS TO TACTICAL ASSETS WILL TRIGGER COUNTER-MEASURES.
                  </p>
                </section>
              </div>

              <div className={`p-4 bg-black/40 border-t ${themeStyles.border} flex justify-end`}>
                <button 
                  onClick={() => setIsManualOpen(false)}
                  className={`px-6 py-2 rounded-lg bg-white text-black font-mono font-bold text-xs uppercase hover:bg-gray-200 transition-all`}
                >
                  Acknowledge
                </button>
              </div>
            </motion.div>
          </div>
        )}

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
                    <h2 className="text-lg font-bold text-white font-mono uppercase">{t.systemConfig}</h2>
                  </div>
                  <button 
                    onClick={() => setIsSettingsOpen(false)}
                    className={`p-1 hover:${themeStyles.bg} rounded-md transition-colors text-gray-500 hover:text-white`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 space-y-8">
                  {/* Language Selector */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest border-b border-white/5 pb-1">{t.language}</h3>
                    <div className="flex flex-col gap-2">
                      <select 
                        value={config.language}
                        onChange={(e) => setConfig(prev => ({ ...prev, language: e.target.value as Language }))}
                        className={`bg-[#151619] border ${themeStyles.border} px-3 py-2 rounded-lg text-sm font-mono text-gray-300 focus:outline-none focus:border-emerald-500 appearance-none cursor-pointer w-full`}
                      >
                        <option value="en">English (US)</option>
                        <option value="ru">Русский (RU)</option>
                        <option value="zh">中文 (ZH)</option>
                      </select>
                    </div>
                  </div>

                  {/* Protocols */}
                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest border-b border-white/5 pb-1">Protocols</h3>
                    <div 
                      className={`flex items-center justify-between p-3 bg-[#151619] border ${themeStyles.border} rounded-xl group cursor-pointer hover:border-emerald-500/30 transition-all`} 
                      onClick={() => setConfig(prev => ({ ...prev, autoMitigate: !prev.autoMitigate }))}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.autoMitigate ? 'bg-emerald-500 text-black' : 'bg-gray-800 text-gray-500'}`}>
                          <Zap className="w-3 h-3" />
                        </div>
                        <div>
                          <p className="text-xs font-mono text-white">{t.neuralMitigation}</p>
                          <p className="text-[9px] text-gray-500">{t.neuralMitigationSub}</p>
                        </div>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${config.autoMitigate ? 'bg-emerald-500' : 'bg-gray-700'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${config.autoMitigate ? 'left-4.5' : 'left-0.5'}`} />
                      </div>
                    </div>

                    <div 
                      className={`flex items-center justify-between p-3 bg-[#151619] border ${themeStyles.border} rounded-xl group cursor-pointer hover:border-blue-500/30 transition-all`} 
                      onClick={() => setConfig(prev => ({ ...prev, stealthMode: !prev.stealthMode }))}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${config.stealthMode ? 'bg-blue-500 text-black' : 'bg-gray-800 text-gray-500'}`}>
                          {config.stealthMode ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </div>
                        <div>
                          <p className="text-xs font-mono text-white">{t.milSpecStealth}</p>
                          <p className="text-[9px] text-gray-500">{t.milSpecStealthSub}</p>
                        </div>
                      </div>
                      <div className={`w-8 h-4 rounded-full relative transition-colors ${config.stealthMode ? 'bg-blue-500' : 'bg-gray-700'}`}>
                        <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${config.stealthMode ? 'left-4.5' : 'left-0.5'}`} />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest border-b border-white/5 pb-1">{t.appearance}</h3>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-mono uppercase text-gray-500">{t.visualTheme}</label>
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
                        <label className="text-xs font-mono uppercase text-gray-500">{t.logRetention}</label>
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
                        <label className="text-xs font-mono uppercase text-gray-500">{t.refreshRate}</label>
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
                    <h3 className="text-[10px] font-mono text-gray-600 uppercase tracking-widest border-b border-white/5 pb-1">{t.persistence}</h3>
                    
                    <button 
                      onClick={saveCurrentAsDefault}
                      className={`w-full flex items-center justify-between p-3 bg-[#151619] border border-[#2d2e32] rounded-xl hover:${themeStyles.accentBorder} transition-all text-sm font-mono group`}
                    >
                      <div className="flex items-center gap-2">
                        <Save className={`w-4 h-4 ${themeStyles.accent}`} />
                        <span>{t.saveDefaults}</span>
                      </div>
                      <span className="text-[10px] text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">{t.persistenceNote}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => {
                          setShowBoot(true);
                          setIsAuthorized(false);
                          setAuthStep('fingerprint');
                          setIsSettingsOpen(false);
                          setTimeout(() => setShowBoot(false), 6000);
                        }}
                        className={`flex items-center justify-center gap-2 p-3 bg-[#151619] border ${themeStyles.border} rounded-xl hover:border-emerald-500/30 transition-all text-[11px] font-mono group`}
                      >
                        <RefreshCw className="w-3 h-3 text-emerald-500 group-hover:animate-spin" />
                        <span>REBOOT</span>
                      </button>
                      <button 
                        onClick={() => {
                          localStorage.removeItem('obsidianvigil_config');
                          window.location.reload();
                        }}
                        className={`flex items-center justify-center gap-2 p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl hover:border-rose-500/50 transition-all text-[11px] font-mono text-rose-500/70`}
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>RESET</span>
                      </button>
                    </div>

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
            <StatCard 
              label={t.sysIntegrity} 
              value={`${integrity}%`} 
              icon={ShieldCheck} 
              color={integrity > 90 ? 'bg-emerald-500' : integrity > 70 ? 'bg-orange-500' : 'bg-rose-500'} 
              border={themeStyles.border}
              subValue={integrity < 100 ? 'PATCHING VULNERABILITIES' : t.sysIntegritySub}
            />
            <StatCard 
              label={t.threatTracker} 
              value={blockedPackets} 
              icon={Target} 
              color="bg-rose-500" 
              border={themeStyles.border}
              subValue={isRunning ? t.threatTrackerSub : t.secStatusOffline}
            />
            <StatCard 
              label={t.networkLoad} 
              value={`${networkLoad}%`} 
              icon={Cpu} 
              color="bg-blue-500" 
              border={themeStyles.border}
              subValue={networkLoad > 80 ? 'CRITICAL CONGESTION' : t.networkLoadSub}
            />
            <StatCard 
              label={t.activePolicies} 
              value={blockedIps.size} 
              icon={Terminal} 
              color={isRunning ? themeStyles.accentBg : 'bg-gray-500'} 
              border={themeStyles.border} 
              subValue={`${t.activePoliciesSub.split(':')[0]}: ${config.autoMitigate ? 'ON' : 'OFF'}`}
            />
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

        {/* Right Column: Dynamic Dashboard */}
        <div className="lg:col-span-8 flex flex-col gap-6 order-1 lg:order-2 relative">
          {/* Background Confidentiality Mark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none overflow-hidden">
             <span className="text-[150px] font-mono font-black rotate-[-35deg] whitespace-nowrap">CLASSIFIED // TOP_SECRET</span>
          </div>
          
          {/* Feature Selector Tabs */}
          <div className={`p-1.5 rounded-2xl ${themeStyles.surface} border ${themeStyles.border} flex inline-flex w-fit self-start mb-2 backdrop-blur-xl shadow-2xl`}>
            {[
              { id: 'traffic', icon: Activity, label: t.liveTraffic },
              { id: 'system', icon: Cpu, label: t.systemTab },
              { id: 'intel', icon: Globe, label: t.threatIntel },
              { id: 'topology', icon: Network, label: t.networkTopology }
            ].map(tab => {
              const Icon = tab.id === 'traffic' ? Activity : tab.id === 'system' ? Cpu : tab.id === 'intel' ? Globe : Network;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[11px] font-mono font-bold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
                      : 'text-gray-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'traffic' && (
              <motion.div
                key="traffic"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="flex flex-col gap-6"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 ${themeStyles.surface} border ${themeStyles.border} rounded-xl flex flex-col gap-1`}>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Radio className="w-2.5 h-2.5 text-emerald-500 animate-pulse" /> {t.signalEntropy}
                    </span>
                    <span className="text-lg font-bold text-white font-mono">0.024 MS</span>
                  </div>
                  <div className={`p-4 ${themeStyles.surface} border ${themeStyles.border} rounded-xl flex flex-col gap-1`}>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Database className="w-2.5 h-2.5 text-blue-500" /> {t.heuristicBuffer}
                    </span>
                    <span className="text-lg font-bold text-white font-mono">99.8% READY</span>
                  </div>
                  <div className={`p-4 ${themeStyles.surface} border ${themeStyles.border} rounded-xl flex flex-col gap-1`}>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Crosshair className="w-2.5 h-2.5 text-rose-500" /> {t.dpiLatency}
                    </span>
                    <span className="text-lg font-bold text-white font-mono">1.2 NS</span>
                  </div>
                  <div className={`p-4 ${themeStyles.surface} border ${themeStyles.border} rounded-xl flex flex-col gap-1`}>
                    <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                      <Shield className="w-2.5 h-2.5 text-emerald-500" /> {t.mitigatedSec}
                    </span>
                    <span className="text-lg font-bold text-white font-mono">4.1K PKTS</span>
                  </div>
                </div>

                <section className={`${themeStyles.surface} border ${themeStyles.border} rounded-3xl flex flex-col h-[400px] md:h-[650px] shadow-2xl relative overflow-hidden`}>
                  {/* Terminal Header */}
                  <div className={`p-4 border-b ${themeStyles.border} bg-white/5 flex items-center justify-between backdrop-blur-xl`}>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/30" />
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-500/30" />
                        <div className={`w-2.5 h-2.5 rounded-full ${themeStyles.accentBg.replace('bg-', 'bg-opacity-30 ')}`} />
                      </div>
                      <div className={`h-4 w-px ${themeStyles.border} mx-2`} />
                      <h2 className="text-[10px] uppercase font-mono tracking-widest text-gray-500 flex items-center gap-2">
                        <Zap className={`w-3 h-3 ${themeStyles.accent}`} />
                        {t.liveTraffic}
                      </h2>
                    </div>
                  </div>

                  {/* Log Area */}
                  <div className={`flex-1 overflow-y-auto p-3 custom-scrollbar ${themeStyles.bg}`}>
                    {!isRunning && logs.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-40">
                        <Activity className={`w-12 h-12 mb-4 ${themeStyles.accent} opacity-20`} />
                        <p className="font-mono text-sm uppercase tracking-widest text-white/60">Awaiting System Engagement...</p>
                        <p className="text-[10px] mt-2 text-gray-600">Activate the firewall to begin vulnerability monitoring.</p>
                      </div>
                    ) : (
                      <div className="space-y-1.5 font-mono text-[11px]">
                        <AnimatePresence mode="popLayout">
                          {logs.map((log) => (
                            <motion.div 
                              key={log.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`group grid grid-cols-12 gap-3 p-3 rounded-xl border transition-all ${
                                log.status === 'blocked' 
                                  ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' 
                                  : `bg-transparent border-transparent text-gray-500 hover:${themeStyles.surface} hover:${themeStyles.border}`
                              }`}
                            >
                              <div className="col-span-2 opacity-50 font-bold">[{log.timestamp}]</div>
                              <div className="col-span-1 font-black text-center">
                                <span className={`${log.protocol === 'TCP' ? 'text-blue-400' : log.protocol === 'UDP' ? 'text-orange-400' : 'text-purple-400'}`}>
                                  {log.protocol}
                                </span>
                              </div>
                              <div className="col-span-3 truncate flex flex-col">
                                <span className="text-gray-200 group-hover:text-white">{log.source}</span>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  {log.location && <span className="text-[8px] text-gray-600 font-black">{log.location}</span>}
                                  {log.flags?.map(f => (
                                    <span key={f} className="text-[7px] bg-white/5 px-1 rounded text-gray-600 border border-white/5">{f}</span>
                                  ))}
                                </div>
                              </div>
                              <div className="col-span-1 text-center flex items-center justify-center">
                                {log.status === 'blocked' ? (
                                  <ShieldAlert className="w-3.5 h-3.5 text-rose-500 animate-pulse" />
                                ) : (
                                  <div className="w-1 h-1 rounded-full bg-emerald-500/30" />
                                )}
                              </div>
                              <div className="col-span-3 truncate flex flex-col">
                                <span className="text-gray-300 font-bold">{log.destination}:{log.port}</span>
                                {log.signature && <span className="text-[8px] text-rose-500/80 font-black tracking-tighter truncate uppercase italic">{log.signature}</span>}
                              </div>
                              <div className="col-span-2 text-right flex flex-col items-end justify-center">
                                <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                                  log.status === 'blocked' ? 'bg-rose-500 text-black shadow-[0_0_15px_rgba(244,63,94,0.4)]' : `${themeStyles.accent} border ${themeStyles.accentBorder} opacity-60`
                                }`}>
                                  {log.status === 'blocked' ? t.statusBlocked : t.statusAllowed}
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </section>
              </motion.div>
            )}

            {activeTab === 'intel' && (
              <motion.div
                key="intel"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className={`${themeStyles.surface} border ${themeStyles.border} rounded-3xl p-7 space-y-6 shadow-2xl relative overflow-hidden group`}>
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.05),transparent)] pointer-events-none" />
                   <div className="flex items-center justify-between border-b border-white/5 pb-4">
                     <div className="flex items-center gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        <h3 className="text-sm font-bold text-white font-mono uppercase tracking-[0.2em]">{t.globalEvents}</h3>
                     </div>
                     <RefreshCw className="w-3.5 h-3.5 text-gray-500 animate-spin-slow" />
                   </div>
                   <div className="space-y-5">
                      {[
                        { time: '4m ago', event: 'APT-41 Strike on Healthcare Infrastructure', level: 'CRITICAL', color: 'text-rose-500', icon: AlertOctagon },
                        { time: '18m ago', event: 'Zero-Day bypass found in TLS handshake protocols', level: 'HIGH', color: 'text-amber-500', icon: AlertTriangle },
                        { time: '1h ago', event: 'BGP Hijacking attempt mitigated via Anycast', level: 'HIGH', color: 'text-amber-500', icon: Shield },
                        { time: '4h ago', event: 'Global heuristic engines updated to v8.4', level: 'LOW', color: 'text-emerald-500', icon: CheckCircle2 }
                      ].map((item, i) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="flex gap-4 group"
                        >
                          <div className={`p-2 rounded-xl bg-black/40 border border-white/5 ${item.color.replace('text-', 'group-hover:border-')}`}>
                             <item.icon className={`w-4 h-4 ${item.color}`} />
                          </div>
                          <div className="flex-1 space-y-1">
                             <div className="flex justify-between items-start">
                                <p className="text-xs text-gray-200 font-mono group-hover:text-white transition-colors">{item.event}</p>
                                <span className="text-[9px] font-mono text-gray-600 font-black">{item.time}</span>
                             </div>
                             <p className={`text-[9px] font-mono font-black ${item.color} uppercase tracking-widest`}>{item.level}_PRIORITY_ALERT</p>
                          </div>
                        </motion.div>
                      ))}
                   </div>
                </div>

                <div className={`${themeStyles.surface} border ${themeStyles.border} rounded-3xl p-7 relative overflow-hidden group shadow-2xl`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent)] pointer-events-none" />
                  <div className="flex items-center gap-3 mb-10">
                    <Map className="w-5 h-5 text-emerald-500" />
                    <h3 className="text-sm font-bold text-white uppercase font-mono tracking-[0.2em]">Regional Strike Probabilities</h3>
                  </div>
                  <div className="space-y-4">
                     {[
                       { loc: 'North America', p: 14, trend: 'stable' },
                       { loc: 'Europe', p: 89, trend: 'rising' },
                       { loc: 'East Asia', p: 45, trend: 'declining' },
                       { loc: 'Middle East', p: 62, trend: 'rising' }
                     ].map((reg, i) => (
                       <div key={i} className="space-y-2">
                          <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-gray-500">
                             <span>{reg.loc}</span>
                             <span className={reg.trend === 'rising' ? 'text-rose-500' : 'text-emerald-500'}>{reg.p}% RISK</span>
                          </div>
                          <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                             <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${reg.p}%` }}
                              className={`h-full ${reg.p > 70 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : reg.p > 30 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                             />
                          </div>
                       </div>
                     ))}
                  </div>
                  <div className="mt-8 flex flex-col items-center">
                     <div className="w-full max-w-[200px]">
                        <Radar intensity={threatIntensity} />
                     </div>
                     <p className="text-[9px] font-mono text-gray-600 mt-6 uppercase tracking-[0.5em] font-black text-center">
                        {t.radarSystem}
                     </p>
                  </div>

                  <div className="mt-12 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className={`w-4 h-4 ${isUpdating ? 'animate-spin text-emerald-500' : 'text-gray-500'}`} />
                        <span className="text-[10px] font-mono text-white font-bold">{t.autoUpdate}</span>
                      </div>
                      <span className={`text-[9px] font-mono ${isUpdating ? 'text-emerald-500' : 'text-gray-500'}`}>
                        {isUpdating ? 'RUNNING' : 'STANDBY'}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-mono text-gray-500">
                        <span>{t.backupSystem}</span>
                        <span className="text-white">{lastBackup}</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          animate={isUpdating ? { 
                            width: updatePhase === 'backup' ? '40%' : updatePhase === 'patch' ? '80%' : '100%' 
                          } : { width: '100%' }}
                          className={`h-full ${isUpdating ? 'bg-emerald-500' : 'bg-emerald-500/20'}`} 
                        />
                      </div>
                    </div>

                    {isUpdating && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-2 rounded bg-emerald-500/10 border border-emerald-500/20 text-center"
                      >
                        <p className="text-[8px] font-mono text-emerald-500 animate-pulse font-bold">
                          {updatePhase === 'backup' ? t.securingData : updatePhase === 'patch' ? t.applyingPatches : t.systemUpToDate}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'topology' && (
              <motion.div
                key="topology"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className={`${themeStyles.surface} border ${themeStyles.border} rounded-3xl p-10 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden shadow-2xl`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                
                <div className="relative flex flex-col items-center gap-16 w-full max-w-2xl">
                   <div className="flex items-center justify-between w-full">
                      {/* External Hub */}
                      <div className="flex flex-col items-center gap-5">
                         <motion.div 
                          animate={{ 
                            boxShadow: ['0 0 20px rgba(59,130,246,0.1)', '0 0 40px rgba(59,130,246,0.2)', '0 0 20px rgba(59,130,246,0.1)'],
                            borderColor: ['rgba(59,130,246,0.2)', 'rgba(59,130,246,0.5)', 'rgba(59,130,246,0.2)']
                          }}
                          transition={{ duration: 4, repeat: Infinity }}
                          className="p-6 bg-blue-500/5 border-2 rounded-3xl backdrop-blur-md"
                         >
                            <Globe className="w-10 h-10 text-blue-500" />
                         </motion.div>
                         <p className="text-[10px] font-mono text-gray-500 font-black uppercase tracking-[0.3em]">External_Traffic</p>
                      </div>

                      {/* Bridge Line */}
                      <div className="flex-1 flex flex-col items-center gap-3 px-12">
                         <div className="w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-emerald-500/80 to-emerald-500/20 relative">
                            {isRunning && [...Array(3)].map((_, i) => (
                              <motion.div 
                                key={i}
                                initial={{ left: '-10%' }}
                                animate={{ left: '110%' }}
                                transition={{ 
                                  duration: 2.5, 
                                  repeat: Infinity, 
                                  ease: "linear",
                                  delay: i * 0.8
                                }}
                                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 blur-sm opacity-50"
                              />
                            ))}
                         </div>
                         <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest">{t.activeMitigation}</span>
                      </div>

                      {/* Obsidian Core */}
                      <div className="flex flex-col items-center gap-5">
                         <motion.div 
                          animate={{ 
                            scale: [1, 1.02, 1],
                            boxShadow: isRunning ? ['0 0 30px rgba(16,185,129,0.2)', '0 0 60px rgba(16,185,129,0.4)', '0 0 30px rgba(16,185,129,0.2)'] : 'none'
                          }}
                          transition={{ duration: 3, repeat: Infinity }}
                          className="p-10 bg-emerald-500/10 border-4 border-emerald-500/40 rounded-[2.5rem] shadow-2xl relative"
                         >
                            <Shield className="w-14 h-14 text-white" />
                            {isRunning && (
                              <motion.div 
                                animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 border-2 border-emerald-500 rounded-[2.5rem]" 
                              />
                            )}
                         </motion.div>
                         <p className="text-sm font-mono text-white font-black uppercase tracking-[0.4em]">{t.statusRunning}</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-3 gap-10 w-full">
                      {[
                        { icon: Database, label: 'Vault_L1', status: 'PROTECTED', color: 'text-blue-500' },
                        { icon: Cpu, label: 'Neural_Core', status: 'SYNCED', color: 'text-emerald-500' },
                        { icon: Network, label: 'Mesh_Link', status: 'ACTIVE', color: 'text-amber-500' }
                      ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 group">
                           <motion.div 
                              animate={threatIntensity > 0.8 ? {
                                x: [0, -1, 1, -1, 1, 0],
                                scale: [1, 1.02, 1],
                                borderColor: ['rgba(244,63,94,0.2)', 'rgba(244,63,94,0.8)', 'rgba(244,63,94,0.2)']
                              } : {}}
                              className={`p-5 rounded-2xl border ${threatIntensity > 0.8 ? 'border-rose-500 bg-rose-500/10 shadow-[0_0_20px_rgba(244,63,94,0.2)]' : `${themeStyles.border} ${themeStyles.surface}`} shadow-xl group-hover:${themeStyles.accentBorder} transition-all`}
                           >
                              <item.icon className={`w-6 h-6 transition-colors ${threatIntensity > 0.8 ? 'text-rose-500 font-bold' : 'text-gray-500 group-hover:text-white'}`} />
                           </motion.div>
                           <div className="text-center">
                              <p className="text-xs font-mono text-gray-200 font-black uppercase tracking-widest group-hover:text-emerald-500 transition-colors">{item.label}</p>
                              <p className={`text-[9px] font-mono ${threatIntensity > 0.8 ? 'text-rose-500 animate-pulse' : item.color} font-black mt-1`}>// {threatIntensity > 0.8 ? 'SYSTEM_BREACH_ALERT' : item.status}</p>
                           </div>
                        </div>
                      ))}
                   </div>

                   <div className="text-center max-w-md bg-black/40 p-5 rounded-2xl border border-white/5 shadow-inner">
                      <p className="text-[11px] font-mono text-gray-500 leading-relaxed italic">
                        "Active topology verification complete. Heuristic integrity within nominal bounds. All clandestine nodes responding to encrypted pings on port 49152."
                      </p>
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'system' && (
              <motion.div 
                key="system"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CPU & Memory */}
                  <div className="space-y-6">
                    <div className="bg-black/40 rounded-3xl p-6 border border-white/5 shadow-inner">
                      <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xs font-mono font-black text-gray-400 uppercase tracking-widest">{t.cpuLoad}</h3>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold uppercase tracking-widest animate-pulse">Live_Feed</span>
                      </div>
                      <div className="grid grid-cols-4 gap-3 h-24 items-end">
                        {cpuCores.map((load, idx) => (
                          <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                            <motion.div 
                              animate={{ height: `${load}%` }}
                              className="w-full bg-emerald-500/10 border-t-2 border-emerald-500 rounded-t-sm relative"
                            >
                              <div className="absolute inset-0 bg-emerald-500 opacity-10 animate-pulse" />
                            </motion.div>
                            <span className="text-[8px] font-mono text-gray-600">C_{idx}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-3xl p-6 border border-white/5 shadow-inner">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-mono font-black text-gray-400 uppercase tracking-widest">{t.ramUsage}</h3>
                        <span className="text-white font-mono text-xs font-bold">82%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                           animate={{ width: "82%" }}
                           className="h-full bg-emerald-500"
                        />
                      </div>
                      <p className="text-[8px] font-mono text-gray-500 mt-4 leading-relaxed uppercase tracking-widest">
                        Cryptographic_Reserve: 2.1GB // Buffer_Cache: 640MB
                      </p>
                    </div>
                  </div>

                  {/* Hardware Info */}
                  <div className="bg-black/40 rounded-3xl p-6 border border-white/5 h-full shadow-inner">
                    <h3 className="text-xs font-mono font-black text-gray-400 uppercase tracking-widest mb-6">{t.deviceIdentity}</h3>
                    <div className="space-y-6">
                      {[
                        { label: 'Arch', val: 'ARM_V8_TAC' },
                        { label: 'Kernel', val: '6.4.0-VIGIL' },
                        { label: 'Entropy', val: '0.999 PF' },
                        { label: 'IO_State', val: 'ENCRYPTED' }
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2">
                          <span className="text-[9px] font-mono text-gray-500 uppercase font-black">{item.label}</span>
                          <span className="text-[10px] font-mono text-white font-bold tracking-widest uppercase">{item.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 p-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="text-[9px] font-mono text-emerald-500 font-bold uppercase tracking-widest">{t.diskHealth} // Standby</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Stream */}
                <div className="bg-black/60 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Terminal className="w-3 h-3 text-emerald-500" />
                      <span className="text-[10px] font-mono text-white font-bold uppercase tracking-widest">{t.kernelLogs}</span>
                    </div>
                  </div>
                  <div className="h-64 overflow-y-auto p-4 custom-scrollbar font-mono text-[9px] space-y-2">
                    {kernelLogs.map((log, i) => (
                      <div key={i} className="flex gap-4 opacity-80 border-b border-white/5 pb-1">
                        <span className="text-gray-600 tabular-nums">[{log.time}]</span>
                        <span className={log.level === 'warn' ? 'text-amber-500 font-bold' : 'text-emerald-500/70 font-medium'}>
                           {log.msg}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {alerts.length > 0 && isRunning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-5 bg-rose-500/10 border-2 border-rose-500/30 rounded-3xl flex items-center justify-between shadow-[0_0_30px_rgba(244,63,94,0.1)]"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-rose-500 rounded-2xl shadow-[0_0_15px_rgba(244,63,94,0.5)]">
                    <AlertOctagon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-mono font-black text-white uppercase tracking-[0.2em]">{t.threatAlert}</h4>
                    <p className="text-xs text-rose-500/80 font-mono font-bold mt-1 uppercase">{alerts[0].msg}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-mono text-rose-500 font-black tracking-widest uppercase">Mitigating...</span>
                  <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-full w-1/2 bg-rose-500"
                     />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Designer Credits Watermark */}
        <div className="fixed bottom-4 right-6 pointer-events-none opacity-20 hover:opacity-100 transition-opacity">
          <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.4em] select-none">
            OPERATED BY <span className="text-white">ALPHA_VIGIL_LEAD</span>
          </p>
        </div>
      </main>
      </motion.div>

      {/* Intercept Overlay */}
      <AnimatePresence>
        {interceptEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, rotate: -5 }}
              animate={{ scale: 1, rotate: 0 }}
              className="max-w-md w-full bg-rose-500/10 border-2 border-rose-500 rounded-3xl p-8 shadow-[0_0_50px_rgba(244,63,94,0.3)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(244,63,94,0.05)_10px,rgba(244,63,94,0.05)_20px)]" />
              
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="mb-8"
              >
                <AlertOctagon className="w-24 h-24 text-rose-500 mx-auto" />
              </motion.div>
              
              <h2 className="text-2xl font-mono font-black text-rose-500 uppercase tracking-widest mb-2">
                {t.autoBlocker}
              </h2>
              <p className="text-[12px] font-mono text-gray-400 mb-8 uppercase tracking-widest font-bold">
                {t.intercepting}
              </p>
              
              <div className="space-y-4 bg-black/40 rounded-2xl p-6 border border-rose-500/20">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">TARGET_URL:</span>
                  <span className="text-white font-bold">{interceptEvent.url}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">THREAT_TYPE:</span>
                  <span className="text-rose-400 font-bold">{interceptEvent.threat}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-gray-500">ACTION_TAKEN:</span>
                  <span className="text-emerald-500 font-bold uppercase">{t.statusBlocked}</span>
                </div>
              </div>
              
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-1 bg-emerald-500 absolute bottom-0 left-0"
              />
              
              <div className="mt-8">
                 <p className="text-[10px] font-mono text-emerald-500 animate-pulse font-black uppercase tracking-[0.3em]">
                   {t.threatDeflected}
                 </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Update/Patch Overlay */}
      <AnimatePresence>
        {isUpdating && updatePhase === 'patch' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm pointer-events-none flex items-end justify-center pb-24"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-emerald-600 px-8 py-3 rounded-full flex items-center gap-4 shadow-[0_0_40px_rgba(16,185,129,0.4)]"
            >
              <RefreshCw className="w-5 h-5 text-white animate-spin" />
              <div className="flex flex-col">
                <span className="text-[10px] font-mono text-emerald-100 font-bold uppercase tracking-widest">{t.autoUpdate}</span>
                <span className="text-[12px] font-mono text-white font-black uppercase">{t.applyingPatches}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
