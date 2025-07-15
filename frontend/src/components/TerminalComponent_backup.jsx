import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';

const TerminalComponent = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isInteractive, setIsInteractive] = useState(false);
  const [isDemo, setIsDemo] = useState(true);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const availableCommands = {
    'help': {
      description: i18n.language === 'es' ? 'Muestra todos los comandos disponibles' : 'Shows all available commands',
      output: () => {
        const commands = Object.keys(availableCommands).map(cmd => 
          `${cmd.padEnd(15)} - ${availableCommands[cmd].description}`
        ).join('\n');
        return i18n.language === 'es' ? 
          `Comandos disponibles:\n${commands}\n\nTip: Usa 'demo' para volver al modo demo` :
          `Available commands:\n${commands}\n\nTip: Use 'demo' to return to demo mode`;
      }
    },
    'whoami': {
      description: i18n.language === 'es' ? 'Muestra información sobre Axel' : 'Shows information about Axel',
      output: () => t('terminalWhoami')
    },
    'skills': {
      description: i18n.language === 'es' ? 'Lista habilidades técnicas' : 'Lists technical skills',
      output: () => t('terminalSkills')
    },
    'location': {
      description: i18n.language === 'es' ? 'Muestra ubicación actual' : 'Shows current location',
      output: () => t('terminalLocation')
    },
    'contact': {
      description: i18n.language === 'es' ? 'Muestra información de contacto' : 'Shows contact information',
      output: () => i18n.language === 'es' ? 
        'Email: axeliparrea@gmail.com\nLinkedIn: linkedin.com/in/axel-iparrea\nGitHub: github.com/axeliparrea' :
        'Email: axeliparrea@gmail.com\nLinkedIn: linkedin.com/in/axel-iparrea\nGitHub: github.com/axeliparrea'
    },
    'clear': {
      description: i18n.language === 'es' ? 'Limpia la terminal' : 'Clears the terminal',
      output: () => '__CLEAR__'
    }
  };

  const demoCommands = [
    {
      command: 'whoami',
      output: () => t('terminalWhoami')
    },
    {
      command: 'help',
      output: () => i18n.language === 'es' ? 
        'Escribe "interactive" para modo interactivo. Usa TAB para autocompletar.' :
        'Type "interactive" for interactive mode. Use TAB for autocompletion.'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const executeCommand = (command) => {
    if (!command) return;
    
    const [cmd, ...args] = command.split(' ');
    const lowerCmd = cmd.toLowerCase();
    
    setCommandHistory(prev => [...prev, { command, output: null, timestamp: new Date() }]);
    
    if (availableCommands[lowerCmd]) {
      const output = availableCommands[lowerCmd].output(args);
      if (output === '__CLEAR__') {
        setCommandHistory([]);
        return;
      }
      setCommandHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].output = output;
        return newHistory;
      });
    } else {
      const errorMsg = i18n.language === 'es' ? 
        `Comando no encontrado: ${command}. Escribe "help" para ver comandos disponibles.` :
        `Command not found: ${command}. Type "help" to see available commands.`;
      setCommandHistory(prev => {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1].output = errorMsg;
        return newHistory;
      });
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(userInput.trim());
      setUserInput('');
      setHistoryIndex(-1);
    }
  };

  const terminalStyle = {
    backgroundColor: colors.codeBackground,
    border: `1px solid ${colors.border}`,
    borderRadius: '12px',
    padding: '0',
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: window.innerWidth < 768 ? '12px' : '14px',
    color: colors.primary,
    height: window.innerWidth < 768 ? '350px' : '400px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: `0 8px 32px ${colors.primary}20`,
    maxWidth: window.innerWidth < 768 ? '100%' : '700px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    backgroundColor: colors.card,
    padding: '12px 20px',
    borderBottom: `1px solid ${colors.border}`,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0
  };

  return (
    <div style={terminalStyle}>
      <div style={headerStyle}>
        <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f57'}}></div>
        <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e'}}></div>
        <div style={{width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28ca42'}}></div>
        <span style={{marginLeft: '10px', color: colors.textSecondary, fontSize: '12px'}}>
          axel@iparrea-dev: ~
        </span>
      </div>
      
      <div style={{padding: '20px', height: '100%', overflow: 'auto'}}>
        <div>
          <div style={{color: colors.primary, fontWeight: 'bold'}}>
            $ help
          </div>
          <div style={{color: colors.text, whiteSpace: 'pre-wrap', marginBottom: '10px'}}>
            {i18n.language === 'es' ? 
              'Terminal interactiva - Escribe "help" para comandos disponibles' :
              'Interactive terminal - Type "help" for available commands'
            }
          </div>
        </div>

        {commandHistory.map((item, index) => (
          <div key={index} style={{marginBottom: '10px'}}>
            <div style={{color: colors.primary, fontWeight: 'bold'}}>$ {item.command}</div>
            {item.output && (
              <div style={{color: colors.text, whiteSpace: 'pre-wrap'}}>{item.output}</div>
            )}
          </div>
        ))}
        
        <div style={{display: 'flex', alignItems: 'center'}}>
          <span style={{color: colors.primary, fontWeight: 'bold'}}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: colors.text,
              fontFamily: 'inherit',
              fontSize: 'inherit',
              width: '100%',
              marginLeft: '5px'
            }}
            placeholder={i18n.language === 'es' ? 'Escribe un comando...' : 'Type a command...'}
            autoFocus
          />
          <span style={{
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s',
            color: colors.primary
          }}>
            █
          </span>
        </div>
      </div>
    </div>
  );
};

export default TerminalComponent;
