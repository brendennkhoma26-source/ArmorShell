import { Language } from './types';

export interface Translations {
  authTitle: string;
  authSubtitle: string;
  authPrimary: string;
  authSecondary: string;
  authIdentifying: string;
  authMatchFound: string;
  
  sysIntegrity: string;
  networkLoad: string;
  activePolicies: string;
  
  sysIntegritySub: string;
  threatTrackerSub: string;
  networkLoadSub: string;
  activePoliciesSub: string;
  
  signalEntropy: string;
  heuristicBuffer: string;
  dpiLatency: string;
  mitigatedSec: string;
  
  liveTraffic: string;
  blocklistManager: string;
  systemConfig: string;
  appearance: string;
  visualTheme: string;
  logRetention: string;
  refreshRate: string;
  persistence: string;
  saveDefaults: string;
  persistenceNote: string;
  
  neuralMitigation: string;
  neuralMitigationSub: string;
  milSpecStealth: string;
  milSpecStealthSub: string;
  
  language: string;
  secStatusEncrypted: string;
  secStatusOffline: string;
  
  activate: string;
  deactivate: string;
  goLive: string;
  lock: string;
  
  statusBlocked: string;
  statusAllowed: string;
  mitigatedDos: string;

  authPassword: string;
  authPasswordSub: string;
  authKey: string;
  authUnlock: string;
  
  hackerTitle: string;
  hackerHint: string;
  hackerWarning: string;
  manualTitle: string;
  manualAuth: string;
  manualAuthStep1: string;
  manualAuthStep2: string;
  manualAuthStep3: string;
  manualTraffic: string;
  manualTrafficDesc: string;
  manualStealth: string;
  manualStealthDesc: string;
  manualCredits: string;
  manualInspiration: string;
  manualInspirationDesc: string;
  
  threatIntel: string;
  networkTopology: string;
  globalEvents: string;
  activeMitigation: string;
  heuristicLevel: string;
  threatAlert: string;
  radarSystem: string;
  autoBlocker: string;
  intercepting: string;
  threatDeflected: string;
  autoUpdate: string;
  backupSystem: string;
  securingData: string;
  applyingPatches: string;
  systemUpToDate: string;
  systemTab: string;
  cpuLoad: string;
  ramUsage: string;
  diskHealth: string;
  kernelLogs: string;
  deviceIdentity: string;
  threatTracker: string;
  originTrace: string;
  coordinates: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    authTitle: "BIOMETRIC AUTH REQUIRED",
    authSubtitle: "Tap scanner to authorize ObsidianVigil V2.0 Access",
    authPrimary: "Primary: Place Finger on Scanner",
    authSecondary: "Secondary: Center Eyes for Tactical Scan",
    authIdentifying: "IDENTIFYING SUBJECT...",
    authMatchFound: "MATCH FOUND [USER_ALPHA_9]",
    
    sysIntegrity: "System Integrity",
    networkLoad: "Network Load",
    activePolicies: "Active Policies",
    
    sysIntegritySub: "NO BREACH DETECTED",
    threatTrackerSub: "SCANNING PACKETS",
    networkLoadSub: "NOMINAL LATENCY",
    activePoliciesSub: "AUTO-MODE: ON",
    
    signalEntropy: "Signal Entropy",
    heuristicBuffer: "Heuristic Buffer",
    dpiLatency: "DPI Latency",
    mitigatedSec: "Mitigated / SEC",
    
    liveTraffic: "Live Traffic Feed",
    blocklistManager: "Blocklist Manager",
    systemConfig: "System Config",
    appearance: "Appearance",
    visualTheme: "Visual Theme",
    logRetention: "Log Retention",
    refreshRate: "Refresh Rate",
    persistence: "Persistence",
    saveDefaults: "Save Defaults",
    persistenceNote: "Local Storage",
    
    neuralMitigation: "Neural Mitigation",
    neuralMitigationSub: "Heuristic 100% Accuracy Engine",
    milSpecStealth: "MIL-SPEC Stealth",
    milSpecStealthSub: "Encrypted Trace Masking",
    
    language: "Operational Language",
    secStatusEncrypted: "ENCRYPTED",
    secStatusOffline: "OFFLINE",
    
    activate: "Activate Protection",
    deactivate: "Deactivate",
    goLive: "Go Live",
    lock: "Lock",
    
    statusBlocked: "blocked",
    statusAllowed: "allowed",
    mitigatedDos: "MITIGATED DOS VECTOR",

    authPassword: "ENTER CRYPTOGRAPHIC KEY",
    authPasswordSub: "High-level administrative clearance required",
    authKey: "Tactical Key",
    authUnlock: "Authorize System",
    
    hackerTitle: "HACKER INTERBASE // C0MMAND",
    hackerHint: "Type 'HELP' for accessible protocols",
    hackerWarning: "UNAUTHORIZED MODIFICATION DETECTED",
    manualTitle: "SYSTEM OPERATIONAL MANUAL",
    manualAuth: "AUTH_PHASE // SECURE ENTRY",
    manualAuthStep1: "1. TACTICAL ACCESS: Long-press the Obsidian Shield for 3 seconds to initiate the encrypted bypass sequence.",
    manualAuthStep2: "2. PIN ENTRY: Input the Restricted Access code (System PIN: 0726) into the tactical keypad.",
    manualAuthStep3: "3. VALIDATION: Complete the peripheral handshake to gain full kernel control.",
    manualTraffic: "TRAFFIC_PHASE // MONITORING",
    manualTrafficDesc: "The 'Obsidian Hub' visualizes incoming data packets. PACKET_REJECTED (Red) entries indicate unauthorized connection attempts that were successfully nullified.",
    manualStealth: "STEALTH_PHASE // MASKING",
    manualStealthDesc: "Access SETTINGS to enable Mil-Spec Stealth. This toggles system headers and masks your IP signature from external sniffers.",
    manualCredits: "TACTICAL ARCHITECT",
    manualInspiration: "CORE INSPIRATION",
    manualInspirationDesc: "ObsidianVigil is a tribute to the clandestine data-defensives of the late 2020s. Designed to be both a tool and a psychological deterrent for the modern security specialist.",
    threatIntel: "THREAT INTELLIGENCE",
    networkTopology: "NETWORK TOPOLOGY",
    globalEvents: "GLOBAL EVENTS FEED",
    activeMitigation: "ACTIVE MITIGATION",
    heuristicLevel: "HEURISTIC SENSITIVITY",
    threatAlert: "HIGH INTENSITY THREAT DETECTED",
    radarSystem: "TACTICAL RADAR",
    autoBlocker: "AUTO-INTERCEPTOR",
    intercepting: "INTERCEPTING MALICIOUS REQUEST",
    threatDeflected: "THREAT_NEUTRALIZED",
    autoUpdate: "AUTO-SHIELD UPDATE",
    backupSystem: "DATA_BACKUP_PROTOCOL",
    securingData: "SECURING CRYPTOGRAPHIC ARCHIVES",
    applyingPatches: "APPLYING ZERO-DAY PATCHES",
    systemUpToDate: "SYSTEM_VERSION_LATEST",
    systemTab: "SYSTEM_KERNEL",
    cpuLoad: "PROCESSOR_LOAD",
    ramUsage: "MEMORY_BUFFER",
    diskHealth: "STORAGE_INTEGRITY",
    kernelLogs: "KERNEL_EVENT_STREAM",
    deviceIdentity: "HARDWARE_ID",
    threatTracker: "THREAT_LOCALIZATION_MAP",
    originTrace: "ORIGIN_TRACE_ACTIVE",
    coordinates: "GEOSPATIAL_COORDINATES",
  },
  ru: {
    authTitle: "ТРЕБУЕТСЯ БИОМЕТРИЯ",
    authSubtitle: "Нажмите на сканер для доступа к ObsidianVigil V2.0",
    authPrimary: "Первичный: Приложите палец к сканеру",
    authSecondary: "Вторичный: Центрируйте глаза для сканирования",
    authIdentifying: "ИДЕНТИФИКАЦИЯ ОБЪЕКТА...",
    authMatchFound: "СОВПАДЕНИЕ НАЙДЕНО [USER_ALPHA_9]",
    
    sysIntegrity: "Целостность системы",
    networkLoad: "Нагрузка сети",
    activePolicies: "Активные правила",
    
    sysIntegritySub: "ВЗЛОМОВ НЕ ОБНАРУЖЕНО",
    threatTrackerSub: "СКАНИРОВАНИЕ ПАКЕТОВ",
    networkLoadSub: "НОМИНАЛЬНАЯ ЗАДЕРЖКА",
    activePoliciesSub: "АВТО-РЕЖИМ: ВКЛ",
    
    signalEntropy: "Энтропия сигнала",
    heuristicBuffer: "Эвристический буфер",
    dpiLatency: "Задержка DPI",
    mitigatedSec: "Отражено / СЕК",
    
    liveTraffic: "Живой поток трафика",
    blocklistManager: "Менеджер блокировок",
    systemConfig: "Конфигурация системы",
    appearance: "Внешний вид",
    visualTheme: "Визуальная тема",
    logRetention: "Удержание логов",
    refreshRate: "Частота обновления",
    persistence: "Постоянство",
    saveDefaults: "Сохранить настройки",
    persistenceNote: "Локальное хранилище",
    
    neuralMitigation: "Нейронная защита",
    neuralMitigationSub: "Эвристический движок 100% точности",
    milSpecStealth: "MIL-SPEC Скрытность",
    milSpecStealthSub: "Шифрованная маскировка следов",
    
    language: "Операционный язык",
    secStatusEncrypted: "ЗАШИФРОВАНО",
    secStatusOffline: "ОФЛАЙН",
    
    activate: "Активировать защиту",
    deactivate: "Деактивировать",
    goLive: "В эфир",
    lock: "Блок",
    
    statusBlocked: "заблокировано",
    statusAllowed: "разрешено",
    mitigatedDos: "ОТРАЖЕН DOS-ВЕКТОР",
    
    authPassword: "ВВЕДИТЕ КРИПТОГРАФИЧЕСКИЙ КЛЮЧ",
    authPasswordSub: "Требуется допуск администратора высокого уровня",
    authKey: "Тактический ключ",
    authUnlock: "Авторизовать систему",
    
    hackerTitle: "ХАКЕРСКИЙ ИНТЕРФЕЙС // КОМАНДА",
    hackerHint: "Введите 'HELP' для просмотра протоколов",
    hackerWarning: "ОБНАРУЖЕНО НЕСАНКЦИОНИРОВАННОЕ ИЗМЕНЕНИЕ",
    manualTitle: "ОПЕРАЦИОННОЕ РУКОВОДСТВО",
    manualAuth: "ПРОТОКОЛ ДОСТУПА",
    manualAuthStep1: "1. ТАКТИЧЕСКИЙ ДОСТУП: Удерживайте щит Obsidian в течение 3 секунд для запуска обхода.",
    manualAuthStep2: "2. ВВОД PIN: Введите код ограниченного доступа (System PIN: 0726) на тактической клавиатуре.",
    manualAuthStep3: "3. ВАЛИДАЦИЯ: Дождитесь завершения рукопожатия периферийных устройств.",
    manualTraffic: "МОНИТОРИНГ ТРАФИКА",
    manualTrafficDesc: "Анализ пакетов в реальном времени. Заблокированные пакеты — отраженные угрозы.",
    manualStealth: "ПРОТОКОЛЫ СКРЫТНОСТИ",
    manualStealthDesc: "Включите Mil-Spec Скрытность для маскировки присутствия системы.",
    manualCredits: "ТАКТИЧЕСКИЙ ДИЗАЙНЕР",
    manualInspiration: "ИНСПИРАЦИЯ ДИЗАЙНА",
    manualInspirationDesc: "ObsidianVigil родился из необходимости в скрытном интерфейсе мониторинга. Вдохновлен ночными терминальными сессиями и эстетикой защитных узлов даркнета.",
    threatIntel: "РАЗВЕДКА УГРОЗ",
    networkTopology: "ТОПОЛОГИЯ СЕТИ",
    globalEvents: "ГЛОБАЛЬНЫЕ СОБЫТИЯ",
    activeMitigation: "АКТИВНАЯ ЗАЩИТА",
    heuristicLevel: "ЭВРИСТИЧЕСКИЙ УРОВЕНЬ",
    threatAlert: "ОБНАРУЖЕНА УГРОЗА ВЫСОКОЙ ИНТЕНСИВНОСТИ",
    radarSystem: "ТАКТИЧЕСКИЙ РАДАР",
    autoBlocker: "АВТО-ПЕРЕХВАТЧИК",
    intercepting: "ПЕРЕХВАТ ВРЕДОНОСНОГО ЗАПРОСА",
    threatDeflected: "УГРОЗА_НЕЙТРАЛИЗОВАНА",
    autoUpdate: "АВТО-ОБНОВЛЕНИЕ ЩИТА",
    backupSystem: "ПРОТОКОЛ_РЕЗЕРВНОГО_КОПИРОВАНИЯ",
    securingData: "ЗАЩИТА КРИПТОГРАФИЧЕСКИХ АРХИВОВ",
    applyingPatches: "ПРИМЕНЕНИЕ ПАТЧЕЙ НУЛЕВОГО ДНЯ",
    systemUpToDate: "СИСТЕМА_АКТУАЛЬНА",
    systemTab: "ЯДРО_СИСТЕМЫ",
    cpuLoad: "НАГРУЗКА_ЦП",
    ramUsage: "ПАМЯТЬ_ОЗУ",
    diskHealth: "ЦЕЛОСТНОСТЬ_ДАННЫХ",
    kernelLogs: "ЛОГ_ЯДРА",
    deviceIdentity: "ID_УСТРОЙСТВА",
    threatTracker: "КАРТА_ЛОКАЛИЗАЦИИ_УГРОЗ",
    originTrace: "ОТПЕЧАТОК_ИСТОЧНИКА",
    coordinates: "ГЕОПРОСТРАНСТВЕННЫЕ_КООРДИНАТЫ",
  },
  zh: {
    authTitle: "需要生物识别认证",
    authSubtitle: "点击扫描仪授权 ObsidianVigil V2.0 访问",
    authPrimary: "主要：将手指放在扫描仪上",
    authSecondary: "次要：注视中心进行战术扫描",
    authIdentifying: "正在识别主体...",
    authMatchFound: "找到匹配项 [USER_ALPHA_9]",
    
    sysIntegrity: "系统完整性",
    networkLoad: "网络负载",
    activePolicies: "活动策略",
    
    sysIntegritySub: "未检测到违规",
    threatTrackerSub: "正在扫描数据包",
    networkLoadSub: "名义延迟",
    activePoliciesSub: "自动模式：开启",
    
    signalEntropy: "信号熵",
    heuristicBuffer: "启发式缓冲",
    dpiLatency: "DPI 延迟",
    mitigatedSec: "缓解 / 秒",
    
    liveTraffic: "实时流量统计",
    blocklistManager: "黑名单管理器",
    systemConfig: "系统配置",
    appearance: "外观",
    visualTheme: "视觉主题",
    logRetention: "日志保留",
    refreshRate: "刷新率",
    persistence: "持久化",
    saveDefaults: "保存默认设置",
    persistenceNote: "本地存储",
    
    neuralMitigation: "神经缓解",
    neuralMitigationSub: "启发式 100% 准确率引擎",
    milSpecStealth: "军用级隐身",
    milSpecStealthSub: "加密追踪掩蔽",
    
    language: "操作语言",
    secStatusEncrypted: "已加密",
    secStatusOffline: "离线",
    
    activate: "激活保护",
    deactivate: "停用",
    goLive: "上线",
    lock: "锁定",
    
    statusBlocked: "已拦截",
    statusAllowed: "已允许",
    mitigatedDos: "已缓解 DOS 向量",

    authPassword: "输入加密密钥",
    authPasswordSub: "需要高级管理权限",
    authKey: "战术密钥",
    authUnlock: "授权系统",
    
    hackerTitle: "黑客界面 // 命令中心",
    hackerHint: "输入 'HELP' 查看可用协议",
    hackerWarning: "检测到未经授权的修改",
    manualTitle: "操作手册",
    manualAuth: "访问协议",
    manualAuthStep1: "1. 战术访问：长按 Obsidian 护盾 3 秒以启动加密绕过序列。",
    manualAuthStep2: "2. PIN 输入：在战术键盘上输入受限访问代码（系统 PIN：0726）。",
    manualAuthStep3: "3. 验证：完成外围握手以获得完整的内核控制权。",
    manualTraffic: "流量监控",
    manualTrafficDesc: "实时的流量数据包分析。已拦截的数据包表示已缓解的威胁。",
    manualStealth: "隐身协议",
    manualStealthDesc: "启用军用级隐身以屏蔽外部扫描检测。",
    manualCredits: "战术设计师",
    manualInspiration: "设计灵感",
    manualInspirationDesc: "ObsidianVigil 出生于对秘密监控界面的需求。灵感来自深夜终端会话和深网防御节点的审美。",
    threatIntel: "威胁情报",
    networkTopology: "网络拓扑",
    globalEvents: "全球事件流",
    activeMitigation: "主动缓解",
    heuristicLevel: "启发式灵敏度",
    threatAlert: "检测到高强度威胁",
    radarSystem: "战术雷达",
    autoBlocker: "自动拦截器",
    intercepting: "正在拦截恶意请求",
    threatDeflected: "威胁已中和",
    autoUpdate: "自动护盾更新",
    backupSystem: "数据备份协议",
    securingData: "保护加密档案",
    applyingPatches: "应用零日补丁",
    systemUpToDate: "系统已是最新版本",
    systemTab: "系统内核",
    cpuLoad: "处理器负载",
    ramUsage: "内存缓冲区",
    diskHealth: "存储完整性",
    kernelLogs: "内核事件流",
    deviceIdentity: "硬件 ID",
    threatTracker: "威胁定位地图",
    originTrace: "源追踪激活",
    coordinates: "地理空间坐标",
  }
};
