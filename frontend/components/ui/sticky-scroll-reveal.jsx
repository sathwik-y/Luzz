"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const ThemedStickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.3", "end 0.7"], // More precise trigger points
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // More precise breakpoints - only change when content is properly centered
    const cardsBreakpoints = content.map((_, index) => (index + 0.5) / cardLength);
    
    let closestIndex = 0;
    let minDistance = Math.abs(latest - cardsBreakpoints[0]);
    
    for (let i = 1; i < cardsBreakpoints.length; i++) {
      const distance = Math.abs(latest - cardsBreakpoints[i]);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    }
    
    setActiveCard(closestIndex);
  });

  return (
    <div className="relative min-h-[120vh]" ref={ref}>
      <div className="flex justify-between items-start">
        
        {/* Left side - Scrolling text content */}
        <div className="w-1/2 pr-16">
          {content.map((item, index) => (
            <div key={item.title + index} className="min-h-[40vh] flex flex-col justify-center py-12">
              <motion.h3
                initial={{ opacity: 0, x: -30 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.4,
                  x: activeCard === index ? 0 : -15
                }}
                transition={{ duration: 0.4 }}
                className="text-3xl font-bold text-purple-200 mb-6">
                {item.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ 
                  opacity: activeCard === index ? 1 : 0.4,
                  x: activeCard === index ? 0 : -15
                }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-lg text-purple-300/90 leading-relaxed max-w-xl">
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
        
        {/* Right side - Fixed sticky image container */}
        <div className="w-1/2 sticky top-32 h-[60vh] flex items-center justify-center bg-transparent">
          {activeCard === 0 && (
            <motion.img
              key="image-0"
              src="/Initial.png"
              alt="LinkedIn Feed"
              className="w-[450px] h-[500px] object-contain rounded-lg bg-transparent shadow-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {activeCard === 1 && (
            <motion.img
              key="image-1"
              src="/Processing.png"
              alt="AI Processing"
              className="w-[450px] h-[500px] object-contain rounded-lg bg-transparent shadow-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
          {activeCard === 2 && (
            <motion.img
              key="image-2"
              src="/Final.png"
              alt="Clean Content"
              className="w-[450px] h-[500px] object-contain rounded-lg bg-transparent shadow-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </div>
      </div>
    </div>
  );
};