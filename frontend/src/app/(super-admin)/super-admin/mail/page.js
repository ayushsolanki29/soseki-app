"use client";

import { useEffect, useState } from "react";
import API from "@/lib/api";
import { 
  MailIcon, 
  CheckCircle2Icon, 
  XCircleIcon, 
  ClockIcon, 
  RefreshCwIcon
} from "lucide-react";

export default function MailMonitoringPage() {
  const [stats, setStats] = useState({ pending: 0, processing: 0, sent: 0, failed: 0, total: 0 });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMailData = async () => {
    try {
      setLoading(true);
      const [statsRes, logsRes] = await Promise.all([
        API.get("/super-admin/mail/stats"),
        API.get("/super-admin/mail/logs")
      ]);
      setStats(statsRes.data.stats);
      setLogs(logsRes.data.logs);
    } catch (error) {
      console.error("Failed to fetch mail data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMailData();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Sent": return <CheckCircle2Icon className="h-4 w-4 text-green-500" />;
      case "Failed": return <XCircleIcon className="h-4 w-4 text-red-500" />;
      case "Processing": return <RefreshCwIcon className="h-4 w-4 text-blue-500 animate-spin" />;
      default: return <ClockIcon className="h-4 w-4 text-yellow-500" />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Mail Monitoring</h1>
          <p className="text-muted-foreground">Monitor the background email queue and logs.</p>
        </div>
        <button 
          onClick={fetchMailData}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
        >
          <RefreshCwIcon className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Sent Emails" value={stats.sent} icon={<CheckCircle2Icon className="h-5 w-5 text-green-500" />} />
        <StatCard title="Pending / Queued" value={stats.pending} icon={<ClockIcon className="h-5 w-5 text-yellow-500" />} />
        <StatCard title="Processing" value={stats.processing} icon={<RefreshCwIcon className="h-5 w-5 text-blue-500" />} />
        <StatCard title="Failed" value={stats.failed} icon={<XCircleIcon className="h-5 w-5 text-red-500" />} />
      </div>

      <div className="border rounded-lg bg-card">
        <div className="p-4 border-b border-border font-medium flex items-center gap-2">
          <MailIcon className="h-5 w-5 text-muted-foreground" />
          Recent Mail Logs
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Recipient</th>
                <th className="px-4 py-3">Subject</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Attempts</th>
                <th className="px-4 py-3">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">Loading...</td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-8 text-center text-muted-foreground">No mail logs found.</td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(log.status)}
                        <span className="font-medium">{log.status}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 truncate max-w-[200px]">{log.to}</td>
                    <td className="px-4 py-3 truncate max-w-[250px]" title={log.subject}>{log.subject}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-muted rounded-full text-xs font-medium">
                        {log.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{log.attempts}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                      {new Date(log.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-2">
        {icon}
        {title}
      </div>
      <div className="text-3xl font-bold tracking-tight">
        {value}
      </div>
    </div>
  );
}
