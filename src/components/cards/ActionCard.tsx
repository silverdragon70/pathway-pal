import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
  onClick?: () => void;
  trailing?: ReactNode;
  variant?: "default" | "primary";
}

export const ActionCard = ({ icon, title, subtitle, onClick, trailing, variant = "default" }: ActionCardProps) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 p-4 rounded-2xl card-shadow transition-all duration-150 ease-in-out active:scale-[0.98] active:neumorphic-active text-left
      ${variant === "primary" ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"}`}
  >
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg shrink-0
      ${variant === "primary" ? "bg-primary-foreground/20" : "bg-secondary"}`}>
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm">{title}</p>
      {subtitle && <p className={`text-xs mt-0.5 ${variant === "primary" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{subtitle}</p>}
    </div>
    {trailing || <ChevronRight className="w-4 h-4 shrink-0 opacity-40" />}
  </button>
);
