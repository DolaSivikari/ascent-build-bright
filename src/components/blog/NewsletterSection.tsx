import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, CheckCircle } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.functions.invoke('subscribe-newsletter', {
        body: { email },
      });

      if (error) throw error;

      setIsSubscribed(true);
      setEmail("");
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter.",
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast({
        title: "Subscription failed",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <section id="newsletter" className="bg-gradient-to-br from-primary to-primary/80 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center text-primary-foreground">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-secondary" />
            <h2 className="text-3xl font-heading font-bold mb-4">You're All Set!</h2>
            <p className="text-lg opacity-90">
              Thank you for subscribing. You'll receive our latest insights and updates.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="newsletter" className="bg-gradient-to-br from-primary to-primary/80 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-primary-foreground">
          <Mail className="w-12 h-12 mx-auto mb-4 text-secondary" />
          <h2 className="text-3xl font-heading font-bold mb-4">
            Stay Updated with Industry Insights
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Get expert construction tips, project spotlights, and industry news delivered to your inbox monthly.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-white text-charcoal"
              disabled={isLoading}
              required
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold"
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-sm opacity-70 mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
