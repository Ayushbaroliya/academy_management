import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Attendance from './pages/Attendance';
import Fees from './pages/Fees';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';
import StudentDetail from './components/StudentDetail';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Attempt to "force" fullscreen on first interaction
  const enableFullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen ||
      docEl.msRequestFullscreen;

    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
      if (requestFullScreen) {
        requestFullScreen.call(docEl).catch(err => {
          console.log(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      }
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    enableFullScreen();
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard setActiveTab={setActiveTab} />;
      case 'students':
        return <Students onSelectStudent={setSelectedStudent} />;
      case 'attendance':
        return <Attendance />;
      case 'fees':
        return <Fees />;
      case 'profile':
        return <Profile onLogout={handleLogout} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="bg-navy-900 min-h-screen text-white overflow-hidden relative">
      
      {/* Dynamic Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[50%] h-[40%] bg-accent/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[50%] h-[40%] bg-blue-500/5 blur-[120px] pointer-events-none" />
      
      {/* Main Content Area */}
      <main className="h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <div key={activeTab} className="h-full">
            {renderContent()}
          </div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Student Detail Overlay */}
      <AnimatePresence>
        {selectedStudent && (
          <StudentDetail 
            student={selectedStudent} 
            onClose={() => setSelectedStudent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
