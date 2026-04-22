import React, { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { GlitchText } from './components/GlitchText';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center p-4 md:p-8 relative selection:bg-[#FF00FF] selection:text-black font-vt">
      {/* Static Noise Overlay */}
      <div className="static-noise" />
      {/* Heavy Scanlines */}
      <div className="scanline-effect" />

      {/* Screen Tearing Container - occasionally applies skewed transforms to child elements */}
      <div className="w-full max-w-6xl h-full flex flex-col z-10 relative">

        <header className="w-full flex justify-between items-end mb-8 border-b-4 border-[#00FFFF] pb-4">
          <div className="flex items-end gap-3 tear-layer">
            <div className="w-8 h-8 bg-[#FF00FF] animate-pulse" />
            <h1 className="text-3xl md:text-5xl font-pixel text-[#00FFFF] uppercase tracking-tighter shadow-sm">
              <GlitchText text="NEURAL_SNAKE_OS" />
            </h1>
          </div>

          <div className="hidden lg:flex flex-col text-right">
            <span className="text-lg text-[#FF00FF]">SCORE_METRIC</span>
            <span className="text-4xl font-pixel text-[#00FFFF]" id="score-display">
              {score.toString().padStart(6, '0')}
            </span>
          </div>
        </header>

        <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
          
          {/* Left Panel: Kernel State */}
          <aside className="lg:col-span-3 flex flex-col gap-6 tear-layer" style={{ animationDelay: '0.5s' }}>
            <div className="raw-border p-4 bg-black relative">
              <div className="absolute top-0 right-0 px-2 py-1 bg-[#00FFFF] text-black font-pixel text-[10px]">SYS_LOG</div>
              <h2 className="text-xl font-bold uppercase text-[#FF00FF] border-b-2 border-[#FF00FF] pb-2 mb-4">KERNEL_STATE</h2>
              <div className="text-xl space-y-2 opacity-80">
                <p className="text-[#00FFFF]">&gt; INIT_NEURAL_LINK...</p>
                <p>&gt; MEM: 640KB OK</p>
                <p className="text-[#FF00FF] animate-pulse">&gt; WARNING: GLITCH_DET</p>
                <p>&gt; MOUNT: /SYS/REPTILE</p>
                <p className="text-white">&gt; AWAITING_CMD...</p>
              </div>
            </div>

            <div className="raw-border-magenta p-4 bg-black relative">
              <div className="absolute top-0 right-0 px-2 py-1 bg-[#FF00FF] text-black font-pixel text-[10px]">NET_STATE</div>
              <h2 className="text-xl font-bold uppercase text-[#00FFFF] border-b-2 border-[#00FFFF] pb-2 mb-4">CONNECTION</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xl">
                  <span className="text-[#FF00FF]">NODE:</span>
                  <span className="text-[#00FFFF]">0x4FA2</span>
                </div>
                <div className="flex justify-between items-center text-xl">
                  <span className="text-[#FF00FF]">PING:</span>
                  <span className="text-[#00FFFF] animate-pulse">ERR_MS</span>
                </div>
                <div className="h-1 bg-[#FF00FF] w-full" />
                <div className="flex gap-2">
                  {[...Array(8)].map((_, i) => (
                    <div 
                      key={i} 
                      className="h-6 flex-1 bg-[#00FFFF]" 
                      style={{ 
                        opacity: Math.random() > 0.5 ? 1 : 0.2,
                        animation: `flicker ${Math.random() * 2 + 1}s infinite`
                      }} 
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Center Panel: Snake Game */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex justify-between items-end border-b-4 border-[#FF00FF] pb-2 lg:hidden">
              <span className="text-xl text-[#FF00FF]">SCORE_METRIC</span>
              <span className="text-3xl font-pixel text-[#00FFFF]">
                {score.toString().padStart(6, '0')}
              </span>
            </div>

            <SnakeGame onScoreUpdate={setScore} />
            
            <div className="raw-border p-4 bg-black grid grid-cols-2 gap-4 text-center tear-layer" style={{ animationDelay: '1.2s' }}>
              <div className="p-2 border-2 border-[#FF00FF]">
                <div className="text-lg text-[#00FFFF]">PWR_LVL</div>
                <div className="text-2xl font-pixel text-white mt-1">99%</div>
              </div>
              <div className="p-2 border-2 border-[#00FFFF]">
                <div className="text-lg text-[#FF00FF]">SYNC</div>
                <div className="text-2xl font-pixel text-white mt-1 animate-pulse">LOCKED</div>
              </div>
              <div className="col-span-2 text-xl italic text-[#FF00FF] bg-[#00FFFF] text-black py-1">
                // TRUST_THE_MACHINE //
              </div>
            </div>
          </div>

          {/* Right Panel: Audio Interface */}
          <aside className="lg:col-span-3 flex flex-col gap-6 tear-layer" style={{ animationDelay: '2.1s' }}>
            <MusicPlayer />
            
            <div className="flex-1 raw-border-magenta bg-black p-4 relative overflow-hidden group min-h-[200px]">
              <div className="relative z-10 h-full flex flex-col">
                <h2 className="text-xl font-bold uppercase border-b-2 border-[#00FFFF] pb-2 text-[#00FFFF] mb-4">DIRECTIVES</h2>
                <ul className="text-xl space-y-4 flex-1">
                  <li className="flex gap-2">
                    <span className="text-[#FF00FF] font-pixel">[1]</span>
                    <span className="text-white">CONSUME_DATA</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#00FFFF] font-pixel">[2]</span>
                    <span className="text-white">AVOID_EDGES</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[#FF00FF] font-pixel">[3]</span>
                    <span className="text-white">STAY_IN_SYNC</span>
                  </li>
                </ul>
                
                {/* Audio Visualizer Mock */}
                <div className="h-16 flex items-end gap-1 mt-4">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: ['20%', '100%', '40%', '90%', '10%'] }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity, 
                        delay: i * 0.1,
                      }}
                      className="flex-1 bg-[#FF00FF]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </main>

        <footer className="mt-12 border-t-4 border-[#00FFFF] pt-4 flex flex-col md:flex-row justify-between text-xl text-[#00FFFF] gap-4">
          <p>© 199X NEURAL_CORP // RAW_ACCESS</p>
          <div className="flex gap-8">
            <span className="animate-pulse text-[#FF00FF]">STATUS: ONLINE</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
