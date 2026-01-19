import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Eye, Zap, Activity, BookOpen, ShieldAlert, Cpu } from 'lucide-react';

const innovations = [
  {
    title: 'Not Just a Scanner',
    subtitle: 'The Cyber Brain',
    description: 'Vantage isn\'t a simple checker. It thinks, learns, and explains like a living intelligence system.',
    icon: Brain,
    align: 'left',
  },
  {
    title: 'Explainable by Design',
    subtitle: 'Transparent Forensic Logic',
    description: 'While others only say "Dangerous," Vantage reveals the exact logic behind every risk assessment.',
    icon: Eye,
    align: 'right',
  },
  {
    title: 'AI + ML Synergy',
    subtitle: 'Multi-Layer Processing',
    description: 'A unified stack where ML classifiers, rule engines, and Gemini LLMs work in a single autonomous loop.',
    icon: Cpu,
    align: 'left',
  },
  {
    title: 'Autonomous Flow',
    subtitle: 'End-to-End Intelligence',
    description: 'From URL input to forensic explanation and history storage—the system operates without manual intervention.',
    icon: Zap,
    align: 'right',
  },
  {
    title: 'Built for Learning',
    subtitle: 'Threat Education',
    description: 'A platform designed to teach users about cyber threats, transforming blocking into understanding.',
    icon: BookOpen,
    align: 'left',
  },
];

// Moving Data Packet Component
const DataPacket = ({ delay = 0 }) => (
  <motion.div
    initial={{ top: '-10%', opacity: 0 }}
    animate={{ top: '110%', opacity: [0, 1, 1, 0] }}
    transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay }}
    className="absolute left-1/2 -translate-x-1/2 w-[2px] h-12 bg-gradient-to-b from-transparent via-accent-gold to-transparent z-20"
  />
);

export default function InnovationFlow() {
  return (
    <section className="py-32 relative bg-black overflow-hidden font-sans">

      {/* 1. SECTION HEADER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mb-32">
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-red-900/30 bg-red-950/10 mb-6"
        >
          <Activity className="w-3 h-3 text-red-500" />
          <span className="text-[10px] font-mono text-red-500 tracking-[0.3em] uppercase">Neural Backbone Active</span>
        </motion.div>
        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
          Why Vantage is <span className="text-accent-gold">Different</span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto px-4">

        {/* 2. THE CENTRAL SPINE (Backbone) */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-accent-gold/20 to-transparent">
          {/* Autonomous Data Streams */}
          <DataPacket delay={0} />
          <DataPacket delay={1.5} />
          <DataPacket delay={3} />
        </div>

        {/* 3. INTELLIGENCE NODES */}
        <div className="space-y-24 md:space-y-40">
          {innovations.map((item, index) => {
            const Icon = item.icon;
            const isLeft = item.align === 'left';

            return (
              <div key={index} className={`relative flex items-center ${isLeft ? 'justify-start' : 'justify-end'}`}>

                {/* Node Connection Line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '10%' }}
                  viewport={{ once: true }}
                  className={`absolute top-1/2 ${isLeft ? 'left-1/2' : 'right-1/2'} h-[1px] bg-accent-gold/20`}
                />

                {/* Central Point Pulse */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black border border-accent-gold z-30">
                  <motion.div
                    animate={{ scale: [1, 3], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-accent-gold"
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className={`w-full md:w-[42%] group`}
                >
                  <div className={`p-8 rounded-2xl bg-gradient-to-br ${isLeft ? 'from-deep-shadow to-black' : 'from-black to-deep-shadow'} border border-white/5 relative overflow-hidden`}>

                    {/* Animated "Processing" Corner */}
                    <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} p-4`}>
                      <Icon className="w-12 h-12 text-accent-gold/20 group-hover:text-accent-gold/40 transition-colors duration-700" />
                    </div>

                    <div className="relative z-10">
                      <span className="text-[10px] font-mono text-accent-gold tracking-[0.4em] uppercase opacity-50">
                        {item.title}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-2 mb-4 group-hover:text-accent-gold transition-colors duration-500">
                        {item.subtitle}
                      </h3>
                      <div className={`w-12 h-[2px] bg-accent-gold/40 mb-6 ${isLeft ? '' : 'ml-auto'}`} />
                      <p className={`text-gray-400 text-sm leading-relaxed ${isLeft ? 'text-left' : 'md:text-right'}`}>
                        {item.description}
                      </p>
                    </div>

                    {/* Bottom Scanning Effect */}
                    <motion.div
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 6, repeat: Infinity, ease: 'linear', delay: index }}
                      className="absolute bottom-0 left-0 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/30 to-transparent"
                    />
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CINEMATIC FOOTER FOR THE FLOW */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mt-32 relative z-10"
      >
        <div className="inline-block p-1 px-4 border border-white/10 rounded-full bg-black/50 backdrop-blur-md">
          <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">
            Intelligence architecture optimized for scale
          </p>
        </div>
      </motion.div>
    </section>
  );
}