import React from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MessageSquare,
  Eye,
  ShieldCheck,
  Lock,
  LayoutDashboard,
  Zap,
  ShieldAlert
} from 'lucide-react';

const features = [
  {
    title: 'Real-Time URL Scanner',
    description: 'Autonomous ML engine classifying links as Benign or Malicious with live Low/Medium/High risk scoring.',
    icon: Search,
    status: 'ACTIVE_SCAN',
    color: 'border-red-600'
  },
  {
    title: 'AI Cyber Analyst',
    description: 'Direct Gemini API bridge. Natural language forensic analysis on why specific URLs are flagged.',
    icon: MessageSquare,
    status: 'LLM_READY',
    color: 'border-accent-gold'
  },
  {
    title: 'Explainable AI',
    description: 'Full logic transparency. Every detection result includes a forensic reason to eliminate black-box decisions.',
    icon: Eye,
    status: 'XAI_LIVE',
    color: 'border-red-500'
  },
  {
    title: 'Multi-Layer Detection',
    description: '4-tier security stack: Pattern matching, ML classification, Rule-based filtering, and LLM explanation.',
    icon: ShieldAlert,
    status: 'LAYERED_PROT',
    color: 'border-red-900'
  },
  {
    title: 'Secure Authentication',
    description: 'Firebase-secured Google and Phone login protocols with encrypted session persistence.',
    icon: Lock,
    status: 'AUTH_ENCRYPTED',
    color: 'border-accent-gold/50'
  },
  {
    title: 'Personal Dashboard',
    description: 'Cloud-hosted command center. Track scan history, review past threats, and manage account settings.',
    icon: LayoutDashboard,
    status: 'SYNC_CLOUD',
    color: 'border-red-700'
  }
];

// Floating and Pulsing Animation Variants
const floatVariants = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const pulseVariants = {
  animate: {
    opacity: [0.4, 1, 0.4],
    scale: [0.98, 1.02, 0.98],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const FeatureCard = ({ feature, index }) => {
  const Icon = feature.icon;

  return (
    <motion.div
      variants={floatVariants}
      animate="animate"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
    >
      {/* Background Glow Pulse */}
      <motion.div
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -inset-2 bg-red-600 rounded-2xl blur-2xl z-0"
      />

      <div className={`relative z-10 h-full bg-black/60 backdrop-blur-md border-l-4 ${feature.color} p-8 rounded-r-xl overflow-hidden group`}>

        {/* Animated "Scan Line" moving across the card autonomously */}
        <motion.div
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: index }}
          className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent skew-x-12 pointer-events-none"
        />

        <div className="flex justify-between items-start mb-6">
          <motion.div
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="p-3 bg-red-950/30 border border-red-500/20 rounded-lg"
          >
            <Icon className="w-8 h-8 text-accent-gold" />
          </motion.div>

          <div className="flex flex-col items-end">
            <span className="text-[9px] font-mono text-accent-gold/40 tracking-[0.2em] mb-1">STATUS</span>
            <span className="text-[10px] font-mono text-red-500 font-bold bg-red-500/5 px-2 py-0.5 border border-red-500/20 rounded">
              {feature.status}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-red-500 transition-colors duration-500">
          {feature.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed mb-6 font-light">
          {feature.description}
        </p>

        {/* Autonomous Progress/Risk Meter Visual */}
        <div className="flex items-center gap-4">
          <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: ['10%', '100%', '10%'] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: index }}
              className="h-full bg-gradient-to-r from-red-800 to-red-500"
            />
          </div>
          <motion.div
            variants={pulseVariants}
            animate="animate"
            className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Features() {
  return (
    <section id="features" className="py-28 relative bg-[#020202] overflow-hidden">

      {/* Moving Digital Grid Background */}
      <motion.div
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#4a0000 1px, transparent 1px), linear-gradient(90deg, #4a0000 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-red-500 font-mono text-sm tracking-[0.5em] uppercase mb-4"
          >
            &gt; SYSTEM_FEATURES_LOADED
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tighter">
            Cyber <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-accent-gold">Vantage</span> Core
          </h2>

          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A production-ready architecture designed for <span className="text-red-500">real-time link forensics</span> and cloud-ready threat analysis.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>

      {/* Cinematic Red Fog */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}