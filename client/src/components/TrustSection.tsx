import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    user: "CoolGamer99",
    text: "I actually got the Dominus! It took like 5 mins. Tysm!!",
    avatar: "bg-blue-400"
  },
  {
    id: 2,
    user: "RobloxQueen_x",
    text: "Best site ever. My friends didn't believe me until I showed them.",
    avatar: "bg-pink-400"
  },
  {
    id: 3,
    user: "NoobMaster69",
    text: "Legit. Just had to do a quick survey and boom, item in inventory.",
    avatar: "bg-green-400"
  }
];

export default function TrustSection() {
  return (
    <section className="py-20 bg-white border-y-4 border-black">
      <div className="container px-4">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 mb-4 bg-yellow-100 px-6 py-2 rounded-full border-2 border-black">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              ))}
            </div>
            <span className="font-bold text-lg">4.9/5 Rating</span>
          </div>
          <h2 className="text-4xl font-display mb-4">Trusted by 120,000+ Players</h2>
          <p className="text-gray-600 max-w-2xl">
            Join the community of players who have already claimed their free Limiteds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <Card key={t.id} className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-full border-2 border-black ${t.avatar}`} />
                  <div>
                    <h4 className="font-bold font-display">{t.user}</h4>
                    <span className="text-xs text-gray-500 font-bold bg-gray-100 px-2 py-0.5 rounded">VERIFIED</span>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{t.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
