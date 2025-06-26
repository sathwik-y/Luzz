"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export const RadiantText = ({
  children,
  className,
  from = "#ff6ec4",
  via = "#7873f5",
  to = "#48c6ef",
  animationDuration = "5s",
  ...props
}) => {
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const style = document.createElement('style');
      const randomId = `radiant-${Math.random().toString(36).substring(2, 9)}`;
      
      textRef.current.dataset.radiantId = randomId;
      
      style.innerHTML = `
        [data-radiant-id="${randomId}"] {
          --radiant-width: 150%;
          --radiant-anim-duration: ${animationDuration};
          background: linear-gradient(to right, ${from}, ${via}, ${to}, ${via}, ${from});
          background-size: var(--radiant-width) 100%;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          text-shadow: 0 2px 15px rgba(120, 115, 245, 0.2); /* Subtle text shadow */
          opacity: 0.9; /* Slightly reduced overall opacity */
        }
      `;
      
      document.head.appendChild(style);
      
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [from, via, to, animationDuration]);

  return (
    <span
      ref={textRef}
      className={cn("radiant-animation", className)}
      {...props}
    >
      {children}
    </span>
  );
};
