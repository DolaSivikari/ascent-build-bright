import { useEffect, useState } from "react";

const clients = [
  { name: "City of Toronto", industry: "Municipal" },
  { name: "Oxford Properties", industry: "Real Estate" },
  { name: "Tridel", industry: "Developer" },
  { name: "Minto Group", industry: "Developer" },
  { name: "Daniels Corporation", industry: "Developer" },
  { name: "Cadillac Fairview", industry: "Real Estate" },
  { name: "First Capital", industry: "Commercial" },
  { name: "Dream", industry: "Developer" },
  { name: "Brookfield Properties", industry: "Real Estate" },
  { name: "RioCan", industry: "REIT" },
  { name: "Allied Properties", industry: "Commercial" },
  { name: "Choice Properties", industry: "REIT" },
];

const ClientLogoCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="w-full overflow-hidden bg-muted/30 py-12 border-y border-border">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-8">
          Trusted by Leading Organizations Across the GTA
        </p>
        
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Client logos carousel"
        >
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-muted/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-muted/30 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling Container */}
          <div className="flex gap-8">
            {/* First Set */}
            <div 
              className={`flex gap-8 ${isPaused ? '' : 'animate-scroll-left'}`}
              aria-live="off"
            >
              {clients.map((client, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 w-40 h-24 bg-background rounded-lg flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-md group"
                  role="img"
                  aria-label={`${client.name} logo`}
                >
                  <span className="text-sm font-bold text-foreground/80 group-hover:text-primary transition-colors text-center px-2">
                    {client.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {client.industry}
                  </span>
                </div>
              ))}
            </div>
            
            {/* Duplicate Set for Seamless Loop */}
            <div 
              className={`flex gap-8 ${isPaused ? '' : 'animate-scroll-left'}`}
              aria-hidden="true"
            >
              {clients.map((client, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 w-40 h-24 bg-background rounded-lg flex flex-col items-center justify-center opacity-60 hover:opacity-100 transition-all duration-300 border border-border hover:border-primary/30 hover:shadow-md group"
                >
                  <span className="text-sm font-bold text-foreground/80 group-hover:text-primary transition-colors text-center px-2">
                    {client.name}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {client.industry}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogoCarousel;
