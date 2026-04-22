import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TRACKS } from '../constants';
import { GlitchText } from './GlitchText';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentTrackIndex, isPlaying]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100);
    }
  };

  // Convert background color class to raw hex for the raw style
  const getRawColor = (colorClass: string) => {
    if (colorClass.includes('cyan')) return '#00FFFF';
    if (colorClass.includes('magenta')) return '#FF00FF';
    return '#00FFFF';
  };

  return (
    <div className="raw-border bg-black p-4 flex flex-col gap-6 w-full font-vt" id="music-player">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={onTimeUpdate}
        onEnded={skipForward}
      />

      <div className="flex bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTrack.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-24 h-24 shrink-0 overflow-hidden raw-border flex items-center justify-center mr-4`}
            style={{ backgroundColor: getRawColor(currentTrack.coverColor) }}
            id={`cover-${currentTrack.id}`}
          >
            {/* Raw pixelated noise pattern inside */}
            <div className="w-full h-full opacity-40" style={{
              backgroundImage: 'radial-gradient(black 1px, transparent 0)',
              backgroundSize: '4px 4px'
            }} />
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col flex-1 pb-1">
          <GlitchText text={currentTrack.title} className="text-xl font-pixel truncate mb-2" />
          <p className="text-lg text-[#FF00FF] uppercase mb-1">BY: {currentTrack.artist}</p>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-sm tracking-tighter uppercase">{isPlaying ? '> STREAM_ACTIVE' : '> STREAM_HALTED'}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="h-4 w-full bg-[#004444] border-2 border-[#00FFFF]" id="progress-bar-bg">
          <motion.div 
            className="h-full bg-[#00FFFF]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', duration: 0.1 }}
            id="progress-bar-fill"
          />
        </div>
        <div className="flex justify-between text-lg mt-1 text-[#FF00FF]">
          <span>POS: {Math.floor(progress)}%</span>
          <span className="animate-pulse">{isPlaying ? 'PLAYING' : 'PAUSED'}</span>
        </div>
      </div>

      <div className="flex justify-between mt-2">
        <button 
          onClick={skipBackward}
          className="machine-btn px-4 py-2 text-xl"
          id="prev-btn"
        >
          [ &lt;&lt; ]
        </button>
        
        <button 
          onClick={togglePlay}
          className="machine-btn px-4 py-2 text-xl"
          id="play-pause-btn"
        >
          {isPlaying ? '[ || ]' : '[ &gt;&gt; ]'}
        </button>

        <button 
          onClick={skipForward}
          className="machine-btn px-4 py-2 text-xl"
          id="next-btn"
        >
          [ &gt;&gt;| ]
        </button>
      </div>
    </div>
  );
};
