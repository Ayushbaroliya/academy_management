import React from 'react';
import { motion } from 'framer-motion';
import { User, Settings, Shield, Bell, LogOut, ChevronRight, Award, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';

const Profile = ({ onLogout }) => {
  return (
    <div className="pb-32 pt-8 px-6 h-full flex flex-col">
      <header className="flex flex-col items-center mb-10">
        <div className="relative mb-4">
          <div className="w-24 h-24 rounded-[2rem] bg-accent p-1 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
            <div className="w-full h-full rounded-[1.8rem] bg-navy-900 overflow-hidden flex items-center justify-center">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Coach" alt="Coach Profile" />
            </div>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-accent text-navy-900 w-8 h-8 rounded-xl flex items-center justify-center border-4 border-navy-900">
            <Award size={14} fill="currentColor" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white">Rajkumar Sharma</h2>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <MapPin size={12} className="text-accent" /> Head Coach • Elite Academy
        </p>
      </header>

      <div className="space-y-6">
        <section>
          <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3 ml-1">Account Settings</h3>
          <div className="glass rounded-3xl overflow-hidden">
            {[
              { icon: User, label: 'Personal Information', color: 'text-blue-400' },
              { icon: Shield, label: 'Security & Privacy', color: 'text-accent' },
              { icon: Bell, label: 'Notifications', color: 'text-amber-400' },
              { icon: Settings, label: 'Academy Preferences', color: 'text-purple-400' },
            ].map((item, i) => (
              <button 
                key={i} 
                className="w-full flex items-center gap-4 p-4 hover:bg-white/5 border-b border-white/5 last:border-none transition-colors"
              >
                <div className={cn("w-10 h-10 rounded-xl bg-navy-800 flex items-center justify-center", item.color)}>
                  <item.icon size={20} />
                </div>
                <span className="flex-1 text-white text-sm font-medium text-left">{item.label}</span>
                <ChevronRight size={18} className="text-gray-600" />
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-3 ml-1">Danger Zone</h3>
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-4 p-4 bg-red-600 rounded-2xl text-white hover:bg-red-700 transition-colors shadow-md"
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <LogOut size={20} />
            </div>
            <span className="flex-1 text-sm font-bold text-left uppercase tracking-widest">Logout from System</span>
            <ChevronRight size={18} className="text-white/50" />
          </button>
        </section>
      </div>

      <div className="mt-10 text-center">
        <p className="text-gray-600 text-[10px] uppercase tracking-tighter">Elite Academy ERP v1.0.4</p>
      </div>
    </div>
  );
};

export default Profile;
