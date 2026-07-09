import { motion } from 'framer-motion';

export default function DressCode() {
  return (
    <section className="section-spacing">
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
            ماذا ترتدون
          </p>
          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-2">
            اللباس المناسب
          </h2>

          <div className="ornament-divider">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C8A45D" />
            </svg>
          </div>
        </motion.div>

        {/* Dress code cards */}
        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Formal */}
          <motion.div
            className="luxury-card p-8 text-center gold-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {/* Suit/Dress icon */}
            <div className="mx-auto mb-6">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto">
                {/* Elegant suit */}
                <path d="M32 8C28 8 24 12 24 16V20L18 24L20 40L24 38V56H40V38L44 40L46 24L40 20V16C40 12 36 8 32 8Z" 
                  fill="none" stroke="#C8A45D" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M28 20L32 28L36 20" fill="none" stroke="#C8A45D" strokeWidth="1" />
                <line x1="32" y1="28" x2="32" y2="48" stroke="#C8A45D" strokeWidth="1" />
                <circle cx="32" cy="32" r="1.5" fill="#C8A45D" />
                <circle cx="32" cy="38" r="1.5" fill="#C8A45D" />
                <circle cx="32" cy="44" r="1.5" fill="#C8A45D" />
                {/* Bow tie */}
                <path d="M28 20L32 22L36 20L32 24Z" fill="#C8A45D" opacity="0.4" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#3D3428' }}>
              إطلالة رسمية
            </h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: '#7B7060' }}>
              للرجال: بدلات أو سمواكين، وللسيدات: فساتين سهرة أنيقة أو فساتين كوكتيل
            </p>


            {/* Color palette suggestion */}
            <div className="flex justify-center gap-2 mt-5">
              {['#2D2A24', '#F8F4EC', '#C8A45D', '#1D5FA7', '#7A8B5B'].map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border border-white/30"
                  style={{ background: color, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }}
                />
              ))}
            </div>
          </motion.div>

          {/* Traditional */}
          <motion.div
            className="luxury-card p-8 text-center gold-border"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            viewport={{ once: true }}
          >
            {/* Traditional attire icon */}
            <div className="mx-auto mb-6">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="mx-auto">
                {/* Jebba / Traditional Tunisian */}
                <path d="M32 6C28 6 26 10 26 14V18L16 22V26L20 28V58H44V28L48 26V22L38 18V14C38 10 36 6 32 6Z"
                  fill="none" stroke="#1D5FA7" strokeWidth="1.5" strokeLinejoin="round" />
                {/* Decorative neckline */}
                <path d="M28 18L32 30L36 18" fill="none" stroke="#C8A45D" strokeWidth="1.2" />
                <path d="M30 22L32 26L34 22" fill="none" stroke="#C8A45D" strokeWidth="0.8" opacity="0.6" />
                {/* Pattern details */}
                <line x1="24" y1="40" x2="40" y2="40" stroke="#C8A45D" strokeWidth="0.5" opacity="0.4" />
                <line x1="24" y1="44" x2="40" y2="44" stroke="#C8A45D" strokeWidth="0.5" opacity="0.3" />
                <line x1="24" y1="48" x2="40" y2="48" stroke="#C8A45D" strokeWidth="0.5" opacity="0.2" />
                {/* Star ornament */}
                <path d="M32 34L33 36L35 36.5L33.5 38L34 40L32 39L30 40L30.5 38L29 36.5L31 36Z" fill="#C8A45D" opacity="0.5" />
              </svg>
            </div>
            <h3 className="font-display text-xl font-semibold mb-3" style={{ color: '#3D3428' }}>
              إطلالة تقليدية
            </h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: '#7B7060' }}>
              اللباس التونسي التقليدي مرحّب به ومحتفى به. جبة أو قفطان أو أي لباس ثقافي
            </p>


            {/* Cultural pattern accent */}
            <div className="mt-5 flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 0L7 4.5L12 6L7 7.5L6 12L5 7.5L0 6L5 4.5Z" fill="#1D5FA7" opacity={0.2 + i * 0.1} />
                </svg>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
