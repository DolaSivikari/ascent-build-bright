import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log("Contact form submitted:", formData);
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
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
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-base font-medium mb-2 block">
                        Your Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="John Smith"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="h-12"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-base font-medium mb-2 block">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="h-12"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="text-base font-medium mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(905) 555-0100"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-base font-medium mb-2 block">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Project inquiry"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-base font-medium mb-2 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <Button type="submit" className="btn-hero w-full md:w-auto px-12">
                    Send Message
                  </Button>
                </form>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Placeholder */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl h-96 flex items-center justify-center border-2 border-dashed border-primary/30">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium">Interactive Map</p>
                  <p className="text-sm">Serving Mississauga and the Greater Toronto Area</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
