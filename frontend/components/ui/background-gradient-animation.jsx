"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(15, 5, 35)",
  gradientBackgroundEnd = "rgb(5, 15, 45)",
  firstColor = "45, 25, 85",
  secondColor = "85, 35, 135",
  thirdColor = "25, 45, 95",
  fourthColor = "65, 25, 75",
  fifthColor = "35, 35, 65",
  pointerColor = "55, 35, 95",
  size = "80%",
  blendingValue = "multiply",
  children,
  className,
  interactive = true,
  containerClassName
}) => {
  const interactiveRef = useRef(null);

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}>
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("relative z-10", className)}>{children}</div>
{/* Gradients */}
        <div
          className={cn(
            "gradients-container h-full w-full absolute inset-0 blur-lg",
            isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
          )}
        >
          {/* Bubble 1 — Vibrant purple */}
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(150,80,200,0.5)_0,_rgba(150,80,200,0)_50%)_no-repeat]`,
              `[mix-blend-mode:normal] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:center_center]`,
              `animate-first`,
              `opacity-60`
            )}
          />
          {/* Bubble 2 — Bright magenta */}
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(180,60,160,0.5)_0,_rgba(180,60,160,0)_50%)_no-repeat]`,
              `[mix-blend-mode:normal] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%+300px)]`,
              `animate-second`,
              `opacity-60`
            )}
          />
          {/* Bubble 3 — Rich violet */}
          <div
            className={cn(
              `absolute [background:radial-gradient(circle_at_center,_rgba(130,70,180,0.5)_0,_rgba(130,70,180,0)_50%)_no-repeat]`,
              `[mix-blend-mode:normal] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
              `[transform-origin:calc(50%-300px)_calc(50%+300px)]`,
              `animate-third`,
              `opacity-60`
            )}
          />

          {interactive && (
            <div
              ref={interactiveRef}
              onMouseMove={handleMouseMove}
              className={cn(
                `absolute [background:radial-gradient(circle_at_center,_rgba(140,60,170,0.4)_0,_rgba(140,60,170,0)_50%)_no-repeat]`,
                `[mix-blend-mode:normal] w-full h-full -top-1/2 -left-1/2`,
                `opacity-50`
              )}
            />
          )}
        </div>
    </div>
  );
};