import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Shield, 
  Moon, 
  Sun,
  LogOut,
  Bell,
  Lock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="space-y-8 max-w-3xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heading text-accent-gold text-glow-gold">
          Settings
        </h1>
        <p className="text-accent-gold/60 mt-1">
          Manage your account and preferences
        </p>
      </motion.div>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-xl font-semibold text-accent-gold mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          User Information
        </h2>
        <Card className="p-6" hover={false}>
          <div className="flex items-center gap-6 mb-6">
            {/* Avatar */}
            <div className="relative">
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full border-2 border-accent-gold/30"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-vibrant-orange to-accent-gold flex items-center justify-center">
                  <User className="w-10 h-10 text-deep-shadow" />
                </div>
              )}
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-400 rounded-full border-4 border-deep-shadow" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-accent-gold">
                {user?.displayName || 'User'}
              </h3>
              <p className="text-accent-gold/60 text-sm">Active account</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="flex items-center gap-4 p-4 bg-deep-shadow/50 rounded-lg border border-accent-gold/10">
              <Mail className="w-5 h-5 text-accent-gold/60" />
              <div>
                <p className="text-accent-gold/50 text-xs uppercase tracking-wide">Email</p>
                <p className="text-accent-gold">{user?.email || 'Not provided'}</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4 p-4 bg-deep-shadow/50 rounded-lg border border-accent-gold/10">
              <Phone className="w-5 h-5 text-accent-gold/60" />
              <div>
                <p className="text-accent-gold/50 text-xs uppercase tracking-wide">Phone</p>
                <p className="text-accent-gold">{user?.phoneNumber || 'Not provided'}</p>
              </div>
            </div>

            {/* UID */}
            <div className="flex items-center gap-4 p-4 bg-deep-shadow/50 rounded-lg border border-accent-gold/10">
              <Shield className="w-5 h-5 text-accent-gold/60" />
              <div>
                <p className="text-accent-gold/50 text-xs uppercase tracking-wide">User ID</p>
                <p className="text-accent-gold font-mono text-sm truncate max-w-[300px]">
                  {user?.uid || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-xl font-semibold text-accent-gold mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Preferences
        </h2>
        <Card className="p-6" hover={false}>
          <div className="space-y-4">
            {/* Notifications */}
            <div className="flex items-center justify-between p-4 bg-deep-shadow/50 rounded-lg border border-accent-gold/10">
              <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-accent-gold/60" />
                <div>
                  <p className="text-accent-gold font-medium">Notifications</p>
                  <p className="text-accent-gold/50 text-sm">Receive threat alerts</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                  notifications ? 'bg-accent-gold' : 'bg-accent-gold/20'
                }`}
              >
                <motion.div
                  animate={{ x: notifications ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-deep-shadow"
                />
              </button>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between p-4 bg-deep-shadow/50 rounded-lg border border-accent-gold/10">
              <div className="flex items-center gap-4">
                {darkMode ? (
                  <Moon className="w-5 h-5 text-accent-gold/60" />
                ) : (
                  <Sun className="w-5 h-5 text-accent-gold/60" />
                )}
                <div>
                  <p className="text-accent-gold font-medium">Dark Mode</p>
                  <p className="text-accent-gold/50 text-sm">Toggle theme appearance</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                  darkMode ? 'bg-accent-gold' : 'bg-accent-gold/20'
                }`}
              >
                <motion.div
                  animate={{ x: darkMode ? 24 : 2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className="absolute top-1 w-4 h-4 rounded-full bg-deep-shadow"
                />
              </button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-semibold text-accent-gold mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Security
        </h2>
        <Card className="p-6" hover={false}>
          <div className="space-y-4">
            <div className="p-4 bg-deep-shadow/50 rounded-lg border border-accent-gold/10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-accent-gold font-medium">Account Security</p>
                  <p className="text-accent-gold/50 text-sm">
                    Signed in via {user?.providerData?.[0]?.providerId || 'Firebase'}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <Shield className="w-4 h-4" />
                  Secure
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Logout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6" hover={false}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-accent-gold font-medium">Sign Out</h3>
              <p className="text-accent-gold/50 text-sm">
                Sign out of your account on this device
              </p>
            </div>
            <Button variant="danger" onClick={handleLogout} icon={LogOut}>
              Logout
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
