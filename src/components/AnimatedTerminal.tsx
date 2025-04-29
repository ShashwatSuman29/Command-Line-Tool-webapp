import React, { useEffect, useState, useRef } from 'react';

interface AnimatedTerminalProps {
  className?: string;
}

const AnimatedTerminal: React.FC<AnimatedTerminalProps> = ({ className = '' }) => {
  const [text, setText] = useState<string>('');
  const [cursorVisible, setCursorVisible] = useState<boolean>(true);
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = [
    'devhelper init my-awesome-project',
    'Installing dependencies...',
    'Creating project structure...',
    'Setting up configuration...',
    'Project created successfully!',
    'devhelper track --start',
    'Time tracking started for my-awesome-project',
    'devhelper generate component Button',
    'Component created: src/components/Button.tsx',
    'devhelper deploy --prod',
    'Deploying to production...',
    'Deployment successful! https://my-app.example.com'
  ];

  // Typing animation effect
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;
    
    // Set up cursor blinking
    cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 500);

    const typeNextLine = () => {
      const currentLine = commands[currentLineIndex];
      let charIndex = 0;
      
      const typeChar = () => {
        if (charIndex < currentLine.length) {
          setText(prev => prev + currentLine.charAt(charIndex));
          charIndex++;
          timeout = setTimeout(typeChar, Math.random() * 50 + 30); // Random typing speed
        } else {
          // Line completed, add new line and move to next command
          setText(prev => prev + '\n$ ');
          
          // Move to next line or loop back
          setTimeout(() => {
            setCurrentLineIndex((prev) => (prev + 1) % commands.length);
          }, 1000); // Pause before next command
        }
      };
      
      // Start typing the current line
      typeChar();
    };

    // If we're at the beginning of a line, add the prompt
    if (text.endsWith('\n$ ') || text === '') {
      if (text === '') {
        setText('$ ');
      }
      timeout = setTimeout(typeNextLine, 500);
    }

    // Scroll to bottom as content is added
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [currentLineIndex, text, commands]);

  return (
    <div className={`bg-black border-2 border-indigo-800 rounded-lg overflow-hidden shadow-lg shadow-indigo-900/30 ${className}`}>
      <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white text-sm mx-auto">DevHelper CLI</div>
      </div>
      <div 
        ref={terminalRef}
        className="bg-black p-4 font-mono text-sm text-indigo-300 h-64 overflow-y-auto"
      >
        <pre className="whitespace-pre-wrap">
          {text}
          <span className={`inline-block w-2 h-4 bg-indigo-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
        </pre>
      </div>
    </div>
  );
};

export default AnimatedTerminal;
