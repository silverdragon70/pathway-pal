import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ActionCard } from "@/components/cards/ActionCard";
import { mockBookmarks, mockHistory } from "@/data/mockData";
import { Bookmark, Clock, Star, TrendingUp, Brain, ClipboardList, HelpCircle, Layers } from "lucide-react";

const collectionTabs = ["Bookmarks", "Progress", "History"] as const;

const LibraryPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof collectionTabs[number]>("Bookmarks");

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold animate-fade-up">Library</h1>
      </div>

      {/* Your Collection */}
      <div className="mb-6">
        <SectionHeader title="Your Collection" />
        <div className="px-5 mb-4 animate-fade-up" style={{ animationDelay: "60ms" }}>
          <div className="flex gap-1 p-1 bg-secondary rounded-2xl">
            {collectionTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-medium rounded-xl transition-all duration-150 active:scale-[0.97]
                  ${activeTab === tab ? "bg-card card-shadow text-card-foreground" : "text-muted-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {activeTab === "Bookmarks" && (
          <div className="animate-fade-up px-5 flex flex-col gap-3" style={{ animationDelay: "120ms" }}>
            {mockBookmarks.map((bm) => (
              <div key={bm.id} className="flex items-start gap-3 p-4 rounded-2xl bg-card card-shadow">
                <Bookmark className="w-5 h-5 text-warning mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground">{bm.text}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{bm.subject}</span>
                    <span className="text-[10px] text-muted-foreground">{bm.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "Notes" && (
          <div className="px-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Star className="w-12 h-12 text-muted-foreground/30 mb-3" />
              <p className="text-sm font-medium text-card-foreground">No notes yet</p>
              <p className="text-xs text-muted-foreground mt-1">Start adding notes during your study sessions</p>
            </div>
          </div>
        )}

        {activeTab === "Progress" && (
          <div className="px-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
            <div className="p-4 rounded-2xl bg-card card-shadow">
              <p className="text-sm font-medium text-card-foreground mb-3">Performance Trend</p>
              <div className="flex items-end gap-2 h-32">
                {[58, 62, 65, 70, 74, 78].map((v, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-primary/20 rounded-lg overflow-hidden" style={{ height: "100px" }}>
                      <div className="w-full bg-primary rounded-lg transition-all duration-500" style={{ height: `${v}%`, marginTop: `${100 - v}%` }} />
                    </div>
                    <span className="text-[9px] text-muted-foreground">{["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"][i]}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-1.5 mt-3">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-xs text-success font-medium">+20% improvement over 6 months</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "History" && (
          <div className="animate-fade-up px-5 flex flex-col gap-3" style={{ animationDelay: "120ms" }}>
            {mockHistory.map((h, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-card card-shadow">
                <Clock className="w-5 h-5 text-primary shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-card-foreground">{h.date}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{h.sessions} sessions · {h.questions} questions · {h.time}</p>
                </div>
                <span className="text-xs font-semibold text-success">{Math.round(h.correct / h.questions * 100)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Study Tools */}
      <div className="mb-8 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <SectionHeader title="Study Tools" />
        <div className="px-5 flex flex-col gap-3">
          <ActionCard icon={<Layers className="w-5 h-5 text-primary" />} title="Flashcard Decks" subtitle="Spaced repetition review" onClick={() => navigate("/flashcards")} />
          <ActionCard icon={<ClipboardList className="w-5 h-5 text-warning" />} title="Exam Mode" subtitle="Simulate real exam conditions" onClick={() => navigate("/exam-setup")} />
          <ActionCard icon={<HelpCircle className="w-5 h-5 text-destructive" />} title="Review Unknown" subtitle="Questions you got wrong or skipped" onClick={() => navigate("/mcq")} />
        </div>
      </div>
    </AppLayout>
  );
};

export default LibraryPage;
