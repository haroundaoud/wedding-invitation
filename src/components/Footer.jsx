import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-10">
      {/* Wave decoration at top */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40L48 37.3C96 34.7 192 29.3 288 32C384 34.7 480 45.3 576 48C672 50.7 768 45.3 864 42.7C960 40 1056 40 1152 37.3C1248 34.7 1344 29.3 1392 26.7L1440 24V0H1392C1344 0 1248 0 1152 0C1056 0 960 0 864 0C768 0 672 0 576 0C480 0 384 0 288 0C192 0 96 0 48 0H0V40Z"
            fill="var(--color-med-blue)"
            fillOpacity="0.05"
          />
        </svg>
      </div>

      <div className="container-luxury relative z-10">
        {/* Thank you message */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase mb-4" style={{ color: '#A09080' }}>
            With love & gratitude
          </p>
          <h2 className="font-calligraphy text-3xl md:text-4xl lg:text-5xl gold-shimmer mb-4">
            Thank You
          </h2>
          <p className="font-calligraphy text-xl md:text-2xl italic" style={{ color: '#6B5D4A' }}>
            for being part of our love story
          </p>

          {/* Heart */}
          <motion.div
            className="mt-6"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={24} fill="#C8A45D" className="mx-auto" style={{ color: '#C8A45D' }} />
          </motion.div>
        </motion.div>

        {/* Monogram */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              border: '2px solid var(--color-gold)',
              background: 'rgba(200,164,93,0.05)',
            }}
          >
            <span className="font-calligraphy text-2xl font-semibold" style={{ color: 'var(--color-gold)' }}>
              H & W
            </span>
          </div>
        </motion.div>

        {/* Djerba skyline */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.15 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <svg width="400" height="80" viewBox="0 0 400 80" fill="none" className="w-full max-w-md">
            {/* Djerba skyline silhouette */}
            {/* Mosque minaret */}
            <rect x="60" y="20" width="6" height="60" fill="#C8A45D" />
            <path d="M63 10L57 20H69L63 10Z" fill="#C8A45D" />
            <circle cx="63" cy="8" r="3" fill="#C8A45D" />
            {/* Buildings */}
            <rect x="80" y="40" width="30" height="40" rx="2" fill="#C8A45D" />
            <rect x="85" y="45" width="8" height="12" rx="4" fill="var(--color-ivory)" />
            <rect x="120" y="35" width="25" height="45" rx="2" fill="#C8A45D" />
            <rect x="150" y="45" width="35" height="35" rx="2" fill="#C8A45D" />
            <path d="M150 45L167 30L185 45" fill="#C8A45D" />
            {/* Palm trees */}
            <line x1="210" y1="80" x2="210" y2="35" stroke="#C8A45D" strokeWidth="3" />
            <path d="M210 35Q195 25 185 30Q195 32 200 35Q190 28 182 32Q192 33 198 37Q188 33 185 38Q195 37 210 35Z" fill="#C8A45D" />
            <path d="M210 35Q225 25 235 30Q225 32 220 35Q230 28 238 32Q228 33 222 37Q232 33 235 38Q225 37 210 35Z" fill="#C8A45D" />
            {/* More buildings */}
            <rect x="240" y="50" width="20" height="30" rx="2" fill="#C8A45D" />
            <rect x="265" y="42" width="28" height="38" rx="2" fill="#C8A45D" />
            <rect x="270" y="48" width="8" height="14" rx="4" fill="var(--color-ivory)" />
            <rect x="300" y="55" width="25" height="25" rx="2" fill="#C8A45D" />
            {/* Another palm */}
            <line x1="340" y1="80" x2="340" y2="40" stroke="#C8A45D" strokeWidth="2.5" />
            <path d="M340 40Q328 32 320 36Q328 37 333 40Q325 34 318 37Q326 38 332 42Q324 38 321 43Q330 42 340 40Z" fill="#C8A45D" />
            <path d="M340 40Q352 32 360 36Q352 37 347 40Q355 34 362 37Q354 38 348 42Q356 38 359 43Q350 42 340 40Z" fill="#C8A45D" />
            {/* Sea line */}
            <path d="M0 78Q50 74 100 78Q150 82 200 78Q250 74 300 78Q350 82 400 78" stroke="#1D5FA7" strokeWidth="1" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Bottom bar */}
        <div className="text-center">
          <div className="ornament-divider mb-4">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4Z" fill="#C8A45D" opacity="0.5" />
            </svg>
          </div>
          <p className="font-body text-xs tracking-widest uppercase" style={{ color: '#B0A090' }}>
             Hichem Daoud  & Wided Mezrani · August 7 & 8, 2026 · Djerba, Tunisia
          </p>
          <p className="font-body text-xs mt-2" style={{ color: '#C0B0A0' }}>
            Made with love ♥
          </p>
        </div>
      </div>
    </footer>
  );
}
