import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Calendar, Search, CheckCircle2 } from 'lucide-react';
import { students } from '../data/mockData';
import { cn } from '../lib/utils';

const Attendance = () => {
  const [search, setSearch] = useState('');
  const [attendanceData, setAttendanceData] = useState(
    students.reduce((acc, student) => ({ ...acc, [student.id]: null }), {})
  );

  const toggleAttendance = (id, status) => {
    setAttendanceData(prev => ({
      ...prev,
      [id]: prev[id] === status ? null : status
    }));
  };

  const markAll = (status) => {
    const newData = {};
    filteredStudents.forEach(s => newData[s.id] = status);
    setAttendanceData(prev => ({ ...prev, ...newData }));
  };

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.coach.toLowerCase().includes(search.toLowerCase())
  );

  const totalMarked = Object.values(attendanceData).filter(v => v !== null).length;

  return (
    <div className="pb-32 pt-6 px-4 md:px-6 h-full flex flex-col overflow-hidden">
      <header className="mb-4 md:mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Daily Attendance</h1>
            <p className="text-gray-500 text-xs uppercase tracking-wider mt-1">Wednesday, 13 May</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass-accent flex items-center justify-center text-accent">
            <Calendar size={18} />
          </div>
        </div>

        {/* Search & Progress bar container */}
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              type="text" 
              placeholder="Search student or coach..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-navy-800 border border-white/5 rounded-2xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-accent/50 transition-colors placeholder:text-gray-600"
            />
          </div>

          <div className="glass p-3 md:p-4 rounded-2xl flex justify-between items-center">
            <div className="flex-1 mr-4">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-bold mb-1.5">Progress: {totalMarked}/{students.length}</p>
              <div className="w-full h-1.5 bg-navy-900/50 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalMarked / students.length) * 100}%` }}
                  className="h-full bg-accent shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                />
              </div>
            </div>
            <button 
              onClick={() => markAll('present')}
              className="bg-accent/10 border border-accent/20 text-accent text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
            >
              Mark All
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scroll-smooth">
        {filteredStudents.map((student) => (
          <div key={student.id} className="glass p-3 rounded-2xl flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 rounded-xl bg-navy-800 overflow-hidden border border-white/5 flex-shrink-0">
              <img src={student.avatar} alt="" className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm font-bold truncate">{student.name}</h3>
              <p className="text-[10px] text-gray-500 truncate">{student.coach}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleAttendance(student.id, 'absent')}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all border",
                  attendanceData[student.id] === 'absent' 
                    ? "bg-red-500 text-white border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
                    : "bg-navy-800 text-gray-600 border-white/5"
                )}
              >
                <X size={16} />
              </button>
              <button
                onClick={() => toggleAttendance(student.id, 'present')}
                className={cn(
                  "w-9 h-9 rounded-xl flex items-center justify-center transition-all border",
                  attendanceData[student.id] === 'present' 
                    ? "bg-accent text-navy-900 border-accent/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                    : "bg-navy-800 text-gray-600 border-white/5"
                )}
              >
                <Check size={16} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="py-10 text-center">
            <p className="text-gray-500 text-sm italic">No students found...</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-28 left-6 right-6">
        <button className="w-full bg-amber-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-transform">
          <CheckCircle2 size={20} />
          Submit Daily Attendance
        </button>
      </div>
    </div>
  );
};

export default Attendance;
