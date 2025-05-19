import React from 'react';
import { cn } from '@/lib/utils';
interface FormHeaderProps {
  className?: string;
}
const FormHeader: React.FC<FormHeaderProps> = ({
  className
}) => {
  return <div className={cn('text-center space-y-3', className)}>
      <div className="inline-block">
        <div className="relative">
          <img alt="RAX Logo" src="/lovable-uploads/74ead4a0-be19-4ca2-87ce-89f34e918d7b.png" className="h-20 w-auto mx-auto object-fill" />
          <div className="absolute -inset-1 blur-xl opacity-30 bg-glow-gradient rounded-full -z-10"></div>
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-space text-white/80">Private Join Application</h2>
      <div className="w-16 h-1 bg-glow-gradient rounded-full mx-auto my-4"></div>
    </div>;
};
export default FormHeader;