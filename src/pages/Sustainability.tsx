import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, Recycle, Sun, Droplets, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Sustainability = () => {
  const [projectSize, setProjectSize] = useState("");
  const [carbonOffset, setCarbonOffset] = useState(0);

  const calculateCarbon = (sqft: string) => {
    const size = parseFloat(sqft);
    if (!isNaN(size)) {
      // Simplified calculation: ~25 kg CO2 per sq ft with eco practices
      const offset = Math.round(size * 25);
      setCarbonOffset(offset);
    } else {
      setCarbonOffset(0);
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Sustainability - Building a Greener Toronto"
        description="Ascent Group Construction is committed to sustainable building practices, LEED certifications, and carbon-neutral construction across the GTA."
        keywords="sustainable construction, LEED, green building, eco-friendly, Toronto, GTA"
      />
      <SkipToContent />
      <Header />
      
      <main id="main-content" role="main">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-primary to-deep-blue overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center text-white">
              <Leaf className="w-16 h-16 mx-auto mb-6 animate-float" />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Building a Greener Toronto
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Leading the construction industry toward carbon neutrality with innovative sustainable practices and LEED-certified excellence
              </p>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-3xl font-heading">Our Sustainability Commitment</CardTitle>
                </CardHeader>
                <CardContent className="prose prose-lg max-w-none">
                  <p>
                    At Ascent Group Construction, we believe that building Toronto's future means preserving it for generations to come. 
                    Our commitment to sustainability isn't just a policy—it's woven into every project we undertake across the Greater Toronto Area.
                  </p>
                  <p>
                    From sourcing locally-produced materials to implementing advanced waste diversion strategies, we're dedicated to 
                    achieving carbon neutrality by 2030. We partner with LEED-certified suppliers, utilize renewable energy wherever 
                    possible, and continuously innovate our construction methods to minimize environmental impact.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Our Impact by the Numbers</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <Recycle className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <div className="text-4xl font-bold text-primary mb-2">87%</div>
                  <p className="text-muted-foreground">Waste Diverted from Landfills</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <Sun className="w-12 h-12 mx-auto mb-4 text-secondary" />
                  <div className="text-4xl font-bold text-primary mb-2">2.5MW</div>
                  <p className="text-muted-foreground">Solar Capacity Installed</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <Droplets className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                  <div className="text-4xl font-bold text-primary mb-2">40%</div>
                  <p className="text-muted-foreground">Water Usage Reduction</p>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8">
                  <Award className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <div className="text-4xl font-bold text-primary mb-2">45+</div>
                  <p className="text-muted-foreground">LEED Certified Projects</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Material Sourcing */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-heading font-bold text-center mb-12">Sustainable Material Sourcing</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Leaf className="w-6 h-6 text-green-600" />
                      Local Suppliers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Over 70% of our materials are sourced from suppliers within 200km of Toronto, 
                      reducing transportation emissions and supporting local businesses.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Ontario-sourced lumber from sustainable forests</li>
                      <li>• Local concrete suppliers with recycled content</li>
                      <li>• GTA-based metal fabricators</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <Recycle className="w-6 h-6 text-primary" />
                      Recycled Content
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      We prioritize materials with high recycled content and design for future deconstruction 
                      and material reuse.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• 30%+ recycled content in concrete mixes</li>
                      <li>• Reclaimed wood and steel when feasible</li>
                      <li>• Low-VOC paints and finishes</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Carbon Calculator */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card className="border-2 border-primary/20">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-heading">Carbon Offset Calculator</CardTitle>
                  <CardDescription>
                    Estimate the CO₂ offset achieved through our sustainable construction practices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="projectSize">Project Size (sq ft)</Label>
                      <Input
                        id="projectSize"
                        type="number"
                        placeholder="e.g., 2000"
                        value={projectSize}
                        onChange={(e) => {
                          setProjectSize(e.target.value);
                          calculateCarbon(e.target.value);
                        }}
                        className="mt-2"
                      />
                    </div>
                    
                    {carbonOffset > 0 && (
                      <div className="bg-green-50 dark:bg-green-950 border-2 border-green-500 rounded-lg p-6 text-center animate-fade-in">
                        <p className="text-sm text-muted-foreground mb-2">Estimated Carbon Offset</p>
                        <p className="text-4xl font-bold text-green-600 mb-2">
                          {carbonOffset.toLocaleString()} kg CO₂
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Equivalent to planting ~{Math.round(carbonOffset / 20)} trees
                        </p>
                      </div>
                    )}
                    
                    <p className="text-xs text-muted-foreground text-center">
                      *Calculation based on industry averages for sustainable construction practices vs. conventional methods
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Certifications & Partnerships</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="text-center">
                <CardContent className="pt-8">
                  <Award className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <h3 className="font-bold text-lg mb-2">LEED Accredited</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team includes LEED Accredited Professionals certified in sustainable design and construction
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8">
                  <Award className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-bold text-lg mb-2">CaGBC Member</h3>
                  <p className="text-sm text-muted-foreground">
                    Active member of the Canada Green Building Council advancing sustainable building practices
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="pt-8">
                  <Award className="w-16 h-16 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold text-lg mb-2">ISO 14001</h3>
                  <p className="text-sm text-muted-foreground">
                    Certified environmental management system ensuring consistent eco-friendly practices
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-deep-blue">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Ready to Build Sustainably?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can bring eco-friendly construction practices to your next project
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link to="/contact">
                  Get an Eco-Friendly Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg bg-white/10 text-white border-white hover:bg-white hover:text-primary">
                <Link to="/projects">
                  View Sustainable Projects
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Sustainability;
