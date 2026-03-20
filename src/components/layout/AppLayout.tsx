import { ReactNode } from "react";
import { BottomNav } from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 safe-top safe-bottom overflow-y-auto">
        {children}
      </main>
      <BottomNav />
    </div>
  );
};
