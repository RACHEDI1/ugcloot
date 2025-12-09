import { motion } from "framer-motion";
import { User, MousePointerClick, ShieldCheck, Gift } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Enter Username",
    description: "Type your Roblox username so we know where to send the item.",
    icon: User,
    color: "bg-[#FFCC00]"
  },
  {
    id: 2,
    title: "Choose Limited",
    description: "Browse our collection and pick your favorite free UGC item.",
    icon: MousePointerClick,
    color: "bg-[#00A2FF]"
  },
  {
    id: 3,
    title: "Verify Human",
    description: "Complete a quick verification to prove you're not a bot.",
    icon: ShieldCheck,
    color: "bg-[#FF4444]"
  },
  {
    id: 4,
    title: "Receive Item",
    description: "Your Limited item will be added to your inventory in 5-10 mins!",
    icon: Gift,
    color: "bg-[#00FF88]"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-secondary/10 relative overflow-hidden">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-display text-black drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)] mb-4">
            How It Works
          </h2>
          <p className="text-xl font-body text-gray-600">
            Get your dream item in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-2 bg-black/10 -z-10 transform -translate-y-1/2 border-t-4 border-dashed border-black/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className={`w-24 h-24 rounded-2xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center mb-6 ${step.color} transform rotate-3 hover:rotate-0 transition-transform duration-300`}>
                <step.icon className="w-10 h-10 text-black" strokeWidth={2.5} />
              </div>
              
              <div className="bg-white p-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] w-full h-full">
                <div className="inline-block px-3 py-1 bg-black text-white font-display rounded-full text-sm mb-3">
                  STEP {step.id}
                </div>
                <h3 className="text-xl font-display mb-2">{step.title}</h3>
                <p className="text-gray-600 font-body leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
