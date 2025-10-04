import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import EstimatorStep1 from "@/components/estimator/EstimatorStep1";
import EstimatorStep2 from "@/components/estimator/EstimatorStep2";
import EstimatorStep3 from "@/components/estimator/EstimatorStep3";
import EstimatorStep4 from "@/components/estimator/EstimatorStep4";
import EstimatorStep5 from "@/components/estimator/EstimatorStep5";
import { calculateEstimate, EstimateInput, EstimateResult, formatCurrency } from "@/utils/estimator";
import { estimatorFormSchema } from "@/lib/validations";
import { checkRateLimit, getRemainingTime } from "@/lib/rate-limit";
import { supabase } from "@/integrations/supabase/client";

const Estimate = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  const [formData, setFormData] = useState({
    // Step 1
    service: "",
    sqft: "",
    stories: "",
    // Step 2
    prepComplexity: "",
    finishQuality: "",
    region: "gta_default",
    // Step 3
    scaffolding: "",
    colorConsultation: false,
    rushScheduling: false,
    warrantyExtension: false,
    siteCleanup: false,
    // Step 5
    name: "",
    email: "",
    phone: "",
    address: "",
    preferredContact: "",
    notes: "",
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.service || !formData.sqft || !formData.stories) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        if (parseInt(formData.sqft) < 100) {
          toast({
            title: "Invalid Square Footage",
            description: "Minimum square footage is 100 sq ft.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 2:
        if (!formData.prepComplexity || !formData.finishQuality || !formData.region) {
          toast({
            title: "Missing Information",
            description: "Please fill in all required fields.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      case 5:
        if (!formData.name || !formData.email || !formData.phone) {
          toast({
            title: "Missing Information",
            description: "Please provide your contact information.",
            variant: "destructive",
          });
          return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast({
            title: "Invalid Email",
            description: "Please enter a valid email address.",
            variant: "destructive",
          });
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) return;

    if (currentStep === 3) {
      // Calculate estimate before showing step 4
      const input: EstimateInput = {
        service: formData.service as "residential_painting" | "stucco_eifs",
        sqft: parseInt(formData.sqft),
        stories: formData.stories as "1" | "2" | "3_plus",
        prepComplexity: formData.prepComplexity as any,
        finishQuality: formData.finishQuality as any,
        region: formData.region as any,
        addOns: {
          scaffolding: formData.scaffolding as any,
          colorConsultation: formData.colorConsultation,
          rushScheduling: formData.rushScheduling,
          warrantyExtension: formData.warrantyExtension,
          siteCleanup: formData.siteCleanup,
        },
      };
      const result = calculateEstimate(input);
      setEstimate(result);
    }

    setCurrentStep((prev) => Math.min(prev + 1, 5));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5) || !estimate) return;

    // Validate entire form
    try {
      estimatorFormSchema.parse(formData);
    } catch (error: any) {
      toast({
        title: "Validation Error",
        description: error.errors?.[0]?.message || "Please check your information.",
        variant: "destructive",
      });
      return;
    }

    // Check rate limit
    const rateCheck = checkRateLimit('estimate');
    if (!rateCheck.allowed) {
      const remaining = getRemainingTime(rateCheck.resetTime!);
      toast({
        title: "Please Wait",
        description: `You can submit again in ${remaining} seconds.`,
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke('submit-estimate', {
        body: {
          data: {
            service: formData.service,
            sqft: parseInt(formData.sqft),
            stories: formData.stories,
            prepComplexity: formData.prepComplexity,
            finishQuality: formData.finishQuality,
            region: formData.region,
            scaffolding: formData.scaffolding,
            colorConsultation: formData.colorConsultation,
            rushScheduling: formData.rushScheduling,
            warrantyExtension: formData.warrantyExtension,
            siteCleanup: formData.siteCleanup,
            estimateMin: estimate.min,
            estimateMax: estimate.max,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            preferredContact: formData.preferredContact,
            notes: formData.notes,
          },
        },
      });

      if (error) throw error;

      setSubmitted(true);
      toast({
        title: "Success!",
        description: "Your estimate request has been received. We'll contact you within 48 hours.",
      });
    } catch (error: any) {
      console.error('Estimate submission error:', error);
      toast({
        title: "Submission Failed",
        description: error.message || "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
      });
    }
  };

  const steps = [
    { number: 1, title: "Project Basics" },
    { number: 2, title: "Scope Details" },
    { number: 3, title: "Add-Ons" },
    { number: 4, title: "Estimate" },
    { number: 5, title: "Contact Info" },
  ];

  const progress = (currentStep / 5) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <SEO 
          title="Estimate Request Submitted"
          description="Your estimate request has been received. Our team will contact you within 24 hours with a detailed quote."
        />
        <Header />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <Card className="max-w-2xl w-full p-12 text-center">
            <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-secondary" />
            </div>
            <h1 className="text-4xl font-heading font-bold mb-4 text-primary">
              Thank You!
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Your estimate request has been received. A member of our team will reach out within 48 hours to confirm a site visit.
            </p>
            {estimate && (
              <div className="bg-muted/50 rounded-lg p-6 mb-8">
                <p className="text-sm text-muted-foreground mb-2">Your Estimated Range</p>
                <p className="text-3xl font-bold font-heading text-primary">
                  {formatCurrency(estimate.min)} — {formatCurrency(estimate.max)}
                </p>
              </div>
            )}
            <div className="space-y-4">
              <p className="text-foreground/80">
                <strong>Reference Email:</strong> {formData.email}
              </p>
              <p className="text-sm text-muted-foreground">
                Questions? Call us at <a href="tel:+19055550100" className="text-primary hover:text-secondary">(905) 555-0100</a>
              </p>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Free Project Estimate"
        description="Get an instant estimate for your residential painting or Stucco/EIFS project. Answer a few questions to receive a detailed quote range within minutes."
        keywords="free estimate, painting quote, stucco quote, construction estimate calculator, project cost estimate"
      />
      <Header />
      <main className="flex-1 py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-primary">
              Get Your Free Estimate
            </h1>
            <p className="text-lg text-muted-foreground">
              Answer a few questions to receive an instant estimate range for your project
            </p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-4">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className={`flex-1 text-center ${
                    step.number < steps.length ? "mr-2" : ""
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center font-bold transition-all ${
                      currentStep >= step.number
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.number}
                  </div>
                  <p className="text-xs font-medium hidden md:block">{step.title}</p>
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <Card className="p-8">
            {currentStep === 1 && <EstimatorStep1 data={formData} onChange={handleChange} />}
            {currentStep === 2 && <EstimatorStep2 data={formData} onChange={handleChange} />}
            {currentStep === 3 && (
              <EstimatorStep3
                data={formData}
                sqft={parseInt(formData.sqft) || 0}
                onChange={handleChange}
              />
            )}
            {currentStep === 4 && estimate && (
              <EstimatorStep4 estimate={estimate} formData={formData} />
            )}
            {currentStep === 5 && <EstimatorStep5 data={formData} onChange={handleChange} />}

            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>

              {currentStep < 5 ? (
                <Button onClick={handleNext} className="btn-hero px-8">
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="btn-hero px-8">
                  Submit Request
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Estimate;
