import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do you do small jobs or only big renovations?",
    answer: "We specialize in small- to mid-size homeowner jobs — same-week for many requests. No project is too small for us!"
  },
  {
    question: "How much will my job cost?",
    answer: "We give transparent ballpark pricing in 24–48 hours. For a firm quote we'll confirm scope during a short visit or a photo-assisted estimate."
  },
  {
    question: "Are there hidden fees?",
    answer: "No. All estimates list labour, materials and any permits (if needed). We only change the estimate with your written approval."
  },
  {
    question: "Can I get a price online?",
    answer: "Yes — upload a photo or answer 3 quick questions and we'll send a reliable ballpark within 24–48 hours."
  },
  {
    question: "What if something goes wrong?",
    answer: "We include a workmanship guarantee (30 days for small fixes; 1 year for packaged work). We'll make it right quickly."
  },
  {
    question: "Do you offer payment options?",
    answer: "Yes — we accept card, e-transfer, and short-term payment plans on qualifying projects."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Questions About Cost & Service
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Honest answers to help you feel confident about your project.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <a href="tel:+14165550100" className="text-primary font-semibold hover:text-secondary transition-colors">
              Call us at (416) 555-0100
            </a>
            <span className="text-muted-foreground mx-3">or</span>
            <a href="/contact" className="text-primary font-semibold hover:text-secondary transition-colors">
              Send us a message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
