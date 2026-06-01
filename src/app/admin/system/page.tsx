"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Health {
  db: { connected: boolean };
  counts: { registrations: number; events: number; users: number; content: number };
  uptimeSeconds: number;
  node: string;
  timestamp: string;
}

export default function SystemPage() {
  const [health, setHealth] = useState<Health | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/system/health");
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to load health");
        setHealth(json.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load health");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const Card = ({ label, value }: { label: string; value: string | number }) => (
    <div className="bg-black/30 border border-white/10 rounded-xl p-5">
      <p className="text-sm text-white/50">{label}</p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  );

  return (
    <main className="min-h-full w-full pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">System Health</h1>
        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200">{error}</div>}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        ) : health ? (
          <div className="space-y-6">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg border ${health.db.connected ? "bg-green-500/10 border-green-500/40 text-green-300" : "bg-red-500/10 border-red-500/40 text-red-300"}`}>
              <span className={`w-2 h-2 rounded-full ${health.db.connected ? "bg-green-400" : "bg-red-400"}`} />
              Database {health.db.connected ? "connected" : "disconnected"}
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card label="Registrations" value={health.counts.registrations} />
              <Card label="Events" value={health.counts.events} />
              <Card label="Users" value={health.counts.users} />
              <Card label="CMS Content" value={health.counts.content} />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              <Card label="Uptime (s)" value={health.uptimeSeconds} />
              <Card label="Node" value={health.node} />
              <Card label="Checked" value={new Date(health.timestamp).toLocaleTimeString("en-IN")} />
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
