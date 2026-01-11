import { useState, useEffect } from 'react';

const TypingEffect = ({ 
  words = [], 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 2000,
  style = {},
  cursorColor = '#00cc6a'
}) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentWord.length) {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentWord.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', ...style }}>
      <span>{currentText}</span>
      <span 
        style={{
          display: 'inline-block',
          width: '3px',
          height: '1.2em',
          backgroundColor: cursorColor,
          marginLeft: '2px',
          animation: 'blink 1s infinite'
        }}
      />
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </span>
  );
};

export default TypingEffect;
