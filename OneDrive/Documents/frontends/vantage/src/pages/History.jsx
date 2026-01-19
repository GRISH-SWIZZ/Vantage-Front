import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  History as HistoryIcon, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock,
  ExternalLink,
  Filter,
  RefreshCw,
  AlertCircle,
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { getThreatHistory } from '../lib/api';

const riskColors = {
  Low: 'text-green-400 bg-green-500/10 border-green-500/20',
  Medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  High: 'text-vibrant-orange bg-vibrant-orange/10 border-vibrant-orange/20',
  Critical: 'text-primary-red bg-primary-red/10 border-primary-red/20',
};

export default function History() {
  const [filter, setFilter] = useState('all'); // 'all', 'benign', 'malicious'
  const [threats, setThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getThreatHistory();
      // Handle both array and object responses
      const historyArray = Array.isArray(data) ? data : (data.history || []);
      setThreats(historyArray);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('Failed to connect to the backend. Please ensure the server is running.');
      setThreats([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const filteredThreats = threats.filter((threat) => {
    if (filter === 'all') return true;
    if (filter === 'benign') return threat.result === 'Benign';
    if (filter === 'malicious') return threat.result === 'Malicious';
    return true;
  });

  const stats = {
    total: threats.length,
    benign: threats.filter((t) => t.result === 'Benign').length,
    malicious: threats.filter((t) => t.result === 'Malicious').length,
  };

  // Determine risk level based on result if not provided
  const getRiskLevel = (threat) => {
    if (threat.riskLevel || threat.risk) return threat.riskLevel || threat.risk;
    return threat.result === 'Malicious' ? 'High' : 'Low';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold font-heading text-accent-gold text-glow-gold">
            Threat History
          </h1>
          <p className="text-accent-gold/60 mt-1">
            Timeline of all scanned URLs and their results
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={fetchHistory}
            disabled={loading}
            icon={RefreshCw}
            className={loading ? 'animate-spin' : ''}
          >
            Refresh
          </Button>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-accent-gold/60" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-deep-shadow/80 border border-accent-gold/30 rounded-lg px-3 py-2 text-accent-gold text-sm focus:outline-none focus:border-accent-gold"
            >
              <option value="all">All Results</option>
              <option value="benign">Benign Only</option>
              <option value="malicious">Malicious Only</option>
            </select>
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
              <p className="text-primary-red">{error}</p>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 text-center">
            <p className="text-accent-gold/60 text-sm">Total Scans</p>
            <p className="text-2xl font-bold text-accent-gold">{stats.total}</p>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 text-center">
            <p className="text-accent-gold/60 text-sm">Safe URLs</p>
            <p className="text-2xl font-bold text-green-400">{stats.benign}</p>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 text-center">
            <p className="text-accent-gold/60 text-sm">Threats Blocked</p>
            <p className="text-2xl font-bold text-primary-red">{stats.malicious}</p>
          </Card>
        </motion.div>
      </div>

      {/* Loading State */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-12 h-12 border-4 border-accent-gold/30 border-t-accent-gold rounded-full animate-spin mx-auto mb-4" />
          <p className="text-accent-gold/60">Loading threat history from backend...</p>
        </motion.div>
      )}

      {/* Timeline */}
      {!loading && (
        <div className="relative">
          {/* Timeline line */}
          {filteredThreats.length > 0 && (
            <div className="absolute left-6 top-0 bottom-0 w-px bg-accent-gold/20" />
          )}

          {/* Timeline items */}
          <div className="space-y-6">
            {filteredThreats.map((threat, index) => {
              const riskLevel = getRiskLevel(threat);
              return (
                <motion.div
                  key={threat.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div className={`absolute left-4 top-6 w-5 h-5 rounded-full border-4 ${
                    threat.result === 'Benign' 
                      ? 'bg-green-400 border-green-400/30' 
                      : 'bg-primary-red border-primary-red/30'
                  }`} />

                  <Card className="p-6" hover={false}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        {threat.result === 'Benign' ? (
                          <CheckCircle className="w-6 h-6 text-green-400 shrink-0" />
                        ) : (
                          <XCircle className="w-6 h-6 text-primary-red shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`text-lg font-semibold ${
                              threat.result === 'Benign' ? 'text-green-400' : 'text-primary-red'
                            }`}>
                              {threat.result}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${riskColors[riskLevel] || riskColors.Low}`}>
                              {riskLevel} Risk
                            </span>
                          </div>
                          <a 
                            href={threat.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-accent-gold/70 hover:text-accent-gold flex items-center gap-1 text-sm mt-1 break-all"
                          >
                            {threat.url}
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-accent-gold/50 text-sm">
                        <Clock className="w-4 h-4" />
                        {threat.time || 'Unknown time'}
                      </div>
                    </div>

                    {/* Reason */}
                    <div className="bg-deep-shadow/50 rounded-lg p-4 border border-accent-gold/10">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-vibrant-orange shrink-0 mt-0.5" />
                        <p className="text-accent-gold/70 text-sm">{threat.reason || 'No additional information available.'}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {filteredThreats.length === 0 && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HistoryIcon className="w-16 h-16 mx-auto text-accent-gold/30 mb-4" />
              <p className="text-accent-gold/60">
                {error ? 'Could not load history' : 'No scan history found'}
              </p>
              <p className="text-accent-gold/40 text-sm mt-2">
                Scan some URLs to see them appear here
              </p>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
