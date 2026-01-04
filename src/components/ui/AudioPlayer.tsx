import { useState, useEffect, useRef } from "react";
import { Music, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  start: boolean;
}

export default function AudioPlayer({ start }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  // Royalty Free Music: "Proposal" by Kai Engel (CC BY 4.0)
  // Source: Free Music Archive
  const audioRef = useRef<HTMLAudioElement>(
    new Audio("audio/wedding_date.mp3")
  );

  useEffect(() => {
    // Configure audio
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4; // Slightly softer

    // Cleanup
    return () => {
      audioRef.current.pause();
    };
  }, []);

  useEffect(() => {
    if (start && !isPlaying) {
      // Attempt auto-play when start becomes true
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((e) => console.log("Auto-play prevented:", e));
    }
  }, [start]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button
      onClick={togglePlay}
      className={`fixed bottom-8 left-8 z-50 p-3 rounded-full shadow-lg transition-all duration-500 ${
        start
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      } ${
        isPlaying
          ? "bg-gold-500 text-white animate-spin-slow"
          : "bg-white/80 text-stone-600"
      }`}
      aria-label={isPlaying ? "Mute Music" : "Play Music"}
    >
      {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
    </button>
  );
}
