import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

export default function GiftSection() {
  return (
    <section className="section-spacing pattern-islamic">
      <div className="container-luxury">
        <motion.div
          className="max-w-2xl mx-auto luxury-card p-10 md:p-14 text-center gold-border"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Gift icon */}
          <motion.div
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{
              background: 'rgba(200,164,93,0.1)',
              border: '1px solid rgba(200,164,93,0.2)',
            }}
            whileInView={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Gift size={28} style={{ color: 'var(--color-gold)' }} />
          </motion.div>

          {/* Title */}
          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-4">
            A Note on Gifts
          </h2>

          {/* Ornament */}
          <div className="ornament-divider mb-6">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C8A45D" />
            </svg>
          </div>

          {/* Message */}
          <p className="font-calligraphy text-xl md:text-2xl italic leading-relaxed mb-4" style={{ color: '#5B5040' }}>
            "Your presence is the greatest gift we could ever receive."
          </p>

          <p className="font-body text-sm leading-relaxed" style={{ color: '#8B7D6B' }}>
            We are truly blessed to have you celebrate this special day with us.
            Your love, laughter, and warm wishes are all we wish for.
          </p>

          {/* Arabic blessing */}
          <motion.p
            className="font-arabic text-lg mt-6"
            style={{ color: 'var(--color-med-blue)', opacity: 0.5 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            بارك الله لكما وبارك عليكما
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
