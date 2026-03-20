interface BookCardProps {
  cover: string;
  title: string;
  author: string;
  edition: string;
  chapters: number;
  progress: number;
  onClick?: () => void;
}

export const BookCard = ({ cover, title, author, edition, chapters, progress, onClick }: BookCardProps) => (
  <button
    onClick={onClick}
    className="w-full flex gap-4 p-4 rounded-2xl bg-card card-shadow transition-all duration-150 ease-in-out active:scale-[0.98] active:neumorphic-active text-left"
  >
    <div className="w-14 h-18 rounded-xl bg-secondary flex items-center justify-center text-3xl shrink-0">
      {cover}
    </div>
    <div className="flex-1 min-w-0">
      <p className="font-medium text-sm text-card-foreground leading-tight">{title}</p>
      <p className="text-xs text-muted-foreground mt-1">{author} · {edition}</p>
      <p className="text-xs text-muted-foreground">{chapters} chapters</p>
      {progress > 0 && (
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-success rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] font-medium text-success">{progress}%</span>
        </div>
      )}
    </div>
  </button>
);
