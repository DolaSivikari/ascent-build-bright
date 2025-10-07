import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function AdminTest() {
  const [authState, setAuthState] = useState<any>(null);
  const [roles, setRoles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkStatus();
  }, []);

  const checkStatus = async () => {
    setLoading(true);
    try {
      // Check auth session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError) {
        setAuthState({ error: sessionError.message, session: null });
        setLoading(false);
        return;
      }

      setAuthState({ session, error: null });

      // Check roles if authenticated
      if (session?.user) {
        const { data: userRoles, error: rolesError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);

        if (rolesError) {
          console.error('Roles error:', rolesError);
        } else {
          setRoles(userRoles || []);
        }
      }
    } catch (error) {
      console.error('Status check error:', error);
      setAuthState({ error: String(error), session: null });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const isAuthenticated = !!authState?.session;
  const hasRoles = roles.length > 0;
  const hasAdminAccess = roles.some(r => ['admin', 'editor'].includes(r.role));

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Admin Panel Status Check</CardTitle>
            <CardDescription>Diagnose authentication and access issues</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Authentication Status */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  {isAuthenticated ? `Logged in as ${authState.session.user.email}` : 'Not authenticated'}
                </p>
              </div>
              {isAuthenticated ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
            </div>

            {/* Roles Status */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">User Roles</h3>
                <div className="flex gap-2 mt-2">
                  {hasRoles ? (
                    roles.map((r, idx) => (
                      <Badge key={idx} variant="secondary">{r.role}</Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No roles assigned</p>
                  )}
                </div>
              </div>
              {hasRoles ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              )}
            </div>

            {/* Admin Access Status */}
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h3 className="font-medium">Admin Access</h3>
                <p className="text-sm text-muted-foreground">
                  {hasAdminAccess ? 'You have admin or editor access' : 'No admin access granted'}
                </p>
              </div>
              {hasAdminAccess ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
            </div>

            {/* Error Details */}
            {authState?.error && (
              <div className="p-4 border border-destructive rounded-lg bg-destructive/10">
                <h3 className="font-medium text-destructive mb-2">Error Details</h3>
                <p className="text-sm">{authState.error}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              {!isAuthenticated && (
                <Button asChild>
                  <Link to="/admin/login">Go to Login</Link>
                </Button>
              )}
              {isAuthenticated && hasAdminAccess && (
                <Button asChild>
                  <Link to="/admin">Go to Dashboard</Link>
                </Button>
              )}
              <Button variant="outline" onClick={checkStatus}>
                Refresh Status
              </Button>
            </div>

            {/* Helpful Information */}
            {isAuthenticated && !hasRoles && (
              <div className="p-4 border border-yellow-600/20 rounded-lg bg-yellow-600/5">
                <h3 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">Action Required</h3>
                <p className="text-sm">
                  Your account exists but has no roles assigned. Contact an administrator to grant you access.
                  Provide them with this email: <strong>{authState.session.user.email}</strong>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Debug Info */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Information</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs overflow-auto p-4 bg-muted rounded-lg">
              {JSON.stringify({
                isAuthenticated,
                userId: authState?.session?.user?.id,
                email: authState?.session?.user?.email,
                roles: roles.map(r => r.role),
                hasAdminAccess,
              }, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
