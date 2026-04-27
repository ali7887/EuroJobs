"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="admin-container">

      <Sidebar open={open} setOpen={setOpen} />

      <div className="admin-main">
        <Topbar onMenuClick={() => setOpen(true)} />
        <main className="admin-content">{children}</main>
      </div>

    </div>
  );
}
