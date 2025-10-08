import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you do small jobs or only big renovations?",
    answer: "We specialize in small- to mid-size homeowner jobs. Same-week availability for most requests. No minimums, no surprises.",
  },
  {
    question: "How much will my job cost?",
    answer: "We give transparent ballpark pricing in 24–48 hours. For a firm quote, we'll confirm scope during a quick visit or photo-assisted estimate.",
  },
  {
    question: "Are there hidden fees?",
    answer: "No. All estimates list labour, materials, and any required permits. We only change the estimate with your written approval.",
  },
  {
    question: "Can I get a price online?",
    answer: "Yes! Upload a photo or answer 3 quick questions and we'll send a reliable ballpark within 24–48 hours.",
  },
  {
    question: "What if something goes wrong?",
    answer: "We include a workmanship guarantee (30 days for small fixes; 1 year for packaged work). We make it right quickly.",
  },
  {
    question: "Do you offer payment options?",
    answer: "Yes — we accept card, e-transfer, and short-term financing on qualifying projects.",
  },
];

const FAQ = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about working with us
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-card border-2 border-border rounded-lg px-6 hover:border-primary/50 transition-colors"
            >
              <AccordionTrigger className="text-left font-semibold text-lg text-primary hover:text-primary/80">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
