import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Mail, Lock, ChevronRight } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center p-6 bg-gradient-premium">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.3)] mb-4">
            <Trophy size={40} className="text-navy-900" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Elite Cricket</h1>
          <p className="text-gray-400 mt-1">Academy Management System</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">Welcome Back</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="email" 
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-navy-800 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent/50 transition-colors"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input 
                type="password" 
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-navy-800 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-accent/50 transition-colors"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg mt-2"
            >
              Sign In
              <ChevronRight size={20} />
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-8 bg-white/10"></div>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Role Based Access</p>
            <div className="h-px w-8 bg-white/10"></div>
          </div>

          <div className="mt-4 flex justify-between gap-3">
            {['Admin', 'Coach'].map((role) => (
              <button 
                key={role}
                className="flex-1 py-2 rounded-xl border border-white/5 text-xs text-gray-400 hover:bg-white/5 transition-colors"
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-10 text-center text-gray-500 text-sm">
          Forgot password? <span className="text-accent font-medium cursor-pointer">Reset here</span>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
