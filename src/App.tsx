import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import OurProcess from "./pages/OurProcess";
import Projects from "./pages/Projects";
import CaseStudy from "./pages/CaseStudy";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Estimate from "./pages/Estimate";
import Contact from "./pages/Contact";
import ResidentialPainting from "./pages/service/ResidentialPainting";
import StuccoEIFS from "./pages/service/StuccoEIFS";
import CommercialPainting from "./pages/service/CommercialPainting";
import ParkingGarage from "./pages/service/ParkingGarage";
import CondoPainting from "./pages/service/CondoPainting";
import SuiteBuildouts from "./pages/service/SuiteBuildouts";
import Sealants from "./pages/service/Sealants";
import Masonry from "./pages/service/Masonry";
import TileFlooring from "./pages/service/TileFlooring";
import MetalCladding from "./pages/service/MetalCladding";
import Homeowners from "./pages/audience/Homeowners";
import PropertyManagers from "./pages/audience/PropertyManagers";
import CommercialClients from "./pages/audience/CommercialClients";
import NotFound from "./pages/NotFound";
import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/our-process" element={<OurProcess />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/painting" element={<ResidentialPainting />} />
          <Route path="/services/stucco" element={<StuccoEIFS />} />
          <Route path="/services/commercial" element={<CommercialPainting />} />
          <Route path="/services/parking-garage" element={<ParkingGarage />} />
          <Route path="/services/condo" element={<CondoPainting />} />
          <Route path="/services/suite-buildouts" element={<SuiteBuildouts />} />
          <Route path="/services/sealants" element={<Sealants />} />
          <Route path="/services/masonry" element={<Masonry />} />
          <Route path="/services/tile-flooring" element={<TileFlooring />} />
          <Route path="/services/metal-cladding" element={<MetalCladding />} />
          <Route path="/for/homeowners" element={<Homeowners />} />
          <Route path="/for/property-managers" element={<PropertyManagers />} />
          <Route path="/for/commercial" element={<CommercialClients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<CaseStudy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/estimate" element={<Estimate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
