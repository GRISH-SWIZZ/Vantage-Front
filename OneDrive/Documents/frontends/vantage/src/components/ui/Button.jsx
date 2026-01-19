import { motion } from 'framer-motion';

const variants = {
  primary: 'bg-vibrant-orange hover:bg-accent-gold text-deep-shadow font-semibold',
  secondary: 'bg-transparent border-2 border-accent-gold text-accent-gold hover:bg-accent-gold hover:text-deep-shadow',
  danger: 'bg-primary-red hover:bg-vibrant-orange text-white',
  ghost: 'bg-transparent text-accent-gold hover:text-light-gold hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  icon: Icon,
  ...props
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg font-medium transition-all duration-300
        flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
}
