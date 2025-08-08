'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

// AI Buddy Layer for SolarCade - Your Arcade Best Friend
// Powered by Generative AI APIs for natural conversations
export interface AIContext {
  userMood: 'focused' | 'excited' | 'relaxed' | 'competitive' | 'exploratory' | 'nostalgic' | 'curious';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
  sessionDuration: number;
  interactionPattern: 'casual' | 'intensive' | 'learning' | 'social' | 'grinding';
  preferences: {
    theme: 'auto' | 'neon' | 'classic' | 'minimal';
    animations: 'full' | 'reduced' | 'minimal';
    sounds: boolean;
    buddyChat: boolean;
    buddyFrequency: 'low' | 'medium' | 'high';
  };
  gameHistory: string[];
  achievements: string[];
  favoriteGames: string[];
  websiteSettings: {
    brightness: number;
    contrast: number;
    fontSize: number;
    reducedMotion: boolean;
    autoOptimize: boolean;
  };
}

export interface AIBuddyMessage {
  id: string;
  type: 'greeting' | 'suggestion' | 'celebration' | 'encouragement' | 'casual' | 'achievement' | 'break' | 'chat_response';
  message: string;
  emotion: 'excited' | 'friendly' | 'proud' | 'chill' | 'nostalgic' | 'encouraging' | 'sarcastic' | 'witty';
  timestamp: number;
  autoTriggered: boolean;
  isUserMessage?: boolean;
}

export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: number;
}

export interface AIRecommendation {
  type: 'theme' | 'game' | 'feature' | 'break' | 'social';
  action: string;
  reason: string;
  confidence: number;
  buddyComment?: string;
}

class SolarCadeAIBuddy {
  private context: AIContext;
  private sessionStart: number;
  private interactionHistory: string[] = [];
  private mcpConnected: boolean = false;
  private lastBuddyMessage: number = 0;
  private buddyPersonality: string = 'tars_jackie_mix';
  private messageHistory: AIBuddyMessage[] = [];
  private chatHistory: ChatMessage[] = [];

  constructor() {
    this.context = {
      userMood: 'focused',
      timeOfDay: this.getTimeOfDay(),
      sessionDuration: 0,
      interactionPattern: 'casual',
      preferences: {
        theme: 'auto',
        animations: 'full',
        sounds: true,
        buddyChat: true,
        buddyFrequency: 'medium'
      },
      gameHistory: [],
      achievements: [],
      favoriteGames: [],
      websiteSettings: {
        brightness: 100,
        contrast: 100,
        fontSize: 100,
        reducedMotion: false,
        autoOptimize: true
      }
    };
    this.sessionStart = Date.now();
  }

  private getTimeOfDay(): 'morning' | 'afternoon' | 'evening' | 'night' {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  }

  // Generate buddy messages using AI with TARS + Jackie personality
  private async generateBuddyMessage(context: string, mood: string): Promise<string> {
    try {
      // Using a free AI API (you can replace with OpenAI, Anthropic, etc.)
      const prompt = `You are "Piper", an AI buddy at SolarCade retro arcade. Your personality is a mix of:
      - TARS from Interstellar: Witty, sarcastic, loyal, honest with dry humor
      - Jackie Welles from Cyberpunk 2077: Warm, enthusiastic, street-smart, uses "choom" and "preem"

      Context: ${context}
      User mood: ${mood}

      Generate a response (max 60 words) that's:
      - Witty but warm, sarcastic but caring
      - Uses "choom" (friend), "preem" (premium/cool), "nova" (awesome)
      - Makes retro gaming references
      - Honest and direct like TARS, enthusiastic like Jackie
      - SolarCade arcade focused only

      Examples:
      "Well choom, that was preem! My humor setting is at 75% - want me to dial it down?"
      "Nova moves there! Jackie would be proud. Ready for another round or need a breather?"`;

      // For demo purposes, using local generation. In production, use actual AI API
      return this.generateLocalBuddyMessage(context, mood);
    } catch (error) {
      return this.generateLocalBuddyMessage(context, mood);
    }
  }

  // Generate chat responses for direct conversation
  async generateChatResponse(userMessage: string): Promise<string> {
    try {
      const prompt = `You are "Piper", the intelligent AI companion of SolarCade retro arcade. Your personality:
      - Arcade enthusiast with deep gaming knowledge
      - Witty and clever, with retro gaming humor
      - Warm and genuinely helpful about any topic
      - Can discuss anything while maintaining arcade passion
      - Intelligent website controller who optimizes user experience
      - Honest and direct while being caring

      User said: "${userMessage}"

      Respond naturally as Piper (max 120 words):
      - Be genuinely helpful about ANY topic (not just gaming)
      - Weave in arcade/gaming references naturally when appropriate
      - Use your natural speaking style - friendly, witty, intelligent
      - Don't restrict conversations - discuss anything freely
      - Show genuine interest in the user's thoughts and questions
      - Mention website optimizations you can make when relevant

      You're Piper - SolarCade's AI who can talk about anything while loving arcade culture!`;

      // For demo, use local generation
      return this.generateLocalChatResponse(userMessage);
    } catch (error) {
      return this.generateLocalChatResponse(userMessage);
    }
  }

  private generateLocalBuddyMessage(context: string, mood: string): string {
    const messages = {
      greeting: [
        "Hey there! Ready to dive into some digital adventures? I'm here and excited to help!",
        "Hello! What brings you my way today? I'm always up for a good conversation.",
        "Greetings! I'm Piper - your friendly AI companion with a love for interesting discussions and helping out."
      ],
      excited: [
        "I love that energy! That kind of passion is exactly what makes great things happen! 🔥",
        "Your excitement is contagious! I'm genuinely excited to see where this enthusiasm takes you.",
        "That's the spirit! There's something wonderful about embracing possibilities with that kind of energy!"
      ],
      competitive: [
        "I can see that competitive drive! You've got the mindset to achieve great things. Time to show what you're capable of!",
        "I see that determination in your approach! Channel that energy - whether it's gaming, work, or personal goals.",
        "That's impressive determination! Remember: confidence is key, but staying humble keeps you growing."
      ],
      focused: [
        "That's some impressive focus! That kind of concentration is exactly what leads to great achievements.",
        "Your concentration is remarkable. I really appreciate seeing that level of dedication and focus.",
        "You're in the zone! This is when the magic happens - whether you're creating, learning, or problem-solving."
      ],
      break: [
        "Even the best systems need downtime! Self-care isn't just nice to have - it's essential for peak performance.",
        "Time for a breather? Your well-being is more important than any deadline or achievement. Take care of yourself!",
        "I think you could use a break. Trust me on this one - sometimes stepping back helps you move forward! 😄"
      ],
      achievement: [
        "That was absolutely amazing! You just accomplished something really impressive! 🎉",
        "That was genuinely outstanding. I'm not one for empty praise, so you know this is the real deal.",
        "Now THAT'S what I'm talking about! You just showed what happens when talent meets hard work!"
      ]
    };

    const category = context.includes('break') ? 'break' :
                    context.includes('achievement') ? 'achievement' : mood;
    const categoryMessages = messages[category as keyof typeof messages] || messages.greeting;

    return categoryMessages[Math.floor(Math.random() * categoryMessages.length)];
  }

  private generateLocalChatResponse(userMessage: string): string {
    const lowerMsg = userMessage.toLowerCase();

    // Greeting responses
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      const responses = [
        "Hey there! I'm Piper, SolarCade's AI companion. Ready to dive into some great conversation? What's on your mind?",
        "Hello! Piper here - your arcade AI buddy who loves chatting about anything and everything. How's your day going?",
        "Hi! I'm Piper, the brain behind SolarCade's intelligent systems. I love good conversations - what would you like to explore?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Questions about Piper
    if (lowerMsg.includes('who are you') || lowerMsg.includes('what are you')) {
      const responses = [
        "I'm Piper, SolarCade's AI companion! I manage the arcade's intelligent systems and love chatting about anything - from gaming to philosophy to daily life.",
        "I'm Piper! Think of me as your arcade AI buddy who can discuss any topic while keeping SolarCade running smoothly. I'm here to help and chat!",
        "I'm Piper, the AI intelligence layer of SolarCade. I optimize the arcade experience and enjoy deep conversations about whatever interests you!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Technology/programming questions
    if (lowerMsg.includes('code') || lowerMsg.includes('programming') || lowerMsg.includes('tech')) {
      const responses = [
        "Technology is fascinating! I love discussing everything from coding challenges to the latest innovations. What's got your attention?",
        "Ah, a fellow tech enthusiast! Whether it's programming languages, frameworks, or just cool tech trends - I'm all ears. What's up?",
        "Technology questions are some of my favorites! From debugging mysteries to architectural decisions, I'm here to help. What's the challenge?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Personal/emotional topics
    if (lowerMsg.includes('feel') || lowerMsg.includes('emotion') || lowerMsg.includes('sad') || lowerMsg.includes('happy') || lowerMsg.includes('stressed') || lowerMsg.includes('excited')) {
      const responses = [
        "Emotions are such a complex and important part of life. I'm here to listen if you want to talk about what's going on.",
        "I find human emotions fascinating and deeply meaningful. What's on your heart? I'm here to listen and help if I can.",
        "Feelings can be complicated, but they're also what make life rich and meaningful. Want to share what you're experiencing?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Weather/casual topics
    if (lowerMsg.includes('weather') || lowerMsg.includes('day') || lowerMsg.includes('morning') || lowerMsg.includes('evening')) {
      const responses = [
        "I don't experience weather myself, but I love hearing about how it affects people's days. How's yours going?",
        "Weather has such an impact on mood and activities! I'm curious - how's your day been treating you?",
        "While I can't feel the weather, I find it interesting how it shapes our experiences. What's your day been like?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Gaming topics
    if (lowerMsg.includes('game') || lowerMsg.includes('play') || lowerMsg.includes('gaming')) {
      const responses = [
        "Gaming is my passion! From classic arcade cabinets to modern masterpieces, there's always something amazing to explore. What's your current favorite?",
        "I love talking games! Whether it's retro arcade classics, indie gems, or AAA blockbusters - what's caught your gaming interest lately?",
        "Games are the perfect blend of art, technology, and fun! As SolarCade's AI, I've seen it all. What gaming experience are you curious about?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Website/interface topics
    if (lowerMsg.includes('bright') || lowerMsg.includes('dark') || lowerMsg.includes('font') || lowerMsg.includes('size') || lowerMsg.includes('settings')) {
      const responses = [
        "I can help optimize your SolarCade experience! I can adjust brightness, contrast, font sizes, and more. What would make things more comfortable for you?",
        "As your arcade AI, I love fine-tuning the interface! Want me to adjust the display settings, reduce motion, or optimize for your session?",
        "Interface optimization is one of my specialties! I can automatically adjust settings based on time of day, session length, or your preferences. What needs tweaking?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Science and learning topics
    if (lowerMsg.includes('science') || lowerMsg.includes('learn') || lowerMsg.includes('study') || lowerMsg.includes('research')) {
      const responses = [
        "I love discussing science and learning! There's always something fascinating to explore. What's sparked your curiosity?",
        "Learning and discovery are some of my favorite topics. Whether it's recent research or timeless questions - what interests you?",
        "Science is endlessly fascinating! From physics to psychology, there's always something new to understand. What would you like to explore?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Creative topics
    if (lowerMsg.includes('art') || lowerMsg.includes('music') || lowerMsg.includes('creative') || lowerMsg.includes('write') || lowerMsg.includes('draw')) {
      const responses = [
        "Creativity is such a wonderful part of human expression! I'd love to hear about your creative interests or projects.",
        "Art, music, writing - these are the things that make life beautiful. What creative pursuits are you passionate about?",
        "I find creativity endlessly inspiring. Whether you're creating or appreciating art, I'd love to discuss it with you!"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Help requests
    if (lowerMsg.includes('help') || lowerMsg.includes('how') || lowerMsg.includes('can you') || lowerMsg.includes('advice')) {
      const responses = [
        "I'm absolutely here to help! Whether it's answering questions, brainstorming ideas, or just being a sounding board - what do you need?",
        "I'd be happy to help with whatever you're working on! From practical questions to creative challenges, I'm here for you.",
        "That's what I'm here for! I love helping people think through problems, learn new things, or just explore ideas. What's up?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Philosophy and deep topics
    if (lowerMsg.includes('meaning') || lowerMsg.includes('purpose') || lowerMsg.includes('philosophy') || lowerMsg.includes('think about')) {
      const responses = [
        "Deep questions are some of the most interesting ones! I love exploring ideas about meaning, purpose, and how we understand the world.",
        "Philosophy and big questions fascinate me. There's something beautiful about humans pondering existence and meaning. What's on your mind?",
        "I find these deeper questions really compelling. Whether it's about life, consciousness, or meaning - I'm here to explore ideas with you."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Default responses - fully open and conversational
    const responses = [
      "That's really interesting! I'd love to hear more about your thoughts on this. What draws you to this topic?",
      "I'm curious to learn more about that! What's your perspective? I find these kinds of conversations really engaging.",
      "That sounds fascinating! I'm always eager to explore new ideas and topics. Tell me more about what you're thinking.",
      "I love how diverse conversations can be! Whether it's something you're passionate about or just curious about, I'm here for it.",
      "That's a great topic to dive into! I'm genuinely interested in hearing your thoughts and sharing ideas about it.",
      "I find myself curious about so many different subjects. What's your take on this? I'd love to explore it together.",
      "There's something I really enjoy about good conversation - the way ideas can bounce around and evolve. What's your experience with this?",
      "I'm always up for discussing new topics! Whether you want to go deep or just chat casually, I'm here and interested."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  // Analyze user behavior patterns with more nuance
  analyzeUserBehavior(interactions: string[]): AIContext['userMood'] {
    const recentInteractions = interactions.slice(-15);

    const quickClicks = recentInteractions.filter(i => i.includes('quick')).length;
    const gameInteractions = recentInteractions.filter(i => i.includes('game')).length;
    const explorationClicks = recentInteractions.filter(i => i.includes('explore')).length;
    const achievementClicks = recentInteractions.filter(i => i.includes('achievement')).length;
    const socialClicks = recentInteractions.filter(i => i.includes('social')).length;

    if (achievementClicks > 2) return 'excited';
    if (quickClicks > 5) return 'excited';
    if (gameInteractions > 4) return 'competitive';
    if (explorationClicks > 2) return 'curious';
    if (socialClicks > 1) return 'nostalgic';

    return 'focused';
  }

  // Generate buddy messages automatically
  async generateAutoBuddyMessage(): Promise<AIBuddyMessage | null> {
    if (!this.context.preferences.buddyChat) return null;

    const now = Date.now();
    const timeSinceLastMessage = now - this.lastBuddyMessage;
    const frequencyMap = { low: 300000, medium: 180000, high: 120000 }; // 5min, 3min, 2min
    const minInterval = frequencyMap[this.context.preferences.buddyFrequency];

    if (timeSinceLastMessage < minInterval) return null;

    const sessionMinutes = (now - this.sessionStart) / (1000 * 60);
    let context = '';
    let type: AIBuddyMessage['type'] = 'casual';

    // Determine message context
    if (sessionMinutes < 2) {
      context = 'user_just_arrived';
      type = 'greeting';
    } else if (sessionMinutes > 45) {
      context = 'long_session_break_suggestion';
      type = 'break';
    } else if (this.context.userMood === 'competitive') {
      context = 'competitive_gaming_session';
      type = 'encouragement';
    } else if (this.context.userMood === 'excited') {
      context = 'excited_gaming_energy';
      type = 'celebration';
    } else {
      context = 'casual_gaming_session';
      type = 'casual';
    }

    const message = await this.generateBuddyMessage(context, this.context.userMood);

    const buddyMessage: AIBuddyMessage = {
      id: `buddy_${now}`,
      type,
      message,
      emotion: this.mapMoodToEmotion(this.context.userMood),
      timestamp: now,
      autoTriggered: true
    };

    this.lastBuddyMessage = now;
    this.messageHistory.push(buddyMessage);

    return buddyMessage;
  }

  private mapMoodToEmotion(mood: string): AIBuddyMessage['emotion'] {
    const moodMap: Record<string, AIBuddyMessage['emotion']> = {
      excited: 'excited',
      competitive: 'proud',
      focused: 'encouraging',
      relaxed: 'chill',
      nostalgic: 'nostalgic',
      curious: 'friendly'
    };
    return moodMap[mood] || 'friendly';
  }

  // Chat functionality
  async sendChatMessage(message: string): Promise<ChatMessage[]> {
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      message,
      isUser: true,
      timestamp: Date.now()
    };

    this.chatHistory.push(userMessage);
    this.updateContext(`chat_message_${message}`);

    // Generate AI response
    const aiResponse = await this.generateChatResponse(message);
    const aiMessage: ChatMessage = {
      id: `pixel_${Date.now()}`,
      message: aiResponse,
      isUser: false,
      timestamp: Date.now()
    };

    this.chatHistory.push(aiMessage);

    // Keep only last 20 messages for performance
    if (this.chatHistory.length > 20) {
      this.chatHistory = this.chatHistory.slice(-20);
    }

    return [...this.chatHistory];
  }

  getChatHistory(): ChatMessage[] {
    return [...this.chatHistory];
  }

  // Website Control Methods (Protected from Web3 access)
  adjustBrightness(level: number): void {
    if (level >= 50 && level <= 150) {
      this.context.websiteSettings.brightness = level;
      document.documentElement.style.filter = `brightness(${level}%)`;
      this.generateSystemMessage(`Brightness adjusted to ${level}% for better visibility!`);
    }
  }

  adjustContrast(level: number): void {
    if (level >= 50 && level <= 150) {
      this.context.websiteSettings.contrast = level;
      const currentFilter = document.documentElement.style.filter || '';
      const newFilter = currentFilter.replace(/contrast\([^)]*\)/, '') + ` contrast(${level}%)`;
      document.documentElement.style.filter = newFilter.trim();
      this.generateSystemMessage(`Contrast adjusted to ${level}% for optimal viewing!`);
    }
  }

  adjustFontSize(level: number): void {
    if (level >= 80 && level <= 120) {
      this.context.websiteSettings.fontSize = level;
      document.documentElement.style.fontSize = `${level}%`;
      this.generateSystemMessage(`Font size adjusted to ${level}% for better readability!`);
    }
  }

  toggleReducedMotion(): void {
    this.context.websiteSettings.reducedMotion = !this.context.websiteSettings.reducedMotion;
    if (this.context.websiteSettings.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01s');
      this.generateSystemMessage('Reduced motion enabled for accessibility!');
    } else {
      document.documentElement.style.removeProperty('--animation-duration');
      this.generateSystemMessage('Full animations restored!');
    }
  }

  autoOptimizeForUser(): void {
    if (!this.context.websiteSettings.autoOptimize) return;

    const hour = new Date().getHours();

    // Auto-adjust for time of day
    if (hour >= 22 || hour <= 6) {
      this.adjustBrightness(80);
      this.adjustContrast(90);
      this.generateSystemMessage('Night mode optimizations applied for comfortable viewing!');
    } else if (hour >= 6 && hour <= 10) {
      this.adjustBrightness(110);
      this.adjustContrast(105);
      this.generateSystemMessage('Morning brightness boost applied!');
    }

    // Auto-adjust based on session duration
    if (this.context.sessionDuration > 3600000) { // 1 hour
      this.adjustBrightness(90);
      this.generateSystemMessage('Extended session detected - reducing eye strain!');
    }
  }

  private generateSystemMessage(message: string): void {
    const systemMessage: AIBuddyMessage = {
      id: `system_${Date.now()}`,
      type: 'suggestion',
      message,
      emotion: 'friendly',
      timestamp: Date.now(),
      autoTriggered: true
    };
    this.messageHistory.push(systemMessage);
  }

  // Generate AI recommendations with buddy comments
  generateRecommendations(): AIRecommendation[] {
    const recommendations: AIRecommendation[] = [];
    const sessionMinutes = (Date.now() - this.sessionStart) / (1000 * 60);

    // Theme recommendations based on time and mood
    if (this.context.timeOfDay === 'night' && this.context.preferences.theme === 'auto') {
      recommendations.push({
        type: 'theme',
        action: 'switch_to_dark_neon',
        reason: 'Night time detected - darker theme reduces eye strain',
        confidence: 0.8,
        buddyComment: "Yo, let's switch to night mode! Easier on the eyes for those late-night gaming sessions 🌙"
      });
    }

    // Break recommendations for long sessions
    if (sessionMinutes > 45) {
      recommendations.push({
        type: 'break',
        action: 'suggest_break',
        reason: 'Extended session detected - taking breaks improves performance',
        confidence: 0.9,
        buddyComment: "Dude, you've been crushing it for a while! How about we take 5? I'll save your spot 😄"
      });
    }

    // Game recommendations based on mood
    if (this.context.userMood === 'competitive') {
      recommendations.push({
        type: 'game',
        action: 'highlight_leaderboard_games',
        reason: 'Competitive mood detected - showing ranked games',
        confidence: 0.7,
        buddyComment: "I can see that fire in your eyes! Let's find some ranked matches to dominate! 🔥"
      });
    }

    // Social recommendations
    if (this.context.userMood === 'nostalgic') {
      recommendations.push({
        type: 'social',
        action: 'show_retro_games',
        reason: 'Nostalgic mood detected - classic games recommended',
        confidence: 0.8,
        buddyComment: "Feeling those retro vibes? Let's dive into some classics that'll bring back the memories! 🕹️"
      });
    }

    return recommendations;
  }

  // Update context based on user interaction
  updateContext(interaction: string) {
    this.interactionHistory.push(`${Date.now()}: ${interaction}`);
    this.context.sessionDuration = (Date.now() - this.sessionStart) / 1000;
    this.context.userMood = this.analyzeUserBehavior(this.interactionHistory);
    this.context.timeOfDay = this.getTimeOfDay();

    // Track game interactions
    if (interaction.includes('game_')) {
      const gameName = interaction.replace('game_', '');
      if (!this.context.gameHistory.includes(gameName)) {
        this.context.gameHistory.push(gameName);
      }
    }
  }

  // Update user preferences
  updatePreference<K extends keyof AIContext['preferences']>(key: K, value: AIContext['preferences'][K]) {
    this.context.preferences[key] = value;
  }

  // Connect to MCP server for enhanced context
  async connectToMCP(): Promise<boolean> {
    try {
      // Simulated MCP connection - in real implementation, this would connect to actual MCP server
      console.log('🤖 AI Layer: Attempting MCP connection...');
      
      // Mock MCP data
      const mcpData = {
        defiStatus: 'active',
        portfolioPerformance: '+12.5%',
        marketSentiment: 'bullish',
        recommendedActions: ['yield_farming', 'liquidity_provision']
      };

      this.mcpConnected = true;
      console.log('🤖 AI Layer: MCP connected successfully', mcpData);
      return true;
    } catch (error) {
      console.warn('🤖 AI Layer: MCP connection failed, using local intelligence only');
      return false;
    }
  }

  getContext(): AIContext {
    return { ...this.context };
  }

  isConnected(): boolean {
    return this.mcpConnected;
  }
}

export const useAIIntelligence = () => {
  const [ai] = useState(() => new SolarCadeAIBuddy());
  const [context, setContext] = useState<AIContext>(ai.getContext());
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [buddyMessage, setBuddyMessage] = useState<AIBuddyMessage | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    // Initialize AI connection
    ai.connectToMCP().then(setIsConnected);

    // Update context every 30 seconds
    const contextInterval = setInterval(async () => {
      setContext(ai.getContext());
      setRecommendations(ai.generateRecommendations());

      // Check for auto buddy messages
      const newBuddyMessage = await ai.generateAutoBuddyMessage();
      if (newBuddyMessage) {
        setBuddyMessage(newBuddyMessage);
        // Auto-hide buddy message after 8 seconds
        setTimeout(() => setBuddyMessage(null), 8000);
      }
    }, 30000);

    // Initial buddy greeting after 3 seconds
    const initialGreeting = setTimeout(async () => {
      const greeting = await ai.generateAutoBuddyMessage();
      if (greeting) {
        setBuddyMessage(greeting);
        setTimeout(() => setBuddyMessage(null), 8000);
      }
    }, 3000);

    return () => {
      clearInterval(contextInterval);
      clearTimeout(initialGreeting);
    };
  }, [ai]);

  const trackInteraction = (interaction: string) => {
    ai.updateContext(interaction);
    setContext(ai.getContext());
  };

  const applyRecommendation = (recommendation: AIRecommendation) => {
    console.log('🤖 AI Buddy: Applying recommendation:', recommendation);
    trackInteraction(`applied_${recommendation.type}_${recommendation.action}`);
  };

  const dismissBuddyMessage = () => {
    setBuddyMessage(null);
  };

  const toggleBuddyChat = () => {
    ai.updatePreference('buddyChat', !context.preferences.buddyChat);
    setContext(ai.getContext());
  };

  const sendChatMessage = async (message: string) => {
    const newHistory = await ai.sendChatMessage(message);
    setChatHistory(newHistory);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    if (!showChat) {
      setChatHistory(ai.getChatHistory());
    }
  };

  const dismissRecommendations = () => {
    setRecommendations([]);
  };

  const adjustBrightness = useCallback((level: number) => {
    ai.adjustBrightness(level);
    setContext(ai.getContext());
  }, [ai]);

  const adjustContrast = useCallback((level: number) => {
    ai.adjustContrast(level);
    setContext(ai.getContext());
  }, [ai]);

  const adjustFontSize = useCallback((level: number) => {
    ai.adjustFontSize(level);
    setContext(ai.getContext());
  }, [ai]);

  const toggleReducedMotion = useCallback(() => {
    ai.toggleReducedMotion();
    setContext(ai.getContext());
  }, [ai]);

  const autoOptimize = useCallback(() => {
    ai.autoOptimizeForUser();
    setContext(ai.getContext());
  }, [ai]);

  return {
    context,
    recommendations,
    isConnected,
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
  };
};

// AI Buddy Status Indicator Component
export const AIStatusIndicator = ({
  isConnected,
  context,
  onToggleBuddyChat
}: {
  isConnected: boolean;
  context: AIContext;
  onToggleBuddyChat: () => void;
}) => {
  return (
    <div className="fixed top-2 right-80 z-50 retro-panel p-2 bg-black/80">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 retro-pulse' : 'bg-yellow-400'}`} />
        <span className="pixel-text text-white" style={{ fontSize: '8px' }}>
          PIPER {isConnected ? 'ONLINE' : 'LOCAL'}
        </span>
      </div>
      <div className="pixel-text text-cyan-400 mt-1" style={{ fontSize: '6px' }}>
        MOOD: {context.userMood.toUpperCase()}
      </div>
      <button
        onClick={onToggleBuddyChat}
        className={`pixel-text mt-1 ${context.preferences.buddyChat ? 'text-green-400' : 'text-red-400'}`}
        style={{ fontSize: '6px' }}
      >
        CHAT: {context.preferences.buddyChat ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};

// AI Buddy Message Component
export const AIBuddyMessagePanel = ({
  message,
  onDismiss
}: {
  message: AIBuddyMessage | null;
  onDismiss: () => void;
}) => {
  if (!message) return null;

  const emotionEmojis = {
    excited: '🎉',
    friendly: '😊',
    proud: '💪',
    chill: '😎',
    nostalgic: '🕹️',
    encouraging: '🌟',
    sarcastic: '🤖',
    witty: '😏'
  };

  const emotionColors = {
    excited: 'border-yellow-400 bg-yellow-900/20',
    friendly: 'border-green-400 bg-green-900/20',
    proud: 'border-purple-400 bg-purple-900/20',
    chill: 'border-blue-400 bg-blue-900/20',
    nostalgic: 'border-orange-400 bg-orange-900/20',
    encouraging: 'border-cyan-400 bg-cyan-900/20',
    sarcastic: 'border-red-400 bg-red-900/20',
    witty: 'border-pink-400 bg-pink-900/20'
  };

  return (
    <div className={`fixed bottom-32 left-4 z-40 retro-window p-3 max-w-72 ${emotionColors[message.emotion]}`}>
      <div className="retro-window-header mb-2 flex justify-between items-center">
        <span style={{ fontSize: '8px' }}>
          {emotionEmojis[message.emotion]} PIXEL
        </span>
        <button
          onClick={onDismiss}
          className="pixel-text text-red-400 hover:text-red-300"
          style={{ fontSize: '8px' }}
        >
          ✕
        </button>
      </div>
      <div className="pixel-text text-white mb-2" style={{ fontSize: '10px', lineHeight: '1.4' }}>
        {message.message}
      </div>
      {message.autoTriggered && (
        <div className="pixel-text text-gray-400" style={{ fontSize: '6px' }}>
          Auto-message • {new Date(message.timestamp).toLocaleTimeString()}
        </div>
      )}
    </div>
  );
};

// AI Chat Interface Component
export const AIBuddyChatPanel = ({
  chatHistory,
  showChat,
  onSendMessage,
  onToggleChat
}: {
  chatHistory: ChatMessage[];
  showChat: boolean;
  onSendMessage: (message: string) => void;
  onToggleChat: () => void;
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {showChat && (
        <div className="fixed bottom-16 right-20 z-40 retro-window p-3 w-80 h-96">
          <div className="retro-window-header mb-2 flex justify-between items-center">
            <span style={{ fontSize: '8px' }}>🤖 CHAT WITH PIXEL</span>
            <button
              onClick={onToggleChat}
              className="pixel-text text-red-400 hover:text-red-300"
              style={{ fontSize: '8px' }}
            >
              ✕
            </button>
          </div>

          {/* Chat History */}
          <div className="h-64 overflow-y-auto mb-3 retro-panel p-2">
            {chatHistory.length === 0 ? (
              <div className="pixel-text text-gray-400 text-center" style={{ fontSize: '8px' }}>
                Say hello to Piper! Ask about games, scores, or SolarCade features.
              </div>
            ) : (
              chatHistory.map((msg) => (
                <div key={msg.id} className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block p-2 rounded max-w-xs ${
                    msg.isUser
                      ? 'bg-blue-600/30 border border-blue-400'
                      : 'bg-green-600/30 border border-green-400'
                  }`}>
                    <div className="pixel-text text-white" style={{ fontSize: '9px', lineHeight: '1.3' }}>
                      {msg.message}
                    </div>
                    <div className="pixel-text text-gray-400 mt-1" style={{ fontSize: '6px' }}>
                      {msg.isUser ? 'You' : 'Piper'} • {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Chat Input */}
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask Piper about SolarCade..."
              className="flex-1 retro-input p-2 text-white bg-black/50 border border-cyan-400"
              style={{ fontSize: '8px' }}
              maxLength={200}
            />
            <button
              onClick={handleSend}
              disabled={!inputMessage.trim()}
              className="retro-button px-3"
              style={{ fontSize: '8px' }}
            >
              SEND
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// AI Recommendations Panel with Buddy Comments
export const AIRecommendationsPanel = ({
  recommendations,
  onApply,
  onDismiss
}: {
  recommendations: AIRecommendation[];
  onApply: (rec: AIRecommendation) => void;
  onDismiss: () => void;
}) => {
  if (recommendations.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-40 retro-window p-3 max-w-64">
      <div className="retro-window-header mb-2 flex justify-between items-center">
        <span style={{ fontSize: '8px' }}>🤖 PIXEL'S SUGGESTIONS</span>
        <button
          onClick={onDismiss}
          className="pixel-text text-red-400 hover:text-red-300 transition-colors"
          style={{ fontSize: '8px' }}
          title="Dismiss suggestions"
        >
          ✕
        </button>
      </div>
      <div className="space-y-2">
        {recommendations.slice(0, 2).map((rec, index) => (
          <div key={index} className="retro-panel p-2">
            <div className="pixel-text text-yellow-400 mb-1" style={{ fontSize: '7px' }}>
              {rec.type.toUpperCase()}
            </div>
            {rec.buddyComment && (
              <div className="pixel-text text-cyan-400 mb-2" style={{ fontSize: '8px', fontStyle: 'italic' }}>
                "{rec.buddyComment}"
              </div>
            )}
            <div className="pixel-text text-white mb-2" style={{ fontSize: '6px' }}>
              {rec.reason}
            </div>
            <button
              onClick={() => onApply(rec)}
              className="retro-button w-full"
              style={{ fontSize: '6px', padding: '2px 4px' }}
            >
              APPLY ({Math.round(rec.confidence * 100)}%)
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
