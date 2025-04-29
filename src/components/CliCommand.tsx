
import React from 'react';
import { Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CliCommandProps {
  command: string;
  description?: string;
  output?: string;
  className?: string;
  copyable?: boolean;
}

const CliCommand = ({ command, description, output, className, copyable = true }: CliCommandProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(command);
  };

  return (
    <div className={cn('rounded-md overflow-hidden border border-slate-700', className)}>
      {description && (
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-sm">
          {description}
        </div>
      )}
      <div className="bg-slate-900 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Terminal size={16} className="text-indigo-400" />
          <span className="text-indigo-300 font-mono">$</span>
          <span className="text-white font-mono flex-1">{command}</span>
          {copyable && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleCopy} 
              className="h-6 text-xs text-slate-400 hover:text-white"
            >
              Copy
            </Button>
          )}
        </div>
        {output && (
          <div className="mt-2 bg-slate-950 p-2 rounded text-slate-300 font-mono text-sm">
            {output}
          </div>
        )}
      </div>
    </div>
  );
};

export default CliCommand;
