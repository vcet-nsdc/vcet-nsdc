"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface AuditItem {
  _id: string;
  action: string;
  actorRole: string;
  resource: { type: string; id?: string };
  ip?: string;
  createdAt: string;
}

export default function AuditPage() {
  const [items, setItems] = useState<AuditItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/audit");
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error?.message || "Failed to load audit log");
        setItems(json.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load audit log");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-full w-full pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Audit Log</h1>
        {error && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200">{error}</div>}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center text-white/50">No audit entries yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-white/80 font-semibold">Action</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Actor</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Resource</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">IP</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-white/90 font-mono text-xs">{it.action}</td>
                      <td className="px-4 py-3 text-white/60">{it.actorRole}</td>
                      <td className="px-4 py-3 text-white/60">{it.resource?.type}{it.resource?.id ? `:${it.resource.id.slice(-6)}` : ""}</td>
                      <td className="px-4 py-3 text-white/40 text-xs">{it.ip || "-"}</td>
                      <td className="px-4 py-3 text-white/40 text-xs whitespace-nowrap">{new Date(it.createdAt).toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
