import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Calendar, Search, CheckCircle2 } from 'lucide-react';
import { students } from '../data/mockData';
import { cn } from '../lib/utils';

const Attendance = () => {
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
    students.forEach(s => newData[s.id] = status);
    setAttendanceData(newData);
  };

  const presentCount = Object.values(attendanceData).filter(v => v === 'present').length;
  const totalMarked = Object.values(attendanceData).filter(v => v !== null).length;

  return (
    <div className="pb-32 pt-8 px-6 h-full flex flex-col">
      <header className="mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Daily Attendance</h1>
            <p className="text-gray-400 text-sm">112 of 124 students present today</p>
          </div>
          <div className="w-12 h-12 rounded-2xl glass-accent flex items-center justify-center text-accent">
            <Calendar size={20} />
          </div>
        </div>

        <div className="glass p-4 rounded-3xl mb-6 flex justify-between items-center">
          <div>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Batch Progress</p>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-navy-800 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(totalMarked / students.length) * 100}%` }}
                  className="h-full bg-accent"
                />
              </div>
              <span className="text-white text-xs font-bold">{totalMarked}/{students.length}</span>
            </div>
          </div>
          <button 
            onClick={() => markAll('present')}
            className="bg-orange-500 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md active:scale-95 transition-transform"
          >
            Mark All Present
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto space-y-3">
        {students.map((student) => (
          <div key={student.id} className="glass p-3.5 rounded-2xl flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-navy-800 overflow-hidden border border-white/5">
              <img src={student.avatar} alt="" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-white text-sm font-bold">{student.name}</h3>
              <p className="text-[10px] text-gray-500">{student.coach}</p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => toggleAttendance(student.id, 'absent')}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
                  attendanceData[student.id] === 'absent' 
                    ? "bg-red-500 text-white border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]" 
                    : "bg-navy-800 text-gray-600 border-white/5"
                )}
              >
                <X size={18} />
              </button>
              <button
                onClick={() => toggleAttendance(student.id, 'present')}
                className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-all border",
                  attendanceData[student.id] === 'present' 
                    ? "bg-accent text-navy-900 border-accent/50 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                    : "bg-navy-800 text-gray-600 border-white/5"
                )}
              >
                <Check size={18} strokeWidth={3} />
              </button>
            </div>
          </div>
        ))}
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
