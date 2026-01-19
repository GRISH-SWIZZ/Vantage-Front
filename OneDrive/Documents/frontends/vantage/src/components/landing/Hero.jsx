import { motion } from 'framer-motion';
import { ChevronDown, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function Hero() {
  // Variants for staggered text reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background stays untouched as per request */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop playsInline className="w-full h-full object-cover">
          <source src="/bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col justify-between h-screen pt-24 pb-20">

        {/* Top: Branding & Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-none pt-10"
        >
          {/* Autonomous Status Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-red"></span>
            </span>
            <span className="text-[10px] font-mono tracking-[0.4em] text-accent-gold/50 uppercase">
              System Live
            </span>
          </motion.div>
          {/* Creator Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >


            <span className="text-[10px] md:text-xs font-mono text-accent-gold/60 tracking-[0.4em] uppercase">
              A Project by <span className="text-white border-accent-gold/30 pb-0.5">Grish Narayanan</span>
            </span>
          </motion.div>

          {/* Main Title with Autonomous Shimmer & Glow */}
          <motion.h1
            variants={itemVariants}
            className="relative text-7xl md:text-9xl font-bold tracking-tighter leading-none"
          >
            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-accent-gold via-light-gold to-accent-gold animate-shimmer">
              Vantage
            </span>
            {/* Soft autonomous pulse glow behind text */}
            <motion.span
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 z-0 blur-2xl text-accent-gold select-none"
            >
              Vantage
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Bottom: Tagline & Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex-none pb-12"
        >
          {/* Tagline with a "Glitch-In" Fade */}
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-3xl text-vibrant-orange font-medium mb-6 font-heading tracking-wide"
          >
            LLM and ML Backbone for <span className="text-white">Autonomous Cyber Resilience</span>
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-accent-gold/70 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-light"
          >
            Harness the power of advanced AI to detect, analyze, and respond to cyber threats
            autonomously. Experience next-generation security that <span className="text-accent-gold">learns and adapts</span> in real-time.
          </motion.p>

          {/* CTA Buttons with rhythmic glow */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="#demo">
              <Button size="lg" className="min-w-[180px] relative overflow-hidden group shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <span className="relative z-10">Try Demo</span>
                {/* Autonomous button sweep effect */}
                <motion.div
                  animate={{ x: ['-150%', '150%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                />
              </Button>
            </a>
            <Link to="/auth">
              <Button variant="secondary" size="lg" className="min-w-[180px] border-accent-gold/20 hover:border-accent-gold/50 transition-all">
                Login to Dashboard
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-8 h-8 text-accent-gold/40" />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background-size: 200% auto;
          animation: shimmer 6s linear infinite;
        }
      `}</style>
    </section>
  );
}