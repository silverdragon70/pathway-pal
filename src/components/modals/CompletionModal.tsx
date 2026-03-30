import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { getMedalForCount } from "@/services/completionService";
import { X, ChevronRight, RotateCcw, Share2, Home } from "lucide-react";

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterTitle: string;
  totalQuestions: number;
  correctCount: number;
  timeSpent: number;
  studyCount: number;
  medalLevel: string;
  onNextChapter?: () => void;
  onRetake?: () => void;
  onShare?: () => void;
  onHome?: () => void;
}

export const CompletionModal = ({
  isOpen,
  onClose,
  chapterTitle,
  totalQuestions,
  correctCount,
  timeSpent,
  studyCount,
  medalLevel,
  onNextChapter,
  onRetake,
  onShare,
  onHome,
}: CompletionModalProps) => {
  const confettiFired = useRef(false);
  const medal = getMedalForCount(studyCount);
  const accuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m > 0 ? `${m}m ${s}s` : `${s}s`;
  };

  useEffect(() => {
    if (isOpen && !confettiFired.current) {
      confettiFired.current = true;
      const duration = 2000;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors: ["#FFD700", "#4ECDC4", "#9B59B6", "#E74C3C", "#3498DB"],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors: ["#FFD700", "#4ECDC4", "#9B59B6", "#E74C3C", "#3498DB"],
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
    if (!isOpen) confettiFired.current = false;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-5">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-sm bg-card rounded-3xl overflow-hidden card-shadow z-10">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-secondary flex items-center justify-center active:scale-[0.95] transition-transform z-10"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Header */}
        <div className="pt-8 pb-4 px-6 text-center">
          <div className="text-5xl mb-3">{medal.icon}</div>
          <h2 className="text-xl font-bold text-card-foreground mb-1">Chapter Complete!</h2>
          <p className="text-sm text-muted-foreground line-clamp-1">{chapterTitle}</p>
        </div>

        {/* Medal info */}
        <div className="mx-6 mb-4 p-3 rounded-2xl bg-secondary/50 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {medal.level} Medal · Attempt #{studyCount}
          </p>
          <p className="text-sm font-medium" style={{ color: medal.color }}>
            {medal.message}
          </p>
        </div>

        {/* Stats */}
        <div className="mx-6 mb-4 flex gap-3">
          <div className="flex-1 p-3 rounded-2xl bg-secondary/50 text-center">
            <p className="text-lg font-bold text-card-foreground">{correctCount}/{totalQuestions}</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Correct</p>
          </div>
          <div className="flex-1 p-3 rounded-2xl bg-secondary/50 text-center">
            <p className="text-lg font-bold text-card-foreground">{accuracy}%</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Accuracy</p>
          </div>
          <div className="flex-1 p-3 rounded-2xl bg-secondary/50 text-center">
            <p className="text-lg font-bold text-card-foreground">{formatTime(timeSpent)}</p>
            <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Time</p>
          </div>
        </div>

        {/* Accuracy bar */}
        <div className="mx-6 mb-5">
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${accuracy}%`,
                backgroundColor: accuracy >= 80 ? "hsl(var(--success))" : accuracy >= 50 ? "hsl(var(--warning))" : "hsl(var(--destructive))",
              }}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 flex flex-col gap-2">
          {onNextChapter && (
            <button
              onClick={onNextChapter}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-primary text-primary-foreground font-medium text-sm active:scale-[0.97] transition-transform"
            >
              Next Chapter <ChevronRight className="w-4 h-4" />
            </button>
          )}
          <div className="flex gap-2">
            {onRetake && (
              <button
                onClick={onRetake}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-secondary text-card-foreground font-medium text-sm active:scale-[0.97] transition-transform"
              >
                <RotateCcw className="w-4 h-4" /> Retake
              </button>
            )}
            {onShare && (
              <button
                onClick={onShare}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-secondary text-card-foreground font-medium text-sm active:scale-[0.97] transition-transform"
              >
                <Share2 className="w-4 h-4" /> Share
              </button>
            )}
            {onHome && (
              <button
                onClick={onHome}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-2xl bg-secondary text-card-foreground font-medium text-sm active:scale-[0.97] transition-transform"
              >
                <Home className="w-4 h-4" /> Home
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
