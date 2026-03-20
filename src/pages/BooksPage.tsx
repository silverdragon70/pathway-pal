import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockBooks } from "@/data/mockData";
import { Star } from "lucide-react";

const BooksPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold animate-fade-up">Question Banks</h1>
        <p className="text-sm text-muted-foreground mt-1 animate-fade-up" style={{ animationDelay: "60ms" }}>
          {mockBooks.length} books · Your medical references
        </p>
      </div>

      <div className="mb-8 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <SectionHeader title="All Books" />
        <div className="px-5 flex flex-col gap-3">
          {mockBooks.map((b, i) => (
            <button
              key={b.id}
              onClick={() => navigate(`/books/${b.id}`)}
              className="w-full flex gap-4 p-4 rounded-2xl bg-card card-shadow transition-all duration-150 ease-in-out active:scale-[0.98] active:neumorphic-active text-left animate-fade-up"
              style={{ animationDelay: `${140 + i * 60}ms` }}
            >
              <div className="w-14 h-18 rounded-xl bg-secondary flex items-center justify-center text-3xl shrink-0">
                {b.cover}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-card-foreground leading-tight">{b.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{b.author} · {b.edition}</p>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <Star
                      key={si}
                      className={`w-3 h-3 ${si < Math.floor(b.rating) ? "fill-warning text-warning" : "text-muted-foreground/30"}`}
                    />
                  ))}
                  <span className="text-[10px] text-muted-foreground ml-1">{b.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{b.chapterList.length} chapters · {b.chapterList.reduce((a, c) => a + c.questions, 0)} questions</p>
                {b.progress > 0 && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-success rounded-full" style={{ width: `${b.progress}%` }} />
                    </div>
                    <span className="text-[10px] font-medium text-success">{b.progress}%</span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default BooksPage;
