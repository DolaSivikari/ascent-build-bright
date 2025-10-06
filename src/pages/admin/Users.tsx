import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Shield, ShieldOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AdminUser {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  updated_at: string;
  roles: string[];
}

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleAction, setRoleAction] = useState<{ userId: string; role: string; action: 'add' | 'remove' } | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      // Use security definer function instead of direct view access
      // This enforces admin-only access at the database level
      const { data, error } = await supabase
        .rpc('get_admin_users');
      
      if (error) throw error;
      return data as AdminUser[];
    },
  });

  const roleToggleMutation = useMutation({
    mutationFn: async ({ userId, role, action }: { userId: string; role: string; action: 'add' | 'remove' }) => {
      // Validate role is either 'admin' or 'staff'
      if (role !== 'admin' && role !== 'staff') {
        throw new Error('Invalid role');
      }
      
      if (action === 'add') {
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: role as 'admin' | 'staff' });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', role);
        if (error) throw error;
      }
    },
    onSuccess: (_, { action, role }) => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ 
        title: `Role ${action === 'add' ? 'granted' : 'removed'}`,
        description: `${role} role has been ${action === 'add' ? 'granted' : 'removed'} successfully`
      });
      setRoleAction(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Error updating role", 
        description: error.message, 
        variant: "destructive" 
      });
      setRoleAction(null);
    },
  });

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRoleToggle = (userId: string, role: string, hasRole: boolean) => {
    // Prevent self-demotion from admin
    const currentUser = users.find(u => u.id === userId);
    if (hasRole && role === 'admin' && currentUser?.roles.includes('admin')) {
      toast({
        title: "Cannot remove own admin role",
        description: "You cannot remove your own admin privileges",
        variant: "destructive"
      });
      return;
    }
    
    setRoleAction({ userId, role, action: hasRole ? 'remove' : 'add' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Total Users</div>
            <div className="text-3xl font-bold">{users.length}</div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Admins</div>
            <div className="text-3xl font-bold text-primary">
              {users.filter(u => u.roles?.includes('admin')).length}
            </div>
          </div>
          <div className="bg-card border rounded-lg p-4">
            <div className="text-sm text-muted-foreground">Staff</div>
            <div className="text-3xl font-bold text-blue-600">
              {users.filter(u => u.roles?.includes('staff')).length}
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12">Loading users...</div>
      ) : (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>{user.full_name || '—'}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map(role => (
                          <Badge key={role} variant={role === 'admin' ? 'default' : 'secondary'}>
                            {role}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No roles</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant={user.roles?.includes('admin') ? 'destructive' : 'default'}
                        onClick={() => handleRoleToggle(user.id, 'admin', user.roles?.includes('admin'))}
                      >
                        {user.roles?.includes('admin') ? (
                          <>
                            <ShieldOff className="h-4 w-4 mr-1" />
                            Remove Admin
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-1" />
                            Make Admin
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant={user.roles?.includes('staff') ? 'outline' : 'secondary'}
                        onClick={() => handleRoleToggle(user.id, 'staff', user.roles?.includes('staff'))}
                      >
                        {user.roles?.includes('staff') ? 'Remove Staff' : 'Make Staff'}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <AlertDialog open={!!roleAction} onOpenChange={() => setRoleAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Role Change</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {roleAction?.action === 'add' ? 'grant' : 'remove'} the{' '}
              <strong>{roleAction?.role}</strong> role {roleAction?.action === 'add' ? 'to' : 'from'} this user?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => roleAction && roleToggleMutation.mutate(roleAction)}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}