import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';

const WEDDING_DATE = '2026-08-07T18:00:00';

function CountdownRing({ value, max, label, delay }) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
    >
      <div className="relative w-24 h-24 md:w-28 md:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background ring */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="rgba(200, 164, 93, 0.12)"
            strokeWidth="3"
          />
          {/* Progress ring */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A88A3D" />
              <stop offset="50%" stopColor="#C8A45D" />
              <stop offset="100%" stopColor="#E8D090" />
            </linearGradient>
          </defs>
        </svg>
        {/* Value */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="font-calligraphy text-3xl md:text-4xl"
            style={{ color: 'var(--color-gold)' }}
            key={value}
            initial={{ scale: 1.2, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {String(value).padStart(2, '0')}
          </motion.span>
        </div>
      </div>
      <span
        className="mt-3 font-display text-xs tracking-[0.2em] uppercase"
        style={{ color: '#A09080' }}
      >
        {label}
      </span>
    </motion.div>
  );
}

export default function Countdown() {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  return (
    <section className="section-spacing">
      <div className="container-luxury text-center">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase mb-3" style={{ color: '#A09080' }}>
            العدّ التنازلي ل
          </p>
          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-2">
            يومنا المميّز
          </h2>

          <div className="ornament-divider">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C8A45D" />
            </svg>
          </div>
        </motion.div>

        {/* Countdown rings */}
        <div className="flex justify-center items-center gap-4 md:gap-8 lg:gap-12 mt-10">
          <CountdownRing value={days} max={365} label="أيام" delay={0.1} />
          <CountdownRing value={hours} max={24} label="ساعات" delay={0.2} />
          <CountdownRing value={minutes} max={60} label="دقائق" delay={0.3} />
          <CountdownRing value={seconds} max={60} label="ثواني" delay={0.4} />

        </div>

        {/* Date reminder */}
          <motion.p
          className="mt-10 font-display text-sm md:text-base tracking-wide"
          style={{ color: '#8B7D6B' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
        >
          7 و 8 أوت 2026
        </motion.p>

      </div>
    </section>
  );
}
