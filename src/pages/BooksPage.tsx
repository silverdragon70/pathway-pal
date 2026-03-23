import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockBooks } from "@/data/mockData";
import { ChevronRight } from "lucide-react";

const BooksPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Question Banks</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {mockBooks.length} books · Your medical references
        </p>
      </div>

      <div className="mb-8">
        <SectionHeader title="All Books" />
        <div className="px-5 flex flex-col gap-3">
          {mockBooks.map((b, i) => (
            <button
              key={b.id}
              onClick={() => navigate(`/books/${b.id}`)}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card card-shadow transition-all duration-150 ease-in-out active:scale-[0.98] active:neumorphic-active text-left"
              style={{ animationDelay: `${140 + i * 60}ms` }}
            >
              <span className="text-2xl w-10 h-10 flex items-center justify-center">{b.cover}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-card-foreground">{b.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{b.chapterList.length} chapters · {b.chapterList.reduce((a, c) => a + c.questions, 0)} questions</p>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${b.progress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-semibold text-primary">{b.progress}%</span>
                <ChevronRight className="w-4 h-4 opacity-30" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default BooksPage;
