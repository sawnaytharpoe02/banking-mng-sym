import ClientLayout from "../_components/ClientLayout";
import Topbar from "../_components/Topbar";
import Sidebar from "../_components/Sidebar";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="grid w-full min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <Sidebar />
        </div>
        <div>
          <Topbar />
          <div className="h-[92vh] md:h-[90vh] p-4 md:p-6 overflow-y-auto">
            <ClientLayout>{children}</ClientLayout>
          </div>
        </div>
      </div>
    </div>
  );
}
