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
          <img alt="RAX Logo" className="h-20 w-auto mx-auto object-cover" src="/lovable-uploads/5cceb7fd-441c-4363-8de5-74ce0022cd53.png" />
          <div className="absolute -inset-1 blur-xl opacity-30 bg-glow-gradient rounded-full -z-10"></div>
        </div>
      </div>
      <h2 className="text-xl md:text-2xl font-space text-white/80">Private Join Application</h2>
      <div className="w-16 h-1 bg-glow-gradient rounded-full mx-auto my-4"></div>
    </div>;
};
export default FormHeader;