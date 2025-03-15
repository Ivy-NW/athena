// components/edu-assistant.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Education-themed color palette based on campaign card
const COLORS = {
  primary: {
    main: "#EC4899", // Pink-500
    light: "#F9A8D4", // Pink-300
    dark: "#BE185D", // Pink-700
  },
  secondary: {
    main: "#A855F7", // Purple-500
    light: "#C4B5FD", // Purple-300
    dark: "#7E22CE", // Purple-700
  },
  accent: {
    green: "#10B981", // Emerald-500
    blue: "#3B82F6", // Blue-500
    orange: "#F59E0B", // Amber-500
    teal: "#14B8A6", // Teal-500
  },
  background: {
    dark: "#4C1D95", // Purple-900
    light: "#8B5CF6", // Violet-500
  },
  text: {
    primary: "#FFFFFF",
    secondary: "rgba(255, 255, 255, 0.8)",
    muted: "rgba(255, 255, 255, 0.6)",
  },
  blockchain: {
    main: "#F59E0B", // Amber-500 for blockchain elements
    light: "#FCD34D", // Amber-300
    dark: "#B45309", // Amber-700
    eth: "#627EEA", // Ethereum blue
    btc: "#F7931A", // Bitcoin orange
  },
};

const EduAssistant: React.FC = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [blinking, setBlinking] = useState(false);
  const [messageTimer, setMessageTimer] = useState<NodeJS.Timeout | null>(null);
  const [isWinking, setIsWinking] = useState(false);
  const [isSmiling, setIsSmiling] = useState(true);
  const characterRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Education and blockchain-themed messages
  const messages = React.useMemo(
    () => [
      "Need help with your studies? I'm here to assist! 📚✨",
      "Learning is a journey, not a destination. Let's explore together! 🚀",
      "Blockchain technology is revolutionizing how we think about data! 🔗",
      "Smart contracts are self-executing contracts with terms directly written into code. 📝",
      "Decentralization means no single entity has control over the entire network. 🌐",
      "Curious about NFTs or DeFi? Ask me anything! 🎨💰",
      "Cryptography is the foundation of blockchain security. 🔐",
      "Web3 is building an internet where users own their data and digital assets. 🌟",
      "Remember: mistakes are just opportunities to learn something new! 🌱",
      "Education + blockchain = the future of verifiable credentials! 🎓🔗",
    ],
    []
  );

  // Character styles with education and blockchain-themed elements
  const characterStyles = `
    .edu-assistant-container {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 200px;
      height: 220px;
      z-index: 1000;
      cursor: pointer;
      filter: drop-shadow(0 0 10px rgba(236, 72, 153, 0.3));
    }

    .edu-assistant {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .assistant-head {
      position: absolute;
      width: 120px;
      height: 120px;
      background: linear-gradient(135deg, ${COLORS.secondary.light}, ${COLORS.secondary.dark});
      border-radius: 50%;
      top: 50px;
      left: 40px;
      box-shadow: 
        inset -4px -4px 10px rgba(0,0,0,0.2),
        inset 4px 4px 10px rgba(255,255,255,0.15),
        0 0 20px ${COLORS.secondary.main}40;
      overflow: hidden;
      z-index: 2;
    }

    /* Chrome glass effect on head */
    .assistant-head::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255,255,255,0.4) 0%,
        rgba(255,255,255,0) 30%,
        rgba(255,255,255,0) 70%,
        rgba(255,255,255,0.2) 100%
      );
      transform: rotate(30deg);
      pointer-events: none;
    }

    .floating-element {
      position: absolute;
      border-radius: 50%;
      box-shadow: 0 0 8px rgba(0,0,0,0.2);
      z-index: 1;
    }

    /* Floating educational elements */
    .floating-element.book {
      width: 35px;
      height: 30px;
      top: 20px;
      left: 15px;
      background: ${COLORS.accent.blue};
      border-radius: 2px;
      animation: float-book 4s infinite ease-in-out;
      transform: rotate(-10deg);
    }

    .book::after {
      content: '';
      position: absolute;
      top: 0;
      left: 3px;
      width: 29px;
      height: 30px;
      background: white;
      border-radius: 2px 0 0 2px;
      transform: rotate(0deg);
    }

    .book::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 10px;
      width: 16px;
      height: 2px;
      background: ${COLORS.secondary.main};
      border-radius: 1px;
      box-shadow: 0 5px 0 ${COLORS.secondary.main}, 0 10px 0 ${COLORS.secondary.main}, 0 15px 0 ${COLORS.secondary.main};
    }

    /* Blockchain elements */
    .floating-element.blockchain {
      width: 40px;
      height: 25px;
      top: 15px;
      right: 15px;
      background: transparent;
      animation: float-blockchain 5s infinite ease-in-out;
      transform: rotate(0deg);
    }

    .blockchain-block {
      position: absolute;
      width: 12px;
      height: 12px;
      background: ${COLORS.blockchain.main};
      border-radius: 2px;
      box-shadow: 0 0 8px ${COLORS.blockchain.main}80;
    }

    .blockchain-block:nth-child(1) {
      top: 0;
      left: 14px;
    }

    .blockchain-block:nth-child(2) {
      top: 8px;
      left: 0;
    }

    .blockchain-block:nth-child(3) {
      top: 8px;
      left: 28px;
    }

    .blockchain-block:nth-child(4) {
      top: 16px;
      left: 14px;
    }

    .blockchain-line {
      position: absolute;
      width: 10px;
      height: 2px;
      background: ${COLORS.blockchain.light};
      z-index: 0;
    }

    .blockchain-line:nth-child(5) {
      top: 6px;
      left: 8px;
      transform: rotate(-45deg);
    }

    .blockchain-line:nth-child(6) {
      top: 6px;
      left: 22px;
      transform: rotate(45deg);
    }

    .blockchain-line:nth-child(7) {
      top: 14px;
      left: 8px;
      transform: rotate(45deg);
    }

    .blockchain-line:nth-child(8) {
      top: 14px;
      left: 22px;
      transform: rotate(-45deg);
    }

    /* Ethereum coin */
    .floating-element.ethereum {
      width: 25px;
      height: 25px;
      bottom: 40px;
      left: 15px;
      background: ${COLORS.blockchain.eth};
      animation: float-ethereum 4.2s infinite ease-in-out, rotate-ethereum 15s infinite linear;
    }

    .ethereum::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 7px;
      width: 11px;
      height: 15px;
      background: transparent;
      border-left: 5px solid white;
      border-right: 5px solid white;
      border-top: 8px solid white;
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }

    .ethereum::after {
      content: '';
      position: absolute;
      bottom: 3px;
      left: 7px;
      width: 11px;
      height: 6px;
      background: white;
      clip-path: polygon(0 0, 100% 0, 50% 100%);
    }

    /* Bitcoin coin */
    .floating-element.bitcoin {
      width: 25px;
      height: 25px;
      bottom: 40px;
      right: 15px;
      background: ${COLORS.blockchain.btc};
      animation: float-bitcoin 3.8s infinite ease-in-out;
    }

    .bitcoin::before {
      content: 'B';
      position: absolute;
      top: 4px;
      left: 8px;
      color: white;
      font-weight: bold;
      font-size: 16px;
      transform: rotate(15deg);
    }

    /* Smart contract document */
    .floating-element.contract {
      width: 25px;
      height: 30px;
      top: 60px;
      left: 10px;
      background: white;
      border-radius: 2px;
      animation: float-contract 4.5s infinite ease-in-out;
    }

    .contract::before {
      content: '';
      position: absolute;
      top: 5px;
      left: 5px;
      width: 15px;
      height: 2px;
      background: ${COLORS.blockchain.main};
      box-shadow: 0 4px 0 ${COLORS.blockchain.main}, 0 8px 0 ${COLORS.blockchain.main}, 0 12px 0 ${COLORS.blockchain.main}, 0 16px 0 ${COLORS.blockchain.main};
    }

    .contract::after {
      content: '';
      position: absolute;
      top: -3px;
      right: -3px;
      width: 10px;
      height: 10px;
      background: ${COLORS.primary.main};
      border-radius: 50%;
      font-size: 8px;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @keyframes float-blockchain {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(-5px, -10px) rotate(-5deg); }
    }

    @keyframes float-ethereum {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(5px, -8px); }
    }

    @keyframes rotate-ethereum {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @keyframes float-bitcoin {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(-4px, -6px) rotate(10deg); }
    }

    @keyframes float-contract {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(4px, 5px) rotate(5deg); }
    }

    .floating-element.pencil {
      width: 6px;
      height: 35px;
      top: 15px;
      right: 60px;
      background: linear-gradient(to bottom, ${COLORS.accent.green} 90%, #FCD34D 90%);
      border-radius: 1px;
      animation: float-pencil 4.5s infinite ease-in-out;
      transform: rotate(30deg);
    }

    .floating-element.calculator {
      width: 25px;
      height: 30px;
      top: 50px;
      right: 60px;
      background: ${COLORS.primary.dark};
      border-radius: 3px;
      animation: float-calculator 3.5s infinite ease-in-out;
    }

    .calculator::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 19px;
      height: 7px;
      background: #E5E7EB;
      border-radius: 1px;
    }

    .calculator::before {
      content: '';
      position: absolute;
      top: 13px;
      left: 4px;
      width: 5px;
      height: 5px;
      background: #E5E7EB;
      border-radius: 1px;
      box-shadow: 
        6px 0 0 #E5E7EB, 
        12px 0 0 #E5E7EB, 
        0 6px 0 #E5E7EB, 
        6px 6px 0 #E5E7EB, 
        12px 6px 0 #E5E7EB;
    }

    .floating-element.atom {
      width: 22px;
      height: 22px;
      top: 80px;
      right: 15px;
      background: transparent;
      border: 2px solid ${COLORS.primary.light};
      animation: float-atom 5s infinite ease-in-out, rotate-atom 10s infinite linear;
    }

    .atom::before, .atom::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      border: 2px solid ${COLORS.primary.light};
      border-radius: 50%;
      top: -2px;
      left: -2px;
    }

    .atom::before {
      transform: rotate(60deg);
    }

    .atom::after {
      transform: rotate(-60deg);
    }

    .atom-nucleus {
      position: absolute;
      width: 7px;
      height: 7px;
      background: ${COLORS.primary.main};
      border-radius: 50%;
      top: 7.5px;
      left: 7.5px;
    }

    @keyframes float-book {
      0%, 100% { transform: translate(0, 0) rotate(-10deg); }
      50% { transform: translate(-5px, -8px) rotate(-5deg); }
    }

    @keyframes float-pencil {
      0%, 100% { transform: translate(0, 0) rotate(30deg); }
      50% { transform: translate(5px, -6px) rotate(25deg); }
    }

    @keyframes float-calculator {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(-3px, 5px) rotate(-5deg); }
    }

    @keyframes float-atom {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(4px, -4px) rotate(0deg); }
    }

    @keyframes rotate-atom {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .assistant-eye {
      position: absolute;
      width: 30px;
      height: 34px;
      background: white;
      border-radius: 50%;
      top: 35px;
      overflow: hidden;
      box-shadow: 0 0 5px rgba(0,0,0,0.2);
      z-index: 3;
    }

    .assistant-eye.left { 
      left: 25px;
      transform: rotate(-5deg);
    }
  
    .assistant-eye.right { 
      right: 25px;
      transform: rotate(5deg);
    }

    .eye-pupil {
      position: absolute;
      width: 18px;
      height: 18px;
      background: ${COLORS.secondary.dark};
      border-radius: 50%;
      top: 8px;
      left: 6px;
      transition: all 0.1s ease;
    }

    .eye-highlight {
      position: absolute;
      width: 8px;
      height: 8px;
      background: white;
      border-radius: 50%;
      top: 2px;
      left: 2px;
    }

    .eye-highlight-small {
      position: absolute;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      bottom: 2px;
      right: 2px;
    }

    .eye-lid {
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${COLORS.secondary.main};
      top: -100%;
      left: 0;
      border-radius: 50%;
      transition: all 0.15s ease;
    }

    .wink .eye-lid {
      top: 0;
    }

    .assistant-blush {
      position: absolute;
      width: 25px;
      height: 10px;
      background: ${COLORS.primary.light}70;
      border-radius: 50%;
      opacity: 0.8;
      top: 55px;
      filter: blur(2px);
      z-index: 3;
    }

    .assistant-blush.left { left: 15px; }
    .assistant-blush.right { right: 15px; }

    .assistant-mouth {
      position: absolute;
      width: 30px;
      height: 15px;
      bottom: 30px;
      left: 45px;
      border: none;
      border-bottom: 3px solid ${COLORS.primary.main};
      border-radius: 50%;
      z-index: 3;
    }

    .assistant-mouth.smile {
      height: 12px;
      width: 30px;
    }

    .assistant-mouth.surprised {
      height: 18px;
      width: 18px;
      border: 3px solid ${COLORS.primary.main};
      border-radius: 50%;
      left: 51px;
    }

    .speech-bubble {
      position: absolute;
      top: -20px;
      right: 170px;
      background: ${COLORS.background.dark}E6;
      padding: 18px;
      border-radius: 20px;
      box-shadow: 0 0 15px rgba(236, 72, 153, 0.25);
      width: 280px;
      min-height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 1rem;
      color: ${COLORS.text.primary};
      border: 2px solid ${COLORS.primary.light}60;
      backdrop-filter: blur(5px);
      overflow: hidden;
      z-index: 1001;
    }

    .speech-bubble::after {
      content: '';
      position: absolute;
      right: -10px;
      top: 40px;
      width: 0;
      height: 0;
      border-top: 10px solid transparent;
      border-bottom: 10px solid transparent;
      border-left: 12px solid ${COLORS.background.dark}E6;
      filter: drop-shadow(2px 0 2px rgba(0,0,0,0.1));
    }

    .blink {
      animation: blink-animation 0.2s ease;
    }

    @keyframes blink-animation {
      0% { top: -100%; }
      50% { top: 0; }
      100% { top: -100%; }
    }

    .heart {
      position: absolute;
      opacity: 0;
      font-size: 22px;
      pointer-events: none;
      animation: float-up 1.5s forwards;
    }

    .heart.heart-pink {
      color: ${COLORS.primary.light};
    }

    .heart.heart-purple {
      color: ${COLORS.secondary.light};
    }

    .heart.heart-blockchain {
      color: ${COLORS.blockchain.light};
    }

    @keyframes float-up {
      0% {
        opacity: 0;
        transform: translateY(0) scale(0.5);
      }
      20% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: translateY(-80px) scale(1.2);
      }
    }

    .edu-sparkle {
      position: absolute;
      width: 6px;
      height: 6px;
      background: ${COLORS.primary.light};
      border-radius: 50%;
      opacity: 0.8;
      animation: sparkle 2s infinite ease-in-out;
    }

    @keyframes sparkle {
      0%, 100% { opacity: 0.2; transform: scale(0.8); }
      50% { opacity: 0.8; transform: scale(1.2); }
    }

    /* Liquid metal effect for the badge */
    .edu-badge {
      position: absolute;
      width: 30px;
      height: 30px;
      top: 10px;
      left: 45px;
      z-index: 3;
      opacity: 0.9;
      background: linear-gradient(135deg, ${COLORS.primary.main}, ${COLORS.secondary.main});
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      overflow: hidden;
    }

    .edu-badge::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        to bottom right,
        rgba(255,255,255,0.8) 0%,
        rgba(255,255,255,0) 30%,
        rgba(255,255,255,0) 70%,
        rgba(255,255,255,0.3) 100%
      );
      transform: rotate(30deg);
      animation: shimmer-badge 3s infinite;
    }

    @keyframes shimmer-badge {
      0% { transform: rotate(30deg) translateX(-100%); }
      100% { transform: rotate(30deg) translateX(100%); }
    }
  `;

  // Add random edu sparkles around the character
  useEffect(() => {
    if (!containerRef.current) return;

    const createSparkles = () => {
      // Remove existing sparkles
      const existingSparkles =
        containerRef.current?.querySelectorAll(".edu-sparkle");
      existingSparkles?.forEach((sparkle) => sparkle.remove());

      // Create new sparkles
      const sparkleCount = 8;
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement("div");
        sparkle.className = "edu-sparkle";

        // Random position around the character
        const angle = Math.random() * Math.PI * 2;
        const distance = 60 + Math.random() * 50;
        const x = Math.cos(angle) * distance + 100;
        const y = Math.sin(angle) * distance + 110;

        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;

        // Random animation delay
        sparkle.style.animationDelay = `${Math.random() * 2}s`;

        // Random color - pink, purple or blockchain gold
        const colorRand = Math.random();
        if (colorRand < 0.33) {
          sparkle.style.background = COLORS.primary.light;
        } else if (colorRand < 0.66) {
          sparkle.style.background = COLORS.secondary.light;
        } else {
          sparkle.style.background = COLORS.blockchain.light;
        }

        containerRef.current?.appendChild(sparkle);
      }
    };

    createSparkles();
    const sparkleInterval = setInterval(createSparkles, 4000);

    return () => clearInterval(sparkleInterval);
  }, []);

  // Track mouse movement for eye tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (characterRef.current) {
        const rect = characterRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate direction from character to mouse
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;

        // Normalize and limit eye movement
        const maxMove = 5;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const normalizedX = distance > 0 ? (deltaX / distance) * maxMove : 0;
        const normalizedY = distance > 0 ? (deltaY / distance) * maxMove : 0;

        setEyePosition({
          x: normalizedX,
          y: normalizedY,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Random blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, Math.random() * 3000 + 2000); // Random blink between 2-5 seconds

    return () => clearInterval(blinkInterval);
  }, []);

  // Random winking effect
  useEffect(() => {
    const winkInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to wink
        setIsWinking(true);
        setTimeout(() => setIsWinking(false), 500);
      }
    }, 5000);

    return () => clearInterval(winkInterval);
  }, []);

  // Random mouth changes
  useEffect(() => {
    const mouthInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to change mouth
        setIsSmiling(false);
        setTimeout(() => setIsSmiling(true), 1000);
      }
    }, 6000);

    return () => clearInterval(mouthInterval);
  }, []);

  // Random message appearance
  useEffect(() => {
    // Function to show a random message
    const showRandomMessage = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
      setShowMessage(true);

      // Auto-hide message after a random time between 5-10 seconds
      const hideTime = Math.floor(Math.random() * 5000) + 5000;
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, hideTime);

      setMessageTimer(hideTimer);
    };

    // Initial random delay before first message (5-15 seconds after component mounts)
    const initialDelay = setTimeout(() => {
      showRandomMessage();
    }, Math.floor(Math.random() * 10000) + 5000);

    // Set up interval for random message appearances
    const messageInterval = setInterval(() => {
      // Only show a new message if no message is currently showing
      // and there's a 30% chance to show a message
      if (!showMessage && Math.random() < 0.3) {
        showRandomMessage();
      }
    }, 8000); // Check every 8 seconds if we should show a message

    return () => {
      clearTimeout(initialDelay);
      clearInterval(messageInterval);
      if (messageTimer) clearTimeout(messageTimer);
    };
  }, [showMessage, messages, messageTimer]);

  // Create floating elements on click
  const createFloatingElement = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const element = document.createElement("div");
    // Randomly choose between educational and blockchain symbols
    const symbols = ["📚", "🎓", "✏️", "🧮", "🔍", "💡", "🧠", "🔗", "💰", "📊", "🔐", "🌐"];
    element.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];
    
    // Randomly choose color class
    const colorRand = Math.random();
    if (colorRand < 0.33) {
      element.className = "heart heart-pink";
    } else if (colorRand < 0.66) {
      element.className = "heart heart-purple";
    } else {
      element.className = "heart heart-blockchain";
    }
    
    element.style.left = `${
      e.clientX - containerRef.current.getBoundingClientRect().left
    }px`;
    element.style.top = `${
      e.clientY - containerRef.current.getBoundingClientRect().top
    }px`;

    containerRef.current.appendChild(element);

    setTimeout(() => {
      if (containerRef.current && containerRef.current.contains(element)) {
        containerRef.current.removeChild(element);
      }
    }, 1500);
  };

  const handleCharacterClick = (e: React.MouseEvent) => {
    createFloatingElement(e);

    if (messageTimer) clearTimeout(messageTimer);

    if (!showMessage) {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setCurrentMessage(messages[randomIndex]);
      setShowMessage(true);

      // Auto-hide message after a random time between 5-10 seconds
      const hideTime = Math.floor(Math.random() * 5000) + 5000;
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, hideTime);

      setMessageTimer(hideTimer);
    } else {
      // Show a different message when already showing one
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * messages.length);
      } while (messages[randomIndex] === currentMessage);

      setCurrentMessage(messages[randomIndex]);

      // Reset the auto-hide timer
      if (messageTimer) clearTimeout(messageTimer);
      const hideTime = Math.floor(Math.random() * 5000) + 5000;
      const hideTimer = setTimeout(() => {
        setShowMessage(false);
      }, hideTime);

      setMessageTimer(hideTimer);
    }
  };

  const handleCloseMessage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMessage(false);
    if (messageTimer) clearTimeout(messageTimer);
  };

  return (
    <div className="edu-assistant-container" ref={containerRef}>
      <style>{characterStyles}</style>

      <motion.div
        className="edu-assistant"
        ref={characterRef}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
        onClick={handleCharacterClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="assistant-head">
          <div className="assistant-eye left">
            <div
              className="eye-pupil"
              style={{
                transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
              }}
            >
              <div className="eye-highlight"></div>
              <div className="eye-highlight-small"></div>
            </div>
            <div className={`eye-lid ${blinking ? "blink" : ""}`}></div>
          </div>

          <div className={`assistant-eye right ${isWinking ? "wink" : ""}`}>
            <div
              className="eye-pupil"
              style={{
                transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
              }}
            >
              <div className="eye-highlight"></div>
              <div className="eye-highlight-small"></div>
            </div>
            <div className={`eye-lid ${blinking ? "blink" : ""}`}></div>
          </div>

          <div className="assistant-blush left"></div>
          <div className="assistant-blush right"></div>

          <div
            className={`assistant-mouth ${isSmiling ? "smile" : "surprised"}`}
          ></div>

          <div className="edu-badge">A+</div>
        </div>

        {/* Floating educational elements */}
        <div className="floating-element book"></div>
        <div className="floating-element pencil"></div>
        <div className="floating-element calculator"></div>
        <div className="floating-element atom">
          <div className="atom-nucleus"></div>
        </div>

        {/* Floating blockchain elements */}
        <div className="floating-element blockchain">
          <div className="blockchain-block"></div>
          <div className="blockchain-block"></div>
          <div className="blockchain-block"></div>
          <div className="blockchain-block"></div>
          <div className="blockchain-line"></div>
          <div className="blockchain-line"></div>
          <div className="blockchain-line"></div>
          <div className="blockchain-line"></div>
        </div>
        <div className="floating-element ethereum"></div>
        <div className="floating-element bitcoin"></div>
        <div className="floating-element contract"></div>
      </motion.div>

      <AnimatePresence mode="wait">
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="speech-bubble"
          >
            {/* Liquid metal glow effect */}
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background: `radial-gradient(circle at center, ${COLORS.primary.main}15, transparent 70%)`,
                opacity: 0.5,
                pointerEvents: "none",
              }}
            />

            {/* Close button */}
            <motion.button
              onClick={handleCloseMessage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                border: "none",
                background: `${COLORS.primary.light}40`,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                color: COLORS.text.primary,
                fontSize: "12px",
                fontWeight: "bold",
                transition: "all 0.2s ease",
                zIndex: 2,
              }}
            >
              <svg
                width="10"
                height="10"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L11 11M1 11L11 1"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.button>

            {/* Message content */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ zIndex: 1 }}
            >
              {currentMessage}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EduAssistant;