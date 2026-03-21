import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ActionCard } from "@/components/cards/ActionCard";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { StatCard } from "@/components/cards/StatCard";
import { mockUser, mockSubjects, mockRecentChapters, mockPearlOfDay, mockSchedule, getTimeGreeting } from "@/data/mockData";
import { Play, BookOpen, Brain, ClipboardList, Flame, Target, Clock, Trophy, Settings, Palette, CalendarDays, Bell, Lightbulb, ChevronRight } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const topSubjects = mockSubjects.slice(0, 4);
  const currentWeek = mockSchedule.weeks.find(w => w.week === mockSchedule.currentWeek);

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        {/* Greeting + Settings */}
        <div className="flex items-start justify-between animate-fade-up" style={{ animationDelay: "0ms" }}>
          <div>
            <p className="text-sm text-muted-foreground">{getTimeGreeting()},</p>
            <h1 className="text-2xl font-bold mt-0.5">{mockUser.name} 👋</h1>
          </div>
          <button
            onClick={() => navigate("/settings")}
            className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-transform"
          >
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

      </div>

      {/* Continue Learning */}
      <div className="px-5 mb-6 animate-fade-up" style={{ animationDelay: "120ms" }}>
        <ActionCard
          variant="primary"
          icon={<Play className="w-5 h-5" />}
          title="Continue Learning"
          subtitle="Cardiology · 15 questions left"
          onClick={() => navigate("/mcq")}
          trailing={
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <span className="text-xs font-bold">60%</span>
              </div>
            </div>
          }
        />
      </div>

      {/* Recent Chapters */}
      <div className="mb-6 animate-fade-up" style={{ animationDelay: "160ms" }}>
        <SectionHeader title="Recently Opened" />
        <div className="px-5 flex gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {mockRecentChapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => navigate("/mcq")}
              className="min-w-[200px] p-3 rounded-2xl bg-card card-shadow text-left active:scale-[0.97] transition-all duration-150 shrink-0"
            >
              <p className="text-xs text-muted-foreground">{ch.bookTitle}</p>
              <p className="text-sm font-medium text-card-foreground mt-0.5 line-clamp-1">{ch.chapterName}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${ch.progress}%` }} />
                </div>
                <span className="text-[10px] font-medium text-primary">{ch.progress}%</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1.5">{ch.lastAccessed}</p>
            </button>
          ))}
        </div>
      </div>

      {/* This Week's Plan */}
      {currentWeek && (
        <div className="px-5 mb-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
          <button
            onClick={() => navigate("/schedule")}
            className="w-full p-4 rounded-2xl bg-card card-shadow text-left active:scale-[0.98] transition-all duration-150"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">This Week</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium text-card-foreground">Week {currentWeek.week}: {currentWeek.topic}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${(currentWeek.sessions / (currentWeek.total || 1)) * 100}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{currentWeek.sessions}/{currentWeek.total} sessions</span>
            </div>
          </button>
        </div>
      )}



      {/* Quick Actions */}
      <div className="mb-8 animate-fade-up" style={{ animationDelay: "360ms" }}>
        <SectionHeader title="Quick Actions" />
        <div className="px-5 grid grid-cols-3 gap-3">
          <button onClick={() => navigate("/settings")} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card card-shadow active:scale-[0.97] active:neumorphic-active transition-all duration-150">
            <Palette className="w-5 h-5 text-primary" />
            <span className="text-[10px] font-medium text-card-foreground text-center">Customize Look</span>
          </button>
          <button onClick={() => navigate("/schedule")} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card card-shadow active:scale-[0.97] active:neumorphic-active transition-all duration-150">
            <CalendarDays className="w-5 h-5 text-success" />
            <span className="text-[10px] font-medium text-card-foreground text-center">Study Plan</span>
          </button>
          <button onClick={() => navigate("/notifications")} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card card-shadow active:scale-[0.97] active:neumorphic-active transition-all duration-150">
            <Bell className="w-5 h-5 text-warning" />
            <span className="text-[10px] font-medium text-card-foreground text-center">Manage Alerts</span>
          </button>
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
