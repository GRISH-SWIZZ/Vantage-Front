import { motion } from 'framer-motion';
import { Shield, Linkedin, Phone, Cpu, Globe, Lock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black pt-20 pb-10 overflow-hidden border-t border-accent-gold/10">

      {/* 1. Autonomous Data Stream Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <motion.div
          animate={{ y: [0, -1000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="text-[10px] font-mono text-accent-gold leading-relaxed whitespace-nowrap"
        >
          {Array(50).fill("ANALYZING_THREAT_VECTORS... ENCRYPTING_SESSION_LOGS... NEURAL_LINK_ESTABLISHED... ").join("\n")}
        </motion.div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand & Mission: The "Core" Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Shield className="w-10 h-10 text-accent-gold" />
                <motion.div
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-accent-gold/20 blur-md rounded-full"
                />
              </div>
              <span className="text-3xl font-bold font-heading text-white tracking-tighter">
                Vantage
              </span>
            </div>
            <p className="text-accent-gold/50 text-xs font-mono leading-relaxed uppercase tracking-widest">
              Autonomous Intelligence <br />
              for Cyber Resilience
            </p>
            <div className="flex gap-4">
              <Cpu className="w-4 h-4 text-accent-gold/30" />
              <Globe className="w-4 h-4 text-accent-gold/30" />
              <Lock className="w-4 h-4 text-accent-gold/30" />
            </div>
          </div>

          {/* System Directory: Functional Links */}
          <div className="space-y-6">
            <h3 className="text-white text-xs font-mono font-bold tracking-[0.3em] uppercase border-b border-accent-gold/20 pb-2">
              System_Directory
            </h3>
            <ul className="space-y-3">
              {['Features', 'Demo', 'Tech Stack'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-accent-gold/60 hover:text-white transition-all text-sm font-light flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-accent-gold/20 group-hover:bg-accent-gold rounded-full" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Comms Link: Contact info */}
          <div className="space-y-6">
            <h3 className="text-white text-xs font-mono font-bold tracking-[0.3em] uppercase border-b border-accent-gold/20 pb-2">
              Comms_Link
            </h3>
            <div className="space-y-4">
              <a
                href="https://www.linkedin.com/in/grish-narayanan"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-accent-gold/60 hover:text-white transition-all text-sm"
              >
                <div className="p-2 bg-white/5 rounded-lg group-hover:bg-accent-gold group-hover:text-black transition-all">
                  <Linkedin className="w-4 h-4" />
                </div>
                <span>Grish Narayanan</span>
              </a>
              <div className="flex items-center gap-3 text-accent-gold/60 text-sm">
                <div className="p-2 bg-white/5 rounded-lg">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="font-mono">9360765397</span>
              </div>
            </div>
          </div>

          {/* Live Diagnostics: A visual dashboard element */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex justify-between items-center text-[10px] font-mono text-accent-gold/40">
              <span>SYS_UPTIME</span>
              <span className="text-accent-gold italic">99.98%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div
                animate={{ width: ['0%', '85%', '82%', '90%'] }}
                transition={{ duration: 10, repeat: Infinity }}
                className="h-full bg-accent-gold/40"
              />
            </div>
            <p className="text-[10px] font-mono text-white/30 leading-tight uppercase">
              Operational Status: Autonomous engine monitoring active via Hybrid ML clusters.
            </p>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Metadata */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-accent-gold/30 text-[10px] font-mono uppercase tracking-widest">
            © {currentYear} Vantage Terminal — All Protocols Reserved
          </p>

          <div className="flex items-center gap-4">
            <div className="h-px w-8 bg-accent-gold/20" />
            <p className="text-accent-gold/50 text-xs font-light italic">
              Engineered & Innovated by  <span className="text-white font-medium">Grish Narayanan</span>
            </p>
            <div className="h-px w-8 bg-accent-gold/20" />
          </div>
        </div>
      </div>
    </footer>
  );
}