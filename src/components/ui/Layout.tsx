import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-ivory text-stone-800 font-sans selection:bg-gold-200">
      <main className="relative w-full overflow-hidden">{children}</main>
    </div>
  );
};

export default Layout;
