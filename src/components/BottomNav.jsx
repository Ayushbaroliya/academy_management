import React from 'react';
import { LayoutDashboard, Users, CheckSquare, IndianRupee, User } from 'lucide-react';
import { cn } from '../lib/utils';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Home' },
    { id: 'students', icon: Users, label: 'Students' },
    { id: 'attendance', icon: CheckSquare, label: 'Mark' },
    { id: 'fees', icon: IndianRupee, label: 'Fees' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-nav z-50 px-6 pb-6 pt-3">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
                className={cn(
                "flex flex-col items-center justify-center transition-all duration-300 relative",
                isActive ? "text-accent scale-110" : "text-gray-400"
              )}
            >
              {isActive && (
                <div className="absolute -top-1 w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_#22D3EE]" />
              )}
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
