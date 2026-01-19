import { motion } from 'framer-motion';
import { ScanSearch } from 'lucide-react';

export default function ScanAnimation({ isScanning = false }) {
  if (!isScanning) return null;

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Outer ring */}
      <motion.div
        className="absolute inset-0 border-4 border-accent-gold/30 rounded-full"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Middle ring */}
      <motion.div
        className="absolute inset-4 border-2 border-vibrant-orange/50 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner ring */}
      <motion.div
        className="absolute inset-8 border-2 border-accent-gold rounded-full"
        animate={{ rotate: -360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Center icon */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <ScanSearch className="w-10 h-10 text-accent-gold animate-pulse-glow" />
      </motion.div>

      {/* Scanning line */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent-gold to-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: 'center center' }}
      />
    </div>
  );
}
