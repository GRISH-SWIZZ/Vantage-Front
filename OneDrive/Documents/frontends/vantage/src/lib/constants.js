// Design tokens
export const colors = {
  deepBg: '#3E0404',
  primaryRed: '#9E1B06',
  vibrantOrange: '#D35400',
  accentGold: '#F1C40F',
  deepShadow: '#1A0A05',
  darkSurface: '#2A0303',
  lightGold: '#F5D547',
  mutedGold: '#C9A30A',
};

// Navigation links for header
export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Demo', href: '#demo' },
  { name: 'Features', href: '#features' },
  { name: 'Login', href: '/auth' },
];

// Dashboard navigation
export const dashboardLinks = [
  { name: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  { name: 'URL Scanner', href: '/dashboard/scanner', icon: 'ScanSearch' },
  { name: 'Chat with Vantage', href: '/dashboard/chat', icon: 'MessageSquare' },
  { name: 'Threat History', href: '/dashboard/history', icon: 'History' },
  { name: 'Settings', href: '/dashboard/settings', icon: 'Settings' },
];

// Features list
export const features = [
  {
    title: 'LLM Cyber Analyst',
    description: 'Advanced language model trained on cybersecurity threats and attack patterns.',
    icon: 'BrainCircuit',
  },
  {
    title: 'Self-learning Threat Memory',
    description: 'Continuously evolving database that learns from new threats and adapts.',
    icon: 'Brain',
  },
  {
    title: 'Explainable AI',
    description: 'Transparent decisions with clear reasoning for every threat assessment.',
    icon: 'Eye',
  },
  {
    title: 'Multi-layer Detection',
    description: 'Multiple defense layers working together for comprehensive protection.',
    icon: 'Shield',
  },
  {
    title: 'Chat with Security AI',
    description: 'Interactive conversations to understand threats and get security advice.',
    icon: 'MessageSquare',
  },
  {
    title: 'Cross-system Brain',
    description: 'Unified intelligence that works across your entire infrastructure.',
    icon: 'Bolt',
  },
];

// Tech stack
export const techStack = [
  { name: 'Backend', value: 'Flask, ML Model', icon: 'Server' },
  { name: 'LLM', value: 'Gemini API', icon: 'BrainCircuit' },
  { name: 'Frontend', value: 'React + Vite', icon: 'Code' },
  { name: 'Hosting', value: 'Firebase', icon: 'Cloud' },
  { name: 'Deployment', value: 'Render', icon: 'Rocket' },
];

// Innovation points
export const innovations = [
  {
    title: 'Autonomous',
    description: 'Self-operating security that requires minimal human intervention.',
  },
  {
    title: 'Self-learning',
    description: 'Continuously improves from new data and emerging threats.',
  },
  {
    title: 'Explainable',
    description: 'Every decision comes with clear, understandable reasoning.',
  },
];

// Chat suggestions - used as UI hints, actual responses come from backend
export const chatSuggestions = [
  'Why was this blocked?',
  'Explain this URL',
  "Show today's risks",
];
