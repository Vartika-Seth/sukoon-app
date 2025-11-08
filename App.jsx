// SUKOON MEDITATION APP - PRODUCTION VERSION
// Copy this entire file to: src/App.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Music, BookOpen, TrendingUp, Play, Pause, Volume2, VolumeX, Clock, Calendar, Award, Sparkles, Star, Home } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MEDITATION_TYPES = [
  { id: 'calm', name: 'Calm', icon: '🌊', color: 'bg-blue-100', description: 'Find inner peace' },
  { id: 'focus', name: 'Focus', icon: '🎯', color: 'bg-purple-100', description: 'Sharpen your mind' },
  { id: 'healing', name: 'Healing', icon: '💚', color: 'bg-green-100', description: 'Restore balance' },
  { id: 'awareness', name: 'Awareness', icon: '👁️', color: 'bg-yellow-100', description: 'Expand consciousness' },
  { id: 'gratitude', name: 'Gratitude', icon: '🙏', color: 'bg-pink-100', description: 'Cultivate thankfulness' },
  { id: 'balance', name: 'Balance', icon: '⚖️', color: 'bg-indigo-100', description: 'Find equilibrium' },
  { id: 'sleep', name: 'Sleep', icon: '🌙', color: 'bg-slate-100', description: 'Deep rest' },
  { id: 'energy', name: 'Energy Boost', icon: '⚡', color: 'bg-orange-100', description: 'Revitalize yourself' },
  { id: 'release', name: 'Emotional Release', icon: '🌸', color: 'bg-rose-100', description: 'Let go of tension' }
];

const MUSIC_TRACKS = [
  { id: 1, name: 'Ocean Waves', category: 'nature', emoji: '🌊' },
  { id: 2, name: 'Rainforest Ambience', category: 'nature', emoji: '🌧️' },
  { id: 3, name: 'Tibetan Singing Bowls', category: 'meditation', emoji: '🕉️' },
  { id: 4, name: 'Piano & Strings', category: 'instrumental', emoji: '🎹' },
  { id: 5, name: 'Wind & Birds', category: 'nature', emoji: '🌿' },
  { id: 6, name: 'Soft Rain', category: 'nature', emoji: '☔' },
  { id: 7, name: 'Crystal Bowls', category: 'meditation', emoji: '💎' },
  { id: 8, name: 'Forest Stream', category: 'nature', emoji: '🏞️' }
];

const AFFIRMATIONS = [
  "I am present in this moment",
  "Peace begins with me",
  "I trust the journey of my life",
  "Every breath brings calm",
  "I am worthy of inner peace",
  "My mind is clear and focused",
  "I release what I cannot control",
  "I am grateful for this moment",
  "Stillness is my natural state",
  "I honor my healing process",
  "I breathe in courage, I breathe out fear",
  "Today, I choose peace over worry",
  "I am enough, just as I am",
  "My thoughts do not define me",
  "I welcome whatever arises with compassion",
  "In silence, I find my strength",
  "I am connected to all that is",
  "Each moment is a new beginning",
  "I trust in the unfolding of my path",
  "My heart is open to love and healing",
  "I embrace the present with gratitude",
  "I am a vessel of peace and light",
  "My breath anchors me in the now",
  "I release judgment and embrace acceptance",
  "I am worthy of rest and restoration",
  "Today, I practice gentle kindness toward myself",
  "I am exactly where I need to be",
  "My inner wisdom guides me",
  "I honor my emotions without being consumed by them",
  "Peace flows through me like a gentle river"
];

const MOODS = [
  { emoji: '😊', label: 'Happy', value: 5 },
  { emoji: '😌', label: 'Calm', value: 4 },
  { emoji: '😐', label: 'Neutral', value: 3 },
  { emoji: '😟', label: 'Anxious', value: 2 },
  { emoji: '😢', label: 'Sad', value: 1 },
  { emoji: '🙏', label: 'Grateful', value: 5 }
];

const MEDITATION_GUIDES = {
  calm: {
    title: "Calm Meditation Guide",
    instructions: [
      "Find a comfortable seated position with your spine straight but relaxed",
      "Close your eyes gently or maintain a soft downward gaze",
      "Take three deep breaths - inhale through your nose, exhale through your mouth",
      "Let your breathing return to its natural rhythm",
      "Focus your attention on the sensation of breath at your nostrils or chest",
      "When your mind wanders (and it will), gently bring it back to your breath",
      "Notice the pause between inhale and exhale",
      "Allow any thoughts to pass like clouds in the sky",
      "Rest in the stillness between thoughts",
      "Feel the waves of calm washing over you with each exhale"
    ],
    mantra: "I am calm. I am peace. I am stillness."
  },
  focus: {
    title: "Focus Meditation Guide",
    instructions: [
      "Sit upright with alertness in your posture",
      "Choose a single point of focus - your breath, a candle flame, or a mantra",
      "Set your intention: 'I dedicate this time to developing concentration'",
      "Gently place your full attention on your chosen object",
      "Count your breaths from 1 to 10, then start again",
      "When distracted, acknowledge the thought and return to counting",
      "Strengthen your focus like training a muscle",
      "Notice when your mind is sharp versus dull",
      "Maintain steady, continuous awareness",
      "End by noticing your enhanced mental clarity"
    ],
    mantra: "One breath. One moment. One point of focus."
  },
  healing: {
    title: "Healing Meditation Guide",
    instructions: [
      "Settle into a position that feels nurturing and safe",
      "Place one hand on your heart, one on your belly",
      "Breathe deeply into your hands, feeling them rise and fall",
      "Visualize a warm, golden light at your heart center",
      "With each inhale, draw in healing energy",
      "With each exhale, release pain, tension, and what no longer serves you",
      "Let the golden light expand through your entire body",
      "Send healing energy to any area that needs it",
      "Acknowledge your wounds with compassion",
      "Affirm: 'I am healing. I am whole. I am enough.'"
    ],
    mantra: "Every breath heals me. Every moment restores me."
  },
  awareness: {
    title: "Awareness Meditation Guide",
    instructions: [
      "Sit in a position of dignified presence",
      "Open your awareness like the vast sky",
      "Notice whatever arises - sounds, sensations, thoughts, emotions",
      "Don't focus on anything specifically; remain open to everything",
      "Observe without labeling or judging",
      "Notice the spacious awareness that contains all experiences",
      "Recognize that you are the awareness, not the content",
      "Expand your consciousness beyond the boundaries of your body",
      "Rest as pure witnessing presence",
      "Simply be aware that you are aware"
    ],
    mantra: "I am the witness. I am consciousness itself."
  },
  gratitude: {
    title: "Gratitude Meditation Guide",
    instructions: [
      "Settle into your seat with a gentle smile",
      "Place your hands over your heart",
      "Take a moment to feel the gift of this breath",
      "Bring to mind three things you're grateful for today",
      "Really feel the appreciation in your body",
      "Thank your body for carrying you through life",
      "Appreciate someone who has helped you",
      "Feel gratitude for challenges that helped you grow",
      "Extend thanks to the air you breathe, the earth beneath you",
      "Let your heart overflow with appreciation for this precious life"
    ],
    mantra: "Thank you. I am grateful. I am blessed."
  },
  balance: {
    title: "Balance Meditation Guide",
    instructions: [
      "Find your center - physically and mentally",
      "Notice the balance between effort and ease in your posture",
      "Breathe equally through both nostrils if possible",
      "Visualize yourself as a mountain - stable yet flexible",
      "Acknowledge both light and shadow within you",
      "Balance acceptance with aspiration",
      "Honor rest as much as action",
      "Find equilibrium between giving and receiving",
      "Notice the still point at the center of all movement",
      "Rest in the balance of being"
    ],
    mantra: "I am centered. I am balanced. I am whole."
  },
  sleep: {
    title: "Sleep Meditation Guide",
    instructions: [
      "Lie down in a comfortable position for sleep",
      "Let your body sink into the surface beneath you",
      "Take several deep, slow breaths, releasing tension with each exhale",
      "Progressively relax each part of your body from head to toes",
      "Let go of the day - all tasks, worries, and thoughts",
      "Imagine yourself floating on calm, warm water",
      "With each breath, drift deeper into relaxation",
      "Allow thoughts to dissolve like mist",
      "Trust that sleep will come naturally",
      "Surrender completely to rest"
    ],
    mantra: "I release the day. I welcome deep, peaceful sleep."
  },
  energy: {
    title: "Energy Boost Meditation Guide",
    instructions: [
      "Sit upright with an energized posture",
      "Take several quick, energizing breaths (breath of fire)",
      "Visualize bright, vibrant light entering your body",
      "Feel energy gathering at your solar plexus",
      "With each inhale, draw in vitality and life force",
      "Imagine roots growing from your feet, drawing energy from the earth",
      "Feel your spine as a channel of flowing energy",
      "Clench and release your fists to activate your body",
      "Affirm your strength and vitality",
      "End with lion's breath - exhale forcefully with tongue out"
    ],
    mantra: "I am alive. I am energized. I am powerful."
  },
  release: {
    title: "Emotional Release Meditation Guide",
    instructions: [
      "Find a private space where you can express freely",
      "Allow yourself to feel whatever emotions are present",
      "Take deep breaths into the center of the emotion",
      "Don't suppress or judge - just feel and observe",
      "Visualize the emotion as a color or energy",
      "With each exhale, imagine releasing this energy",
      "You might cry, shake, or feel waves of sensation - this is healing",
      "Place your hands on any area holding tension",
      "Speak or write what needs to be expressed",
      "Conclude by filling the space with light and peace"
    ],
    mantra: "I release what no longer serves me. I am free."
  }
};

const LEARN_CONTENT = [
  {
    title: "How Meditation Calms the Nervous System",
    description: "Understanding the science behind mindful breathing and stress reduction",
    category: "Science",
    icon: "🧠",
    fullContent: `Meditation activates the parasympathetic nervous system, which is responsible for the body's "rest and digest" response. When you meditate:

• Your heart rate slows down
• Blood pressure decreases
• Stress hormones like cortisol are reduced
• The amygdala (fear center) becomes less reactive
• The prefrontal cortex (reasoning center) becomes more active

Regular practice can actually change the structure of your brain, increasing gray matter in areas associated with emotional regulation, learning, and memory. Even 10 minutes a day can make a significant difference in how your nervous system responds to stress.`
  },
  {
    title: "Self-Realization through Chakra Meditation",
    description: "Ancient practices for balancing your energy centers",
    category: "Spiritual",
    icon: "🕉️",
    fullContent: `The chakra system represents seven energy centers in your body, from the base of your spine to the crown of your head:

1. Root Chakra (Muladhara) - Grounding and survival
2. Sacral Chakra (Svadhisthana) - Creativity and emotions
3. Solar Plexus (Manipura) - Personal power and confidence
4. Heart Chakra (Anahata) - Love and compassion
5. Throat Chakra (Vishuddha) - Communication and truth
6. Third Eye (Ajna) - Intuition and insight
7. Crown Chakra (Sahasrara) - Spiritual connection

To practice: Sit comfortably, focus on each chakra location, visualize its associated color, and breathe into that area. Notice any sensations, emotions, or blockages.`
  },
  {
    title: "Grounding Techniques for Anxiety",
    description: "Quick exercises to return to the present moment",
    category: "Practice",
    icon: "🌱",
    fullContent: `When anxiety strikes, these grounding techniques can bring you back to the present:

5-4-3-2-1 Method:
• Name 5 things you can see
• 4 things you can touch
• 3 things you can hear
• 2 things you can smell
• 1 thing you can taste

Physical Grounding:
• Press your feet firmly into the floor
• Hold ice cubes in your hands
• Splash cold water on your face
• Do progressive muscle relaxation`
  },
  {
    title: "The Art of Body Scan Meditation",
    description: "Progressive relaxation for deep healing",
    category: "Technique",
    icon: "✨",
    fullContent: `Body scan meditation is a systematic way to release tension and develop body awareness:

How to Practice:
1. Lie down or sit comfortably
2. Close your eyes and take several deep breaths
3. Start at the top of your head
4. Slowly move attention down through each body part
5. Notice sensations without judgment
6. Breathe into areas of tension
7. Continue down to your toes

Practice for 10-30 minutes daily.`
  },
  {
    title: "Loving-Kindness Meditation",
    description: "Cultivate compassion for yourself and others",
    category: "Heart",
    icon: "💗",
    fullContent: `Loving-kindness (Metta) meditation develops unconditional love and compassion:

Phrases to repeat:
• May I/you be safe
• May I/you be healthy
• May I/you be happy
• May I/you live with ease

Begin with yourself, then extend to loved ones, neutral people, difficult people, and all beings.`
  }
];

// Audio Engine
class AmbientSoundEngine {
  constructor() {
    this.audioContext = null;
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }
  
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  
  play(trackType) {
    this.init();
    this.stop();
    
    const masterGain = this.audioContext.createGain();
    masterGain.gain.value = 0.3;
    masterGain.connect(this.audioContext.destination);
    
    if (trackType === 1) {
      this.createOceanWaves(masterGain);
    } else if (trackType === 2 || trackType === 6) {
      this.createRain(masterGain);
    } else if (trackType === 3 || trackType === 7) {
      this.createSingingBowls(masterGain);
    } else if (trackType === 5 || trackType === 8) {
      this.createWind(masterGain);
    } else {
      this.createCalm(masterGain);
    }
    
    this.isPlaying = true;
  }
  
  createOceanWaves(destination) {
    const bufferSize = 4096;
    const whiteNoise = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
    whiteNoise.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.5;
    
    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);
    
    this.oscillators.push(whiteNoise);
    this.gainNodes.push(gainNode);
  }
  
  createRain(destination) {
    const bufferSize = 2048;
    const whiteNoise = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
    whiteNoise.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 2000;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.4;
    
    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);
    
    this.oscillators.push(whiteNoise);
    this.gainNodes.push(gainNode);
  }
  
  createSingingBowls(destination) {
    const frequencies = [256, 384, 512, 768];
    
    frequencies.forEach((freq, idx) => {
      const osc = this.audioContext.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0;
      
      osc.connect(gainNode);
      gainNode.connect(destination);
      osc.start();
      
      const now = this.audioContext.currentTime;
      const interval = 8 + idx * 2;
      
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.15, now + 2);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + interval);
      
      this.oscillators.push(osc);
      this.gainNodes.push(gainNode);
    });
  }
  
  createWind(destination) {
    const bufferSize = 4096;
    const whiteNoise = this.audioContext.createScriptProcessor(bufferSize, 1, 1);
    whiteNoise.onaudioprocess = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
    };
    
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 1200;
    
    const gainNode = this.audioContext.createGain();
    gainNode.gain.value = 0.3;
    
    whiteNoise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(destination);
    
    this.oscillators.push(whiteNoise);
    this.gainNodes.push(gainNode);
  }
  
  createCalm(destination) {
    [200, 300, 400].forEach((freq) => {
      const osc = this.audioContext.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = freq;
      
      const gainNode = this.audioContext.createGain();
      gainNode.gain.value = 0.08;
      
      osc.connect(gainNode);
      gainNode.connect(destination);
      osc.start();
      
      this.oscillators.push(osc);
      this.gainNodes.push(gainNode);
    });
  }
  
  setVolume(volume) {
    this.gainNodes.forEach(gain => {
      gain.gain.value = volume * 0.5;
    });
  }
  
  stop() {
    this.oscillators.forEach(osc => {
      try {
        if (osc.stop) osc.stop();
        if (osc.disconnect) osc.disconnect();
      } catch (e) {}
    });
    this.oscillators = [];
    this.gainNodes = [];
    this.isPlaying = false;
  }
}

const getPersonalizedAdvice = (session, journals) => {
  const moodImprovement = session.moodAfter - session.moodBefore;
  const meditationType = MEDITATION_TYPES.find(t => t.id === session.type);
  const oneWord = session.postPrompts.oneWord.toLowerCase();
  const emotions = session.postPrompts.emotions.toLowerCase();
  
  let advice = "";
  
  if (moodImprovement >= 2) {
    advice = `What a beautiful transformation! Your ${meditationType.name} practice lifted your spirits significantly. I can feel the shift in your energy - from ${MOODS.find(m => m.value === session.moodBefore)?.label} to ${MOODS.find(m => m.value === session.moodAfter)?.label}. This is the power you hold within yourself. ✨\n\n`;
    
    if (oneWord.includes('peace') || oneWord.includes('calm') || oneWord.includes('light')) {
      advice += `The word "${session.postPrompts.oneWord}" you chose speaks volumes. You've touched that deep well of tranquility within you. This feeling is always accessible - remember this moment when life feels heavy.\n\n`;
    }
    
    advice += `Keep nurturing this practice. Your soul is responding beautifully to the stillness you're offering it.`;
    
  } else if (moodImprovement === 1) {
    advice = `I see gentle progress in your practice today. Moving from ${MOODS.find(m => m.value === session.moodBefore)?.label} to ${MOODS.find(m => m.value === session.moodAfter)?.label} might seem small, but every step matters. You showed up for yourself, and that's what counts. 💚\n\n`;
    
    if (emotions.includes('difficult') || emotions.includes('restless') || emotions.includes('distracted')) {
      advice += `I notice you experienced some challenges during your session. That's completely natural - meditation isn't about perfection. The fact that you stayed with it shows incredible strength.\n\n`;
    }
    
    advice += `Be patient with yourself. Healing isn't linear. Some days will feel like breakthroughs, others will feel like just showing up. Both are equally valuable.`;
    
  } else if (moodImprovement === 0) {
    advice = `Thank you for being honest about your experience today. Sometimes meditation doesn't shift our mood immediately, and that's okay. You still created space for yourself, and that's a gift. 🌿\n\n`;
    
    advice += `What you felt - "${emotions}" - is valid. Not every session needs to be transformative. Sometimes just sitting with ourselves, exactly as we are, is the practice.\n\n`;
    
    advice += `Consider trying a different approach tomorrow. Perhaps ${getSuggestedTypeForStuck(session.type)} might resonate differently with where you are right now.`;
    
  } else {
    advice = `I see your mood shifted in an unexpected direction today. This happens, and it's important data. Sometimes meditation brings up emotions we've been avoiding, and that can feel uncomfortable. 💙\n\n`;
    
    advice += `You're brave for sitting with whatever arose. This discomfort might be part of your healing process. If you felt "${emotions}", know that these feelings deserve space too.\n\n`;
    
    advice += `Tomorrow, be extra gentle with yourself. Consider a Healing or Calm practice to nurture yourself through this emotional territory.`;
  }
  
  return advice;
};

const getSuggestedTypeForStuck = (currentType) => {
  const suggestions = {
    calm: 'Awareness or Gratitude',
    focus: 'Calm or Healing',
    healing: 'Gratitude or Release',
    awareness: 'Focus or Balance',
    gratitude: 'Healing or Calm',
    balance: 'Energy or Awareness',
    sleep: 'Calm or Healing',
    energy: 'Focus or Balance',
    release: 'Healing or Gratitude'
  };
  return suggestions[currentType] || 'a different';
};

const getRecommendation = (sessions, journals) => {
  if (sessions.length === 0) {
    return {
      type: 'calm',
      message: "Welcome to your mindfulness journey. Let's start with a calming session to center yourself."
    };
  }
  
  const recentMoods = sessions.slice(-5).map(s => s.moodBefore);
  const avgMood = recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length;
  
  if (avgMood < 2.5) {
    return { type: 'healing', message: "I sense you've been carrying some weight. A healing session might help you release and restore." };
  } else if (avgMood < 3) {
    return { type: 'calm', message: "You've felt anxious lately. Let's cultivate some calm together." };
  } else {
    return { type: 'balance', message: "Maintain your equilibrium with a balanced meditation today." };
  }
};

export default function SukoonApp() {
  const [currentView, setCurrentView] = useState('home');
  const [username, setUsername] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [journals, setJournals] = useState([]);
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5);
  const [currentTrack, setCurrentTrack] = useState(MUSIC_TRACKS[0]);
  const [bookmarkedContent, setBookmarkedContent] = useState([]);
  const [aiAdvice, setAiAdvice] = useState('');
  const soundEngine = useRef(null);
  
  useEffect(() => {
    loadUserData();
    soundEngine.current = new AmbientSoundEngine();
    
    return () => {
      if (soundEngine.current) {
        soundEngine.current.stop();
      }
    };
  }, []);
  
  useEffect(() => {
    if (soundEngine.current) {
      if (musicPlaying) {
        soundEngine.current.play(currentTrack.id);
        soundEngine.current.setVolume(musicVolume);
      } else {
        soundEngine.current.stop();
      }
    }
  }, [musicPlaying, currentTrack]);
  
  useEffect(() => {
    if (soundEngine.current && musicPlaying) {
      soundEngine.current.setVolume(musicVolume);
    }
  }, [musicVolume]);
  
  const loadUserData = () => {
    try {
      const userResult = localStorage.getItem('sukoon-user');
      if (userResult) {
        const userData = JSON.parse(userResult);
        setUsername(userData.username);
        setShowNamePrompt(false);
        
        const userSessionsKey = `sukoon-sessions-${userData.username}`;
        const sessionsResult = localStorage.getItem(userSessionsKey);
        if (sessionsResult) setSessions(JSON.parse(sessionsResult));
        
        const userJournalsKey = `sukoon-journals-${userData.username}`;
        const journalsResult = localStorage.getItem(userJournalsKey);
        if (journalsResult) setJournals(JSON.parse(journalsResult));
        
        const userBookmarksKey = `sukoon-bookmarks-${userData.username}`;
        const bookmarksResult = localStorage.getItem(userBookmarksKey);
        if (bookmarksResult) setBookmarkedContent(JSON.parse(bookmarksResult));
        
        const userAdviceKey = `sukoon-advice-${userData.username}`;
        const adviceResult = localStorage.getItem(userAdviceKey);
        if (adviceResult) setAiAdvice(adviceResult);
      }
    } catch (error) {
      console.log('First time user');
    }
    
    setCurrentAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
  };
  
  const saveUsername = (name) => {
    setUsername(name);
    setShowNamePrompt(false);
    try {
      localStorage.setItem('sukoon-user', JSON.stringify({ username: name }));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const saveSession = (sessionData) => {
    const newSessions = [...sessions, { ...sessionData, id: Date.now(), date: new Date().toISOString() }];
    setSessions(newSessions);
    try {
      const userSessionsKey = `sukoon-sessions-${username}`;
      localStorage.setItem(userSessionsKey, JSON.stringify(newSessions));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const saveJournal = (journalData) => {
    const newJournals = [...journals, { ...journalData, id: Date.now(), date: new Date().toISOString() }];
    setJournals(newJournals);
    try {
      const userJournalsKey = `sukoon-journals-${username}`;
      localStorage.setItem(userJournalsKey, JSON.stringify(newJournals));
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const saveAIAdvice = (advice) => {
    setAiAdvice(advice);
    try {
      const userAdviceKey = `sukoon-advice-${username}