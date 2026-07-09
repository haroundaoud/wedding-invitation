import { motion } from "framer-motion";

const timelineEvents = [
  {
    id: 1,
    title: "حفلة الزفاف",
    time: "السبت 8 أوت 2026",
    description:
      "يسرنا تشريفكم لحضور حفل زفافنا ومشاركتنا أجمل لحظات العمر في أجواء مليئة بالفرح والمحبة.",
    icon: (
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
        <circle
          cx="17"
          cy="26"
          r="10"
          stroke="#C8A45D"
          strokeWidth="2.2"
          fill="none"
        />

        <circle
          cx="29"
          cy="26"
          r="10"
          stroke="#C8A45D"
          strokeWidth="2.2"
          fill="none"
        />

        <path
          d="M17 16V9"
          stroke="#C8A45D"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <circle cx="17" cy="7" r="3" fill="#C8A45D" />
      </svg>
    ),
  },
];

function TimelineItem({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        whileHover={{
          y: -4,
          scale: 1.02,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
        }}
        className="justify-center overflow-hidden rounded-[32px] p-8 md:p-12"
        style={{
          background:
            "linear-gradient(135deg,rgba(255,255,255,.96),rgba(249,247,242,.96))",
          border: "1px solid rgba(200,164,93,.35)",
          boxShadow:
            "0 30px 70px rgba(0,0,0,.08),0 10px 30px rgba(200,164,93,.15)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Gold top line */}
        <div
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background:
              "linear-gradient(90deg,#C8A45D,#F4DEAA,#C8A45D)",
          }}
        />

        {/* Floating icon */}
        <div className="flex justify-center mb-8">
          <motion.div
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="w-28 h-28 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle,#FFF7E6 0%,rgba(200,164,93,.15) 80%)",
              border: "1px solid rgba(200,164,93,.35)",
              boxShadow:
                "0 0 40px rgba(200,164,93,.25)",
            }}
          >
            {event.icon}
          </motion.div>
        </div>
      

        {/* Title */}
        <div className="text-center">
          <h3
            className="font-calligraphy text-4xl md:text-5xl mb-4"
            style={{
              color: "#3D3428",
            }}
          >
            {event.title}
          </h3>

          <div
            className="inline-block rounded-full px-6 py-2"
            style={{
              background: "rgba(200,164,93,.12)",
              color: "#C8A45D",
            }}
          >
            <span className="font-display tracking-wide">
              {event.time}
            </span>
          </div>

          <p
            className="mt-8 text-lg leading-9"
            style={{
              color: "#706656",
            }}
          >
            {event.description}
          </p>

          {/* Decorative Divider */}
          <div className="flex justify-center mt-10">
            <svg width="140" height="20">
              <line
                x1="10"
                y1="10"
                x2="130"
                y2="10"
                stroke="#C8A45D"
                strokeWidth="1"
              />

              <circle cx="70" cy="10" r="5" fill="#C8A45D" />
              <circle cx="45" cy="10" r="2" fill="#C8A45D" />
              <circle cx="95" cy="10" r="2" fill="#C8A45D" />
            </svg>
          </div>

          {/* Event Details */}
          <div className="grid md:grid-cols-2 gap-5 mt-10">

            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "rgba(200,164,93,.08)",
                border: "1px solid rgba(200,164,93,.20)",
              }}
            >
              <div
                className="text-sm uppercase tracking-[0.25em] mb-2"
                style={{ color: "#A09080" }}
              >
                المكان
              </div>

              <div
                className="font-display text-xl"
                style={{ color: "#3D3428" }}
              >
                LE JOUR J
              </div>

              <div
                className="mt-2"
                style={{ color: "#7B7060" }}
              >
                Tunis, Tunisia
              </div>
            </div>

            <div
              className="rounded-2xl p-5 text-center"
              style={{
                background: "rgba(200,164,93,.08)",
                border: "1px solid rgba(200,164,93,.20)",
              }}
            >
              <div
                className="text-sm uppercase tracking-[0.25em] mb-2"
                style={{ color: "#A09080" }}
              >
                موعد الحفل
              </div>

              <div
                className="font-display text-xl"
                style={{ color: "#3D3428" }}
              >
                18:00
              </div>

              <div
                className="mt-2"
                style={{ color: "#7B7060" }}
              >
                مساءً
              </div>
            </div>

          </div>

          {/* Bottom Message */}
          <div className="text-center mt-10">
            <p
              className="leading-9"
              style={{
                color: "#A09080",
              }}
            >
              نتشرف بحضوركم ومشاركتكم فرحتنا في هذا اليوم المميز
            </p>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Timeline() {
  return (
    <section className="section-spacing pattern-ceramic">
      <div className="container-luxury">

        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p
            className="font-display text-sm tracking-[0.3em] uppercase mb-3"
            style={{ color: "#A09080" }}
          >
            موعد الاحتفال
          </p>

          <h2 className="font-calligraphy text-3xl md:text-5xl gold-shimmer mb-3">
            برنامج الزفاف
          </h2>

          <div className="ornament-divider">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path
                d="M8 0L10 6L16 8L10 10L8 16L6 10L0 8L6 6L8 0Z"
                fill="#C8A45D"
              />
            </svg>
          </div>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {timelineEvents.map((event) => (
            <TimelineItem
              key={event.id}
              event={event}
            />
          ))}
        </div>

      </div>
    </section>
  );
}