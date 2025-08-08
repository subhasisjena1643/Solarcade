'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  RetroGlitch,
  RetroScanlines,
  RetroPixelRain,
  RetroTypewriter,
  RetroWindowFloat,
  RetroButton,
  RetroMatrix,
  RetroBootSequence,
  RetroHologram,
  RetroParticleSystem,
  RetroStatusBar,
  RetroNotification,
  RetroSoundEffect,
  RetroFloatingElements,
  RetroGridLines,
  RetroDataStream
} from '@/components/RetroAnimations';

import {
  useAIIntelligence,
  AIRecommendationsPanel,
  AIBuddyMessagePanel,
  AIBuddyChatPanel
} from '@/components/AIIntelligenceLayer';


import { ArcadeModal } from '@/components/modals/ArcadeModal';
import { LeaderboardModal } from '@/components/modals/LeaderboardModal';
import { StartMenuModal } from '@/components/modals/StartMenuModal';
import { SettingsModal } from '@/components/modals/SettingsModal';
import { HelpModal } from '@/components/modals/HelpModal';
import { AboutModal } from '@/components/modals/AboutModal';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [bootComplete, setBootComplete] = useState(false);
  const [showMatrix, setShowMatrix] = useState(true);
  const [cpuUsage, setCpuUsage] = useState(45);
  const [memoryUsage, setMemoryUsage] = useState(67);
  const [networkActivity, setNetworkActivity] = useState(23);
  const [showNotification, setShowNotification] = useState(false);

  const [showArcade, setShowArcade] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const { playBeep } = RetroSoundEffect();

  // AI Buddy Layer
  const {
    context: aiContext,
    recommendations,
    isConnected: aiConnected,
    buddyMessage,
    chatHistory,
    showChat,
    trackInteraction,
    applyRecommendation,
    dismissBuddyMessage,
    toggleBuddyChat,
    sendChatMessage,
    toggleChat,
    dismissRecommendations,
    adjustBrightness,
    adjustContrast,
    adjustFontSize,
    toggleReducedMotion,
    autoOptimize
  } = useAIIntelligence();

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);

    // Hide matrix effect after 10 seconds
    const matrixTimer = setTimeout(() => setShowMatrix(false), 10000);

    // Simulate system activity
    const systemTimer = setInterval(() => {
      setCpuUsage(prev => Math.max(10, Math.min(90, prev + (Math.random() - 0.5) * 10)));
      setMemoryUsage(prev => Math.max(20, Math.min(95, prev + (Math.random() - 0.5) * 8)));
      setNetworkActivity(prev => Math.max(0, Math.min(100, prev + (Math.random() - 0.5) * 15)));
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(matrixTimer);
      clearInterval(systemTimer);
    };
  }, []);

  // Separate useEffect for auto-optimization to avoid infinite loop
  useEffect(() => {
    // Auto-optimize on mount and periodically
    autoOptimize();
    const optimizeTimer = setInterval(autoOptimize, 300000); // Every 5 minutes

    return () => {
      clearInterval(optimizeTimer);
    };
  }, [autoOptimize]); // Now safe to include autoOptimize since it's memoized

  const handleButtonClick = (action: string) => {
    playBeep();
    trackInteraction(`button_click_${action}`);

    switch (action.toLowerCase()) {
      case 'arcade':
      case 'enter arcade':
        setShowArcade(true);
        break;
      case 'wallet':
      case 'connect wallet':
        // Web3 section - show coming soon for now
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3500);
        break;
      case 'leaderboard':
      case 'view leaderboard':
        setShowLeaderboard(true);
        break;
      case 'start':
        setShowStartMenu(true);
        break;
      case 'tap_racer':
      case 'TAP_RACER.EXE':
        window.location.href = '/race?mode=demo';
        break;
      case 'rhythm_rush':
        // Future implementation
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3500);
        break;
      case 'pixel_fight':
        // Future implementation
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3500);
        break;
      case 'wallet':
      case 'connect wallet':
        // Web3 section - show coming soon for now
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3500);
        break;
      case 'settings':
        setShowSettings(true);
        break;
      case 'help':
        setShowHelp(true);
        break;
      case 'about':
        setShowAbout(true);
        break;
      default:
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3500);
        break;
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen retro-grid crt-effect retro-distortion" style={{ background: 'var(--retro-bg)' }}>
      {/* Enhanced Background Effects */}
      <RetroScanlines />
      <RetroPixelRain count={40} />
      <RetroParticleSystem count={25} />
      <RetroFloatingElements count={20} />
      <RetroGridLines />
      <RetroDataStream lines={6} />
      {showMatrix && <RetroMatrix />}

      {/* AI Buddy Layer */}

      <AIBuddyMessagePanel
        message={buddyMessage}
        onDismiss={dismissBuddyMessage}
      />
      <AIBuddyChatPanel
        chatHistory={chatHistory}
        showChat={showChat}
        onSendMessage={sendChatMessage}
        onToggleChat={toggleChat}
      />
      <AIRecommendationsPanel
        recommendations={recommendations}
        onApply={applyRecommendation}
        onDismiss={dismissRecommendations}
      />



      {/* Notification System */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50">
          <RetroNotification
            message="System initialized successfully!"
            type="success"
            onClose={() => setShowNotification(false)}
          />
        </div>
      )}

      {/* Desktop Environment */}
      <div className="min-h-screen relative">
        {/* Main Content Area with proper margins for sidebar and MCP panel */}
        <div className="main-content-area">
          {/* Enhanced Taskbar */}
          <div className="fixed bottom-0 left-0 right-0 h-12 retro-window z-50 retro-slide-in">
          <div className="flex items-center justify-between h-full px-4">
            <div className="flex items-center gap-4">
              <RetroButton className="retro-flicker px-2 py-1 text-xs">
                START
              </RetroButton>
              <div className="flex gap-2">
                <div className="w-8 h-8 retro-window flex items-center justify-center retro-pulse">
                  <span className="pixel-text" style={{ fontSize: '6px' }}>🎮</span>
                </div>
                <div className="w-8 h-8 retro-window flex items-center justify-center retro-pulse">
                  <span className="pixel-text" style={{ fontSize: '6px' }}>💰</span>
                </div>
                <div className="w-8 h-8 retro-window flex items-center justify-center retro-pulse">
                  <span className="pixel-text" style={{ fontSize: '6px' }}>🤖</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleChat}
                className="retro-window flex items-center gap-1 px-1.5 py-0.5 hover:bg-blue-600/20 transition-colors"
                style={{ fontSize: '6px' }}
              >
                <div className={`w-1 h-1 rounded-full ${aiConnected ? 'bg-green-400 retro-pulse' : 'bg-yellow-400'}`} />
                <span className="pixel-text text-white">💬 PIPER</span>
              </button>
              <div className="pixel-text retro-glow-pulse text-cyan-400" style={{ fontSize: '8px' }}>
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
          </div>

          {/* Main Window - SolarCade */}
          <RetroWindowFloat className="max-w-4xl mx-auto mt-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="retro-window"
          >
          <div className="retro-window-header">
            <span>🎮 SOLARCADE.EXE - THE ULTIMATE WEB3 ARCADE</span>
            <div className="retro-window-controls">
              <div className="retro-btn minimize">_</div>
              <div className="retro-btn maximize">□</div>
              <div className="retro-btn close">×</div>
            </div>
          </div>

          <div className="p-8 scanlines">
            {/* ASCII Art Logo */}
            <div className="text-center mb-8">
              <RetroGlitch>
                <pre className="pixel-text text-yellow-400" style={{ fontSize: '10px', lineHeight: '1.3', letterSpacing: '0.5px' }}>
{`
 ██████╗ ██████╗ ██╗      █████╗ ██████╗  ██████╗ █████╗ ██████╗ ███████╗
██╔════╝██╔═══██╗██║     ██╔══██╗██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝
╚█████╗ ██║   ██║██║     ███████║██████╔╝██║     ███████║██║  ██║█████╗
 ╚═══██╗██║   ██║██║     ██╔══██║██╔══██╗██║     ██╔══██║██║  ██║██╔══╝
██████╔╝╚██████╔╝███████╗██║  ██║██║  ██║╚██████╗██║  ██║██████╔╝███████╗
╚═════╝  ╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝
`}
                </pre>
              </RetroGlitch>
              <div className="pixel-text text-cyan-400 mt-4" style={{ fontSize: '10px' }}>
                <RetroTypewriter
                  text="> INITIALIZING WEB3 ARCADE PROTOCOL..."
                  speed={80}
                />
                <span className="retro-blink">█</span>
              </div>
            </div>

            {/* System Status */}
            <div className="retro-panel mb-6">
              <div className="pixel-text mb-4" style={{ fontSize: '10px' }}>SYSTEM STATUS:</div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>BLOCKCHAIN:</span>
                    <span className="text-green-400">ONLINE</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>PLAYERS:</span>
                    <span className="text-yellow-400">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GAMES:</span>
                    <span className="text-cyan-400">25 ACTIVE</span>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>REWARDS POOL:</span>
                    <span className="text-green-400">$2.4M</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>TOURNAMENTS:</span>
                    <span className="text-yellow-400">8 LIVE</span>
                  </div>
                  <div className="flex justify-between">
                    <span>MCP STATUS:</span>
                    <span className="text-green-400">ACTIVE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <RetroButton
                variant="accent"
                onClick={() => handleButtonClick('arcade')}
                className="retro-zoom-in"
              >
                ENTER ARCADE
              </RetroButton>
              <RetroButton
                variant="secondary"
                onClick={() => handleButtonClick('wallet')}
                className="retro-zoom-in"
              >
                CONNECT WALLET
              </RetroButton>
              <RetroButton
                onClick={() => handleButtonClick('leaderboard')}
                className="retro-zoom-in"
              >
                VIEW LEADERBOARD
              </RetroButton>
            </div>

            {/* Enhanced Terminal Output */}
            <div className="retro-panel bg-black text-green-400 font-mono text-xs p-4 h-32 overflow-y-auto retro-hologram">
              {!bootComplete ? (
                <RetroBootSequence onComplete={() => setBootComplete(true)} />
              ) : (
                <>
                  <div className="retro-data-stream">&gt; Loading SolarCade Web3 Gaming Protocol...</div>
                  <div className="retro-data-stream">&gt; Connecting to Ethereum Layer 2...</div>
                  <div className="retro-data-stream">&gt; Initializing MCP (Model Context Protocol) tools...</div>
                  <div className="retro-data-stream">&gt; DeFi automation services: READY</div>
                  <div className="retro-data-stream">&gt; Smart contract verification: PASSED</div>
                  <div className="retro-data-stream">&gt; Player authentication system: ONLINE</div>
                  <div className="retro-data-stream">&gt; Real-time multiplayer engine: ACTIVE</div>
                  <div className="retro-data-stream">&gt; Welcome to the future of gaming!</div>
                  <div className="text-yellow-400 retro-glow-pulse">&gt; Type 'HELP' for commands <span className="retro-blink">█</span></div>
                </>
              )}
            </div>
          </div>
          </motion.div>
          </RetroWindowFloat>

          {/* Game Windows */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
          {[
            { name: 'TAP_RACER.EXE', players: '2,547', reward: '50 SOLAR', status: 'RUNNING' },
            { name: 'RHYTHM_RUSH.EXE', players: '1,823', reward: '75 SOLAR', status: 'RUNNING' },
            { name: 'PIXEL_FIGHT.EXE', players: '3,201', reward: '100 SOLAR', status: 'RUNNING' },
            { name: 'SPACE_SHOOT.EXE', players: '1,456', reward: '60 SOLAR', status: 'RUNNING' },
            { name: 'PUZZLE_MSTR.EXE', players: '892', reward: '40 SOLAR', status: 'RUNNING' },
            { name: 'SPEED_RUN.EXE', players: '2,134', reward: '80 SOLAR', status: 'RUNNING' }
          ].map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="retro-window cursor-pointer hover:retro-pulse"
            >
              <div className="retro-window-header">
                <span style={{ fontSize: '8px' }}>{game.name}</span>
                <div className="retro-window-controls">
                  <div className="retro-btn minimize">_</div>
                  <div className="retro-btn maximize">□</div>
                  <div className="retro-btn close">×</div>
                </div>
              </div>

              <div className="p-4">
                {/* Game Preview */}
                <div className="aspect-video bg-black border-2 border-gray-600 mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl">🎮</div>
                  <div className="absolute top-2 left-2 pixel-text text-green-400" style={{ fontSize: '6px' }}>
                    {game.status}
                  </div>
                </div>

                {/* Game Info */}
                <div className="pixel-text" style={{ fontSize: '8px' }}>
                  <div className="flex justify-between mb-2">
                    <span>PLAYERS:</span>
                    <span className="text-yellow-400">{game.players}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>REWARD:</span>
                    <span className="text-green-400">{game.reward}</span>
                  </div>
                  <button
                    className="retro-button w-full mt-2"
                    style={{ fontSize: '6px', padding: '4px' }}
                    onClick={() => {
                      handleButtonClick(game.name);
                      trackInteraction(`game_${game.name.toLowerCase().replace(/\s+/g, '_')}`);
                      // Game functionality removed
                    }}
                  >
                    PLAY NOW
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </div>

          {/* System Performance Panel */}
          <div className="mt-16 space-y-2">
            <RetroStatusBar
              label="CPU USAGE"
              value={Math.round(cpuUsage)}
              className="retro-slide-in"
            />
            <RetroStatusBar
              label="MEMORY"
              value={Math.round(memoryUsage)}
              className="retro-slide-in"
            />
            <RetroStatusBar
              label="NETWORK"
              value={Math.round(networkActivity)}
              className="retro-slide-in"
            />
          </div>
        </div>

        {/* Fixed Sidebar - Desktop Icons */}
        <div className="fixed-sidebar space-y-3">
          {[
            { icon: '🎮', label: 'GAMES' },
            { icon: '💰', label: 'WALLET' },
            { icon: '🏆', label: 'LEADERBOARD' },
            { icon: '⚙️', label: 'SETTINGS' },
            { icon: '🤖', label: 'MCP TOOLS' }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center cursor-pointer hover:bg-blue-600/20 p-1 rounded retro-pulse w-16 h-14"
              onClick={() => handleButtonClick(item.label)}
            >
              <div className="text-lg mb-1">{item.icon}</div>
              <div className="pixel-text text-white text-center" style={{ fontSize: '6px', lineHeight: '1' }}>
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fixed MCP Status Window - Separate positioning */}
        <RetroHologram className="fixed-mcp-panel">
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="retro-window retro-flicker"
          >
            <div className="retro-window-header">
              <span style={{ fontSize: '8px' }}>🤖 MCP DEFI AUTOMATION</span>
              <div className="retro-window-controls">
                <div className="retro-btn minimize">_</div>
              </div>
            </div>

            <div className="p-4">
              <div className="pixel-text mb-3" style={{ fontSize: '8px' }}>
                AI SERVICES ACTIVE:
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span>YIELD FARMING:</span>
                  <span className="text-green-400">ON</span>
                </div>
                <div className="flex justify-between">
                  <span>ARBITRAGE BOT:</span>
                  <span className="text-green-400">ON</span>
                </div>
                <div className="flex justify-between">
                  <span>LIQUIDITY MGMT:</span>
                  <span className="text-green-400">ON</span>
                </div>
                <div className="flex justify-between">
                  <span>PORTFOLIO OPT:</span>
                  <span className="text-yellow-400">LEARNING</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="pixel-text mb-2" style={{ fontSize: '8px' }}>
                  TODAY'S EARNINGS:
                </div>
                <div className="text-green-400 text-lg font-bold retro-glow-pulse">
                  +$247.83
                </div>
                <div className="retro-loading-bar mt-2"></div>
              </div>
            </div>
          </motion.div>
        </RetroHologram>

        {/* System Performance Panel - Fixed position below sidebar */}
        <div className="fixed-system-panel space-y-2">
          <div className="retro-panel p-2">
            <div className="pixel-text mb-1 text-center" style={{ fontSize: '6px' }}>
              CPU: {Math.round(cpuUsage)}%
            </div>
            <div className="retro-progress h-2">
              <div
                className="retro-progress-fill h-full"
                style={{ width: `${cpuUsage}%` }}
              />
            </div>
          </div>

          <div className="retro-panel p-2">
            <div className="pixel-text mb-1 text-center" style={{ fontSize: '6px' }}>
              MEM: {Math.round(memoryUsage)}%
            </div>
            <div className="retro-progress h-2">
              <div
                className="retro-progress-fill h-full"
                style={{ width: `${memoryUsage}%` }}
              />
            </div>
          </div>

          <div className="retro-panel p-2">
            <div className="pixel-text mb-1 text-center" style={{ fontSize: '6px' }}>
              NET: {Math.round(networkActivity)}%
            </div>
            <div className="retro-progress h-2">
              <div
                className="retro-progress-fill h-full"
                style={{ width: `${networkActivity}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Components */}
      <ArcadeModal
        isOpen={showArcade}
        onClose={() => setShowArcade(false)}
        onGameSelect={(game) => {
          // Game functionality removed
        }}
      />

      <LeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
      />

      <StartMenuModal
        isOpen={showStartMenu}
        onClose={() => setShowStartMenu(false)}
        onMenuSelect={handleButtonClick}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onBrightnessChange={adjustBrightness}
        onContrastChange={adjustContrast}
        onFontSizeChange={adjustFontSize}
        onReducedMotionToggle={toggleReducedMotion}
      />

      <HelpModal
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />

      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </div>
  );
}
