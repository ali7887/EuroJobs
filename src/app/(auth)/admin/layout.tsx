import AdminLayout from "@/components/admin/AdminLayout";
import "@/styles/admin.css";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminLayout>{children}</AdminLayout>;
}
