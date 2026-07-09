import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  { src: '/images/gallery-couple.png', alt: 'Couple in Djerba courtyard', caption: 'A love story written in the stars' },
  { src: '/images/gallery-venue.png', alt: 'Wedding venue', caption: 'Where dreams come to life' },
  { src: '/images/gallery-details.png', alt: 'Wedding details', caption: 'Every detail tells our story' },
  { src: '/images/gallery-beach.png', alt: 'Djerba beach sunset', caption: 'Under the Mediterranean sky' },
  { src: '/images/djerba-landscape.png', alt: 'Djerba landscape', caption: 'The magic of Djerba' },
];

export default function Gallery() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + galleryImages.length) % galleryImages.length);
  };

  const next = () => {
    setDirection(1);
    setCurrent((c) => (c + 1) % galleryImages.length);
  };

  const variants = {
    enter: (dir) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <section className="section-spacing pattern-islamic">
      <div className="container-luxury">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase mb-3" style={{ color: '#A09080' }}>
            Moments to remember
          </p>
          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-2">
            Our Gallery
          </h2>
          <div className="ornament-divider">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C8A45D" />
            </svg>
          </div>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Image container */}
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              aspectRatio: '16/10',
              boxShadow: '0 25px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(200,164,93,0.15)',
              border: '2px solid rgba(200,164,93,0.15)',
            }}
          >
            {/* Glass overlay border effect */}
            <div
              className="absolute inset-0 z-10 pointer-events-none rounded-3xl"
              style={{
                border: '1px solid rgba(255,255,255,0.3)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <img
                  src={galleryImages[current].src}
                  alt={galleryImages[current].alt}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                  <p className="font-calligraphy text-xl md:text-2xl text-white text-center">
                    {galleryImages[current].caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
              aria-label="Next image"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-6">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className="transition-all duration-300"
                style={{
                  width: current === index ? '28px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: current === index
                    ? 'var(--color-gold)'
                    : 'rgba(200,164,93,0.25)',
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
