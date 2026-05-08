import { AppConfig } from './types';

export const defaultConfig: AppConfig = {
  defaultBlockedIps: ['192.168.1.100', '10.0.0.5', '172.16.0.21'],
  logRetention: 50,
  refreshRate: 800,
  theme: 'tactical-dark',
  autoMitigate: true,
  stealthMode: false,
  heuristicDepth: 10,
  language: 'en'
};
