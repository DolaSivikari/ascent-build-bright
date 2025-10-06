import { useState, lazy, Suspense } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Loader2, Map } from "lucide-react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";
import { checkRateLimit, getRemainingTime } from "@/lib/rate-limit";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// Lazy load map - only loads when user clicks "View Map"
const InteractiveMap = lazy(() => import("@/components/InteractiveMap"));

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const handleSubmit = async (data: ContactFormData) => {
    // Check rate limit
    const rateCheck = checkRateLimit('contact');
    if (!rateCheck.allowed) {
      const remaining = getRemainingTime(rateCheck.resetTime!);
      toast({
        title: "Please Wait",
        description: `You can submit again in ${remaining} seconds.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-contact', {
        body: { data },
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours.",
      });

      form.reset();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again or call us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      content: "123 Construction Way\nMississauga, ON L5B 1M5",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "(905) 555-0100",
      link: "tel:+19055550100",
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "info@ascentgroup.ca",
      link: "mailto:info@ascentgroup.ca",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Mon-Fri: 8:00 AM - 6:00 PM\nSat: 9:00 AM - 3:00 PM",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Contact Us"
        description="Get in touch with Ascent Group Construction. Call us at (905) 555-0100, email info@ascentgroup.ca, or visit our Mississauga office for your construction needs."
        keywords="contact construction company, Mississauga contractor, get quote, construction consultation"
      />
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-32 pb-20 bg-gradient-to-br from-primary to-slate-800">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl opacity-90">
                Get in touch with our team — we're here to help with your project
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {contactInfo.map((info, index) => (
                <Card
                  key={info.title}
                  className="p-6 text-center card-hover border-2"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0,
                    animation: 'slide-up 0.6s ease-out forwards',
                  }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <info.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-heading font-bold mb-2 text-primary">
                    {info.title}
                  </h3>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line"
                    >
                      {info.content}
                    </a>
                  ) : (
                    <p className="text-muted-foreground whitespace-pre-line">
                      {info.content}
                    </p>
                  )}
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto">
              <Card className="p-8">
                <h2 className="text-3xl font-heading font-bold mb-6 text-primary">
                  Send Us a Message
                </h2>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Your Name *
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Smith"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Email Address *
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@example.com"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="(905) 555-0100"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-medium">
                              Subject
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Project inquiry"
                                className="h-12"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">
                            Message *
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your project..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="btn-hero w-full md:w-auto px-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </Card>
            </div>
          </div>
        </section>

        {/* Interactive Map - Lazy loaded */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {!showMap ? (
                <Card className="p-12 text-center">
                  <Map className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-2 text-primary">
                    Our Location
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    View our office location on the interactive map
                  </p>
                  <Button
                    onClick={() => setShowMap(true)}
                    className="btn-hero"
                  >
                    <Map className="w-5 h-5 mr-2" />
                    View Map
                  </Button>
                </Card>
              ) : (
                <Suspense fallback={
                  <Card className="p-12 text-center">
                    <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                    <p className="text-muted-foreground">Loading map...</p>
                  </Card>
                }>
                  <InteractiveMap />
                </Suspense>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
