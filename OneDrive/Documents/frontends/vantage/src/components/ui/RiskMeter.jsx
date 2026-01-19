import { motion } from 'framer-motion';

const riskColors = {
  Low: { bg: 'bg-green-500', text: 'text-green-400', percentage: 20 },
  Medium: { bg: 'bg-yellow-500', text: 'text-yellow-400', percentage: 50 },
  High: { bg: 'bg-vibrant-orange', text: 'text-vibrant-orange', percentage: 75 },
  Critical: { bg: 'bg-primary-red', text: 'text-primary-red', percentage: 95 },
};

export default function RiskMeter({ level = 'Low', showLabel = true }) {
  const config = riskColors[level] || riskColors.Low;

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-accent-gold/80 text-sm">Risk Level</span>
          <span className={`font-semibold ${config.text}`}>{level}</span>
        </div>
      )}
      <div className="h-3 bg-deep-shadow/80 rounded-full overflow-hidden border border-accent-gold/20">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${config.percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${config.bg} rounded-full relative`}
        >
          <motion.div
            className="absolute inset-0 bg-white/30"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
}
