import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MaterialType } from "@/types/materials";

const materialSchema = z.object({
  title: z.string().min(1, "Title is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.enum(['paint', 'eifs', 'cladding', 'sealant', 'coating', 'primer', 'scaffolding']),
  cost_index: z.coerce.number().min(1).max(5),
  durability_years: z.coerce.number().min(0),
  maintenance_level: z.enum(['low', 'medium', 'high']),
  r_value: z.coerce.number().min(0).optional(),
  uv_resistance: z.enum(['low', 'medium', 'high']).optional(),
  moisture_resistance: z.enum(['low', 'medium', 'high']).optional(),
  salt_tolerance: z.enum(['low', 'medium', 'high']).optional(),
  voc_level: z.enum(['low', 'standard', 'high']).optional(),
  recycled_content_pct: z.coerce.number().min(0).max(100).optional(),
  warranty_years: z.coerce.number().min(0).optional(),
  datasheet_url: z.string().url().optional().or(z.literal('')),
  is_active: z.boolean().default(true),
});

type MaterialFormValues = z.infer<typeof materialSchema>;

interface MaterialFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  material?: MaterialType | null;
}

export function MaterialFormModal({ open, onOpenChange, material }: MaterialFormModalProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<MaterialFormValues>({
    resolver: zodResolver(materialSchema),
    defaultValues: {
      title: '',
      brand: '',
      category: 'paint',
      cost_index: 3,
      durability_years: 10,
      maintenance_level: 'medium',
      r_value: 0,
      recycled_content_pct: 0,
      warranty_years: 5,
      is_active: true,
    },
  });

  useEffect(() => {
    if (material) {
      form.reset({
        title: material.title,
        brand: material.brand,
        category: material.category,
        cost_index: material.cost_index,
        durability_years: material.durability_years,
        maintenance_level: material.maintenance_level,
        r_value: material.r_value || 0,
        uv_resistance: material.uv_resistance,
        moisture_resistance: material.moisture_resistance,
        salt_tolerance: material.salt_tolerance,
        voc_level: material.voc_level,
        recycled_content_pct: material.recycled_content_pct || 0,
        warranty_years: material.warranty_years || 0,
        datasheet_url: material.datasheet_url || '',
        is_active: material.is_active,
      });
    } else {
      form.reset({
        title: '',
        brand: '',
        category: 'paint',
        cost_index: 3,
        durability_years: 10,
        maintenance_level: 'medium',
        r_value: 0,
        recycled_content_pct: 0,
        warranty_years: 5,
        is_active: true,
      });
    }
  }, [material, form]);

  const saveMutation = useMutation({
    mutationFn: async (values: MaterialFormValues) => {
      const payload: any = {
        title: values.title,
        brand: values.brand,
        category: values.category,
        cost_index: values.cost_index,
        durability_years: values.durability_years,
        maintenance_level: values.maintenance_level,
        r_value: values.r_value || 0,
        uv_resistance: values.uv_resistance,
        moisture_resistance: values.moisture_resistance,
        salt_tolerance: values.salt_tolerance,
        voc_level: values.voc_level,
        recycled_content_pct: values.recycled_content_pct || 0,
        warranty_years: values.warranty_years || 0,
        datasheet_url: values.datasheet_url || null,
        is_active: values.is_active,
        suitable_substrates: [],
        finish_options: [],
        images: [],
        tags: [],
      };

      if (material) {
        const { error } = await supabase
          .from('materials')
          .update(payload)
          .eq('id', material.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('materials')
          .insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-materials'] });
      queryClient.invalidateQueries({ queryKey: ['materials'] });
      toast({ 
        title: material ? "Material updated" : "Material created",
        description: "Changes saved successfully"
      });
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error saving material", 
        description: error.message, 
        variant: "destructive" 
      });
    },
  });

  const onSubmit = (values: MaterialFormValues) => {
    saveMutation.mutate(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{material ? 'Edit Material' : 'Add New Material'}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="paint">Paint</SelectItem>
                        <SelectItem value="eifs">EIFS</SelectItem>
                        <SelectItem value="cladding">Cladding</SelectItem>
                        <SelectItem value="sealant">Sealant</SelectItem>
                        <SelectItem value="coating">Coating</SelectItem>
                        <SelectItem value="primer">Primer</SelectItem>
                        <SelectItem value="scaffolding">Scaffolding</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cost_index"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cost Index (1-5) *</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" max="5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="durability_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Durability (years) *</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maintenance_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maintenance Level *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="warranty_years"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Warranty (years)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="r_value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>R-Value</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recycled_content_pct"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recycled Content (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="datasheet_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Datasheet URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : material ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}