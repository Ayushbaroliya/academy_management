import React from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, AlertCircle, CheckCircle, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { students, stats } from '../data/mockData';
import { cn } from '../lib/utils';

const Fees = () => {
  return (
    <div className="pb-32 pt-8 px-6 h-full flex flex-col">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-6">Fee Management</h1>
        
        {/* Fee Stats Summary */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass p-5 rounded-3xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Collected</p>
            <div className="flex items-end gap-1">
              <h3 className="text-xl font-bold text-white">₹2.4L</h3>
              <span className="text-accent text-[10px] flex items-center mb-1">
                <ArrowUpRight size={10} /> 12%
              </span>
            </div>
          </div>
          <div className="glass p-5 rounded-3xl border-amber-500/10">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Pending</p>
            <div className="flex items-end gap-1">
              <h3 className="text-xl font-bold text-amber-500">{stats.pendingFees}</h3>
              <span className="text-red-500 text-[10px] flex items-center mb-1">
                <ArrowUpRight size={10} /> 4%
              </span>
            </div>
          </div>
        </div>

        {/* Collection Target Card */}
        <div className="glass-accent p-6 rounded-[2rem] mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-white font-bold mb-1">Monthly Target</h4>
            <p className="text-accent/80 text-xs mb-4">₹3,00,000 Total Goal</p>
            
            <div className="w-full h-3 bg-navy-900/50 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '80%' }}
                className="h-full bg-accent shadow-[0_0_10px_#22D3EE]"
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-accent">₹2,40,000 (80%)</span>
              <span className="text-gray-500">₹60k Left</span>
            </div>
          </div>
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <IndianRupee size={80} />
          </div>
        </div>
      </header>

      {/* Recent Payments Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-bold">Student Payments</h3>
          <button className="text-gray-500"><Search size={18} /></button>
        </div>

        <div className="space-y-3">
          {students.map((student) => (
            <div key={student.id} className="glass p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-800 border border-white/5 overflow-hidden">
                  <img src={student.avatar} alt="" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">{student.name}</h4>
                  <p className="text-[10px] text-gray-500">Last paid: {student.lastPayment}</p>
                </div>
              </div>

              <div className="text-right">
                <div className={cn(
                  "px-2 py-1 rounded-lg text-[9px] font-black uppercase mb-1 inline-block",
                  student.feeStatus === 'Paid' ? 'bg-accent/10 text-accent' : 'bg-amber-500/10 text-amber-500'
                )}>
                  {student.feeStatus}
                </div>
                <p className="text-white text-xs font-bold">₹5,000</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Fees;
