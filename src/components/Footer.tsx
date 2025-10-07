import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import ascentLogo from "@/assets/ascent-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <Link to="/" className="inline-block mb-6 group">
              <img 
                src={ascentLogo} 
                alt="Ascent Group Construction Logo" 
                className="h-20 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-sm opacity-90 mb-6">
              Expert residential & commercial construction services across Toronto and the Greater Toronto Area. Licensed, insured, and locally proud.
            </p>
            <div className="flex gap-4 touch-group">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target bg-primary-foreground/10 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target bg-primary-foreground/10 hover:bg-secondary rounded-lg transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target bg-primary-foreground/10 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/services/painting" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  Residential Painting
                </Link>
              </li>
              <li>
                <Link to="/services/stucco" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  Stucco / EIFS
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  Get an Estimate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 opacity-80" />
                <span className="text-sm opacity-90">
                  Toronto, Ontario<br />
                  Serving the GTA
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 opacity-80" />
                <a href="tel:+19055550100" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  (905) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 opacity-80" />
                <a href="mailto:info@ascentgroup.ca" className="text-sm opacity-90 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
                  info@ascentgroup.ca
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © {currentYear} Ascent Group Construction. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-sm opacity-80 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm opacity-80 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
              Terms of Use
            </Link>
            <Link to="/accessibility" className="text-sm opacity-80 hover:opacity-100 hover:text-[hsl(48_100%_35%)] transition-all">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
