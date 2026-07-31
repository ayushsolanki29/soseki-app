"use client";

import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ActivitySquareIcon, 
  BrainCircuitIcon, 
  CheckCircle2Icon, 
  XCircleIcon, 
  BarChart3Icon,
  Building2Icon,
  CoinsIcon
} from "lucide-react";
import { format } from "date-fns";
import API from "@/lib/api";

export default function AiHealthDashboard() {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        // The base URL for super admin is likely /super-admin/ai-stats or similar depending on routing, assuming standard API setup
        const res = await API.get("/super-admin/ai-stats");
        if (res.data.success) {
          setStats(res.data.stats);
        } else {
          setError(res.data.message || "Failed to load stats");
        }
      } catch (err) {
        setError(err.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (isLoading) {
    return <div className="p-8 flex justify-center items-center h-[50vh]">Loading AI metrics...</div>;
  }

  if (error) {
    return <div className="p-8 text-destructive">Error: {error}</div>;
  }

  if (!stats) return null;

  return (
    <div className="p-8 w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-2">
          <BrainCircuitIcon className="size-8 text-primary" />
          AI Health & Metrics
        </h1>
        <p className="text-muted-foreground">Monitor AI generation usage, tokens, and health across all organizations.</p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Generations</CardTitle>
            <ActivitySquareIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overview.totalGenerations}</div>
            <p className="text-xs text-muted-foreground mt-1">Total requests made to AI</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle2Icon className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overview.successRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">
              {stats.overview.successfulGenerations} successful, {stats.overview.failedGenerations} failed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tokens Used</CardTitle>
            <CoinsIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.overview.tokens.total.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all organizations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Split</CardTitle>
            <BarChart3Icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium flex justify-between mb-1">
              <span>Prompt</span>
              <span>{stats.overview.tokens.prompt.toLocaleString()}</span>
            </div>
            <div className="text-sm font-medium flex justify-between">
              <span>Completion</span>
              <span>{stats.overview.tokens.completion.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        
        {/* Top Organizations by Usage */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2Icon className="h-5 w-5" />
              Top Organizations
            </CardTitle>
            <CardDescription>Organizations with highest AI token usage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.topOrganizations.length === 0 ? (
                <div className="text-sm text-muted-foreground">No usage data yet.</div>
              ) : (
                stats.topOrganizations.map((org, index) => (
                  <div key={org.id} className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium truncate max-w-[150px]">{org.name}</span>
                      <span className="text-xs text-muted-foreground">{org.generations} generations</span>
                    </div>
                    <Badge variant="secondary" className="font-mono">
                      {org.totalTokens.toLocaleString()} t
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent AI Logs */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Generation Logs</CardTitle>
            <CardDescription>The last 50 AI requests across the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentLogs.length === 0 ? (
              <div className="text-sm text-muted-foreground text-center py-8">No AI generations found.</div>
            ) : (
              <div className="relative w-full overflow-auto max-h-[500px]">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b bg-muted/50 sticky top-0">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Time</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Organization</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Tokens</th>
                      <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Model</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {stats.recentLogs.map((log) => (
                      <tr key={log.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <td className="p-4 align-middle whitespace-nowrap text-xs">
                          {format(new Date(log.createdAt), "MMM d, HH:mm")}
                        </td>
                        <td className="p-4 align-middle">
                          {log.success ? (
                            <Badge variant="outline" className="text-emerald-500 border-emerald-500/20 bg-emerald-500/10">Success</Badge>
                          ) : (
                            <Badge variant="outline" className="text-destructive border-destructive/20 bg-destructive/10">Failed</Badge>
                          )}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex flex-col">
                            <span className="font-medium">{log.organization.name}</span>
                            <span className="text-xs text-muted-foreground">{log.user.name}</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle font-mono text-xs">
                          {log.totalTokens}
                        </td>
                        <td className="p-4 align-middle text-xs text-muted-foreground max-w-[150px] truncate" title={log.model}>
                          {log.model}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
