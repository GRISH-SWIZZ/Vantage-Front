import { forwardRef } from 'react';

const Input = forwardRef(({
  label,
  error,
  icon: Icon,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-accent-gold text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-accent-gold/60">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full bg-deep-shadow/80 border border-accent-gold/30
            rounded-lg px-4 py-3 text-accent-gold placeholder-accent-gold/40
            focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/50
            transition-all duration-300
            ${Icon ? 'pl-11' : ''}
            ${error ? 'border-primary-red focus:border-primary-red focus:ring-primary-red/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-primary-red">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
