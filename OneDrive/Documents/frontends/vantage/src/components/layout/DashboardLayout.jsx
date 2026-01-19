import { Outlet, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import Loading from '../ui/Loading';

export default function DashboardLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
        {/* Circular Pulse Loader Background */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute w-[300px] h-[300px] border-t border-accent-gold/20 rounded-full"
        />
        <Loading size="lg" text="DECRYPTING_BIO_DATA..." />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-accent-gold/40 font-mono">
      <Sidebar />

      {/* 1. THE VIEWPORT FRAME (HUD STYLE) */}
      <div className="fixed inset-4 pointer-events-none border border-white/[0.03] z-50">
        {/* Corner Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-accent-gold/40" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent-gold/40" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent-gold/40" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-accent-gold/40" />


      </div>

      {/* 2. MAIN CONTENT AREA */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="lg:ml-64 min-h-screen pt-16 lg:pt-0 relative z-10"
      >
        {/* Horizontal & Vertical Scanning Crosshair */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute w-full h-[1px] bg-accent-gold/5 shadow-[0_0_15px_rgba(212,175,55,0.2)]"
          />
        </div>

        <div className="p-6 lg:p-12">
          {/* Content Wrapper with Glass effect */}
          <div className="relative rounded-sm border border-white/5 bg-white/[0.01] backdrop-blur-[1px] p-2">
            <Outlet />
          </div>
        </div>
      </motion.main>

      {/* 3. CINEMATIC BACKGROUND (DEEP SPACE) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Floating Data Nodes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight
            }}
            animate={{
              y: [null, Math.random() * -100],
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute w-1 h-1 bg-accent-gold rounded-full"
          />
        ))}

        {/* Deep Radial Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-accent-gold/[0.03] rounded-full blur-[180px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-primary-red/[0.03] rounded-full blur-[180px]" />

        {/* Subtle Static Noise */}
        <div className="absolute inset-0 opacity-[0.015] contrast-150 brightness-150 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <style jsx global>{`
        /* Futuristic Scrollbar */
        ::-webkit-scrollbar {
          width: 2px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(212, 175, 55, 0.3);
        }
        
        /* Tactical Text selection */
        ::selection {
          background: rgba(212, 175, 55, 0.3);
          color: white;
        }
      `}</style>
    </div>
  );
}