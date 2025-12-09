import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this safe?",
    answer: "Yes! We never ask for your password or personal information. We only need your Roblox username to send the gift."
  },
  {
    question: "How long does delivery take?",
    answer: "Most items are delivered within 5-10 minutes after verification. During high traffic, it might take up to an hour."
  },
  {
    question: "Do I need Robux?",
    answer: "No! All items listed here are completely free. You do not need any Robux in your account."
  },
  {
    question: "What are Limited Items?",
    answer: "Limited items are rare accessories that can be traded or sold. We give away specific Limiteds from our stock."
  },
  {
    question: "Why do I need verification?",
    answer: "Verification prevents bots from claiming all the items. It ensures that real players like you get the rewards."
  }
];

export default function FAQ() {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 max-w-3xl">
        <h2 className="text-4xl font-display text-center mb-12 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
          Frequently Asked Questions
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-2 border-black rounded-xl px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] data-[state=open]:bg-secondary/10 transition-colors"
            >
              <AccordionTrigger className="text-lg font-bold hover:no-underline py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-base pb-4 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
