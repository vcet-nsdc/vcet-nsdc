"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, FileSpreadsheet, FileText, Loader2, Users, Filter, RefreshCw, Lock, LogOut } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Registration {
  _id: string;
  squadName: string;
  domain: string;
  leader: { fullName: string; email: string; phone: string; college: string };
  members: { fullName: string; email: string }[];
  transactionId: string;
  paymentScreenshot: string;
  createdAt: string;
}

const DOMAINS = [
  { key: "all", label: "All Domains", color: "from-purple-500 to-blue-500" },
  { key: "ai", label: "Agentic AI", color: "from-violet-500 to-purple-500" },
  { key: "vibeathon", label: "Vibeathon", color: "from-blue-500 to-cyan-500" },
  { key: "uiux", label: "UI/UX Challenge", color: "from-pink-500 to-rose-500" },
];

function getAuthHeader(token: string) {
  return { Authorization: `Basic ${token}` };
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [activeDomain, setActiveDomain] = useState("all");
  const [error, setError] = useState("");

  // Check for existing session on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("admin_token");
    if (stored) {
      setAuthToken(stored);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");
    const token = btoa(`${username}:${password}`);
    try {
      const res = await fetch("/api/admin/registrations?domain=all", {
        headers: { Authorization: `Basic ${token}` },
      });
      if (res.status === 401) {
        setLoginError("Invalid username or password");
        return;
      }
      if (!res.ok) throw new Error("Connection error");
      sessionStorage.setItem("admin_token", token);
      setAuthToken(token);
      setIsAuthenticated(true);
    } catch {
      setLoginError("Failed to connect. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    setAuthToken("");
    setRegistrations([]);
  };

  const fetchRegistrations = useCallback(async (domain: string) => {
    if (!authToken) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/registrations?domain=${domain}`, {
        headers: getAuthHeader(authToken),
      });
      if (res.status === 401) { handleLogout(); return; }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to fetch");
      setRegistrations(json.data || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authToken]);

  useEffect(() => {
    if (isAuthenticated) fetchRegistrations(activeDomain);
  }, [activeDomain, isAuthenticated, fetchRegistrations]);

  const handleDomainChange = (domain: string) => {
    setActiveDomain(domain);
  };

  const handleExportExcel = async () => {
    setExporting(true);
    try {
      const res = await fetch(`/api/admin/export?domain=${activeDomain}`, {
        headers: getAuthHeader(authToken),
      });
      if (res.status === 401) { handleLogout(); return; }
      if (!res.ok) throw new Error("Export failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `registrations_${activeDomain}_${Date.now()}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Export failed");
    } finally {
      setExporting(false);
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF({ orientation: "landscape" });

    doc.setFontSize(18);
    doc.setTextColor(100, 60, 200);
    doc.text("Registration Data", 14, 20);
    doc.setFontSize(10);
    doc.setTextColor(120);
    const domainLabel = DOMAINS.find((d) => d.key === activeDomain)?.label || "All";
    doc.text(`Domain: ${domainLabel}  |  Total: ${registrations.length}  |  Exported: ${new Date().toLocaleString("en-IN")}`, 14, 28);

    const tableData = registrations.map((r, i) => [
      i + 1,
      r.squadName,
      r.domain,
      r.leader?.fullName || "",
      r.leader?.email || "",
      r.leader?.phone || "",
      r.leader?.college || "",
      r.members?.map((m) => m.fullName).join(", ") || "-",
      r.transactionId,
      new Date(r.createdAt).toLocaleDateString("en-IN"),
    ]);

    autoTable(doc, {
      startY: 34,
      head: [["#", "Squad", "Domain", "Leader", "Email", "Phone", "College", "Members", "Txn ID", "Date"]],
      body: tableData,
      styles: { fontSize: 7, cellPadding: 2 },
      headStyles: { fillColor: [100, 60, 200], textColor: 255, fontSize: 8 },
      alternateRowStyles: { fillColor: [245, 243, 255] },
    });

    doc.save(`registrations_${activeDomain}_${Date.now()}.pdf`);
  };

  // Count by domain
  const domainCounts = DOMAINS.map((d) => ({
    ...d,
    count: d.key === "all" ? registrations.length : registrations.filter((r) => r.domain === d.key).length,
  }));

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl p-8 sm:p-10">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 bg-purple-600/20 rounded-full flex items-center justify-center">
                <Lock className="h-8 w-8 text-purple-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white text-center mb-2">
              Admin <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Login</span>
            </h1>
            <p className="text-white/50 text-center text-sm mb-8">Enter credentials to access the dashboard</p>

            {loginError && (
              <div className="mb-6 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                {loginError}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-white/80 block mb-1">Username</label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-white/80 block mb-1">Password</label>
                <input
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-lg p-3 text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loginLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Lock className="w-5 h-5" />}
              {loginLoading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black/20 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10 flex items-start justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              Admin <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Dashboard</span>
            </h1>
            <p className="text-white/60 text-lg">View and manage event registrations</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-red-500/20 hover:text-red-300 border border-white/10 transition-all text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {domainCounts.map((d) => (
            <button
              key={d.key}
              onClick={() => handleDomainChange(d.key)}
              className={`relative p-5 rounded-xl border transition-all duration-200 text-left ${
                activeDomain === d.key
                  ? "bg-white/10 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-black/30 border-white/10 hover:bg-white/5 hover:border-white/20"
              }`}
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r ${d.color} mb-3`}>
                {d.key === "all" ? <Users className="w-5 h-5 text-white" /> : <Filter className="w-5 h-5 text-white" />}
              </div>
              <p className="text-2xl font-bold text-white">{d.key === "all" ? registrations.length : d.count}</p>
              <p className="text-sm text-white/60">{d.label}</p>
            </button>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {DOMAINS.map((d) => (
              <button
                key={d.key}
                onClick={() => handleDomainChange(d.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeDomain === d.key
                    ? "bg-purple-600 text-white shadow-lg"
                    : "bg-white/5 text-white/70 hover:bg-white/10 border border-white/10"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => fetchRegistrations(activeDomain)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 transition-all text-sm"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={handleExportExcel}
              disabled={exporting || registrations.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600/80 hover:bg-green-600 text-white transition-all text-sm font-medium disabled:opacity-50"
            >
              {exporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
              Export Excel
            </button>
            <button
              onClick={handleExportPDF}
              disabled={registrations.length === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600/80 hover:bg-red-600 text-white transition-all text-sm font-medium disabled:opacity-50"
            >
              <FileText className="w-4 h-4" /> Export PDF
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-200">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
              <span className="ml-3 text-white/60">Loading registrations...</span>
            </div>
          ) : registrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-white/50">
              <Users className="w-12 h-12 mb-4 opacity-30" />
              <p className="text-lg">No registrations found</p>
              <p className="text-sm">Try changing the domain filter or check back later.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5">
                    <th className="px-4 py-3 text-white/80 font-semibold">#</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Squad</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Domain</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Leader</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Email</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Phone</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">College</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Members</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Txn ID</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Screenshot</th>
                    <th className="px-4 py-3 text-white/80 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {registrations.map((r, i) => (
                    <tr key={r._id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-white/50">{i + 1}</td>
                      <td className="px-4 py-3 text-white font-medium">{r.squadName}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded-md text-xs font-semibold ${
                          r.domain === "ai" ? "bg-violet-500/20 text-violet-300" :
                          r.domain === "vibeathon" ? "bg-blue-500/20 text-blue-300" :
                          r.domain === "uiux" ? "bg-pink-500/20 text-pink-300" :
                          "bg-gray-500/20 text-gray-300"
                        }`}>
                          {r.domain === "ai" ? "Agentic AI" : r.domain === "vibeathon" ? "Vibeathon" : r.domain === "uiux" ? "UI/UX" : r.domain}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white/90">{r.leader?.fullName}</td>
                      <td className="px-4 py-3 text-white/70 text-xs">{r.leader?.email}</td>
                      <td className="px-4 py-3 text-white/70 text-xs">{r.leader?.phone}</td>
                      <td className="px-4 py-3 text-white/70 text-xs">{r.leader?.college}</td>
                      <td className="px-4 py-3 text-white/70 text-xs">
                        {r.members?.length ? r.members.map((m) => m.fullName).join(", ") : "-"}
                      </td>
                      <td className="px-4 py-3 text-white/70 font-mono text-xs">{r.transactionId}</td>
                      <td className="px-4 py-3">
                        {r.paymentScreenshot ? (
                          <a href={r.paymentScreenshot} target="_blank" rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 underline text-xs flex items-center gap-1">
                            <Download className="w-3 h-3" /> View
                          </a>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-3 text-white/50 text-xs whitespace-nowrap">
                        {new Date(r.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Footer */}
          {!loading && registrations.length > 0 && (
            <div className="px-4 py-3 border-t border-white/10 bg-white/5 flex justify-between items-center">
              <p className="text-sm text-white/50">
                Showing <span className="text-white font-medium">{registrations.length}</span> registration{registrations.length !== 1 ? "s" : ""}
              </p>
              <p className="text-xs text-white/30">
                Last refreshed: {new Date().toLocaleTimeString("en-IN")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
