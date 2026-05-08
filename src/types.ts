export type Protocol = 'TCP' | 'UDP' | 'ICMP';
export type Status = 'allowed' | 'blocked';
export type TrafficType = 'threat' | 'normal';

export interface Packet {
  id: string;
  timestamp: string;
  source: string;
  destination: string;
  port: number;
  protocol: Protocol;
  size: number;
  status: Status;
  type?: TrafficType;
}

export interface AppConfig {
  defaultBlockedIps: string[];
  logRetention: number;
  refreshRate: number;
  theme: 'tactical-dark' | 'combat-gray' | 'high-viz-green';
}
