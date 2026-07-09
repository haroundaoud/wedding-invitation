import { AnimatePresence, motion } from 'framer-motion';
import { Check, Heart, Send, Users, UtensilsCrossed, X } from 'lucide-react';
import { useState } from 'react';

export default function RSVPSection() {
  const [formData, setFormData] = useState({
    name: '',
    guests: '1',
    attendance: null,
    dietary: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.attendance) return;

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('wedding-rsvp') || '[]');
    existing.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem('wedding-rsvp', JSON.stringify(existing));

    setSubmitted(true);
  };

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
            هل ستشاركونا؟
          </p>
          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-2">
            RSVP
          </h2>

          <div className="ornament-divider">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C8A45D" />
            </svg>
          </div>
          <p className="font-body text-sm mt-4" style={{ color: '#8B7D6B' }}>
            يرجى تأكيد الحضور قبل 15 جويلية 2026
          </p>

        </motion.div>

        {/* RSVP Card */}
        <motion.div
          className="max-w-xl mx-auto luxury-card p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-6"
                exit={{ opacity: 0, y: -20 }}
              >
                {/* Name */}
                <div>
                  <label className="block font-display text-sm tracking-wide mb-2" style={{ color: '#6B5D4A' }}>
                    <Users size={14} className="inline mr-2" style={{ color: 'var(--color-gold)' }} />
                    اسمك

                  </label>
                  <input
                    type="text"
                    className="luxury-input"
                    placeholder="أدخل اسمك الكامل"

                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                {/* Number of guests */}
                <div>
                  <label className="block font-display text-sm tracking-wide mb-2" style={{ color: '#6B5D4A' }}>
                    <Users size={14} className="inline mr-2" style={{ color: 'var(--color-gold)' }} />
عدد المدعوين

                  </label>
                  <select
                    className="luxury-input"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? 'مدعو' : 'مدعوين'}

                      </option>
                    ))}
                  </select>
                </div>

                {/* Attendance */}
                <div>
                  <label className="block font-display text-sm tracking-wide mb-3" style={{ color: '#6B5D4A' }}>
                    <Heart size={14} className="inline mr-2" style={{ color: 'var(--color-gold)' }} />
هل تقبلون الحضور؟

                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-xl font-display text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                        formData.attendance === 'accept'
                          ? 'text-white shadow-lg'
                          : 'hover:border-gold/50'
                      }`}
                      style={{
                        background:
                          formData.attendance === 'accept'
                            ? 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))'
                            : 'rgba(200,164,93,0.08)',
                        border: `2px solid ${
                          formData.attendance === 'accept' ? 'var(--color-gold)' : 'rgba(200,164,93,0.2)'
                        }`,
                      }}
                      onClick={() => setFormData({ ...formData, attendance: 'accept' })}
                    >
                      <Check size={16} />
                      بفرح نقبل

                    </button>
                    <button
                      type="button"
                      className={`flex-1 py-3 px-4 rounded-xl font-display text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
                        formData.attendance === 'decline'
                          ? 'text-white shadow-lg'
                          : 'hover:border-gold/50'
                      }`}
                      style={{
                        background:
                          formData.attendance === 'decline'
                            ? 'linear-gradient(135deg, #8B7060, #6B5045)'
                            : 'rgba(200,164,93,0.08)',
                        border: `2px solid ${
                          formData.attendance === 'decline' ? '#8B7060' : 'rgba(200,164,93,0.2)'
                        }`,
                      }}
                      onClick={() => setFormData({ ...formData, attendance: 'decline' })}
                    >
                      <X size={16} />
                      بكل احترام نعتذر

                    </button>
                  </div>
                </div>

                {/* Dietary */}
                <div>
                  <label className="block font-display text-sm tracking-wide mb-2" style={{ color: '#6B5D4A' }}>
                    <UtensilsCrossed size={14} className="inline mr-2" style={{ color: 'var(--color-gold)' }} />
تفضيلاتكم الغذائية

                  </label>
                  <textarea
                    className="luxury-input luxury-textarea"
                    placeholder="أية متطلبات غذائية أو حساسية..."

                    value={formData.dietary}
                    onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="btn-gold w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={16} />
                  إرسال الرد

                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, var(--color-gold-dark), var(--color-gold))',
                    boxShadow: '0 8px 25px rgba(200,164,93,0.3)',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                >
                  <Check size={36} className="text-white" />
                </motion.div>
                <h3 className="font-calligraphy text-2xl md:text-3xl mb-3" style={{ color: 'var(--color-gold)' }}>
                  {formData.attendance === 'accept' ? 'لا ننتظر لنراكم!' : 'سنفتقدكم!'}

                </h3>
                <p className="font-body text-sm" style={{ color: '#8B7D6B' }}>
                  {formData.attendance === 'accept'
                    ? 'شكرًا لتأكيد حضوركم. نراكم في جربة!'
                    : 'شكرًا لإخبارنا. ستكونون في أفكارنا.'}

                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
