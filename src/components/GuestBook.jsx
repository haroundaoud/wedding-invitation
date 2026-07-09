import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircleHeart, Quote } from 'lucide-react';

export default function GuestBook() {
  const [messages, setMessages] = useState([]);
  const [formData, setFormData] = useState({ name: '', message: '' });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('wedding-guestbook') || '[]');
    setMessages(saved);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    const newMessage = {
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };

    const updated = [newMessage, ...messages];
    setMessages(updated);
    localStorage.setItem('wedding-guestbook', JSON.stringify(updated));
    setFormData({ name: '', message: '' });
  };

  return (
    <section className="section-spacing pattern-ceramic">
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
            Leave your blessings
          </p>
          <h2 className="font-calligraphy text-3xl md:text-4xl gold-shimmer mb-2">
            Guest Book
          </h2>
          <div className="ornament-divider">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 0L8.5 5.5L14 7L8.5 8.5L7 14L5.5 8.5L0 7L5.5 5.5L7 0Z" fill="#C8A45D" />
            </svg>
          </div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Form */}
          <motion.div
            className="luxury-card p-6 md:p-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(200,164,93,0.1)' }}>
                <MessageCircleHeart size={20} style={{ color: 'var(--color-gold)' }} />
              </div>
              <h3 className="font-display text-lg font-semibold" style={{ color: '#3D3428' }}>
                Share Your Wishes
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-display text-sm tracking-wide mb-2" style={{ color: '#6B5D4A' }}>
                  Your Name
                </label>
                <input
                  type="text"
                  className="luxury-input"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block font-display text-sm tracking-wide mb-2" style={{ color: '#6B5D4A' }}>
                  Your Message
                </label>
                <textarea
                  className="luxury-input luxury-textarea"
                  placeholder="Write your heartfelt wishes..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn-gold w-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                Leave a Message
              </motion.button>
            </form>
          </motion.div>

          {/* Messages */}
          <motion.div
            className="space-y-4 max-h-[500px] overflow-y-auto pr-2"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'var(--color-gold) transparent',
            }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <AnimatePresence>
              {messages.length === 0 ? (
                <motion.div
                  className="luxury-card p-8 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Quote size={32} className="mx-auto mb-3" style={{ color: 'rgba(200,164,93,0.3)' }} />
                  <p className="font-calligraphy text-lg" style={{ color: '#A09080' }}>
                    Be the first to leave your wishes...
                  </p>
                </motion.div>
              ) : (
                messages.map((msg, index) => (
                  <motion.div
                    key={msg.id}
                    className="luxury-card p-5"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    layout
                  >
                    <div className="flex items-start gap-3">
                      <Quote size={16} className="flex-shrink-0 mt-1" style={{ color: 'var(--color-gold)', opacity: 0.5 }} />
                      <div>
                        <p className="font-body text-sm leading-relaxed mb-2" style={{ color: '#5B5040' }}>
                          {msg.message}
                        </p>
                        <p className="font-calligraphy text-sm" style={{ color: 'var(--color-gold)' }}>
                          — {msg.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
