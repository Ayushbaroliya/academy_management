import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  UserCheck, 
  UserMinus, 
  CreditCard, 
  Home, 
  PlusCircle, 
  ClipboardCheck, 
  Wallet,
  TrendingUp,
  Search
} from 'lucide-react';
import { stats, students } from '../data/mockData';

const Dashboard = ({ setActiveTab }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Calculate actual stats from mock data
  const totalStudents = students.length;
  const presentToday = stats.presentToday; // We keep this as fixed for prototype feel
  const pendingFeesCount = students.filter(s => s.feeStatus === 'Due').length;
  const hostelersCount = students.filter(s => s.type === 'Hosteler').length;

  return (
    <div className="pb-32 pt-6 px-4 md:px-6 overflow-y-auto h-full scroll-smooth">
      <motion.header 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex justify-between items-center mb-6"
      >
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Hey, Coach! 👋</h1>
          <p className="text-gray-400 text-[10px] md:text-sm uppercase tracking-wider">Wednesday, 13 May</p>
        </div>
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl glass flex items-center justify-center">
          <Search size={18} className="text-gray-400" />
        </div>
      </motion.header>

      {/* Hero Stats */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bento-grid"
      >
        <motion.div variants={itemVariants} className="bento-item-large glass-accent rounded-3xl p-5 md:p-6 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-accent text-[10px] font-bold uppercase tracking-widest mb-1">Total Impact</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">{totalStudents}</h2>
            <div className="flex items-center gap-2 text-accent text-[10px] md:text-sm bg-accent/10 w-fit px-3 py-1 rounded-full border border-accent/20">
              <TrendingUp size={12} />
              <span>+12% this month</span>
            </div>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-10">
            <Users size={100} className="text-accent" />
          </div>
        </motion.div>

        {/* Small Cards */}
        <motion.div variants={itemVariants} className="glass rounded-3xl p-4 md:p-5 flex flex-col justify-between aspect-square">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-accent/10 rounded-xl flex items-center justify-center mb-2">
            <UserCheck size={18} className="text-accent" />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] md:text-xs font-medium">Present</p>
            <h3 className="text-xl md:text-2xl font-bold text-white">{presentToday}</h3>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass rounded-3xl p-4 md:p-5 flex flex-col justify-between aspect-square">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/10 rounded-xl flex items-center justify-center mb-2">
            <UserMinus size={18} className="text-red-500" />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] md:text-xs font-medium">Absent</p>
            <h3 className="text-xl md:text-2xl font-bold text-white">{totalStudents - presentToday}</h3>
          </div>
        </motion.div>

        <motion.div 
          onClick={() => setActiveTab('fees')}
          variants={itemVariants} 
          className="glass rounded-3xl p-4 md:p-5 flex flex-col justify-between aspect-square cursor-pointer active:scale-95 transition-transform"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500/10 rounded-xl flex items-center justify-center mb-2">
            <CreditCard size={18} className="text-amber-500" />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] md:text-xs font-medium">Due Fees</p>
            <h3 className="text-lg md:text-xl font-bold text-white">{pendingFeesCount}</h3>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="glass rounded-3xl p-4 md:p-5 flex flex-col justify-between aspect-square">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/10 rounded-xl flex items-center justify-center mb-2">
            <Home size={18} className="text-blue-500" />
          </div>
          <div>
            <p className="text-gray-400 text-[10px] md:text-xs font-medium">Hostel</p>
            <h3 className="text-xl md:text-2xl font-bold text-white">{hostelersCount}</h3>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <div className="mt-8 md:mt-10">
        <h3 className="text-white text-sm md:text-base font-bold mb-4 ml-1">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[
            { icon: PlusCircle, label: 'Add Student', color: 'bg-accent', tab: 'students' },
            { icon: ClipboardCheck, label: 'Attendance', color: 'bg-orange', tab: 'attendance' },
            { icon: Wallet, label: 'Add Fee', color: 'bg-blue-600', tab: 'fees' },
          ].map((action, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(action.tab)}
              className="flex flex-col items-center gap-2"
            >
              <div className={`${action.color === 'bg-accent' ? 'bg-amber-500' : action.color === 'bg-orange' ? 'bg-orange-500' : action.color} w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-md text-white`}>
                <action.icon size={24} />
              </div>
              <span className="text-[9px] md:text-[11px] text-gray-400 font-medium text-center leading-tight">{action.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 md:mt-10">
        <div className="flex justify-between items-center mb-4 ml-1">
          <h3 className="text-white font-bold">Recent Activity</h3>
          <button className="bg-accent/20 text-accent text-[10px] font-bold px-3 py-1 rounded-lg border border-accent/20">See all</button>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="glass rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-navy-800 border border-white/5 overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="" />
              </div>
              <div className="flex-1">
                <p className="text-white text-sm font-medium">New Student Registered</p>
                <p className="text-gray-500 text-xs">Arjun Singh • Coach Rajkumar</p>
              </div>
              <p className="text-gray-500 text-[10px]">2h ago</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
