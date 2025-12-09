import { Smartphone, Zap, Shield, Layout } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "100% Mobile Friendly",
    description: "Claim items easily from your iPhone, Android, or Tablet."
  },
  {
    icon: Layout,
    title: "Roblox-Inspired UI",
    description: "A familiar interface that feels just like the game you love."
  },
  {
    icon: Zap,
    title: "Instant Delivery",
    description: "Our automated system sends items within 5-10 minutes."
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "No password required. We only need your username."
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-primary text-black">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-2xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <feature.icon className="w-8 h-8" strokeWidth={2.5} />
              </div>
              <h3 className="text-xl font-display">{feature.title}</h3>
              <p className="text-black/80 font-medium leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
