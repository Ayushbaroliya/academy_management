import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, TrendingUp, AlertCircle, CheckCircle, Search, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { students, stats } from '../data/mockData';
import { cn } from '../lib/utils';

const Fees = () => {
  const [search, setSearch] = useState('');
  
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-32 pt-6 px-4 md:px-6 h-full flex flex-col overflow-hidden">
      <header className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-6">Fee Management</h1>
        
        {/* Fee Stats Summary */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6">
          <div className="glass p-4 md:p-5 rounded-3xl">
            <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-2">Collected</p>
            <div className="flex items-end gap-1">
              <h3 className="text-xl font-bold text-white">₹2.4L</h3>
              <span className="text-accent text-[10px] flex items-center mb-1">
                <ArrowUpRight size={10} /> 12%
              </span>
            </div>
          </div>
          <div className="glass p-4 md:p-5 rounded-3xl border-amber-500/10">
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
        <div className="glass-accent p-5 md:p-6 rounded-[2rem] mb-6 relative overflow-hidden">
          <div className="relative z-10">
            <h4 className="text-white font-bold mb-1 text-sm md:text-base">Monthly Target</h4>
            <p className="text-accent/80 text-[10px] md:text-xs mb-4">₹3,00,000 Total Goal</p>
            
            <div className="w-full h-2 md:h-3 bg-navy-900/50 rounded-full overflow-hidden mb-2">
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
            <IndianRupee size={60} md={80} />
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search student for payment status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-800 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors placeholder:text-gray-600"
          />
        </div>
      </header>

      {/* Recent Payments Section */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        <div className="flex justify-between items-center mb-1">
          <h3 className="text-white text-sm font-bold ml-1">Student Status</h3>
          <span className="text-[10px] text-gray-500">{filteredStudents.length} Students</span>
        </div>

        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <div key={student.id} className="glass p-3 md:p-4 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-navy-800 border border-white/5 overflow-hidden flex-shrink-0">
                  <img src={student.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-white text-sm font-bold truncate">{student.name}</h4>
                  <p className="text-[10px] text-gray-500 truncate">Paid: {student.lastPayment}</p>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div className={cn(
                  "px-2 py-0.5 rounded-lg text-[8px] font-black uppercase mb-1 inline-block",
                  student.feeStatus === 'Paid' ? 'bg-accent/10 text-accent' : 'bg-amber-500/10 text-amber-500'
                )}>
                  {student.feeStatus}
                </div>
                <p className="text-white text-xs font-bold">₹5,000</p>
              </div>
            </div>
          ))}

          {filteredStudents.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-gray-500 text-sm italic">No records found...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fees;
