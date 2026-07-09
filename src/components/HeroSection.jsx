import { motion } from 'framer-motion';
import { Gem } from "lucide-react";
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-spacing font-arabic" dir="rtl">
      {/* Background pattern */}
      <div className="absolute inset-0 pattern-islamic opacity-20" />

      {/* Djerba landscape at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-48 md:h-72 overflow-hidden opacity-25">
        <img
          src="/images/djerba-landscape.png"
          alt="Djerba landscape"
          className="w-full h-full object-cover object-top"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ivory via-ivory/80 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        {/* Arabic bismillah */}
        <motion.p
  className="mb-12 font-arabic text-med-blue/80 text-xl md:text-2xl font-bold "
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.3 }}
>
  بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
</motion.p>
<motion.div
  className="mb-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.4 }}
>
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 0L14.5 9L24 12L14.5 15L12 24L9.5 15L0 12L9.5 9L12 0Z" fill="#C8A45D" />
  </svg>
</motion.div>

<motion.p
  className="font-arabic text-gold-dark text-lg md:text-xl italic"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.5 }}
>
  ﴿وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجاً لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً﴾
</motion.p>

        {/* Top ornamental divider */}
        <motion.div
          className="ornament-divider mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 0L12.5 7.5L20 10L12.5 12.5L10 20L7.5 12.5L0 10L7.5 7.5L10 0Z" fill="#C8A45D" />
          </svg>
        </motion.div>

        {/* Warm invitation greeting */}
        <motion.p
          className="font-arabic text-base md:text-lg mb-6 leading-relaxed"
          style={{ color: '#5B5040' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          فرحتنا لا تكتمل إلا بوجودكم، وبهجة ليلتنا تزداد بنوركم.<br />
          تدعوكم عائلاتنا لمشاركتنا لحظة العمر المميّزة في حفل زفاف:
        </motion.p>

        {/* Couple names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 1.1 }}
        >
          <h1 className="font-arabic text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight my-4">
            <span className="gold-shimmer">هشام داود</span>


          <div className="flex justify-center my-5"> <Gem className="text-gold" size={36} strokeWidth={1.5} /> </div>
  
              <span className="gold-shimmer">وداد المزراني</span>
          </h1>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          className="ornament-divider mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z" fill="#C8A45D" />
          </svg>
        </motion.div>

        {/* Wedding details */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <p className="font-arabic text-lg md:text-xl font-semibold" style={{ color: '#6B5D4A' }}>
            الزمان: السبت، 8 أوت 2026
          </p>
          <p className="font-arabic text-base md:text-lg" style={{ color: 'var(--color-med-blue)' }}>
المكان
قاعة الأفراح LE JOUR J
المحمدية، تونس          </p>
          <p className="font-arabic text-sm md:text-base mt-4 italic" style={{ color: '#A09080' }}>
            العاقبة لديكم بالمسرات، ودامت دياركم عامرة بالأفراح.
          </p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <p className="font-arabic text-xs tracking-widest" style={{ color: '#B0A090' }}>
            اسحب للأسفل لمعرفة المزيد
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
              <rect x="1" y="1" width="18" height="28" rx="9" stroke="#C8A45D" strokeWidth="1.5" />
              <motion.circle
                cx="10"
                cy="10"
                r="2.5"
                fill="#C8A45D"
                animate={{ cy: [8, 16, 8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
