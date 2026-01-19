import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  ScanSearch, 
  MessageSquare, 
  History, 
  Shield,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';
import { getDashboardStats, getThreatHistory } from '../lib/api';

const quickActions = [
  { 
    title: 'URL Scanner', 
    description: 'Scan any URL for potential threats', 
    icon: ScanSearch, 
    href: '/dashboard/scanner',
    color: 'from-vibrant-orange to-accent-gold',
  },
  { 
    title: 'Chat with Vantage', 
    description: 'Ask questions about security threats', 
    icon: MessageSquare, 
    href: '/dashboard/chat',
    color: 'from-primary-red to-vibrant-orange',
  },
  { 
    title: 'Threat History', 
    description: 'View your scanning history', 
    icon: History, 
    href: '/dashboard/history',
    color: 'from-accent-gold to-light-gold',
  },
];

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    malicious: 0,
    benign: 0,
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch stats from backend
      const statsData = await getDashboardStats();
      setStats({
        total: statsData.total || 0,
        malicious: statsData.malicious || 0,
        benign: statsData.benign || 0,
      });

      // Fetch recent history for activity
      const historyData = await getThreatHistory();
      const historyArray = Array.isArray(historyData) ? historyData : (historyData.history || []);
      // Take last 5 items for recent activity
      setRecentActivity(historyArray.slice(0, 5));
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to connect to backend. Please ensure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const protectionScore = stats.total > 0 
    ? Math.round((stats.benign / stats.total) * 100) 
    : 100;

  const statsDisplay = [
    { label: 'Total Scans', value: stats.total.toLocaleString(), icon: ScanSearch, color: 'text-accent-gold' },
    { label: 'Threats Blocked', value: stats.malicious.toLocaleString(), icon: AlertTriangle, color: 'text-primary-red' },
    { label: 'Safe URLs', value: stats.benign.toLocaleString(), icon: CheckCircle, color: 'text-green-400' },
    { label: 'Protection Score', value: `${protectionScore}%`, icon: Shield, color: 'text-vibrant-orange' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold font-heading text-accent-gold text-glow-gold">
            Dashboard
          </h1>
          <p className="text-accent-gold/60 mt-1">
            Welcome back, {user?.displayName || 'User'}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchDashboardData}
            disabled={loading}
            icon={RefreshCw}
          >
            Refresh
          </Button>
          <div className="hidden md:flex items-center gap-2 text-accent-gold/60">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <span className="text-sm">All systems operational</span>
          </div>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 border-2 border-primary-red/30 bg-primary-red/5" hover={false}>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-primary-red shrink-0" />
              <div>
                <p className="text-primary-red">{error}</p>
                <p className="text-primary-red/70 text-sm mt-1">
                  Backend server should be running at http://127.0.0.1:5000
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statsDisplay.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-accent-gold/60 text-sm">{stat.label}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>
                      {loading ? '...' : stat.value}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-accent-gold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link to={action.href}>
                  <Card className="p-6 h-full group cursor-pointer">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7 text-deep-shadow" />
                    </div>
                    <h3 className="text-lg font-semibold text-accent-gold mb-2">
                      {action.title}
                    </h3>
                    <p className="text-accent-gold/60 text-sm">
                      {action.description}
                    </p>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold text-accent-gold mb-4">Recent Activity</h2>
        <Card className="p-0 overflow-hidden" hover={false}>
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin mx-auto mb-2" />
              <p className="text-accent-gold/60 text-sm">Loading activity...</p>
            </div>
          ) : recentActivity.length > 0 ? (
            <div className="divide-y divide-accent-gold/10">
              {recentActivity.map((activity, index) => (
                <motion.div
                  key={activity.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between p-4 hover:bg-accent-gold/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {activity.result === 'Benign' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-primary-red" />
                    )}
                    <span className="text-accent-gold/80 truncate max-w-[200px] md:max-w-md">
                      {activity.url}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium ${
                      activity.result === 'Benign' ? 'text-green-400' : 'text-primary-red'
                    }`}>
                      {activity.result}
                    </span>
                    <span className="text-accent-gold/40 text-sm hidden sm:block">
                      {activity.time || 'Recently'}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <History className="w-12 h-12 mx-auto text-accent-gold/30 mb-2" />
              <p className="text-accent-gold/60">No recent activity</p>
              <p className="text-accent-gold/40 text-sm mt-1">
                Start scanning URLs to see activity here
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
