
import React, { ReactNode, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
  interactive?: boolean;
}

const FeatureCard = ({ icon, title, description, children, className, interactive = true }: FeatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "bg-slate-800 border-slate-700 text-white h-full transition-all duration-300", 
        interactive && isHovered && "transform translate-y-[-5px] shadow-lg shadow-indigo-500/20",
        className
      )}
      onMouseEnter={() => interactive && setIsHovered(true)}
      onMouseLeave={() => interactive && setIsHovered(false)}
    >
      <CardHeader>
        {icon && <div className={cn("mb-4 text-indigo-400", isHovered && "animate-pulse")}>{icon}</div>}
        <CardTitle className="text-indigo-400">{title}</CardTitle>
        <CardDescription className="text-slate-400">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-slate-300">{children}</div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
