import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useDropzone } from 'react-dropzone';
import { Upload, Search, Trash2, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export default function MediaLibrary() {
  const [search, setSearch] = useState('');
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: mediaFiles, isLoading } = useQuery({
    queryKey: ['media', search],
    queryFn: async () => {
      const url = new URL(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/media-crud`);
      if (search) url.searchParams.set('search', search);
      url.searchParams.set('limit', '50');

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(url.toString(), {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch media');
      const result = await response.json();
      return result.data || [];
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      // Get presigned URL
      const { data: { session } } = await supabase.auth.getSession();
      
      const presignResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/media-presign`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            filename: file.name,
            mimeType: file.type,
          }),
        }
      );

      if (!presignResponse.ok) throw new Error('Failed to get upload URL');
      const { uploadUrl, path, publicUrl, filename, originalFilename } = await presignResponse.json();

      // Upload to storage
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!uploadResponse.ok) throw new Error('Failed to upload file');

      // Create media record
      const createResponse = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/media-crud`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({
            filename,
            original_filename: originalFilename,
            storage_path: path,
            url: publicUrl,
            mime_type: file.type,
            file_size: file.size,
          }),
        }
      );

      if (!createResponse.ok) throw new Error('Failed to create media record');
      return createResponse.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('File uploaded successfully');
    },
    onError: (error) => {
      toast.error(`Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/media-crud/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error('Failed to update media');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('Media updated successfully');
      setEditDialogOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/media-crud/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        }
      );

      if (!response.ok) throw new Error('Failed to delete media');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['media'] });
      toast.success('Media deleted successfully');
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploading(true);
    Promise.all(acceptedFiles.map(file => uploadMutation.mutateAsync(file)))
      .finally(() => setUploading(false));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'],
    },
  });

  const handleEdit = (media: any) => {
    setSelectedMedia(media);
    setEditDialogOpen(true);
  };

  const handleUpdateMedia = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    updateMutation.mutate({
      id: selectedMedia.id,
      data: {
        alt_text: formData.get('alt_text'),
        caption: formData.get('caption'),
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your images and files</p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search media..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div
        {...getRootProps()}
        className="border-2 border-dashed rounded-lg p-12 text-center cursor-pointer hover:bg-accent/50 transition-colors"
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop files here...</p>
        ) : (
          <>
            <p className="text-lg font-medium">Drag & drop files here, or click to select</p>
            <p className="text-sm text-muted-foreground mt-2">Supports: PNG, JPG, GIF, WebP, SVG</p>
          </>
        )}
      </div>

      {uploading && (
        <div className="text-center text-sm text-muted-foreground">
          Uploading...
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mediaFiles && mediaFiles.length > 0 ? (
            mediaFiles.map((media: any) => (
              <div key={media.id} className="group relative aspect-square rounded-lg overflow-hidden border bg-card">
                <img
                  src={media.url}
                  alt={media.alt_text || media.filename}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleEdit(media)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this file?')) {
                        deleteMutation.mutate(media.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-xs text-white truncate">{media.filename}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-muted-foreground py-12">
              No media files yet. Upload your first file!
            </div>
          )}
        </div>
      )}

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>Edit Media</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleUpdateMedia} className="space-y-4">
            <div>
              <Label htmlFor="alt_text">Alt Text</Label>
              <Input
                id="alt_text"
                name="alt_text"
                defaultValue={selectedMedia?.alt_text || ''}
                placeholder="Describe this image for accessibility"
              />
            </div>
            <div>
              <Label htmlFor="caption">Caption</Label>
              <Textarea
                id="caption"
                name="caption"
                defaultValue={selectedMedia?.caption || ''}
                placeholder="Add a caption"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
