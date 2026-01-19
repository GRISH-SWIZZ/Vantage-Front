import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  LayoutDashboard,
  ScanSearch,
  MessageSquare,
  History,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { dashboardLinks } from '../../lib/constants';

const iconMap = {
  LayoutDashboard,
  ScanSearch,
  MessageSquare,
  History,
  Settings,
};

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 border-b border-accent-gold/20">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Vantage" className="w-10 h-10 object-contain mx-auto" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {dashboardLinks.map((link) => {
          const Icon = iconMap[link.icon];
          const isActive = location.pathname === link.href;

          return (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300
                ${isActive
                  ? 'bg-accent-gold/20 text-accent-gold box-glow-gold'
                  : 'text-accent-gold/60 hover:bg-accent-gold/10 hover:text-accent-gold'
                }
              `}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <AnimatePresence>
                {!isCollapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-accent-gold/20 space-y-4">
        {user && !isCollapsed && (
          <div className="text-accent-gold/60 text-sm truncate px-4">
            {user.displayName || user.email || user.phoneNumber}
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg w-full text-primary-red hover:bg-primary-red/10 transition-all duration-300"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="whitespace-nowrap overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-deep-shadow/95 backdrop-blur-md border-b border-accent-gold/20">
        <div className="flex items-center justify-between px-4 h-16">
          <Link to="/" className="flex items-center gap-2">

            <img src="/logo.png" alt="Vantage" className="w-10 h-10 object-contain" />
          </Link>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="text-accent-gold p-2"
          >
            {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-16 bottom-0 w-64 bg-deep-shadow/95 backdrop-blur-md border-r border-accent-gold/20 z-50 flex flex-col"
            >
              <NavContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 80 : 256 }}
        className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 bg-deep-shadow/95 backdrop-blur-md border-r border-accent-gold/20 z-40"
      >
        <NavContent />

        {/* Collapse Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-20 w-6 h-6 bg-accent-gold rounded-full flex items-center justify-center text-deep-shadow hover:bg-light-gold transition-colors"
        >
          <motion.span
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            className="text-sm font-bold"
          >
            ←
          </motion.span>
        </button>
      </motion.aside>
    </>
  );
}
