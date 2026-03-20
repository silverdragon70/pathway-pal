import { ChevronRight } from "lucide-react";

interface SubjectCardProps {
  icon: string;
  name: string;
  questionCount: number;
  progress: number;
  onClick?: () => void;
}

export const SubjectCard = ({ icon, name, questionCount, progress, onClick }: SubjectCardProps) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card card-shadow transition-all duration-150 ease-in-out active:scale-[0.98] active:neumorphic-active text-left"
  >
    <span className="text-2xl w-10 h-10 flex items-center justify-center">{icon}</span>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm text-card-foreground">{name}</p>
      <p className="text-xs text-muted-foreground mt-0.5">{questionCount} questions</p>
      <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
    <div className="flex flex-col items-end gap-1 shrink-0">
      <span className="text-xs font-semibold text-primary">{progress}%</span>
      <ChevronRight className="w-4 h-4 opacity-30" />
    </div>
  </button>
);
