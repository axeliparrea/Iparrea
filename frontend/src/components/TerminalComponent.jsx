import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hook/ThemeContext';

const TerminalComponent = () => {
  const { t, i18n } = useTranslation();
  const { colors } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    {
      command: 'whoami',
      output: t('terminalWhoami')
    },
    {
      command: 'cat skills.txt',
      output: t('terminalSkills')
    },
    {
      command: 'ls achievements/',
      output: i18n.language === 'es' ? 'sap_labs_ganador_2025.txt  gpa_4.0.txt  participante_hackathon.txt' : 'sap_labs_winner_2025.txt  gpa_4.0.txt  hackathon_participant.txt'
    },
    {
      command: 'cat location.txt',
      output: t('terminalLocation')
    },
    {
      command: 'git status',
      output: t('terminalGitStatus')
    },
    {
      command: 'echo $PASSION',
      output: t('terminalPassion')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentIndex < commands.length) {
      const command = commands[currentIndex];
      const fullText = `$ ${command.command}\n${command.output}`;
      
      if (currentText.length < fullText.length) {
        const timer = setTimeout(() => {
          setCurrentText(fullText.substring(0, currentText.length + 1));
        }, 50);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          setCurrentText('');
        }, 2000);
        return () => clearTimeout(timer);
      }
    } else {
      // Restart the sequence
      setTimeout(() => {
        setCurrentIndex(0);
        setCurrentText('');
      }, 2000);
    }
  }, [currentText, currentIndex, commands, i18n.language]);

  const terminalStyle = {
    backgroundColor: colors.codeBackground,
    border: `1px solid ${colors.border}`,
    borderRadius: '8px',
    padding: '20px',
    fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
    fontSize: '14px',
    color: colors.primary,
    height: '300px',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: `0 4px 20px ${colors.primary}15`,
    maxWidth: '600px',
    margin: '0 auto'
  };

  const headerStyle = {
    backgroundColor: colors.card,
    margin: '-20px -20px 15px -20px',
    padding: '10px 20px',
    borderBottom: `1px solid ${colors.border}`,
    borderRadius: '7px 7px 0 0',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const dotStyle = {
    width: '12px',
    height: '12px',
    borderRadius: '50%'
  };

  const promptStyle = {
    color: colors.primary,
    fontWeight: 'bold'
  };

  const outputStyle = {
    color: colors.text,
    whiteSpace: 'pre-line',
    marginBottom: '10px'
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
      </div>
      
      <div style={{height: '240px', overflowY: 'auto'}}>
        {commands.slice(0, currentIndex).map((cmd, index) => (
          <div key={index} style={{marginBottom: '15px'}}>
            <div style={promptStyle}>$ {cmd.command}</div>
            <div style={outputStyle}>{cmd.output}</div>
          </div>
        ))}
        
        {currentIndex < commands.length && (
          <div>
            <div style={promptStyle}>
              {currentText}
              <span style={{
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s'
              }}>
                █
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TerminalComponent; 