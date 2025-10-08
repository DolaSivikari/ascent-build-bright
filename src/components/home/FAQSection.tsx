import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How much does a typical project cost?",
    answer: "Our projects range from $5,000 for small renovations to $500,000+ for full builds. Most homeowners spend between $15,000-$75,000. We provide free, detailed quotes within 24 hours so you know exactly what to expect—no surprises."
  },
  {
    question: "Do you offer payment plans?",
    answer: "Yes! We offer flexible, no-fee payment plans to make your project affordable. We also accept all major credit cards and e-transfers. Payment schedules are customized to your project timeline."
  },
  {
    question: "Are you licensed and insured?",
    answer: "Absolutely. Ascent Group is fully licensed, WSIB-certified, and carries comprehensive liability insurance. All our tradespeople are certified professionals, and we pull all necessary permits for your project."
  },
  {
    question: "How long will my project take?",
    answer: "Small projects (painting, repairs) typically take 3-7 days. Medium renovations (kitchens, bathrooms) take 2-6 weeks. Larger builds can take 3-6 months. We'll give you a detailed timeline in your quote and keep you updated every step."
  },
  {
    question: "What areas do you serve?",
    answer: "We serve all of Toronto and the Greater Toronto Area, including Mississauga, Brampton, Vaughan, Markham, Richmond Hill, Oakville, and surrounding communities. Contact us to confirm service in your area."
  },
  {
    question: "Do you handle permits and inspections?",
    answer: "Yes. We handle all permits, inspections, and coordination with the city. Our team ensures your project meets all building codes and safety standards—you don't have to worry about the paperwork."
  },
  {
    question: "Can you work with my budget?",
    answer: "We specialize in finding solutions that fit your budget. During the quote process, we'll discuss options for materials, phasing, and design to maximize value without compromising quality. No project is too small."
  },
  {
    question: "What if I need changes during the project?",
    answer: "We understand plans evolve. If you need changes mid-project, we'll provide a clear cost estimate and timeline impact before proceeding. Communication is key—we'll keep you informed every step of the way."
  }
];

const FAQSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Got questions? We've got answers. Here's what our Toronto-area clients ask most.
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
