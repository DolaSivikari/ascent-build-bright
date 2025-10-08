import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import SkipToContent from "@/components/SkipToContent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Heart, TrendingUp, Award, Briefcase, MapPin, Clock, Upload } from "lucide-react";

const jobListings = [
  {
    title: "Project Manager - Commercial Construction",
    department: "Construction",
    location: "Toronto, ON",
    type: "Full-time",
    description: "Lead commercial construction projects from preconstruction through closeout. Manage budgets, schedules, and trade coordination.",
    posted: "2 days ago"
  },
  {
    title: "Site Superintendent",
    department: "Construction",
    location: "Mississauga, ON",
    type: "Full-time",
    description: "Oversee daily job site operations, ensure quality and safety compliance, coordinate trades and subcontractors.",
    posted: "5 days ago"
  },
  {
    title: "VDC Coordinator (BIM)",
    department: "Engineering",
    location: "Toronto, ON",
    type: "Full-time",
    description: "Manage BIM coordination, clash detection, and digital workflows using Autodesk Construction Cloud.",
    posted: "1 week ago"
  },
  {
    title: "Estimator",
    department: "Preconstruction",
    location: "Toronto, ON",
    type: "Full-time",
    description: "Prepare accurate cost estimates, quantity take-offs, and support bid preparation for commercial projects.",
    posted: "3 days ago"
  },
  {
    title: "Construction Intern (Co-op)",
    department: "Construction",
    location: "Toronto, ON",
    type: "Internship",
    description: "Gain hands-on experience in construction management and site coordination. 4-8 month placement.",
    posted: "1 day ago"
  }
];

const benefits = [
  { icon: Award, title: "Competitive Compensation", description: "Industry-leading salaries, performance bonuses, and profit-sharing" },
  { icon: Heart, title: "Comprehensive Benefits", description: "Extended health, dental, vision, life insurance, and RRSP matching" },
  { icon: TrendingUp, title: "Professional Development", description: "Tuition reimbursement, LEED/PMP/Gold Seal certification support" },
  { icon: Users, title: "Collaborative Culture", description: "Team-focused environment with mentorship opportunities" }
];

const Careers = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen">
      <SEO 
        title="Careers - Join Our Team"
        description="Build your career with Ascent Group Construction. Explore opportunities across Toronto and the GTA in construction management, trades, and more."
        keywords="construction jobs, careers Toronto, hiring GTA, construction management, trades jobs"
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
              <Briefcase className="w-16 h-16 mx-auto mb-6 animate-float" />
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                Join Toronto's Premier Construction Team
              </h1>
              <p className="text-xl text-white/90 mb-8">
                Build your career with a company that values innovation, safety, and professional growth
              </p>
            </div>
          </div>
        </section>

        {/* Culture Section */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-heading font-bold mb-6">Why Work With Us</h2>
              <p className="text-lg text-muted-foreground">
                At Ascent Group Construction, we're more than just a team—we're a family committed to 
                building exceptional projects and exceptional careers across the Greater Toronto Area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-8">
                    <benefit.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Job Listings */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading font-bold text-center mb-12">Open Positions</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              {jobListings.map((job, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2">{job.title}</CardTitle>
                        <CardDescription className="text-base">{job.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="w-fit">{job.type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Posted {job.posted}
                      </div>
                    </div>
                    <Button className="w-full md:w-auto">Apply Now</Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                Don't see a position that matches your skills?
              </p>
              <Button variant="outline" size="lg">
                Submit General Application
              </Button>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-heading">Quick Application</CardTitle>
                  <CardDescription>
                    Submit your resume and we'll be in touch about opportunities that match your expertise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input id="firstName" required className="mt-2" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input id="lastName" required className="mt-2" />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" required className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" type="tel" required className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="position">Position of Interest</Label>
                      <Input id="position" placeholder="e.g., Site Supervisor" className="mt-2" />
                    </div>

                    <div>
                      <Label htmlFor="coverLetter">Cover Letter (Optional)</Label>
                      <Textarea 
                        id="coverLetter" 
                        rows={5} 
                        placeholder="Tell us about your experience and why you'd like to join our team..."
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="resume">Resume / CV *</Label>
                      <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground mb-2">
                          {selectedFile ? selectedFile.name : "Click to upload or drag and drop"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PDF, DOC, or DOCX (max 5MB)
                        </p>
                        <Input
                          id="resume"
                          type="file"
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        />
                      </div>
                    </div>

                    <Button type="submit" size="lg" className="w-full">
                      Submit Application
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this application, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Careers;
