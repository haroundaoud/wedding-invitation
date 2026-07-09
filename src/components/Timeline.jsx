import { motion } from "framer-motion";

const timelineEvents = [
  {
    id: 1,
    title: " العشاء",
    time: "من الساعة 19:00 إلى الساعة 22:00",
    description:
      "نستقبلكم على مأدبة عشاء راقية في أجواء دافئة ومليئة بالمحبة، قبل انطلاق سهرة الزفاف.",
    icon: (
      <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
        <circle
          cx="23"
          cy="23"
          r="15"
          stroke="#C8A45D"
          strokeWidth="2.2"
          fill="none"
        />
        <path
          d="M16 23h14M23 16v14"
          stroke="#C8A45D"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
  },

  {
    id: 2,
    title: " السهرة والاحتفال",
    time: "ابتداءً من الساعة 22:00",
    description:
      "نحتفل معكم بأجمل لحظات العمر في أجواء مليئة بالفرح والسعادة ونشارككم فرحة يومنا الكبير.",
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

        <circle
          cx="17"
          cy="7"
          r="3"
          fill="#C8A45D"
        />
      </svg>
    ),
  },
];


function TimelineItem({ event }) {

  return (
    <motion.div
      initial={{opacity:0,y:40}}
      whileInView={{opacity:1,y:0}}
      viewport={{once:true}}
      transition={{duration:0.8}}
    >

      <motion.div
        whileHover={{y:-4,scale:1.02}}
        transition={{type:"spring",stiffness:250}}
        className="relative overflow-hidden rounded-[32px] p-8 md:p-12"
        style={{
          background:
          "linear-gradient(135deg,rgba(255,255,255,.96),rgba(249,247,242,.96))",

          border:"1px solid rgba(200,164,93,.35)",

          boxShadow:
          "0 30px 70px rgba(0,0,0,.08),0 10px 30px rgba(200,164,93,.15)"
        }}
      >


        {/* Gold line */}

        <div
        className="absolute top-0 left-0 w-full h-1"
        style={{
          background:
          "linear-gradient(90deg,#C8A45D,#F4DEAA,#C8A45D)"
        }}
        />


        {/* Icon */}

        <div className="flex justify-center mb-8">

          <motion.div

          animate={{y:[0,-6,0]}}

          transition={{
            duration:4,
            repeat:Infinity
          }}

          className="w-28 h-28 rounded-full flex items-center justify-center"

          style={{
            background:
            "radial-gradient(circle,#FFF7E6 0%,rgba(200,164,93,.15) 80%)",

            border:"1px solid rgba(200,164,93,.35)"
          }}

          >

          {event.icon}

          </motion.div>

        </div>



        <div className="text-center">


          <h3
          className="font-calligraphy text-4xl md:text-5xl mb-4"
          style={{
            color:"#3D3428"
          }}
          >

          {event.title}

          </h3>



          <div
          className="inline-block rounded-full px-6 py-2"
          style={{
            background:"rgba(200,164,93,.12)",
            color:"#C8A45D"
          }}
          >

          {event.time}

          </div>



          <p
          className="mt-8 text-lg leading-9"
          style={{
            color:"#706656"
          }}
          >

          {event.description}

          </p>




          {/* Details */}

          <div className="grid md:grid-cols-2 gap-5 mt-10">


          {/* Location */}

          <div
          className="rounded-2xl p-5"
          style={{
            background:"rgba(200,164,93,.08)",
            border:"1px solid rgba(200,164,93,.20)"
          }}
          >

          <div
          className="text-sm mb-2"
          style={{color:"#A09080"}}
          >
          المكان
          </div>


          <div
          className="font-bold text-xl"
          style={{color:"#C8A45D"}}
          >
          LE JOUR J
          </div>


          <div
          className="mt-2"
          style={{color:"#7B7060"}}
          >
          المحمدية، تونس
          </div>

          </div>




          {/* Time Dynamic */}

          <div
          className="rounded-2xl p-5"
          style={{
            background:"rgba(200,164,93,.08)",
            border:"1px solid rgba(200,164,93,.20)"
          }}
          >

          <div
          className="text-sm mb-3"
          style={{color:"#A09080"}}
          >
          برنامج السهرة
          </div>



          {
            event.id === 1 ? (

            <>
            <div
            className="font-bold text-xl"
            style={{color:"#C8A45D"}}
            >
             19:00
            </div>


            <div
            className="mt-2 leading-8"
            style={{color:"#7B7060"}}
            >
            العشاء<br/>
            من 19:00 إلى 22:00
            </div>

            </>


            ) : (

            <>

            <div
            className="font-bold text-xl"
            style={{color:"#C8A45D"}}
            >
             22:00
            </div>


            <div
            className="mt-2 leading-8"
            style={{color:"#7B7060"}}
            >
            بداية السهرة والاحتفال
            <br/>
            بعد العشاء
            </div>


            </>

            )
          }


          </div>


          </div>




          <div className="mt-10">

          <p
          className="leading-9"
          style={{color:"#A09080"}}
          >

          نتشرف بحضوركم ومشاركتكم فرحتنا في هذا اليوم المميز

          </p>

          </div>



        </div>


      </motion.div>


    </motion.div>
  );
}



export default function Timeline(){

return(

<section className="section-spacing pattern-ceramic">

<div className="container-luxury">


<motion.div
className="text-center mb-16"
initial={{opacity:0,y:20}}
whileInView={{opacity:1,y:0}}
viewport={{once:true}}
>

<p
className="font-display text-sm mb-3"
style={{color:"#A09080"}}
>
موعد الاحتفال
</p>


<h2
className="font-calligraphy text-3xl md:text-5xl gold-shimmer"
>
برنامج الزفاف
</h2>


</motion.div>

<br />

<div className="flex justify-center">
  <div className="w-full max-w-3xl space-y-12">
    {timelineEvents.map((event) => (
      <TimelineItem
        key={event.id}
        event={event}
      />
    ))}
  </div>
</div>


</div>

</section>

)

}