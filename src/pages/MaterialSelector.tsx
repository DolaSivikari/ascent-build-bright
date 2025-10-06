import { lazy, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Loader2 } from 'lucide-react';

const MaterialSelectorComponent = lazy(() => import('@/components/MaterialSelector/MaterialSelector'));

export default function MaterialSelectorPage() {
  return (
    <>
      <SEO
        title="Material Selector Tool | Ascent Group Construction"
        description="Interactive tool to help you select the best exterior materials for your project. Compare paint, EIFS, coatings, and sealants based on durability, cost, and climate suitability."
        keywords="material selector, exterior paint, EIFS, stucco, coatings, sealants, construction materials, Toronto"
      />

      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main id="main-content" className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/5 via-primary/10 to-background py-16">
            <div className="container mx-auto px-4">
              <div className="max-w-3xl mx-auto text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                  Interactive Material Selector
                </h1>
                <p className="text-xl text-muted-foreground">
                  Find the perfect materials for your project based on performance, durability, cost, and climate requirements
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border">
                    <span className="text-sm font-medium">20+ Materials</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border">
                    <span className="text-sm font-medium">Smart Recommendations</span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full border">
                    <span className="text-sm font-medium">Free to Use</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Material Selector Tool */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <Suspense
                fallback={
                  <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="ml-3 text-muted-foreground">Loading Material Selector...</span>
                  </div>
                }
              >
                <MaterialSelectorComponent />
              </Suspense>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                    1
                  </div>
                  <h3 className="font-semibold">Set Your Criteria</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose your project type, substrate, climate conditions, and budget
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                    2
                  </div>
                  <h3 className="font-semibold">View Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    See materials ranked by compatibility with your requirements
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                    3
                  </div>
                  <h3 className="font-semibold">Build Your Package</h3>
                  <p className="text-sm text-muted-foreground">
                    Shortlist up to 3 materials and create a package
                  </p>
                </div>
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mx-auto">
                    4
                  </div>
                  <h3 className="font-semibold">Get Your Estimate</h3>
                  <p className="text-sm text-muted-foreground">
                    Add to estimator or save for later
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
