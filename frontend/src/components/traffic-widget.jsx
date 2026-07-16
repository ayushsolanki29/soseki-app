"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { GlobeIcon, LinkIcon } from "lucide-react";

export function TrafficWidget({ className }) {
  const [traffic, setTraffic] = useState(null);

  useEffect(() => {
    const fetchTraffic = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";
        const res = await fetch(`${apiUrl}/super-admin/traffic`);
        if (res.ok) {
          const data = await res.json();
          setTraffic(data.stats);
        }
      } catch (err) {
        console.error("Failed to fetch traffic stats", err);
      }
    };
    fetchTraffic();
  }, []);

  if (!traffic) return null;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <Card className="shadow-none dark:ring-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <GlobeIcon className="h-4 w-4 text-muted-foreground" />
            Top Traffic Sources (UTM)
          </CardTitle>
          <CardDescription>Based on {traffic.totalVisits} total visits</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Visits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {traffic.sources.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">No data yet</TableCell>
                </TableRow>
              ) : traffic.sources.map((s, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{s.source}</TableCell>
                  <TableCell className="text-right">{s.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-none dark:ring-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-muted-foreground" />
            Top Referrers
          </CardTitle>
          <CardDescription>External websites linking to you</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referrer</TableHead>
                <TableHead className="text-right">Visits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {traffic.referrers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">No data yet</TableCell>
                </TableRow>
              ) : traffic.referrers.map((r, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium truncate max-w-[200px]">{r.referrer}</TableCell>
                  <TableCell className="text-right">{r.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
