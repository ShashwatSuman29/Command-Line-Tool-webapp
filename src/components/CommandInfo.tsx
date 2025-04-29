
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CliCommand from './CliCommand';
import { cn } from '@/lib/utils';

interface CommandInfoProps {
  name: string;
  description: string;
  usage: string;
  options?: {
    flag: string;
    description: string;
    required?: boolean;
  }[];
  example?: string;
  output?: string;
  className?: string;
}

const CommandInfo = ({
  name,
  description,
  usage,
  options,
  example,
  output,
  className,
}: CommandInfoProps) => {
  return (
    <Card className={cn('bg-slate-800 border-slate-700 text-white', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-indigo-400">{name}</CardTitle>
          <Badge variant="outline" className="bg-indigo-950 text-indigo-300 border-indigo-700">
            Command
          </Badge>
        </div>
        <CardDescription className="text-slate-300">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold mb-2 text-slate-300">Usage:</h4>
          <CliCommand command={usage} copyable={false} className="border-slate-600" />
        </div>
        
        {options && options.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-slate-300">Options:</h4>
            <div className="bg-slate-900 rounded-md p-3">
              {options.map((option, index) => (
                <div key={index} className="mb-2 last:mb-0">
                  <div className="flex items-start">
                    <code className="text-green-300 font-mono mr-3">{option.flag}</code>
                    <span className="text-slate-300 text-sm">{option.description}</span>
                    {option.required && (
                      <Badge className="ml-2 bg-red-900 text-red-200 text-xs">Required</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {example && (
          <div>
            <h4 className="text-sm font-semibold mb-2 text-slate-300">Example:</h4>
            <CliCommand 
              command={example} 
              output={output}
              className="border-slate-600" 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommandInfo;
