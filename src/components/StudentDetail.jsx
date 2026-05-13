import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  IndianRupee, 
  MapPin, 
  Home, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  Phone,
  MessageSquare,
  ClipboardList
} from 'lucide-react';
import { cn } from '../lib/utils';

const StudentDetail = ({ student, onClose }) => {
  if (!student) return null;

  // Mock attendance data for calendar
  const attendanceDays = Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    status: Math.random() > 0.2 ? 'present' : 'absent'
  }));

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[60] bg-navy-900 flex flex-col overflow-y-auto"
    >
      {/* Header Overlay */}
      <div className="sticky top-0 z-10 px-6 py-6 flex justify-between items-center bg-navy-900/80 backdrop-blur-xl">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-white"
        >
          <X size={20} />
        </button>
        <h2 className="text-white font-bold">Student Profile</h2>
        <button className="w-10 h-10 rounded-full glass flex items-center justify-center text-accent">
          <SettingsIcon size={18} />
        </button>
      </div>

      <div className="px-6 pb-12 flex-1">
        {/* Profile Card */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-3xl bg-navy-800 border-2 border-white/5 overflow-hidden mb-4 shadow-2xl">
            <img src={student.avatar} alt={student.name} className="w-full h-full object-cover" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{student.name}</h1>
          <p className="text-accent text-sm font-medium">Coach {student.coach}</p>
          
          <div className="flex gap-4 mt-6">
            <button className="w-12 h-12 rounded-2xl glass-accent text-accent flex items-center justify-center shadow-lg">
              <Phone size={20} />
            </button>
            <button className="w-12 h-12 rounded-2xl glass text-white flex items-center justify-center shadow-lg">
              <MessageSquare size={20} />
            </button>
            <button className="px-6 h-12 rounded-2xl bg-accent text-navy-900 font-bold flex items-center gap-2 shadow-lg">
              <ClipboardList size={18} />
              Report
            </button>
          </div>
        </div>

        {/* Info Grid (Bento) */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="glass p-4 rounded-3xl">
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Joining Date</p>
            <div className="flex items-center gap-2 text-white font-bold">
              <Calendar size={14} className="text-accent" />
              <span className="text-xs">{student.joiningDate}</span>
            </div>
          </div>
          <div className="glass p-4 rounded-3xl">
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Type</p>
            <div className="flex items-center gap-2 text-white font-bold">
              {student.type === 'Hosteler' ? <Home size={14} className="text-blue-400" /> : <MapPin size={14} className="text-amber-400" />}
              <span className="text-xs">{student.type}</span>
            </div>
          </div>
          <div className="glass p-4 rounded-3xl">
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Fee Status</p>
            <div className={cn(
              "flex items-center gap-2 font-bold",
              student.feeStatus === 'Paid' ? 'text-accent' : 'text-amber-500'
            )}>
              {student.feeStatus === 'Paid' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span className="text-xs">{student.feeStatus}</span>
            </div>
          </div>
          <div className="glass p-4 rounded-3xl">
            <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Kit Issued</p>
            <div className={cn(
              "flex items-center gap-2 font-bold",
              student.kitIssued ? 'text-accent' : 'text-gray-600'
            )}>
              <div className={cn("w-2 h-2 rounded-full", student.kitIssued ? 'bg-accent' : 'bg-gray-700')} />
              <span className="text-xs">{student.kitIssued ? 'Completed' : 'Pending'}</span>
            </div>
          </div>
        </div>

        {/* Attendance Calendar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-bold">Monthly Attendance</h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-[10px] text-gray-500">Present</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-[10px] text-gray-500">Absent</span>
              </div>
            </div>
          </div>
          
          <div className="glass p-5 rounded-[2rem]">
            <div className="grid grid-cols-7 gap-2">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <div key={d} className="text-center text-gray-600 text-[10px] font-bold mb-2">{d}</div>
              ))}
              {attendanceDays.map(d => (
                <div 
                  key={d.day} 
                  className={cn(
                    "aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all",
                    d.status === 'present' ? 'bg-accent/20 text-accent' : 'bg-red-500/10 text-red-500'
                  )}
                >
                  {d.day}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment History */}
        <div className="mb-4">
          <h3 className="text-white font-bold mb-4">Payment History</h3>
          <div className="space-y-3">
            {[1, 2].map((_, i) => (
              <div key={i} className="glass p-4 rounded-2xl flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <IndianRupee size={18} />
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Monthly Fee</p>
                    <p className="text-gray-500 text-[10px]">{i === 0 ? '01 May 2026' : '02 April 2026'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white text-sm font-bold">₹5,000</p>
                  <p className="text-accent text-[10px] font-bold">SUCCESS</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SettingsIcon = ({ size, className }) => (
  <svg 
    width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" 
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.1a2 2 0 0 1-1-1.72v-.51a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

export default StudentDetail;
