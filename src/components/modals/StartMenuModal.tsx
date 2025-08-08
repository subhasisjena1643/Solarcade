'use client';

import { motion } from 'framer-motion';

interface StartMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMenuSelect: (action: string) => void;
}

export const StartMenuModal = ({ isOpen, onClose, onMenuSelect }: StartMenuModalProps) => {
  if (!isOpen) return null;

  const menuItems = [
    {
      id: 'arcade',
      name: 'Games',
      icon: '🎮',
      description: 'Play arcade games',
      action: 'arcade'
    },
    {
      id: 'leaderboard',
      name: 'Leaderboards',
      icon: '🏆',
      description: 'View rankings',
      action: 'leaderboard'
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: '⚙️',
      description: 'Configure preferences',
      action: 'settings'
    },
    {
      id: 'help',
      name: 'Help',
      icon: '❓',
      description: 'Game instructions',
      action: 'help'
    },
    {
      id: 'about',
      name: 'About',
      icon: 'ℹ️',
      description: 'About SolarCade',
      action: 'about'
    },
    {
      id: 'exit',
      name: 'Exit',
      icon: '🚪',
      description: 'Close menu',
      action: 'exit'
    }
  ];

  const handleMenuClick = (action: string) => {
    if (action === 'exit') {
      onClose();
    } else {
      onMenuSelect(action);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="retro-window p-6 w-80"
      >
        <div className="retro-window-header mb-4 flex justify-between items-center">
          <span style={{ fontSize: '12px' }}>📋 START MENU</span>
          <button 
            onClick={onClose}
            className="pixel-text text-red-400 hover:text-red-300"
            style={{ fontSize: '12px' }}
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleMenuClick(item.action)}
              className="w-full retro-button flex items-center gap-3 p-3 hover:bg-blue-600/20 transition-colors"
            >
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <div className="flex-1 text-left">
                <div className="pixel-text text-white" style={{ fontSize: '10px' }}>
                  {item.name}
                </div>
                <div className="pixel-text text-gray-400" style={{ fontSize: '7px' }}>
                  {item.description}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-4 retro-panel p-3">
          <div className="pixel-text text-cyan-400 mb-2" style={{ fontSize: '8px' }}>
            🎯 QUICK ACCESS
          </div>
          <div className="pixel-text text-gray-300" style={{ fontSize: '7px', lineHeight: '1.4' }}>
            • Press ESC to close menus<br/>
            • Use arrow keys to navigate<br/>
            • Enter to select items<br/>
            • Chat with Pixel anytime
          </div>
        </div>
      </motion.div>
    </div>
  );
};
