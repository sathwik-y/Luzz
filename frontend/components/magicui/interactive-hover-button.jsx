import React from "react";
import { Github, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export const InteractiveHoverButton = React.forwardRef(({ 
  children, 
  className, 
  icon = "github", 
  hoverText = "GitHub",
  ...props 
}, ref) => {
  
  const getIcon = () => {
    switch(icon) {
      case "github":
        return <Github className="h-5 w-5" />;
      case "download":
        return <Download className="h-5 w-5" />;
      default:
        return <Github className="h-5 w-5" />;
    }
  };

  return (
    <button
      ref={ref}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-full border-2 border-purple-400/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-sm p-3 px-8 text-center font-semibold transition-all duration-500 hover:border-purple-300/60 hover:shadow-[0_0_30px_rgba(200,80,180,0.4)] hover:scale-105",
        "text-purple-200 hover:text-white",
        className
      )}
      {...props}>
      
      {/* Default state */}
      <div className="flex items-center gap-3 transition-all duration-500 group-hover:translate-x-12 group-hover:opacity-0">
        {getIcon()}
        <span className="text-lg font-medium tracking-wide">{children}</span>
      </div>
      
      {/* Hover state */}
      <div className="absolute inset-0 flex items-center justify-center gap-3 translate-x-[-100%] opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
        <div className="h-3 w-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
        <span className="text-lg font-medium tracking-wide bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
          {hoverText}
        </span>
        <div className="text-purple-300 text-xl">→</div>
      </div>
      
      {/* Animated background glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-blue-600/0 opacity-0 transition-all duration-500 group-hover:from-purple-600/20 group-hover:via-pink-600/20 group-hover:to-blue-600/20 group-hover:opacity-100 -z-10"></div>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";