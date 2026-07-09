import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useRef, useState } from 'react';
import Countdown from './components/Countdown';
import Envelope from './components/Envelope';
import FloatingElements from './components/FloatingElements';
import Footer from './components/Footer';
import HeroSection from './components/HeroSection';
import LocationSection from './components/LocationSection';
import Timeline from './components/Timeline';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const [isDark, setIsDark] = useDarkMode();
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  const handleEnvelopeOpen = () => {
    // Attempt to play audio immediately
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().then(() => {
        setIsMuted(false);
      }).catch(() => {
        // Autoplay blocked, that's okay
        setIsMuted(true);
      });
    }

    // Delay unmounting of Envelope to allow the 3.5s book animation to complete
    setTimeout(() => {
      setIsOpen(true);
      setShowInvitation(true);
    }, 10000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().then(() => setIsMuted(false)).catch(() => {});
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  return (
    <>
      {/* Background audio — placeholder src, swap with real music file */}
      <audio ref={audioRef} loop preload="none">
        {/* Replace this src with your actual Tunisian Oud + Piano music file */}
        <source src="/music/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Envelope screen */}
      <AnimatePresence>
        {!isOpen && <Envelope onOpen={handleEnvelopeOpen} />}
      </AnimatePresence>

      {/* Main invitation */}
      <AnimatePresence>
        {showInvitation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 5.5, ease: 'easeOut' }}
          >
            {/* Floating elements overlay */}
            <FloatingElements />

            {/* Fixed controls */}
            <div className="fixed top-4 right-4 z-[200] flex gap-2">
              {/* Dark mode toggle */}
              <motion.button
                onClick={() => setIsDark(!isDark)}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(200,164,93,0.2)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle dark mode"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {isDark ? (
                  <Sun size={18} style={{ color: 'var(--color-gold)' }} />
                ) : (
                  <Moon size={18} style={{ color: 'var(--color-gold)' }} />
                )}
              </motion.button>

              {/* Music toggle */}
              <motion.button
                onClick={toggleMusic}
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(200,164,93,0.2)',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle music"
                title={isMuted ? 'Play music' : 'Mute music'}
              >
                {isMuted ? (
                  <VolumeX size={18} style={{ color: 'var(--color-gold)' }} />
                ) : (
                  <Volume2 size={18} style={{ color: 'var(--color-gold)' }} />
                )}
              </motion.button>
            </div>

            {/* Navigation dots */}
            <nav className="fixed left-4 top-1/2 -translate-y-1/2 z-[200] hidden lg:flex flex-col gap-3">
              {['hero', 'countdown', 'schedule', 'venue', 'gallery', 'gifts'].map((id, i) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="group flex items-center gap-2"
                  title={id.charAt(0).toUpperCase() + id.slice(1)}
                >
                  <span
                    className="w-2 h-2 rounded-full transition-all duration-300 group-hover:w-3 group-hover:h-3"
                    style={{
                      background: 'var(--color-gold)',
                      opacity: 0.4,
                    }}
                  />
                </a>
              ))}
            </nav>

            {/* Sections */}
            <main>
              <div id="hero">
                <HeroSection />
              </div>
              <div id="countdown">
                <Countdown />
              </div>
              <div id="schedule">
                <Timeline />
              </div>
              <div id="venue">
                <LocationSection />
              </div>
            
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
