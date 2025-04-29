
import React from 'react';
import { cn } from '@/lib/utils';
import { Folder, File } from 'lucide-react';

interface ProjectNode {
  name: string;
  type: 'file' | 'folder';
  children?: ProjectNode[];
}

interface ProjectStructureProps {
  className?: string;
  structure: ProjectNode[];
  title?: string;
}

const ProjectStructure = ({ className, structure, title = "Project Structure" }: ProjectStructureProps) => {
  const renderTree = (node: ProjectNode, level = 0, isLast = false, prefix: string[] = []) => {
    const isFolder = node.type === 'folder';
    
    return (
      <div key={node.name} className="font-mono">
        <div className="flex items-center text-slate-300">
          {prefix.map((p, i) => (
            <span key={i} className="text-slate-600">{p}</span>
          ))}
          
          {level > 0 && (
            <span className="text-slate-600 mr-1">
              {isLast ? "└── " : "├── "}
            </span>
          )}
          
          {isFolder ? (
            <Folder size={16} className="text-indigo-400 inline mr-1" />
          ) : (
            <File size={16} className="text-slate-400 inline mr-1" />
          )}
          
          {isFolder ? (
            <span className="text-indigo-400">{node.name}</span>
          ) : (
            <span>{node.name}</span>
          )}
        </div>
        
        {node.children && node.children.map((child, index) => {
          const newPrefix = [...prefix];
          if (level > 0) {
            newPrefix.push(isLast ? "    " : "│   ");
          }
          
          return renderTree(
            child, 
            level + 1, 
            index === node.children.length - 1,
            newPrefix
          );
        })}
      </div>
    );
  };

  return (
    <div className={cn('rounded-md overflow-hidden', className)}>
      {title && (
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-sm font-medium border-b border-slate-700">
          {title}
        </div>
      )}
      <div className="bg-slate-950 p-6 overflow-auto text-left">
        {structure.map((node, index) => renderTree(node, 0, index === structure.length - 1))}
      </div>
    </div>
  );
};

export default ProjectStructure;
