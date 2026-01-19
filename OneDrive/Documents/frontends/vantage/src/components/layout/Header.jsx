import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Activity } from 'lucide-react';
import { navLinks } from '../../lib/constants';
import Button from '../ui/Button';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll for translucent depth change
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-black/40 backdrop-blur-xl border-b border-white/5 py-2'
          : 'bg-transparent py-4'
        }`}
    >
      {/* Autonomous Scanning Line (Only visible on scroll) */}
      {scrolled && (
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-gradient-to-r from-transparent via-accent-gold/40 to-transparent"
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo with Holographic Pulse */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Vantage Logo"
                className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500"
              />
              <motion.div
                animate={{ opacity: [0, 0.5, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-accent-gold blur-lg rounded-full z-[-1]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-heading text-white tracking-tighter leading-none group-hover:text-accent-gold transition-colors">
                Vantage
              </span>
              <span className="text-[8px] font-mono text-accent-gold/40 tracking-[0.3em] uppercase">
                Neural.OS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Tech Style */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-[11px] font-mono tracking-[0.2em] uppercase transition-all duration-300 group"
                >
                  <span className={`${isActive ? 'text-accent-gold' : 'text-white/50 group-hover:text-white'}`}>
                    {link.name}
                  </span>

                  {/* Under-bracket animation */}
                  {isActive ? (
                    <motion.div
                      layoutId="nav-bracket"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] bg-accent-gold"
                    />
                  ) : (
                    <div className="absolute -bottom-2 left-1/2 right-1/2 h-[2px] bg-white/20 group-hover:left-0 group-hover:right-0 transition-all duration-300" />
                  )}
                </a>
              );
            })}

            <div className="h-4 w-[1px] bg-white/10 mx-2" />

            <Link to="/auth">
              <Button
                variant="secondary"
                size="sm"
                className="border-accent-gold/20 hover:border-accent-gold text-xs font-mono tracking-widest px-6"
              >
                LOGIN
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button with Pulse */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-2 text-accent-gold"
          >
            <div className="relative z-10">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </div>
            {!isOpen && (
              <motion.div
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-accent-gold/20 rounded-lg"
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation - Translucent Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-0 right-0 bg-black/90 backdrop-blur-2xl border-b border-accent-gold/20"
          >
            <nav className="flex flex-col px-8 py-10 gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-heading text-white/70 hover:text-accent-gold transition-colors flex items-center justify-between group"
                >
                  {link.name}
                  <Activity className="w-4 h-4 opacity-0 group-hover:opacity-100 text-accent-gold transition-all" />
                </a>
              ))}
              <Link to="/auth" onClick={() => setIsOpen(false)} className="pt-4">
                <Button className="w-full py-4 text-black font-bold uppercase tracking-widest">
                  Access Dashboard
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}