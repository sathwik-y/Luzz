"use client";

import { RadiantText } from "@/components/ui/RadiantText";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useState, useEffect } from "react";
import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button";
import { ThemedStickyScroll } from "@/components/ui/sticky-scroll-reveal";
export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen flex flex-col">
      <section className="hero relative z-10 flex flex-col items-center justify-center min-h-screen py-24">
        <div className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <RadiantText
            className="text-[12rem] font-extrabold tracking-tight text-center drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] mt-[-60] [text-shadow:0_0_30px_rgba(120,115,245,0.4)] relative"
            from="rgba(200, 80, 180, 1)"
            via="rgba(140, 100, 200, 1)"
            to="rgba(80, 140, 190, 1)"
            animationDuration="20s"
            style={{
              filter: 'contrast(1.2) brightness(0.9)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            Luzz
          </RadiantText>
        </div>
        
        {/* Enhanced tagline with better contrast and glow */}
        <div className="text-3xl mt-[-40] font-bold text-center relative z-20">
          <TextGenerateEffect 
            words="The LinkedIn Cleanser"
            className="text-3xl mt-1 text-center"
            spanClassName="bg-gradient-to-r from-[#e691d3] via-[#9d9aff] to-[#6bc5e8] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(180,80,180,0.7)] [text-shadow:0_0_20px_rgba(180,80,180,0.5)] font-semibold tracking-wide"
            filter={true}
            duration={0.5}
          />
          {/* Background glow effect for better readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#e691d3] via-[#9d9aff] to-[#6bc5e8] opacity-20 blur-xl -z-10 rounded-lg"></div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 relative z-20 flex gap-6">
          <InteractiveHoverButton 
            onClick={() => window.open('https://github.com/sathwik-y/Luzz', '_blank')}
            icon="github"
            hoverText="Repo"
          >
            GitHub
          </InteractiveHoverButton>
          
        <InteractiveHoverButton 
          onClick={() => document.querySelector('.try-luzz').scrollIntoView({ behavior: 'smooth' })}
          icon="download"
          hoverText="Get Started"
        >
          Try Luzz
        </InteractiveHoverButton>
        </div>
      </section>

      {/* What is Luzz Section */}
      <section className="what-is-luzz relative z-10 flex flex-col items-center justify-center py-24 px-8 max-w-6xl mx-auto">
        <h2 className="text-6xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-[#e691d3] via-[#c69aff] to-[#a6b5ff] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(200,80,180,0.6)] [text-shadow:0_0_20px_rgba(200,80,180,0.4)] tracking-wide">
            What is Luzz?
          </span>
        </h2>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-xl text-purple-200/90 leading-relaxed font-medium">
            Luzz is a web extension designed to transform your LinkedIn experience by filtering out the "noise" from your feed.
          </p>
          
          <div className="space-y-6 text-lg text-purple-300/80 leading-relaxed">
            <p>
              We've all been there, scrolling through LinkedIn and encountering posts filled with excessive emojis, corporate buzzwords, and over-the-top emotional language that makes you disable your account and hit Alt+F4.
            </p>
            
            <p>
              The extension automatically analyzes each LinkedIn post in your feed using AI. When it detects "that" type of content (iykyk), it replaces the original post with a cleaned, professional version that gets straight to the point.
            </p>
            
            <div className="bg-purple-900/20 border border-purple-400/30 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold text-purple-200 mb-4">What Luzz filters out:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Excessive & irrelevant emojis</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Corporate buzzwords</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Unnecessary superlatives</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Over-emotional language</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Irrelevant stories/content</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-400 mt-1">→</span>
                    <span>Hashtag spam</span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-purple-200/90 font-medium">
              The result? A cleaner, more professional LinkedIn feed that respects your time and delivers authentic, valuable content without the fluff.
            </p>
          </div>
        </div>
      </section>

{/* Luzz in Action Section */}
      <section className="luzz-in-action relative z-10 py-24 px-8 max-w-7xl mx-auto">
        <h2 className="text-6xl font-bold text-center mb-24">
          <span className="bg-gradient-to-r from-[#d691e6] via-[#b69aff] to-[#9ab5ff] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(180,80,200,0.6)] [text-shadow:0_0_20px_rgba(180,80,200,0.4)] tracking-wide">
            Luzz in Action
          </span>
        </h2>
        
        {/* Themed StickyScroll Component */}
        <ThemedStickyScroll 
          content={[
            {
              title: "1. Browse LinkedIn",
              description: "Open LinkedIn and scroll through your feed as you normally would. Luzz runs silently in the background, analyzing each post. Lets say this your typical Linkedin feed ->"
            },
            {
              title: "2. AI Processing & Detection", 
              description: "When Luzz detects a post on your feed, it starts processing the content (happens instantly!) to make necesssary changes and cleanse it."
            },
            {
              title: "3. Clean Content Replacement",
              description: "The original post is now replaced with a clean, professional version. The core message remains intact, but all the fluff is gone, giving you readable, authentic content. PS: The small button on the dragabble widget allows you to switch back to the original post just in case. "
            }
          ]}
        />
      </section>
  {/* Try Luzz Section */}
      <section className="try-luzz relative z-10 flex flex-col items-center justify-center py-24 px-8 max-w-6xl mx-auto">
        <h2 className="text-6xl font-bold text-center mb-12">
          <span className="bg-gradient-to-r from-[#d691e6] via-[#b69aff] to-[#9ab5ff] text-transparent bg-clip-text drop-shadow-[0_0_15px_rgba(180,80,200,0.6)] [text-shadow:0_0_20px_rgba(180,80,200,0.4)] tracking-wide">
            Try Luzz
          </span>
        </h2>
          <div className="bg-purple-900/20 border border-purple-400/30 rounded-xl p-6 backdrop-blur-sm mb-8 max-w-4xl">
          <div className="text-center">
            <p className="text-purple-300/80 text-lg leading-relaxed">
              Luzz is just a small & fun side project and is not yet available on the Chrome Web Store. Download the extension directly and follow the setup guide to start cleaning your LinkedIn feed today!
            </p>
          </div>
        </div>

        {/* Download Section */}
        <div className="w-full space-y-12">
          
          {/* Download Button */}
          <div className="text-center">
            <a 
              href="/luzz-extension.zip" 
              download="luzz-extension.zip"
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 rounded-full text-white font-semibold text-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <svg className="w-6 h-6 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span className="relative z-10">Download Luzz Extension</span>
            </a>
            <p className="text-purple-300/60 text-sm mt-3">ZIP file • Compatible with Chrome, Edge, Brave & other Chromium browsers</p>
          </div>

          {/* Installation Guide */}
          <div className="bg-purple-900/10 border border-purple-400/20 rounded-xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-purple-200 mb-8 text-center">Installation Guide</h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <h4 className="text-lg font-semibold text-purple-200">Extract & Prepare</h4>
                </div>
                <p className="text-purple-300/80 leading-relaxed">
                  Download and extract the ZIP file to a folder on your computer. Remember the location as you'll need it in the next step.
                </p>
              </div>

              {/* Step 2 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <h4 className="text-lg font-semibold text-purple-200">Enable Developer Mode</h4>
                </div>
                <p className="text-purple-300/80 leading-relaxed">
                  Open Chrome, go to <span className="text-purple-200 font-mono">chrome://extensions/</span>, and toggle on "Developer mode" in the top-right corner.
                </p>
              </div>

              {/* Step 3 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <h4 className="text-lg font-semibold text-purple-200">Load Extension</h4>
                </div>
                <p className="text-purple-300/80 leading-relaxed">
                  Click "Load unpacked" and select the extracted Luzz folder. The extension will install and you're ready to go!
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 pt-8 border-t border-purple-400/20">
              <div className="text-center space-y-4">
                <p className="text-purple-200 font-medium">That's it! Visit LinkedIn and watch Luzz clean up your feed automatically.</p>
                <p className="text-purple-300/60 text-sm">
                  Having trouble? Reach out to me! <a href="https://www.linkedin.com/in/sathwik-yellapragada/" className="text-purple-400 hover:text-purple-300 underline">Linkedin</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      </main>
  );
}