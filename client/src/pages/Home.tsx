import { useState } from "react";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import ItemShowcase from "@/components/ItemShowcase";
import HowItWorks from "@/components/HowItWorks";
import TrustSection from "@/components/TrustSection";
import Features from "@/components/Features";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import UsernameModal from "@/components/UsernameModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemSelect = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-body">
      <Header />
      <main className="flex-grow">
        <Hero />
        <ItemShowcase onSelect={handleItemSelect} />
        <HowItWorks />
        <TrustSection />
        <Features />
        <FAQ />
      </main>
      <Footer />
      
      <UsernameModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        selectedItem={selectedItem}
      />
    </div>
  );
}
