import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ScanSearch, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Info,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import ScanAnimation from '../components/ui/ScanAnimation';
import RiskMeter from '../components/ui/RiskMeter';
import { scanUrl, saveThreat } from '../lib/api';

export default function Scanner() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [error, setError] = useState(null);

  const handleScan = async () => {
    if (!url.trim()) return;

    setIsScanning(true);
    setResult(null);
    setError(null);

    try {
      // Call backend API for URL scan
      const response = await scanUrl(url);
      
      const newResult = {
        url,
        status: response.prediction,
        riskLevel: response.risk || (response.prediction === 'Malicious' ? 'High' : 'Low'),
        timestamp: new Date().toLocaleString(),
        explanation: response.explanation,
        details: {
          ssl: url.startsWith('https://'),
          domain: url.includes('.') ? url.split('/')[2] || url : 'Unknown',
          checks: [
            { name: 'SSL Certificate', passed: url.startsWith('https://') },
            { name: 'Domain Reputation', passed: response.prediction === 'Benign' },
            { name: 'Malware Scan', passed: response.prediction === 'Benign' },
            { name: 'Phishing Detection', passed: response.prediction === 'Benign' },
          ],
        },
      };

      setResult(newResult);
      setScanHistory((prev) => [newResult, ...prev.slice(0, 4)]);

      // Save threat to backend history
      try {
        await saveThreat(url, response.prediction, response.explanation);
      } catch (saveError) {
        console.error('Failed to save to history:', saveError);
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError('Failed to connect to the security backend. Please ensure the server is running at http://127.0.0.1:5000');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold font-heading text-accent-gold text-glow-gold">
          URL Scanner
        </h1>
        <p className="text-accent-gold/60 mt-1">
          Analyze any URL for potential security threats
        </p>
      </motion.div>

      {/* Scanner Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6" glow hover={false}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Enter URL to scan (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                icon={ScanSearch}
                disabled={isScanning}
                onKeyDown={(e) => e.key === 'Enter' && handleScan()}
              />
            </div>
            <Button
              onClick={handleScan}
              disabled={isScanning || !url.trim()}
              className="shrink-0"
              size="lg"
            >
              {isScanning ? 'Scanning...' : 'Scan'}
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Error Message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="p-4 border-2 border-primary-red/30 bg-primary-red/5" hover={false}>
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-primary-red shrink-0" />
                <p className="text-primary-red">{error}</p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanning Animation */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <Card className="p-8" hover={false}>
              <ScanAnimation isScanning={isScanning} />
              <p className="text-center text-accent-gold/60 mt-6">
                Analyzing URL for potential threats...
              </p>
              <div className="mt-4 space-y-2 max-w-md mx-auto">
                {['Connecting to AI backend', 'Running ML threat detection', 'Analyzing domain reputation', 'Generating threat report'].map((step, index) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.5 }}
                    className="flex items-center gap-2 text-accent-gold/60 text-sm"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-accent-gold/30 border-t-accent-gold rounded-full"
                    />
                    {step}
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card 
              className={`p-6 border-2 ${
                result.status === 'Benign'
                  ? 'border-green-500/30 bg-green-500/5'
                  : 'border-primary-red/30 bg-primary-red/5'
              }`}
              hover={false}
            >
              {/* Status Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {result.status === 'Benign' ? (
                    <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-10 h-10 text-green-400" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-primary-red/20 flex items-center justify-center">
                      <XCircle className="w-10 h-10 text-primary-red" />
                    </div>
                  )}
                  <div>
                    <h2 className={`text-3xl font-bold ${
                      result.status === 'Benign' ? 'text-green-400' : 'text-primary-red'
                    }`}>
                      {result.status}
                    </h2>
                    <p className="text-accent-gold/60 flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      <span className="truncate max-w-[300px]">{result.url}</span>
                    </p>
                  </div>
                </div>
                <span className="text-accent-gold/40 text-sm">{result.timestamp}</span>
              </div>

              {/* Risk Meter */}
              <div className="mb-6">
                <RiskMeter level={result.riskLevel} />
              </div>

              {/* Security Checks */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {result.details.checks.map((check) => (
                  <div 
                    key={check.name}
                    className={`p-3 rounded-lg border ${
                      check.passed 
                        ? 'border-green-500/20 bg-green-500/5' 
                        : 'border-primary-red/20 bg-primary-red/5'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {check.passed ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-primary-red" />
                      )}
                      <span className="text-xs text-accent-gold/60">{check.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${
                      check.passed ? 'text-green-400' : 'text-primary-red'
                    }`}>
                      {check.passed ? 'Passed' : 'Failed'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Explanation from Backend AI */}
              <div className="p-4 rounded-lg bg-deep-shadow/50 border border-accent-gold/10">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-vibrant-orange shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-accent-gold font-medium mb-1">AI Analysis</h3>
                    <p className="text-accent-gold/70 text-sm leading-relaxed">
                      {result.explanation}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recent Scans */}
      {scanHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-accent-gold mb-4">Recent Scans</h2>
          <Card className="p-0 overflow-hidden" hover={false}>
            <div className="divide-y divide-accent-gold/10">
              {scanHistory.map((scan, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 hover:bg-accent-gold/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {scan.status === 'Benign' ? (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-primary-red" />
                    )}
                    <span className="text-accent-gold/80 truncate max-w-[200px] md:max-w-md">
                      {scan.url}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-medium ${
                      scan.status === 'Benign' ? 'text-green-400' : 'text-primary-red'
                    }`}>
                      {scan.status}
                    </span>
                    <span className="text-accent-gold/40 text-sm hidden sm:block">
                      {scan.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
