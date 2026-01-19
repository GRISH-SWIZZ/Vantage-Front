import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = true,
  glow = false,
  ...props
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ duration: 0.3 }}
      className={`
        bg-deep-shadow/60 backdrop-blur-sm
        border border-accent-gold/20 rounded-xl
        p-6 transition-all duration-300
        ${glow ? 'box-glow-gold' : 'hover:border-accent-gold/40'}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
}
