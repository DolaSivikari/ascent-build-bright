import { lazy, Suspense, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingFallback from "@/components/LoadingFallback";
import SkipToContent from "@/components/SkipToContent";
import ErrorBoundary from "@/components/ErrorBoundary";
import SplashScreen from "@/components/SplashScreen";

// Only run PerformanceMonitor in development
const PerformanceMonitor = import.meta.env.DEV
  ? lazy(() => import("@/components/PerformanceMonitor"))
  : null;

// Route-based code splitting - lazy load all pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const OurProcess = lazy(() => import("./pages/OurProcess"));
const Projects = lazy(() => import("./pages/Projects"));
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Resources = lazy(() => import("./pages/Resources"));
const Estimate = lazy(() => import("./pages/Estimate"));
const Contact = lazy(() => import("./pages/Contact"));
const ResidentialPainting = lazy(() => import("./pages/service/ResidentialPainting"));
const StuccoEIFS = lazy(() => import("./pages/service/StuccoEIFS"));
const CommercialPainting = lazy(() => import("./pages/service/CommercialPainting"));
const ParkingGarage = lazy(() => import("./pages/service/ParkingGarage"));
const CondoPainting = lazy(() => import("./pages/service/CondoPainting"));
const SuiteBuildouts = lazy(() => import("./pages/service/SuiteBuildouts"));
const Sealants = lazy(() => import("./pages/service/Sealants"));
const Masonry = lazy(() => import("./pages/service/Masonry"));
const TileFlooring = lazy(() => import("./pages/service/TileFlooring"));
const MetalCladding = lazy(() => import("./pages/service/MetalCladding"));
const Homeowners = lazy(() => import("./pages/audience/Homeowners"));
const PropertyManagers = lazy(() => import("./pages/audience/PropertyManagers"));
const CommercialClients = lazy(() => import("./pages/audience/CommercialClients"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Login = lazy(() => import("./pages/admin/Login"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMaterials = lazy(() => import("./pages/admin/Materials"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminTest = lazy(() => import("./pages/admin/AdminTest"));
const Articles = lazy(() => import("./pages/admin/Articles"));
const MediaLibrary = lazy(() => import("./pages/admin/MediaLibrary"));
const MaterialSelector = lazy(() => import("./pages/MaterialSelector"));

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash has been shown in this session
    const hasSeenSplash = sessionStorage.getItem('splash-seen');
    return !hasSeenSplash;
  });

  const handleSplashComplete = () => {
    sessionStorage.setItem('splash-seen', 'true');
    setShowSplash(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
        
        {PerformanceMonitor && (
          <Suspense fallback={null}>
            <PerformanceMonitor />
          </Suspense>
        )}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SkipToContent />
          <ErrorBoundary>
            <Suspense fallback={<LoadingFallback />}>
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
                <Route path="/resources/material-selector" element={<MaterialSelector />} />
                <Route path="/estimate" element={<Estimate />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin/test" element={<AdminTest />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="articles" element={<Articles />} />
                  <Route path="media" element={<MediaLibrary />} />
                  <Route path="materials" element={<AdminMaterials />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
