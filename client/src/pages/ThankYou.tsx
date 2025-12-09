import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, Gift, Star, ArrowLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import Header from "@/components/Header";

export default function ThankYou() {
  const [username, setUsername] = useState<string | null>(null);
  const [item, setItem] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("ugc_username");
    const storedItem = sessionStorage.getItem("ugc_item");
    
    if (storedUsername) setUsername(storedUsername);
    if (storedItem) setItem(JSON.parse(storedItem));

    // Animate progress bar
    const timer = setTimeout(() => setProgress(70), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-body bg-secondary/20">
      <Header />
      {/* Background Pattern */}
      <div 
        className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <main className="flex-grow container px-4 py-12 relative z-10 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-2xl"
        >
          {/* Success Header */}
          <div className="text-center mb-8 space-y-4">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center justify-center w-20 h-20 bg-green-400 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4"
            >
              <CheckCircle className="w-10 h-10 text-white" strokeWidth={3} />
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl font-display text-black drop-shadow-[2px_2px_0px_rgba(255,255,255,1)] leading-tight">
              Thank You! <br/>
              <span className="text-primary">Your Limited Item Is Being Delivered!</span>
            </h1>
            <p className="text-xl font-bold text-gray-700 bg-white/80 backdrop-blur inline-block px-6 py-2 rounded-xl border-2 border-black">
              We're preparing your selected UGC reward.
            </p>
          </div>

          {/* Main Status Card */}
          <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white overflow-hidden mb-8">
            <CardContent className="p-0">
              {/* Item Recap Section */}
              <div className="bg-blue-50 p-6 border-b-4 border-black flex flex-col md:flex-row items-center gap-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-xl border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    {item ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    ) : (
                      <Gift className="w-full h-full text-gray-300" />
                    )}
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-black px-2 py-1 rounded border-2 border-black transform rotate-12"
                  >
                    FREE
                  </motion.div>
                </div>
                
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-display mb-1">{item?.name || "Mystery Item"}</h3>
                  <p className="text-gray-600 font-bold flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Sending to: <span className="text-black bg-yellow-200 px-2 rounded border border-black">@{username || "Guest"}</span>
                  </p>
                </div>
              </div>

              {/* Progress Section */}
              <div className="p-8 space-y-8">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Delivery Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="h-6 bg-gray-100 rounded-full border-2 border-black overflow-hidden p-1">
                    <motion.div 
                      className="h-full bg-green-400 rounded-full border border-black"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-6 relative">
                  <div className="absolute left-[19px] top-2 bottom-2 w-1 bg-gray-200 -z-10" />
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-green-500 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Verification Completed</h4>
                      <p className="text-sm text-gray-500">You successfully passed the human check.</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                      <Package className="w-6 h-6 text-black" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Item Processing</h4>
                      <p className="text-sm text-gray-500">Allocating stock from inventory...</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 opacity-50">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-black flex items-center justify-center">
                      <Clock className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">UGC Delivery</h4>
                      <p className="text-sm text-gray-500">Estimated time: 5-10 minutes</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col gap-4">
            <Link href="/">
              <Button className="w-full h-16 text-xl font-display bg-primary hover:bg-primary/90 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all rounded-xl">
                <ArrowLeft className="mr-2 w-6 h-6" /> Back to Home Page
              </Button>
            </Link>
            
            <Button variant="ghost" className="text-gray-600 hover:text-black hover:bg-black/5 font-bold">
              Check More Free UGC Items
            </Button>
          </div>

          {/* Trust Footer */}
          <div className="mt-12 text-center space-y-2">
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <p className="text-sm font-bold text-gray-600">
              Over 120,000 Roblox players used this event.
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
