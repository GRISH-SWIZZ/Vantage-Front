import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScanSearch, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import ScanAnimation from '../ui/ScanAnimation';
import RiskMeter from '../ui/RiskMeter';
import { scanUrl } from '../../lib/api';

export default function Demo() {
  const [url, setUrl] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async () => {
    if (!url.trim()) return;

    setIsScanning(true);
    setResult(null);

    try {
      const data = await scanUrl(url);

      setResult({
        status: data.prediction,
        riskLevel: data.risk,
        message: data.reason,
      });
    } catch (err) {
      setResult({
        status: 'Error',
        riskLevel: 'Unknown',
        message: 'Failed to connect to backend. Make sure Flask is running.',
      });
    }

    setIsScanning(false);
  };

  return (
    <section id="demo" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-radial opacity-50" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-accent-gold  mb-4">
            Mini Demo
          </h2>
          <p className="text-accent-gold/60 text-lg max-w-2xl mx-auto">
            Try our URL scanner and see Vantage in action
          </p>
        </motion.div>

        <Card className="p-8" glow hover={false}>
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-1">
              <Input
                placeholder="Enter URL to check (e.g., https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                icon={ScanSearch}
                disabled={isScanning}
              />
            </div>
            <Button
              onClick={handleScan}
              disabled={isScanning || !url.trim()}
              className="shrink-0"
            >
              {isScanning ? 'Scanning...' : 'Check'}
            </Button>
          </div>

          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="py-8"
              >
                <ScanAnimation isScanning={isScanning} />
                <p className="text-center text-accent-gold/60 mt-4">
                  Analyzing URL for potential threats...
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && !isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`rounded-xl p-6 border ${result.status === 'Benign'
                  ? 'bg-green-500/10 border-green-500/30'
                  : result.status === 'Malicious'
                    ? 'bg-primary-red/10 border-primary-red/30'
                    : 'bg-vibrant-orange/10 border-vibrant-orange/30'
                  }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  {result.status === 'Benign' ? (
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  ) : result.status === 'Malicious' ? (
                    <XCircle className="w-12 h-12 text-primary-red" />
                  ) : (
                    <AlertTriangle className="w-12 h-12 text-vibrant-orange" />
                  )}
                  <div>
                    <h3
                      className={`text-2xl font-bold ${result.status === 'Benign'
                        ? 'text-green-400'
                        : result.status === 'Malicious'
                          ? 'text-primary-red'
                          : 'text-vibrant-orange'
                        }`}
                    >
                      {result.status}
                    </h3>
                    <p className="text-accent-gold/60">{url}</p>
                  </div>
                </div>

                <RiskMeter level={result.riskLevel} />

                <p className="mt-4 text-accent-gold/80 flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-vibrant-orange" />
                  {result.message}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </div>
    </section>
  );
}
