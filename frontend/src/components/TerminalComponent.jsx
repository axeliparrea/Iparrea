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
      description: i18n.language === 'es' ? 'Muestra informacin sobre Axel' : 'Shows information about Axel',
      output: () => t('terminalWhoami')
    },
    'skills': {
      description: i18n.language === 'es' ? 'Lista habilidades tcnicas' : 'Lists technical skills',
      output: () => t('terminalSkills')
    },
    'location': {
      description: i18n.language === 'es' ? 'Muestra ubicacin actual' : 'Shows current location',
      output: () => t('terminalLocation')
    },
    'contact': {
      description: i18n.language === 'es' ? 'Muestra informacin de contacto' : 'Shows contact information',
      output: () => i18n.language === 'es' ? 
        'Email: axeliparrea@gmail.com\nLinkedIn: linkedin.com/in/axel-iparrea\nGitHub: github.com/axeliparrea' :
        'Email: axeliparrea@gmail.com\nLinkedIn: linkedin.com/in/axel-iparrea\nGitHub: github.com/axeliparrea'
    },
    'projects': {
      description: i18n.language === 'es' ? 'Lista proyectos destacados' : 'Lists featured projects',
      output: () => i18n.language === 'es' ? 
        'Proyectos destacados:\n Sistema de gestin SAP\n Aplicacin de streaming\n Plataforma de anlisis de datos\n Juego Unity con ML\n\nUsa "scroll projects" para ver la seccin de proyectos' :
        'Featured projects:\n SAP management system\n Streaming application\n Data analysis platform\n Unity game with ML\n\nUse "scroll projects" to see the projects section'
    },
    'education': {
      description: i18n.language === 'es' ? 'Muestra informacin educativa' : 'Shows education information',
      output: () => i18n.language === 'es' ? 
        'Educacin:\n Ingeniera en Ciencias de la Computacin\n Tecnolgico de Monterrey\n GPA: 4.0\n Periodo: 2022-2026' :
        'Education:\n Computer Science Engineering\n Tecnolgico de Monterrey\n GPA: 4.0\n Period: 2022-2026'
    },
    'achievements': {
      description: i18n.language === 'es' ? 'Muestra logros y reconocimientos' : 'Shows achievements and awards',
      output: () => i18n.language === 'es' ? 
        'Logros:\n Ganador SAP Labs 2025\n GPA 4.0\n Participante en hackathons\n Desarrollador Full Stack certificado' :
        'Achievements:\n SAP Labs Winner 2025\n GPA 4.0\n Hackathon participant\n Certified Full Stack developer'
    },
    'date': {
      description: i18n.language === 'es' ? 'Muestra fecha y hora actuales' : 'Shows current date and time',
      output: () => new Date().toLocaleString()
    },
    'echo': {
      description: i18n.language === 'es' ? 'Repite el texto ingresado' : 'Echoes the input text',
      output: (args) => args.join(' ')
    },
    'clear': {
      description: i18n.language === 'es' ? 'Limpia la terminal' : 'Clears the terminal',
      output: () => '__CLEAR__'
    },
    'demo': {
      description: i18n.language === 'es' ? 'Inicia el modo demo automtico' : 'Starts automatic demo mode',
      output: () => {
        setIsDemo(true);
        setIsInteractive(false);
        setCurrentIndex(0);
        setCurrentText('');
        return i18n.language === 'es' ? 'Iniciando modo demo...' : 'Starting demo mode...';
      }
    },
    'interactive': {
      description: i18n.language === 'es' ? 'Cambia al modo interactivo' : 'Switch to interactive mode',
      output: () => {
        setIsDemo(false);
        setIsInteractive(true);
        return i18n.language === 'es' ? 
          'Modo interactivo activado. Escribe "help" para ver comandos disponibles.' :
          'Interactive mode activated. Type "help" to see available commands.';
      }
    },
    'scroll': {
      description: i18n.language === 'es' ? 'Hace scroll a una seccin (about, projects, experience, contact)' : 'Scrolls to a section (about, projects, experience, contact)',
      output: (args) => {
        const section = args[0];
        if (section && ['about', 'projects', 'experience', 'contact'].includes(section)) {
          const element = document.getElementById(section);
          if (element) {
            const headerOffset = 120;
            const elementPosition = element.offsetTop;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
            return i18n.language === 'es' ? 
              `Navegando a la seccin ${section}...` :
              `Navigating to ${section} section...`;
          }
        }
        return i18n.language === 'es' ? 
          'Uso: scroll [about|projects|experience|contact]' :
          'Usage: scroll [about|projects|experience|contact]';
      }
    }
  };

  const demoCommands = [
    {
      command: 'whoami',
      output: () => t('terminalWhoami')
    },
    {
      command: 'cat skills.txt',
      output: () => t('terminalSkills')
    },
    {
      command: 'ls achievements/',
      output: () => i18n.language === 'es' ? 
        'sap_labs_ganador_2025.txt  gpa_4.0.txt  participante_hackathon.txt' : 
        'sap_labs_winner_2025.txt  gpa_4.0.txt  hackathon_participant.txt'
    },
    {
      command: 'cat location.txt',
      output: () => t('terminalLocation')
    },
    {
      command: 'git status',
      output: () => t('terminalGitStatus')
    },
    {
      command: 'echo $PASSION',
      output: () => t('terminalPassion')
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

  useEffect(() => {
    if (!isDemo) return;
    
    if (currentIndex < demoCommands.length) {
      const command = demoCommands[currentIndex];
      const fullText = `$ ${command.command}\n${command.output()}`;
      
      if (currentText.length < fullText.length) {
        const timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, 30);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setCurrentText('');
        }, 2500);
        return () => clearTimeout(timer);
      }
    } else {
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText('');
      }, 2000);
    }
  }, [currentText, currentIndex, demoCommands, isDemo, i18n.language]);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(userInput.trim());
      setUserInput('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setUserInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setUserInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setUserInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      autocompleteCommand();
    }
  };

  const autocompleteCommand = () => {
    const input = userInput.toLowerCase();
    const matches = Object.keys(availableCommands).filter(cmd => 
      cmd.toLowerCase().startsWith(input)
    );
    
    if (matches.length === 1) {
      setUserInput(matches[0]);
    } else if (matches.length > 1) {
      const output = `Available commands: ${matches.join(', ')}`;
      setCommandHistory(prev => [...prev, { command: userInput, output, timestamp: new Date() }]);
    }
  };

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
    
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 100);
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

  const dotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  };

  const contentStyle = {
    padding: '20px',
    height: '100%',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  };

  const promptStyle = {
    color: colors.primary,
    fontWeight: 'bold',
    marginBottom: '5px'
  };

  const outputStyle = {
    color: colors.text,
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    marginBottom: '10px',
    lineHeight: '1.4'
  };

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: colors.text,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    width: '100%',
    marginLeft: '5px'
  };

  const switchModeButton = {
    position: 'absolute',
    top: '12px',
    right: '20px',
    background: `${colors.primary}20`,
    color: colors.primary,
    border: `1px solid ${colors.primary}40`,
    borderRadius: '6px',
    padding: '4px 8px',
    fontSize: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  return (
    <div style={terminalStyle}>
      <div style={headerStyle}>
        <div style={{...dotStyle, backgroundColor: '#ff5f57'}}></div>
        <div style={{...dotStyle, backgroundColor: '#ffbd2e'}}></div>
        <div style={{...dotStyle, backgroundColor: '#28ca42'}}></div>
        <span style={{marginLeft: '10px', color: colors.textSecondary, fontSize: '12px'}}>
          axel@iparrea-dev: ~
        </span>
        <button
          style={switchModeButton}
          onClick={() => isDemo ? availableCommands.interactive.output() : availableCommands.demo.output()}
          onMouseEnter={(e) => {
            e.target.style.background = colors.primary;
            e.target.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = `${colors.primary}20`;
            e.target.style.color = colors.primary;
          }}
        >
          {isDemo ? (i18n.language === 'es' ? 'Interactivo' : 'Interactive') : 'Demo'}
        </button>
      </div>
      
      <div ref={terminalRef} style={contentStyle}>
        {isDemo && (
          <>
            {demoCommands.slice(0, currentIndex).map((cmd, index) => (
              <div key={index} style={{marginBottom: '15px'}}>
                <div style={promptStyle}>$ {cmd.command}</div>
                <div style={outputStyle}>{cmd.output()}</div>
              </div>
            ))}
            
            {currentIndex < demoCommands.length && (
              <div>
                <div style={promptStyle}>
                  {currentText}
                  <span style={{
                    opacity: showCursor ? 1 : 0,
                    transition: 'opacity 0.1s',
                    color: colors.primary
                  }}>
                    
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {isInteractive && (
          <>
            {commandHistory.map((item, index) => (
              <div key={index} style={{marginBottom: '10px'}}>
                <div style={promptStyle}>$ {item.command}</div>
                {item.output && (
                  <div style={outputStyle}>{item.output}</div>
                )}
              </div>
            ))}
            
            <div style={{display: 'flex', alignItems: 'center', marginTop: 'auto'}}>
              <span style={promptStyle}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                style={inputStyle}
                placeholder={i18n.language === 'es' ? 'Escribe un comando...' : 'Type a command...'}
                autoFocus
              />
              <span style={{
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s',
                color: colors.primary
              }}>
                
              </span>
            </div>
          </>
        )}

        {!isDemo && !isInteractive && (
          <div style={{
            textAlign: 'center',
            color: colors.textSecondary,
            fontSize: '0.9rem',
            marginTop: '50px'
          }}>
            <p>{i18n.language === 'es' ? 'Terminal iniciada' : 'Terminal initialized'}</p>
            <p style={{marginTop: '10px', fontSize: '0.8rem'}}>
              {i18n.language === 'es' ? 'Haz clic en "Interactive" para empezar' : 'Click "Interactive" to start'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalComponent; 
