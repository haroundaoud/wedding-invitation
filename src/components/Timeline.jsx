import { motion } from 'framer-motion';

const timelineEvents = [
  {
    id: 1,
    title: 'العقد الشرعي والقانوني',
    time: 'Friday, August 7, 2026',
    description: 'العقد الشرعي والقانوني الذي يربط بين الزوجين وداد & هشام',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Book or certificate ornament */}
        <path d="M6 6H26V26H6V6Z" stroke="#C8A45D" strokeWidth="1.5" />
        <path d="M10 12H22M10 16H22M10 20H18" stroke="#C8A45D" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'زهو جربي',
    time: 'Friday, August 7, 2026',
    description: 'الاحتفال التقليدي التونسي المميز والأجواء الجربية الأصيلة',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Traditional lantern or drum */}
        <path d="M16 2L12 6V8H20V6L16 2Z" fill="#C8A45D" opacity="0.8" />
        <rect x="11" y="8" width="10" height="2" rx="1" fill="#C8A45D" />
        <path d="M12 10L10 14V24L12 26H20L22 24V14L20 10H12Z" fill="none" stroke="#C8A45D" strokeWidth="1.5" />
        <circle cx="16" cy="18" r="2" fill="#C8A45D" opacity="0.6" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'حفلة الزفاف',
    time: 'السبت 8 أوت 2026',
    description: 'الاحتفال بيوم الزفاف الكبير تحت سماء البحر الأبيض المتوسط الجميلة',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        {/* Wedding rings */}
        <circle cx="12" cy="18" r="7" fill="none" stroke="#C8A45D" strokeWidth="1.8" />
        <circle cx="20" cy="18" r="7" fill="none" stroke="#C8A45D" strokeWidth="1.8" />
        <path d="M12 11L12 8L10 6" stroke="#C8A45D" strokeWidth="1" strokeLinecap="round" />
        <circle cx="10" cy="5" r="2" fill="#C8A45D" opacity="0.4" />
      </svg>
    ),
  },
];

function TimelineItem({ event, index }) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className={`relative flex items-center gap-4 md:gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      } flex-row`}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Content card */}
      <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} text-left`}>
        <motion.div
          className="luxury-card p-6 md:p-8"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'} justify-start`}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: 'rgba(200,164,93,0.1)' }}>
              {event.icon}
            </div>
            <div>
              <h3 className="font-display text-lg md:text-xl font-semibold" style={{ color: '#3D3428' }}>
                {event.title}
              </h3>
              <p className="font-calligraphy text-lg" style={{ color: 'var(--color-gold)' }}>
                {event.time}
              </p>
            </div>
          </div>
          <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: '#7B7060' }}>
            {event.description}
          </p>
        </motion.div>
      </div>

      {/* Timeline dot - hidden on mobile, shown on md+ */}
      <div className="hidden md:flex flex-col items-center">
        <motion.div
          className="w-4 h-4 rounded-full border-2"
          style={{
            borderColor: 'var(--color-gold)',
            background: index === 0 ? 'var(--color-gold)' : 'var(--color-ivory)',
          }}
          whileInView={{ scale: [0, 1.3, 1] }}
          transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
          viewport={{ once: true }}
        />
      </div>

      {/* Spacer for alignment on desktop */}
      <div className="hidden md:block flex-1" />
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section className="section-spacing pattern-ceramic">
      <div className="container-luxury">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="font-display text-sm tracking-[0.3em] uppercase mb-3" style={{ color: '#A09080' }}>
            موعد الاحتفال
          </p>
          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-2">
            برنامج الزفاف
          </h2>

          <div className="ornament-divider">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C8A45D" />
            </svg>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line - hidden on mobile */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--color-gold), var(--color-gold), transparent)',
            }}
          />

          {/* Mobile vertical line */}
          <div
            className="md:hidden absolute left-6 top-0 bottom-0 w-px"
            style={{
              background: 'linear-gradient(to bottom, transparent, var(--color-gold), var(--color-gold), transparent)',
            }}
          />

          <div className="space-y-8 md:space-y-12">
            {timelineEvents.map((event, index) => (
              <TimelineItem key={event.id} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
