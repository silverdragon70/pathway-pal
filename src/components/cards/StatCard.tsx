import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  value: string | number;
  label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => (
  <div className="flex-1 flex flex-col items-center gap-1.5 p-4 rounded-2xl bg-card card-shadow">
    <div className="text-primary">{icon}</div>
    <span className="text-lg font-bold font-serif text-card-foreground">{value}</span>
    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{label}</span>
  </div>
);
