import { useNavigate, useParams } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockBooks } from "@/data/mockData";
import { ArrowLeft, BookOpen, HelpCircle, BarChart3, ChevronRight } from "lucide-react";
import { getChapterCompletion, getMedalColorClass } from "@/services/completionService";
import { MedalIcon } from "@/components/icons/MedalIcon";

const ChapterPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const book = mockBooks.find((b) => b.id === bookId) || mockBooks[0];

  const completedCount = book.chapterList.filter((c) => c.completed).length;
  const totalQuestions = book.chapterList.reduce((a, c) => a + c.questions, 0);
  const totalTopics = book.chapterList.length;

  return (
    <AppLayout>
      {/* Header with book color accent */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-bold line-clamp-1" style={{ color: book.color }}>{book.title}</h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              {book.author} · {book.edition}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3">
          <div className="flex-1 p-3 rounded-2xl bg-card card-shadow flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" />
            <div>
              <p className="text-sm font-bold text-card-foreground">{totalTopics}</p>
              <p className="text-[10px] text-muted-foreground">Topics</p>
            </div>
          </div>
          <div className="flex-1 p-3 rounded-2xl bg-card card-shadow flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-warning" />
            <div>
              <p className="text-sm font-bold text-card-foreground">{totalQuestions}</p>
              <p className="text-[10px] text-muted-foreground">Questions</p>
            </div>
          </div>
          <div className="flex-1 p-3 rounded-2xl bg-card card-shadow flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-success" />
            <div>
              <p className="text-sm font-bold text-card-foreground">{completedCount}/{totalTopics}</p>
              <p className="text-[10px] text-muted-foreground">Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters list */}
      <div className="px-5 flex flex-col gap-3 mb-8">
        {book.chapterList.map((ch) => {
          const chProgress = ch.completed ? 100 : Math.floor(Math.random() * 60);
          const completion = getChapterCompletion(book.id, ch.id);

          return (
            <button
              key={ch.id}
              onClick={() => navigate("/mcq")}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-card card-shadow text-left active:scale-[0.98] active:neumorphic-active transition-all duration-150"
            >
              <span className="text-2xl w-10 h-10 flex items-center justify-center">📖</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="font-medium text-sm text-card-foreground">{ch.name}</p>
                  {completion && (
                    <MedalIcon
                      className={`w-4 h-4 ${getMedalColorClass(completion.medalLevel)}`}
                      style={{ display: 'inline-block' }}
                    />
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{ch.questions} questions</p>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${chProgress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs font-semibold text-primary">{chProgress}%</span>
                <ChevronRight className="w-4 h-4 opacity-30" />
              </div>
            </button>
          );
        })}
      </div>
    </AppLayout>
  );
};

export default ChapterPage;
