export type Protocol = 'TCP' | 'UDP' | 'ICMP';
export type Status = 'allowed' | 'blocked';
export type TrafficType = 'threat' | 'normal';

export interface Packet {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  location?: string;
  port: number;
  protocol: Protocol;
  size: number;
  status: Status;
  type?: TrafficType;
  complexity?: number; // 1-10 for worm/dos simulation
  signature?: string; // DPI Signature
  flags?: string[]; // Tactical flags (ACK, SYN, FIN, etc)
}

export type Language = 'en' | 'ru' | 'zh';
export type AuthStep = 'fingerprint' | 'retina' | 'password' | 'ready';

export interface AppConfig {
  defaultBlockedIps: string[];
  logRetention: number;
  refreshRate: number;
  theme: 'tactical-dark' | 'combat-gray' | 'high-viz-green';
  autoMitigate: boolean;
  stealthMode: boolean;
  heuristicDepth: number;
  language: Language;
}
