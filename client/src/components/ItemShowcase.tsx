import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";

interface Item {
  id: number;
  name: string;
  image: string;
  rarity: "Legendary" | "Rare" | "Epic";
  originalPrice: number;
  type: string;
}

const items: Item[] = [
  {
    id: 1,
    name: "Golden Dominus Void",
    image: "/images/item-dominus.png",
    rarity: "Legendary",
    originalPrice: 50000,
    type: "Hat"
  },
  {
    id: 2,
    name: "Cyber Mecha Wings",
    image: "/images/item-wings.png",
    rarity: "Epic",
    originalPrice: 15000,
    type: "Back"
  },
  {
    id: 3,
    name: "Crystal Void Sword",
    image: "/images/item-sword.png",
    rarity: "Rare",
    originalPrice: 8000,
    type: "Gear"
  },
  {
    id: 4,
    name: "Neon Valkyrie Helm",
    image: "/images/item-dominus.png", // Reusing for demo
    rarity: "Legendary",
    originalPrice: 45000,
    type: "Hat"
  },
  {
    id: 5,
    name: "Shadow Dragon Pet",
    image: "/images/item-wings.png", // Reusing for demo
    rarity: "Epic",
    originalPrice: 25000,
    type: "Pet"
  },
  {
    id: 6,
    name: "Rainbow Fedora",
    image: "/images/item-sword.png", // Reusing for demo
    rarity: "Rare",
    originalPrice: 5000,
    type: "Hat"
  },
  {
    id: 7,
    name: "Galaxy Cape",
    image: "/images/item-wings.png", // Reusing for demo
    rarity: "Epic",
    originalPrice: 12000,
    type: "Back"
  },
  {
    id: 8,
    name: "Frost General",
    image: "/images/item-dominus.png", // Reusing for demo
    rarity: "Legendary",
    originalPrice: 35000,
    type: "Bundle"
  }
];

const rarityColors = {
  Legendary: "bg-[#FFCC00] text-black border-black",
  Epic: "bg-[#FF00FF] text-white border-black",
  Rare: "bg-[#00A2FF] text-white border-black"
};

export default function ItemShowcase({ onSelect }: { onSelect: (item: Item) => void }) {
  return (
    <section id="items-showcase" className="py-20 bg-white relative overflow-hidden" style={{marginTop: '0px'}}>
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-4 bg-[url('/images/hero-bg.jpg')] opacity-20" style={{marginTop: '-15px'}} />
      
      <div className="container px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-6xl font-display text-black drop-shadow-[3px_3px_0px_rgba(0,0,0,0.2)]">
            Available Limiteds
          </h2>
          <p className="text-xl font-body text-gray-600 max-w-2xl mx-auto">
            Select one item to claim for free. Stock is refreshing soon!
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            {Object.entries(rarityColors).map(([rarity, colorClass]) => (
              <span key={rarity} className={`px-4 py-1 rounded-full border-2 font-bold text-sm ${colorClass}`}>
                {rarity}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group relative overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 bg-white rounded-2xl">
                <div className="absolute top-3 right-3 z-10">
                  <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase border-2 ${rarityColors[item.rarity]}`}>
                    {item.rarity}
                  </span>
                </div>

                <CardContent className="p-4 pt-8 flex flex-col items-center">
                  <div className="relative w-full aspect-square mb-4 bg-gray-50 rounded-xl border-2 border-gray-100 p-4 group-hover:bg-yellow-50 transition-colors">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-contain drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <h3 className="font-display text-xl text-center leading-tight mb-2 h-12 flex items-center justify-center">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400 line-through font-bold text-sm">
                      R$ {item.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-green-500 font-black text-lg">
                      FREE
                    </span>
                  </div>
                </CardContent>

                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full font-display text-lg bg-primary hover:bg-primary/90 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                    onClick={() => onSelect(item)}
                  >
                    CLAIM FREE
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
