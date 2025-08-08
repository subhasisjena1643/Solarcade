'use client';

import { motion } from 'framer-motion';

interface ArcadeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGameSelect: (game: string) => void;
}

export const ArcadeModal = ({ isOpen, onClose, onGameSelect }: ArcadeModalProps) => {
  if (!isOpen) return null;

  const games = [
    {
      id: 'TAP_RACER',
      name: 'TAP RACER',
      description: 'High-speed racing with DeFi rewards',
      status: 'available',
      icon: '🏎️',
      difficulty: 'Medium',
      players: '1-8'
    },
    {
      id: 'RHYTHM_RUSH',
      name: 'RHYTHM RUSH',
      description: 'Beat-matching with yield farming',
      status: 'coming_soon',
      icon: '🎵',
      difficulty: 'Hard',
      players: '1-4'
    },
    {
      id: 'PIXEL_FIGHT',
      name: 'PIXEL FIGHT',
      description: 'Combat arena with NFT rewards',
      status: 'coming_soon',
      icon: '⚔️',
      difficulty: 'Expert',
      players: '1v1'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="retro-window p-6 w-96 max-h-96 overflow-y-auto"
      >
        <div className="retro-window-header mb-4 flex justify-between items-center">
          <span style={{ fontSize: '12px' }}>🎮 SOLARCADE GAMES</span>
          <button 
            onClick={onClose}
            className="pixel-text text-red-400 hover:text-red-300"
            style={{ fontSize: '12px' }}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {games.map((game) => (
            <div key={game.id} className="retro-panel p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: '16px' }}>{game.icon}</span>
                  <span className="pixel-text text-cyan-400" style={{ fontSize: '10px' }}>
                    {game.name}
                  </span>
                </div>
                <div className={`pixel-text text-xs px-2 py-1 rounded ${
                  game.status === 'available' 
                    ? 'bg-green-600/30 text-green-400' 
                    : 'bg-yellow-600/30 text-yellow-400'
                }`}>
                  {game.status === 'available' ? 'READY' : 'SOON'}
                </div>
              </div>

              <div className="pixel-text text-white mb-2" style={{ fontSize: '8px' }}>
                {game.description}
              </div>

              <div className="flex justify-between items-center mb-3">
                <div className="pixel-text text-gray-400" style={{ fontSize: '7px' }}>
                  DIFFICULTY: {game.difficulty}
                </div>
                <div className="pixel-text text-gray-400" style={{ fontSize: '7px' }}>
                  PLAYERS: {game.players}
                </div>
              </div>

              <button
                onClick={() => {
                  if (game.status === 'available') {
                    onGameSelect(game.id);
                    onClose();
                  }
                }}
                disabled={game.status !== 'available'}
                className={`retro-button w-full ${
                  game.status === 'available' 
                    ? 'hover:bg-blue-600/20' 
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ fontSize: '8px', padding: '4px' }}
              >
                {game.status === 'available' ? 'PLAY NOW' : 'COMING SOON'}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-4 retro-panel p-3">
          <div className="pixel-text text-cyan-400 mb-2" style={{ fontSize: '8px' }}>
            💡 ARCADE TIPS
          </div>
          <div className="pixel-text text-gray-300" style={{ fontSize: '7px', lineHeight: '1.4' }}>
            • Each game offers unique DeFi integration<br/>
            • Earn SOLAR tokens through gameplay<br/>
            • Compete on global leaderboards<br/>
            • Unlock NFT achievements
          </div>
        </div>
      </motion.div>
    </div>
  );
};
