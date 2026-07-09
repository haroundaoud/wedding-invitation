import { motion } from 'framer-motion';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';

export default function LocationSection() {
  return (
    <section className="section-spacing">
      <div className="container-luxury">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            className="font-display text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: '#A09080' }}
          >
            احضروا معنا في
          </p>

          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-2">
            مكان الحفل
          </h2>

          <div className="ornament-divider">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z"
                fill="#C8A45D"
              />
            </svg>
          </div>
        </motion.div>

        {/* Venue Card */}
        <motion.div
          className="relative overflow-hidden rounded-3xl max-w-4xl mx-auto"
          style={{
            boxShadow:
              '0 25px 60px rgba(0,0,0,0.12), 0 8px 20px rgba(200,164,93,0.15)',
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Background */}
<div className="absolute inset-0">
  <img
    src="/images/salle.jpg"
    alt="LE JOUR J Wedding Venue"
    className="w-full h-full object-cover"
    loading="lazy"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
</div>

          {/* Content */}
          <div className="relative z-10 p-8 md:p-12 lg:p-16 min-h-[420px] flex flex-col justify-end">
            <motion.div
              className="glass rounded-2xl p-6 md:p-8 max-w-lg"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.25)',
              }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin size={20} className="text-gold" />
                </div>

                <div>
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-white mb-1">
                    LE JOUR J
                  </h3>

                  <p className="text-white/70 font-body text-sm md:text-base leading-relaxed">
                    Wedding & Events Venue
                    <br />
                    Tunis, Tunisia
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href="https://maps.app.goo.gl/2ki4bKfKw88SPdVm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold text-sm flex items-center gap-2"
                >
                  <Navigation size={16} />
                  افتح الملاحة
                </a>

                <a
                  href="https://maps.app.goo.gl/2ki4bKfKw88SPdVm8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-sm !text-white !border-white/40 hover:!bg-white/20 hover:!text-white flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  خرائط Google
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Google Map */}
        <motion.div
          className="mt-8 max-w-4xl mx-auto rounded-2xl overflow-hidden"
          style={{
            boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
            border: '2px solid rgba(200,164,93,0.15)',
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3200.538344982421!2d10.178698899999999!3d36.6615553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3900554f0619%3A0x7eceb0fe3663e225!2sLE%20JOUR%20J!5e0!3m2!1sfr!2stn!4v1783610516143!5m2!1sfr!2stn"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="LE JOUR J"
          />
        </motion.div>
      </div>
    </section>
  );
}