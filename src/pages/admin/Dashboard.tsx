import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import SEO from '@/components/SEO';
import { LogOut, Mail, FileText } from 'lucide-react';

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  created_at: string;
}

interface EstimateRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  sqft: number;
  estimate_min: number;
  estimate_max: number;
  created_at: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [estimateRequests, setEstimateRequests] = useState<EstimateRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/admin/login');
      return;
    }

    // Verify user has admin or staff role
    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', session.user.id);

    if (!roles || roles.length === 0) {
      await supabase.auth.signOut();
      navigate('/admin/login');
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this area.',
        variant: 'destructive',
      });
    }
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [contactsResponse, estimatesResponse] = await Promise.all([
        supabase
          .from('contact_submissions')
          .select('*')
          .order('created_at', { ascending: false }),
        supabase
          .from('estimate_requests')
          .select('*')
          .order('created_at', { ascending: false }),
      ]);

      if (contactsResponse.data) {
        setContactSubmissions(contactsResponse.data);
      }
      if (estimatesResponse.data) {
        setEstimateRequests(estimatesResponse.data);
      }
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load submissions.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
    toast({
      title: 'Logged out',
      description: 'You have been logged out successfully.',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <>
      <SEO 
        title="Admin Dashboard"
        description="Manage contact submissions and estimate requests"
      />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
        <header className="border-b bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Tabs defaultValue="contacts" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="contacts">
                <Mail className="w-4 h-4 mr-2" />
                Contact Forms ({contactSubmissions.length})
              </TabsTrigger>
              <TabsTrigger value="estimates">
                <FileText className="w-4 h-4 mr-2" />
                Estimate Requests ({estimateRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacts">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Submissions</CardTitle>
                  <CardDescription>
                    View and manage customer contact form submissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : contactSubmissions.length === 0 ? (
                    <p className="text-muted-foreground">No contact submissions yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Message</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {contactSubmissions.map((submission) => (
                            <TableRow key={submission.id}>
                              <TableCell className="whitespace-nowrap">
                                {formatDate(submission.created_at)}
                              </TableCell>
                              <TableCell>{submission.name}</TableCell>
                              <TableCell>{submission.email}</TableCell>
                              <TableCell>{submission.phone || 'N/A'}</TableCell>
                              <TableCell>{submission.subject || 'N/A'}</TableCell>
                              <TableCell className="max-w-xs truncate">
                                {submission.message}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="estimates">
              <Card>
                <CardHeader>
                  <CardTitle>Estimate Requests</CardTitle>
                  <CardDescription>
                    View and manage customer estimate requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <p>Loading...</p>
                  ) : estimateRequests.length === 0 ? (
                    <p className="text-muted-foreground">No estimate requests yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Sq Ft</TableHead>
                            <TableHead>Estimate Range</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {estimateRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="whitespace-nowrap">
                                {formatDate(request.created_at)}
                              </TableCell>
                              <TableCell>{request.name}</TableCell>
                              <TableCell>{request.email}</TableCell>
                              <TableCell>{request.phone}</TableCell>
                              <TableCell>{request.service}</TableCell>
                              <TableCell>{request.sqft.toLocaleString()}</TableCell>
                              <TableCell>
                                ${request.estimate_min.toLocaleString()} - ${request.estimate_max.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </>
  );
}
