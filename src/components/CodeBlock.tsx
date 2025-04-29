
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CodeBlockProps {
  language?: string;
  className?: string;
  code: string;
  title?: string;
}

const CodeBlock = ({ language = 'bash', className, code, title }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('rounded-md overflow-hidden', className)}>
      {title && (
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-sm font-medium border-b border-slate-700 flex justify-between items-center">
          <span>{title}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleCopy} 
            className="h-6 text-xs text-slate-400 hover:text-white"
          >
            {copied ? (
              <Check size={14} className="mr-1 text-green-400" />
            ) : (
              <Copy size={14} className="mr-1" />
            )}
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
      )}
      <div className="bg-slate-950 p-4 overflow-auto text-left">
        <pre className={`language-${language} whitespace-pre-wrap`}>
          <code className={language === 'bash' ? 'text-green-300' : language === 'javascript' ? 'text-blue-300' : 'text-indigo-300'}>
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
