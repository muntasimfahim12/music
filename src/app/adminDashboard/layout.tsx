import { AdminSidebar } from "@/src/components/layout/adminSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSidebar>
      <div className="p-4 md:p-10 flex-1 overflow-auto">
        {children}
      </div>
    </AdminSidebar>
  );
}