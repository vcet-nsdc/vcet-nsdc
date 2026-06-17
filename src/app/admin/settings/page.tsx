"use client";

import { useEffect, useState } from "react";
import { Loader2, Save } from "lucide-react";

export default function SettingsPage() {
  const [json, setJson] = useState("{}");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/admin/settings/business");
        if (res.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        if (res.status === 403) {
          setError("You do not have permission to manage business settings.");
          return;
        }
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error?.message || "Failed to load settings");
        setJson(JSON.stringify(data.data ?? {}, null, 2));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load settings");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      setError("Invalid JSON.");
      setSaving(false);
      return;
    }
    try {
      const res = await fetch("/api/admin/settings/business", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error?.message || "Failed to save");
      setJson(JSON.stringify(data.data ?? {}, null, 2));
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-full w-full pt-36 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-2">Business Settings</h1>
        <p className="text-white/50 mb-6 text-sm">
          Edit operational settings (e.g. <code className="text-purple-300">upiId</code>,{" "}
          <code className="text-purple-300">registrationOpen</code>, contact info) as JSON.
        </p>

        {error && <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200">{error}</div>}
        {message && <div className="mb-4 p-4 bg-green-500/10 border border-green-500/50 rounded-xl text-green-200">{message}</div>}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        ) : (
          <>
            <textarea
              value={json}
              onChange={(e) => setJson(e.target.value)}
              spellCheck={false}
              className="w-full h-80 bg-black/40 border border-white/10 rounded-xl p-4 text-white font-mono text-sm outline-none focus:ring-2 focus:ring-purple-500/50"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Settings
            </button>
          </>
        )}
      </div>
    </main>
  );
}
