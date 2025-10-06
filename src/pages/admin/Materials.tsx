import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MaterialFormModal } from "@/components/admin/MaterialFormModal";
import { MaterialCard } from "@/components/admin/MaterialCard";
import type { MaterialType } from "@/types/materials";

export default function AdminMaterials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<MaterialType | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: materials = [], isLoading } = useQuery({
    queryKey: ['admin-materials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('materials')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as MaterialType[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('materials')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-materials'] });
      toast({ title: "Material deleted successfully" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting material", description: error.message, variant: "destructive" });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase
        .from('materials')
        .update({ is_active })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-materials'] });
      toast({ title: "Material status updated" });
    },
  });

  const filteredMaterials = materials.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (material: MaterialType) => {
    setEditingMaterial(material);
    setIsFormOpen(true);
  };

  const handleCreate = () => {
    setEditingMaterial(null);
    setIsFormOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Materials Management</h1>
          <p className="text-muted-foreground">Manage construction materials database</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" />
          Add Material
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Total Materials</div>
            <div className="text-3xl font-bold">{materials.length}</div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Active</div>
            <div className="text-3xl font-bold text-green-600">
              {materials.filter(m => m.is_active).length}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Inactive</div>
            <div className="text-3xl font-bold text-muted-foreground">
              {materials.filter(m => !m.is_active).length}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Categories</div>
            <div className="text-3xl font-bold">
              {new Set(materials.map(m => m.category)).size}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading materials...</div>
      ) : filteredMaterials.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          {searchQuery ? "No materials found matching your search" : "No materials yet. Add your first material!"}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredMaterials.map((material) => (
            <MaterialCard
              key={material.id}
              material={material}
              onEdit={() => handleEdit(material)}
              onDelete={() => deleteMutation.mutate(material.id)}
              onToggleActive={() => toggleActiveMutation.mutate({ 
                id: material.id, 
                is_active: !material.is_active 
              })}
            />
          ))}
        </div>
      )}

      <MaterialFormModal
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        material={editingMaterial}
      />
    </div>
  );
}