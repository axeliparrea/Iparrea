import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hook/ThemeContext';
import { useResponsive } from '../utils/responsive';

const ACCENT = '#00cc6a';
const ACCENT_DIM = '#00cc6a22';
const ACCENT_GLOW = '#00cc6a40';

// section → { text, navigateTo, navigateLabel }
const RESPONSES = {
  skills: {
    text: `Axel's core stack: Python, TypeScript, FastAPI, React — with deep specialization in LLM orchestration, multi-agent systems, RAG pipelines, and Voice AI. Also Redis, Heroku, and SAP S/4HANA. Check his full experience on the timeline!`,
    navigateTo: 'experience',
    navigateLabel: 'View Experience →'
  },
  experience: {
    text: `Currently AI Engineer at Envia.com (3 continents, 75% less human ops) and Founder at Cispar-IA (AI cybersecurity). Previously Technical Lead at ESAB and Full Stack at Tec de Monterrey.`,
    navigateTo: 'experience',
    navigateLabel: 'See full timeline →'
  },
  ai: {
    text: `Axel architects agentic AI: multi-agent orchestration, LLM deployment, RAG, and Voice AI. He cut human intervention by 75% at Envia.com, improved response times 70% at ESAB, and won SAP Labs 2025 with an agentic solution.`,
    navigateTo: 'projects',
    navigateLabel: 'See AI projects →'
  },
  cybersecurity: {
    text: `At Cispar-IA (his own startup), Axel builds AI-native security — autonomous pentesting agents, AI-powered SIEM, and natural language security interfaces. Plus a Cybersecurity specialization from Tec de Monterrey.`,
    navigateTo: 'experience',
    navigateLabel: 'See Cispar-IA →'
  },
  offer: {
    text: `Axel delivers: multi-agent AI systems, LLM-to-production pipelines, full-stack apps, and cybersecurity-AI from day one. His 75% automation gain and SAP Labs 2025 win prove it. What problem would you like to solve?`,
    navigateTo: 'contact',
    navigateLabel: 'Get in touch →'
  },
  projects: {
    text: `Standouts: agentic logistics platform (Envia.com), Cispar-IA cybersecurity AI, SAP Labs 2025 winning solution, and urban mobility multi-agent simulation. All clickable in the Projects section!`,
    navigateTo: 'projects',
    navigateLabel: 'Browse projects →'
  },
  contact: {
    text: `Best way: axeliparrea@gmail.com or LinkedIn at linkedin.com/in/axel-iparrea. Monterrey, Mexico — open to remote. The contact form is at the bottom of the page.`,
    navigateTo: 'contact',
    navigateLabel: 'Jump to contact →'
  },
  availability: {
    text: `Open to senior AI engineering / agentic systems roles — remote or Monterrey. Especially interested in LLMs, multi-agent infra, or AI-driven security. Email: axeliparrea@gmail.com`,
    navigateTo: 'contact',
    navigateLabel: 'Contact now →'
  },
  enterprise: {
    text: `Axel won SAP Labs 2025 building an agentic AI layer over SAP S/4HANA. He knows how to bring modern AI into legacy enterprise systems without disrupting production.`,
    navigateTo: 'projects',
    navigateLabel: 'See SAP project →'
  },
  about: {
    text: `Axel Iparrea — Senior AI Engineer, Agentic Systems Architect, and Cybersecurity AI specialist. CS at Tec de Monterrey (4.0 GPA), currently building AI at global scale.`,
    navigateTo: 'about',
    navigateLabel: 'Read about Axel →'
  },
  fallback: {
    text: `I can tell you about Axel's skills, AI expertise, experience, cybersecurity work, projects, or how to reach him. Try one of the quick actions below!`,
    navigateTo: null,
    navigateLabel: null
  },
};

const QUICK_CHIPS = [
  { label: 'What can you offer?', key: 'offer' },
  { label: 'AI expertise',        key: 'ai' },
  { label: 'View projects',       key: 'projects' },
  { label: 'Contact Axel',        key: 'contact' },
];

const GREETING = {
  id: 'greeting',
  role: 'assistant',
  text: "Hi! I'm Axel's AI assistant 👋 I can tell you about his skills, experience, projects, and what he can bring to your team. What would you like to know?",
  showChips: true,
};

/**
 * Resolves the correct pre-written response key from a user message string.
 * @param {string} message
 * @returns {keyof typeof RESPONSES}
 */
const resolveResponseKey = (message) => {
  const msg = message.toLowerCase();

  if (/skills|habilidades|tech|stack/.test(msg)) return 'skills';
  if (/experience|experiencia|trabajo|work|career/.test(msg)) return 'experience';
  if (/cybersecurity|seguridad|security|cispar/.test(msg)) return 'cybersecurity';
  if (/sap|enterprise|erp/.test(msg)) return 'enterprise';
  if (/ai|inteligencia artificial|agents|llm/.test(msg)) return 'ai';
  if (/offer|ofrecer|hire|contratar|empresa|company|benefit/.test(msg)) return 'offer';
  if (/projects|proyectos/.test(msg)) return 'projects';
  if (/contact|contacto|email|reach/.test(msg)) return 'contact';
  if (/salary|salario|disponible|available/.test(msg)) return 'availability';

  return 'fallback';
};

/** @param {{ id: string, role: 'user'|'assistant', text: string, showChips?: boolean, navigateTo?: string, navigateLabel?: string }} props */
const ChatMessage = ({ id, role, text, showChips, navigateTo, navigateLabel, onChipClick, onNavigate, colors }) => {
  const isUser = role === 'user';

  const bubbleStyle = {
    maxWidth: '85%',
    padding: '10px 14px',
    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    background: isUser
      ? `linear-gradient(135deg, ${ACCENT}, #00a6cc)`
      : colors.card,
    color: isUser ? '#ffffff' : colors.text,
    fontSize: '0.875rem',
    lineHeight: '1.55',
    border: isUser ? 'none' : `1px solid ${colors.border}`,
    wordBreak: 'break-word',
    fontFamily: 'Inter, sans-serif',
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    marginBottom: showChips ? '8px' : '12px',
  };

  const chipRowStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    marginBottom: '12px',
    paddingLeft: '4px',
  };

  const chipStyle = {
    padding: '5px 12px',
    borderRadius: '20px',
    border: `1px solid ${ACCENT}`,
    background: ACCENT_DIM,
    color: ACCENT,
    fontSize: '0.78rem',
    fontWeight: '500',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
  };

  const navBtnStyle = {
    display: 'block',
    marginTop: '8px',
    padding: '5px 12px',
    borderRadius: '20px',
    border: `1px solid ${ACCENT}`,
    background: ACCENT_DIM,
    color: ACCENT,
    fontSize: '0.78rem',
    fontWeight: '600',
    cursor: 'pointer',
    fontFamily: 'Inter, sans-serif',
    transition: 'all 0.2s ease',
    width: '100%',
    textAlign: 'center',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div style={rowStyle}>
        <div style={bubbleStyle}>
          {text}
          {!isUser && navigateTo && navigateLabel && (
            <button
              style={navBtnStyle}
              onClick={() => onNavigate(navigateTo)}
              onMouseEnter={(e) => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = ACCENT_DIM; e.currentTarget.style.color = ACCENT; }}
            >
              {navigateLabel}
            </button>
          )}
        </div>
      </div>
      {showChips && (
        <div style={chipRowStyle}>
          {QUICK_CHIPS.map((chip) => (
            <button
              key={chip.key}
              style={chipStyle}
              onClick={() => onChipClick(chip.label, chip.key)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ACCENT;
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = ACCENT_DIM;
                e.currentTarget.style.color = ACCENT;
              }}
            >
              {chip.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

/** Animated three-dot typing indicator */
const TypingIndicator = ({ colors }) => {
  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    padding: '10px 14px',
    background: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: '18px 18px 18px 4px',
    width: 'fit-content',
    marginBottom: '12px',
  };

  const dotStyle = (delay) => ({
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: ACCENT,
    animation: `chatDotBounce 1.2s ease-in-out ${delay}s infinite`,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div style={containerStyle}>
        <span style={dotStyle(0)} />
        <span style={dotStyle(0.2)} />
        <span style={dotStyle(0.4)} />
      </div>
    </motion.div>
  );
};

/** Avatar shown in the chat header */
const AxelAvatar = () => (
  <div
    style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: `linear-gradient(135deg, ${ACCENT}, #00a6cc)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: '700',
      color: '#fff',
      fontFamily: 'Inter, sans-serif',
      flexShrink: 0,
    }}
  >
    AI
  </div>
);

/**
 * Floating AI chat widget that lets recruiters ask about Axel Iparrea.
 * Uses pattern-matched pre-written responses — no backend required.
 */
const AgenticChat = () => {
  const { colors } = useTheme();
  const { isMobile } = useResponsive();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 320);
    }
  }, [isOpen]);

  const handleNavigate = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsOpen(false);
  };

  const deliverResponse = (responseKey) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const response = RESPONSES[responseKey];
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          text: response.text,
          navigateTo: response.navigateTo,
          navigateLabel: response.navigateLabel,
        },
      ]);
    }, 900 + Math.random() * 400);
  };

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', text: trimmed },
    ]);
    setInput('');
    deliverResponse(resolveResponseKey(trimmed));
  };

  const handleChipClick = (label, key) => {
    if (isTyping) return;
    setMessages((prev) => [
      ...prev,
      { id: `user-chip-${Date.now()}`, role: 'user', text: label },
    ]);
    deliverResponse(key);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const chatWidth = isMobile ? '100vw' : '350px';
  const chatRight = isMobile ? '0' : '24px';
  const chatBottom = isMobile ? '0' : '88px';
  const chatBorderRadius = isMobile ? '16px 16px 0 0' : '16px';

  const windowStyle = {
    position: 'fixed',
    bottom: chatBottom,
    right: chatRight,
    width: chatWidth,
    height: isMobile ? '85vh' : '500px',
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: chatBorderRadius,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    boxShadow: `0 24px 64px rgba(0,0,0,0.4), 0 0 0 1px ${ACCENT_GLOW}`,
    zIndex: 9999,
    fontFamily: 'Inter, sans-serif',
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    borderBottom: `1px solid ${colors.border}`,
    background: colors.card,
    flexShrink: 0,
  };

  const headerInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  };

  const headerTitleStyle = {
    fontSize: '0.9rem',
    fontWeight: '600',
    color: colors.text,
    lineHeight: '1.2',
  };

  const headerSubtitleStyle = {
    fontSize: '0.72rem',
    color: ACCENT,
    fontWeight: '500',
  };

  const closeBtnStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.textSecondary,
    fontSize: '18px',
    lineHeight: 1,
    padding: '4px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'color 0.2s',
  };

  const messagesAreaStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    scrollbarWidth: 'thin',
    scrollbarColor: `${colors.border} transparent`,
  };

  const inputAreaStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 14px',
    borderTop: `1px solid ${colors.border}`,
    background: colors.card,
    flexShrink: 0,
  };

  const inputStyle = {
    flex: 1,
    background: colors.surface,
    border: `1px solid ${colors.border}`,
    borderRadius: '10px',
    padding: '9px 13px',
    color: colors.text,
    fontSize: '0.875rem',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    transition: 'border-color 0.2s',
    resize: 'none',
  };

  const sendBtnStyle = {
    width: '36px',
    height: '36px',
    borderRadius: '10px',
    background: input.trim() ? ACCENT : colors.border,
    border: 'none',
    cursor: input.trim() ? 'pointer' : 'default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'background 0.2s, transform 0.1s',
  };

  const fabStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${ACCENT}, #00a6cc)`,
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    boxShadow: `0 4px 24px ${ACCENT_GLOW}, 0 0 0 0 ${ACCENT_GLOW}`,
    zIndex: 9998,
    animation: 'chatPulse 2.4s ease-in-out infinite',
  };

  return (
    <>
      <style>{`
        @keyframes chatDotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.5; }
          40% { transform: translateY(-6px); opacity: 1; }
        }
        @keyframes chatPulse {
          0%, 100% { box-shadow: 0 4px 24px ${ACCENT_GLOW}, 0 0 0 0 ${ACCENT_GLOW}; }
          50% { box-shadow: 0 4px 32px ${ACCENT}66, 0 0 0 10px transparent; }
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            style={windowStyle}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
          >
            <div style={headerStyle}>
              <div style={headerInfoStyle}>
                <AxelAvatar />
                <div>
                  <div style={headerTitleStyle}>Axel AI</div>
                  <div style={headerSubtitleStyle}>● Online</div>
                </div>
              </div>
              <button
                style={closeBtnStyle}
                onClick={() => setIsOpen(false)}
                onMouseEnter={(e) => { e.currentTarget.style.color = colors.text; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = colors.textSecondary; }}
              >
                ✕
              </button>
            </div>

            <div style={messagesAreaStyle}>
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  {...msg}
                  onChipClick={handleChipClick}
                  onNavigate={handleNavigate}
                  colors={colors}
                />
              ))}
              <AnimatePresence>
                {isTyping && <TypingIndicator key="typing" colors={colors} />}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            <div style={inputAreaStyle}>
              <input
                ref={inputRef}
                style={inputStyle}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={(e) => { e.target.style.borderColor = ACCENT; }}
                onBlur={(e) => { e.target.style.borderColor = colors.border; }}
                placeholder="Ask about Axel..."
                maxLength={300}
                disabled={isTyping}
              />
              <motion.button
                style={sendBtnStyle}
                onClick={handleSend}
                whileTap={input.trim() ? { scale: 0.9 } : {}}
                disabled={!input.trim() || isTyping}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke={input.trim() ? '#fff' : colors.textSecondary}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        style={fabStyle}
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ color: '#fff', fontSize: '18px', lineHeight: 1 }}
            >
              ✕
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: '22px' }}
            >
              💬
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default AgenticChat;
