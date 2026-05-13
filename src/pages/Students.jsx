import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Plus, ChevronRight, MapPin, Home, CreditCard } from 'lucide-react';
import { students } from '../data/mockData';
import { cn } from '../lib/utils';

const Students = ({ onSelectStudent }) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filters = ['All', 'Hosteler', 'Local', 'Fees Due', 'Paid'];

  const filteredStudents = students.filter(student => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      student.name.toLowerCase().includes(searchLower) ||
      (student.dob && student.dob.includes(searchLower)) ||
      (student.mobile && student.mobile.includes(searchLower));

    const matchesFilter = 
      filter === 'All' || 
      (filter === 'Hosteler' && student.type === 'Hosteler') ||
      (filter === 'Local' && student.type === 'Local') ||
      (filter === 'Fees Due' && student.feeStatus === 'Due') ||
      (filter === 'Paid' && student.feeStatus === 'Paid');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="pb-32 pt-6 px-4 md:px-6 h-full flex flex-col overflow-hidden">
      <header className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">Student Directory</h1>
        
        {/* Search Bar */}
        <div className="relative mb-4 md:mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search Name, DOB or Mobile..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-navy-800 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors placeholder:text-gray-600"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "px-4 py-2 rounded-full text-[10px] md:text-xs font-semibold whitespace-nowrap transition-all",
                filter === f 
                  ? "bg-amber-500 text-white shadow-md scale-105" 
                  : "bg-navy-800 text-gray-400 border border-white/5"
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {/* Student List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scroll-smooth">
        <AnimatePresence mode='popLayout'>
          {filteredStudents.map((student) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={student.id}
              onClick={() => onSelectStudent(student)}
              className="glass p-3 md:p-4 rounded-2xl md:rounded-3xl flex items-center gap-3 md:gap-4 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-navy-800 border border-white/10 overflow-hidden">
                  <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
                </div>
                <div className={cn(
                  "absolute -bottom-1 -right-1 w-4 h-4 md:w-5 md:h-5 rounded-full border-2 border-navy-900 flex items-center justify-center",
                  student.feeStatus === 'Paid' ? 'bg-accent text-navy-900' : 'bg-amber-500 text-navy-900'
                )}>
                  <CreditCard size={8} md={10} />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold text-sm md:text-base truncate">{student.name}</h3>
                <p className="text-[9px] md:text-[10px] text-gray-500 mb-1">{student.mobile || 'No Mobile'}</p>
                <div className="flex items-center gap-2 md:gap-3 mt-0.5">
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-400">
                    <UserCircle size={10} md={12} className="text-accent" />
                    <span className="truncate max-w-[60px] md:max-w-none">{student.coach}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[9px] md:text-[10px] text-gray-400">
                    {student.type === 'Hosteler' ? <Home size={10} md={12} /> : <MapPin size={10} md={12} />}
                    <span>{student.type}</span>
                  </div>
                </div>
              </div>

              <ChevronRight className="text-gray-700 flex-shrink-0" size={18} />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredStudents.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 rounded-full bg-navy-800 flex items-center justify-center mb-4 border border-white/5">
              <Search size={30} className="text-gray-600" />
            </div>
            <p className="text-gray-500">No students found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-28 right-6 w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-xl z-40"
      >
        <Plus size={28} />
      </motion.button>
    </div>
  );
};

// Helper for icon
const UserCircle = ({ size, className }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);

export default Students;
