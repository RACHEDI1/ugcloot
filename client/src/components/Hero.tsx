import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
  const scrollToItems = () => {
    const element = document.getElementById("items-showcase");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-[80vh] flex flex-col items-center justify-start pt-0 pb-20 overflow-hidden bg-transparent">
      {/* Background Pattern is now global in App.tsx */}
      
      {/* Floating Confetti/Icons Animation - Moved to global App.tsx */}

      <div className="container relative z-10 flex flex-col items-center text-center gap-6 px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="space-y-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-display text-black drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] stroke-black tracking-wide leading-tight">
            Claim Your <span className="text-primary drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] text-stroke-2">FREE</span> Roblox UGC Limiteds
          </h1>
          
          <p className="text-xl md:text-2xl font-body font-bold text-gray-800 max-w-2xl mx-auto bg-white/80 backdrop-blur-sm p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Choose from rare Limited Items, Accessories, Skins, Hats & Animations.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button 
            size="lg" 
            onClick={scrollToItems}
            className="text-2xl px-12 py-8 font-display bg-primary hover:bg-primary/90 text-black border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-2 active:shadow-none rounded-xl"
          >
            Get Free Limited Now
          </Button>
        </motion.div>

        {/* Mascot Image */}

      </div>
    </section>
  );
}
