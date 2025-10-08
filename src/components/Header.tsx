import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled_percent = (window.scrollY / windowHeight) * 100;
      setScrollProgress(scrolled_percent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/our-process", label: "Our Process" },
    { to: "/services", label: "Services" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
    { to: "/resources", label: "Resources" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-transparent z-[60]">
        <div 
          className="h-full bg-gradient-to-r from-secondary via-secondary to-primary transition-all duration-150 ease-out shadow-lg shadow-secondary/50"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-card/98 backdrop-blur-xl shadow-xl shadow-primary/5 border-b border-border/50"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group mr-8" aria-label="Ascent Group Construction - Home">
              <img
                src={ascentLogo} 
                alt="Ascent Group Construction Logo" 
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-14 md:h-16' : 'h-16 md:h-20'
                } w-auto object-contain group-hover:scale-105`}
              />
              <div className="hidden md:block" aria-hidden="true">
                <div className="font-heading font-bold text-xl text-primary group-hover:text-secondary transition-colors">
                  Ascent Group
                </div>
                <div className="text-sm text-muted-foreground tracking-wide">
                  Construction
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`font-semibold text-sm uppercase tracking-wider transition-all duration-300 relative group ${
                    location.pathname === link.to
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                  aria-current={location.pathname === link.to ? "page" : undefined}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-secondary transition-all duration-300 ${
                    location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+19055550100"
                className="flex items-center gap-2 px-4 py-2 text-foreground/80 hover:text-primary transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Call Now</div>
                  <div className="font-bold text-sm">(905) 555-0100</div>
                </div>
              </a>
              <Link to="/estimate">
                <Button className="btn-hero shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all duration-300">
                  Get Estimate
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden touch-target p-2 hover:bg-muted rounded-xl transition-all duration-300 relative group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-2.5' : ''
                }`} />
                <span className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`absolute left-0 top-4 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-2.5' : ''
                }`} />
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            id="mobile-menu"
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${
              isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <nav className="py-6 border-t border-border space-y-4" aria-label="Mobile navigation">
              {navLinks.map((link, index) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`block px-4 py-4 font-semibold rounded-lg transition-all duration-300 ${
                    location.pathname === link.to
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/80 hover:bg-muted hover:text-primary"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slide-up 0.4s ease-out forwards' : 'none',
                  }}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="pt-4 space-y-3">
                <a
                  href="tel:+19055550100"
                  className="flex items-center gap-3 px-4 py-3 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-all"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="text-xs opacity-80">Call Now</div>
                    <div className="font-bold">(905) 555-0100</div>
                  </div>
                </a>
                
                <Link to="/estimate" className="block">
                  <Button className="btn-hero w-full py-6 text-base shadow-lg">
                    Get Free Estimate
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
