interface AuthDebugPanelProps {
  title?: string;
  debug: {
    hasUser: boolean;
    userId?: string | null;
    email?: string | null;
    adminRowFound: boolean;
    adminRole?: string | null;
    adminLookupError?: string | null;
  };
}

export function AuthDebugPanel({ title = "Auth debug", debug }: AuthDebugPanelProps) {
  return (
    <section className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 p-5 text-sm text-sky-950">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-900/70">{title}</p>
      <div className="mt-3 space-y-2">
        <div><strong>hasUser:</strong> {String(debug.hasUser)}</div>
        <div><strong>userId:</strong> {debug.userId || "-"}</div>
        <div><strong>email:</strong> {debug.email || "-"}</div>
        <div><strong>adminRowFound:</strong> {String(debug.adminRowFound)}</div>
        <div><strong>adminRole:</strong> {debug.adminRole || "-"}</div>
        <div><strong>adminLookupError:</strong> {debug.adminLookupError || "-"}</div>
      </div>
    </section>
  );
}
