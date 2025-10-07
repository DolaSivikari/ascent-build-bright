import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Briefcase, Wrench, HardDrive, TrendingUp, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function AdminDashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_dashboard_stats');
      if (error) throw error;
      return data as {
        active_materials: number;
        total_packages: number;
        packages_last_7_days: number;
        contacts_last_30_days: number;
        estimates_last_30_days: number;
        active_subscribers: number;
      };
    },
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const { data } = await supabase
        .from('audit_logs')
        .select('*, user:profiles!audit_logs_user_id_fkey(full_name, email)')
        .order('created_at', { ascending: false })
        .limit(10);
      return data || [];
    },
  });

  const kpis = [
    {
      title: 'Total Articles',
      value: '-',
      description: 'Published articles',
      icon: FileText,
      color: 'text-blue-600',
      href: '/admin/articles',
    },
    {
      title: 'Total Projects',
      value: '-',
      description: 'Project portfolio',
      icon: Briefcase,
      color: 'text-green-600',
      href: '/admin/projects',
    },
    {
      title: 'Active Services',
      value: '-',
      description: 'Service offerings',
      icon: Wrench,
      color: 'text-purple-600',
      href: '/admin/services',
    },
    {
      title: 'Media Storage',
      value: '-',
      description: 'Files uploaded',
      icon: HardDrive,
      color: 'text-orange-600',
      href: '/admin/media',
    },
    {
      title: 'Contacts',
      value: stats?.contacts_last_30_days || 0,
      description: 'Last 30 days',
      icon: Users,
      color: 'text-cyan-600',
    },
    {
      title: 'Estimates',
      value: stats?.estimates_last_30_days || 0,
      description: 'Last 30 days',
      icon: TrendingUp,
      color: 'text-pink-600',
    },
  ];

  const quickActions = [
    { label: 'New Article', href: '/admin/articles/new', variant: 'default' as const },
    { label: 'New Project', href: '/admin/projects/new', variant: 'outline' as const },
    { label: 'Upload Media', href: '/admin/media', variant: 'outline' as const },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to your admin dashboard</p>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <Button key={action.href} variant={action.variant} asChild>
                <Link to={action.href}>{action.label}</Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          const content = (
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <Icon className={`h-4 w-4 ${kpi.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">{kpi.description}</p>
              </CardContent>
            </Card>
          );

          return kpi.href ? (
            <Link key={kpi.title} to={kpi.href}>
              {content}
            </Link>
          ) : (
            <div key={kpi.title}>{content}</div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest changes and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity && recentActivity.length > 0 ? (
              recentActivity.map((activity: any) => (
                <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {activity.action} on {activity.resource_type}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      by {activity.user?.full_name || activity.user?.email || 'Unknown'} • 
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No recent activity</p>
            )}
          </div>
          <div className="mt-4">
            <Button variant="outline" asChild className="w-full">
              <Link to="/admin/audit">View All Activity</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
