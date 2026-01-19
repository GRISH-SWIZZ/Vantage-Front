import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Phone, Mail, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import Loading from '../components/ui/Loading';

export default function Auth() {
  const [authMethod, setAuthMethod] = useState('google'); // 'google' or 'phone'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, loading, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-deep-bg flex items-center justify-center">
        <Loading size="lg" text="Loading..." />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to sign in with Google. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber.trim()) return;

    setIsLoading(true);
    setError('');

    // Simulate OTP send (in real app, use Firebase phone auth)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStep('otp');
    setIsLoading(false);
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (!otp.trim()) return;

    setIsLoading(true);
    setError('');

    // Simulate OTP verification
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // For demo, just show error since we need real Firebase config
    setError('Phone authentication requires Firebase configuration. Please use Google Sign-in for demo.');
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-deep-bg flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial opacity-50" />

        {/* Animated circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 -left-32 w-96 h-96 border border-primary-red/20 rounded-full"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] border border-vibrant-orange/20 rounded-full"
        />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(var(--color-accent-gold) 1px, transparent 1px),
              linear-gradient(90deg, var(--color-accent-gold) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-accent-gold/60 hover:text-accent-gold mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <Card className="p-8" glow hover={false}>
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <img src="/logo.png" alt="Vantage" className="w-16 h-16 mx-auto mb-4 object-contain" />
            </motion.div>
            <h1 className="text-3xl font-bold font-heading text-accent-gold text-glow-gold">
              Welcome to Vantage
            </h1>
            <p className="text-accent-gold/60 mt-2">
              Sign in to access the dashboard
            </p>
          </div>

          {/* Auth Methods Toggle */}
          <div className="flex rounded-lg bg-deep-shadow/80 p-1 mb-6">
            <button
              onClick={() => { setAuthMethod('google'); setError(''); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${authMethod === 'google'
                  ? 'bg-accent-gold text-deep-shadow'
                  : 'text-accent-gold/60 hover:text-accent-gold'
                }`}
            >
              Google
            </button>
            <button
              onClick={() => { setAuthMethod('phone'); setError(''); setStep('phone'); }}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${authMethod === 'phone'
                  ? 'bg-accent-gold text-deep-shadow'
                  : 'text-accent-gold/60 hover:text-accent-gold'
                }`}
            >
              Phone
            </button>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-primary-red/10 border border-primary-red/30 rounded-lg p-3 mb-6"
              >
                <p className="text-primary-red text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Google Sign In */}
          <AnimatePresence mode="wait">
            {authMethod === 'google' && (
              <motion.div
                key="google"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full"
                  size="lg"
                >
                  {isLoading ? (
                    <Loading size="sm" />
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Login with Google
                    </>
                  )}
                </Button>
              </motion.div>
            )}

            {authMethod === 'phone' && (
              <motion.div
                key="phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                {step === 'phone' ? (
                  <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 234 567 8900"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      icon={Phone}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !phoneNumber.trim()}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? <Loading size="sm" /> : 'Send OTP'}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <p className="text-accent-gold/60 text-sm mb-4">
                      Enter the OTP sent to {phoneNumber}
                    </p>
                    <Input
                      label="OTP"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      icon={Mail}
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !otp.trim()}
                      className="w-full"
                      size="lg"
                    >
                      {isLoading ? <Loading size="sm" /> : 'Verify OTP'}
                    </Button>
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="w-full text-accent-gold/60 hover:text-accent-gold text-sm"
                    >
                      Change phone number
                    </button>
                  </form>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recaptcha container for phone auth */}
          <div id="recaptcha-container" />
        </Card>
      </div>
    </div>
  );
}
