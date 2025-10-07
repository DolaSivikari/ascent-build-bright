import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import SEO from '@/components/SEO';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign up new user
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: `${window.location.origin}/admin`,
          }
        });

        if (error) throw error;

        toast({
          title: 'Account created!',
          description: 'Your account has been created. An admin needs to grant you access. Please contact your administrator with this email: ' + values.email,
        });
        
        setIsSignUp(false);
        return;
      }

      // Sign in existing user
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) throw error;

      // Check if user has admin or staff role
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id);

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        toast({
          title: 'Access Denied',
          description: 'You do not have permission to access the admin area. Please contact an administrator to grant you access.',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Logged in successfully.',
      });

      navigate('/admin');
    } catch (error: any) {
      console.error('Auth error:', error);
      toast({
        title: 'Error',
        description: error.message || `Failed to ${isSignUp ? 'sign up' : 'log in'}. Please check your credentials.`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Admin Login"
        description="Admin login portal for Ascent Group Construction staff"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">{isSignUp ? 'Create Admin Account' : 'Admin Login'}</CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Create a new account - admin privileges will need to be granted separately' 
                : 'Access the Ascent Group Construction admin dashboard'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="admin@ascentgroup.com" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          placeholder="••••••••" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isLoading}
                >
                  {isLoading ? (isSignUp ? 'Creating Account...' : 'Logging in...') : (isSignUp ? 'Create Account' : 'Log In')}
                </Button>

                <div className="text-center mt-4">
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm"
                  >
                    {isSignUp ? 'Already have an account? Log in' : 'Need an account? Sign up'}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
