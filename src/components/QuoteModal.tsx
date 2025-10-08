import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { trackEvent } from '@/lib/analytics';
import { Upload, Loader2, CheckCircle } from 'lucide-react';

const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().regex(/^[\d\s\-\(\)]+$/, 'Invalid phone number').min(10),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().min(5, 'Please provide your address'),
  package: z.enum(['starter', 'refresh', 'weekend', 'custom']),
  message: z.string().max(500, 'Message must be under 500 characters').optional()
});

type QuoteFormData = z.infer<typeof quoteSchema>;

interface QuoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPackage?: 'starter' | 'refresh' | 'weekend' | 'custom';
}

export const QuoteModal = ({ open, onOpenChange, defaultPackage }: QuoteModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      package: defaultPackage || 'custom',
      email: '',
      message: ''
    }
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(f => 
      f.size < 10 * 1024 * 1024 && // Max 10MB per file
      ['image/jpeg', 'image/png', 'image/webp'].includes(f.type)
    );
    
    if (validFiles.length < files.length) {
      toast.error('Some files were too large or invalid format (max 10MB, JPG/PNG/WebP only)');
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles].slice(0, 3)); // Max 3 photos
    
    if (validFiles.length > 0) {
      const totalBytes = validFiles.reduce((sum, f) => sum + f.size, 0);
      trackEvent('photo_upload', { 
        file_count: validFiles.length, 
        total_bytes: totalBytes 
      });
    }
  };

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    
    try {
      // Send to edge function which handles both DB insert and email
      const { data: result, error } = await supabase.functions.invoke('notify-quote', {
        body: {
          ...data,
          photo_urls: [], // TODO: Upload photos to storage bucket
          source_variant: sessionStorage.getItem('ab_test_variant'),
          referrer: window.location.href
        }
      });

      if (error) throw error;

      // Track successful submission
      trackEvent('quote_form_submit', {
        success: true,
        submission_id: result.id
      });

      setSubmitSuccess(true);
      toast.success('Quote request submitted! We\'ll contact you within 24-48 hours.');
      
      setTimeout(() => {
        onOpenChange(false);
        setSubmitSuccess(false);
        form.reset();
        setUploadedFiles([]);
      }, 2000);

    } catch (error: any) {
      console.error('Quote submission error:', error);
      trackEvent('quote_form_submit', {
        success: false,
        error_message: error.message
      });
      toast.error('Submission failed. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Get Your Fast Quote</DialogTitle>
          <DialogDescription>
            Fill out this quick form and we'll get back to you within 24-48 hours with a reliable estimate.
          </DialogDescription>
        </DialogHeader>

        {submitSuccess ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
            <p className="text-sm text-muted-foreground">
              We'll contact you within 24-48 hours.
            </p>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="416-555-0100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (optional)</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Address *</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, Toronto, ON" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="package"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service Type *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="starter">Starter — Quick Fix ($199+)</SelectItem>
                        <SelectItem value="refresh">Home Refresh — One Room ($799+)</SelectItem>
                        <SelectItem value="weekend">Weekend Makeover ($1,999+)</SelectItem>
                        <SelectItem value="custom">Custom Project</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Description (optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your project in a few words..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Photos (optional, up to 3)</FormLabel>
                <div className="mt-2">
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg p-4 cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-5 h-5" />
                    <span className="text-sm">Upload photos for better estimate</span>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploadedFiles.length >= 3}
                    />
                  </label>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      {uploadedFiles.length} file(s) selected
                    </div>
                  )}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Quote Request'
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By submitting, you agree to be contacted about your project. We'll never spam you.
              </p>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};
