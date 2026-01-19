import React from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  BrainCircuit,
  Code,
  ShieldCheck,
  Database,
  Globe,
  Cpu,
  Activity
} from 'lucide-react';
import Card from '../ui/Card';

const techStack = [
  {
    name: 'Intelligence Engine',
    category: 'Backend',
    value: 'Python Flask & ML',
    details: 'TF-IDF Vectorizer + Trained Classifier for URL threat detection.',
    icon: Server,
    status: 'SYS_ACTIVE'
  },
  {
    name: 'Brain of Vantage',
    category: 'AI Layer',
    value: 'Google Gemini API',
    details: 'Cyber AI Analyst explaining risks in natural language.',
    icon: BrainCircuit,
    status: 'LLM_CONNECTED'
  },
  {
    name: 'Cinematic Interface',
    category: 'Frontend',
    value: 'React + Vite',
    details: 'Modular UI with Framer Motion for smooth, high-fidelity animations.',
    icon: Code,
    status: 'UI_READY'
  },
  {
    name: 'Secure Access',
    category: 'Authentication',
    value: 'Firebase Auth',
    details: 'Google & Phone Number login with encrypted session management.',
    icon: ShieldCheck,
    status: 'SECURE'
  },
  {
    name: 'Scalable Hosting',
    category: 'Deployment',
    value: 'Render & Firebase',
    details: 'API-first deployment on cloud-ready, high-availability clusters.',
    icon: Globe,
    status: 'LIVE'
  },
];

// Continuous Background Data Stream Animation
const DataStream = () => (
  <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ y: -500 }}
        animate={{ y: 1000 }}
        transition={{
          duration: Math.random() * 10 + 10,
          repeat: Infinity,
          ease: "linear",
          delay: i * 2
        }}
        className="absolute w-[1px] h-64 bg-gradient-to-b from-transparent via-accent-gold to-transparent"
        style={{ left: `${i * 25}%` }}
      />
    ))}
  </div>
);

export default function TechStack() {
  return (
    <section id="tech" className="py-32 relative bg-deep-shadow overflow-hidden">
      <DataStream />

      {/* Ambient Red/Gold Pulsing Glows */}
      <motion.div
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-red/5 rounded-full blur-[120px]"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6 font-mono text-accent-gold/40 tracking-widest text-xs">
            <Activity className="w-4 h-4 animate-pulse" />
            <span>ENCRYPTED SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold font-heading text-accent-gold  mb-6 tracking-tight">
            The Tech <span className="text-white">Stack</span>
          </h2>
          <p className="text-accent-gold/60 text-lg max-w-3xl mx-auto font-light leading-relaxed">
            A production-ready ecosystem combining <span className="text-white">Explainable AI</span> with
            cloud-ready infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {techStack.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="relative group"
              >
                {/* Individual Card Background Glow */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                  className="absolute inset-0 bg-accent-gold/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
                />

                <Card className="relative h-full bg-black/40 border-accent-gold/20 p-8 flex flex-col items-center text-center backdrop-blur-md overflow-hidden">

                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
                    <span className="text-[8px] font-mono text-accent-gold/40">{tech.status}</span>
                  </div>

                  {/* Animated Icon Container */}
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-gold/10 to-transparent border border-accent-gold/30 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                  >
                    <Icon className="w-10 h-10 text-accent-gold" />
                  </motion.div>

                  <div className="mb-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-accent-gold/40 font-bold">
                      {tech.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1 mb-2 tracking-tight group-hover:text-accent-gold transition-colors">
                      {tech.name}
                    </h3>
                    <div className="h-px w-12 bg-accent-gold/30 mx-auto mb-3" />
                    <p className="text-accent-gold font-medium text-sm mb-4 leading-tight">
                      {tech.value}
                    </p>
                  </div>

                  <p className="text-white/40 text-xs leading-relaxed font-light">
                    {tech.details}
                  </p>

                  {/* Bottom "Loading" Bar Animation */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-accent-gold/5">
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
                      className="h-full w-1/3 bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent"
                    />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}