import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Terminal, Radio } from 'lucide-react';
import Button from '../ui/Button';

export default function CTA() {
  return (
    <section className="py-32 relative overflow-hidden bg-black">

      {/* 1. Peripheral Scanning Lines (Top & Bottom) */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary-red/50 to-transparent" />

      {/* 2. Autonomous Background Signal Waves */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 2],
              opacity: [0.1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 1.3,
              ease: "easeOut"
            }}
            className="absolute w-[400px] h-[400px] border border-accent-gold/20 rounded-full"
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

          {/* Left Side: Technical Callout */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 text-left"
          >
            <div className="flex items-center gap-3 mb-6 font-mono text-accent-gold/50 tracking-tighter text-xs">
              <Terminal className="w-4 h-4" />
              <span>READY_FOR_DEPLOYMENT_V2.0</span>
            </div>

            <h2 className="text-5xl md:text-7xl font-bold font-heading text-white leading-[0.9] mb-8">
              Initiate <br />
              <span className="text-accent-gold">Vantage Core</span>
            </h2>

            <p className="text-accent-gold/60 text-lg max-w-md leading-relaxed font-light">
              Don't just scan—understand. Deploy our <span className="text-white">autonomous neural backbone</span>
              to transform your cyber defense from reactive to intelligent.
            </p>
          </motion.div>

          {/* Right Side: The "Clearance" Console */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-[450px] relative"
          >
            {/* Holographic Frame */}
            <div className="relative p-10 bg-deep-shadow/40 border border-accent-gold/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">

              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent-gold/40" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent-gold/40" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent-gold/40" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent-gold/40" />

              <div className="relative z-10 text-center space-y-8">
                <div className="relative inline-block">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-4 border border-dashed border-accent-gold/20 rounded-full"
                  />
                  <ShieldCheck className="w-16 h-16 text-accent-gold mx-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]" />
                </div>

                <div className="space-y-4">
                  <Link to="/auth" className="block">
                    <Button
                      size="lg"
                      icon={ArrowRight}
                      className="w-full bg-accent-gold text-black hover:bg-white transition-all py-6 text-lg font-bold tracking-tight"
                    >
                      Try Full System
                    </Button>
                  </Link>
                  <Link to="/auth" className="block">
                    <Button
                      variant="secondary"
                      size="lg"
                      className="w-full border-accent-gold/20 hover:border-accent-gold/50 py-6"
                    >
                      Login to Dashboard
                    </Button>
                  </Link>
                </div>

                <div className="pt-4 flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-accent-gold/30 uppercase tracking-[0.2em]">Auth Level</span>
                    <span className="text-white text-xs font-mono">ENCRYPTED</span>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] font-mono text-accent-gold/30 uppercase tracking-[0.2em]">Response</span>
                    <span className="text-white text-xs font-mono">REAL-TIME</span>
                  </div>
                </div>
              </div>

              {/* Autonomous Scanning Sweep */}
              <motion.div
                animate={{ y: ['-100%', '300%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-accent-gold/5 to-transparent pointer-events-none"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Micro-Elements */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-y-1/2" />
    </section>
  );
}