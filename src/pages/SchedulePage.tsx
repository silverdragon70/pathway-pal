import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockSchedule } from "@/data/mockData";
import { CheckCircle2, Circle, Calendar, Clock, BookOpen } from "lucide-react";

const SchedulePage = () => {
  const overallProgress = Math.round((mockSchedule.currentWeek / mockSchedule.totalWeeks) * 100);

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Study Schedule</h1>
        <p className="text-sm text-muted-foreground mt-1">
          13-week comprehensive plan
        </p>
      </div>

      {/* Overall progress */}
      <div className="px-5 mb-6">
        <div className="p-4 rounded-2xl bg-card card-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Overall Progress</span>
            <span className="text-sm font-bold text-primary">{overallProgress}%</span>
          </div>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${overallProgress}%` }} />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Week {mockSchedule.currentWeek} of {mockSchedule.totalWeeks}</span>
          </div>
        </div>
      </div>

      {/* Weeks */}
      <div>
        <SectionHeader title="Weekly Plan" />
        <div className="px-5 flex flex-col gap-3 mb-8">
          {mockSchedule.weeks.map((w, i) => {
            const isCurrent = w.week === mockSchedule.currentWeek;
            const progressPct = w.total ? Math.round((w.sessions / w.total) * 100) : 0;
            return (
              <div
                key={w.week}
                className={`p-4 rounded-2xl transition-all duration-150
                  ${isCurrent ? "bg-primary/5 border-2 border-primary/20 card-shadow" : "bg-card card-shadow"}
                `}
                style={{ animationDelay: `${200 + i * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  {w.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  ) : (
                    <Circle className={`w-5 h-5 mt-0.5 shrink-0 ${isCurrent ? "text-primary" : "text-muted-foreground/30"}`} />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-card-foreground">Week {w.week}: {w.topic}</p>
                      {isCurrent && (
                        <span className="text-[10px] px-2 py-0.5 bg-primary text-primary-foreground rounded-full font-medium">Current</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {w.dates}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> {w.total} topics
                      </span>
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {w.studyTime}
                      </span>
                      {w.completed && (
                        <span className="text-[10px] text-success font-medium">✓ Completed</span>
                      )}
                    </div>
                    {!w.completed && w.total && w.total > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${progressPct}%` }} />
                        </div>
                        <span className="text-[10px] text-muted-foreground">{w.sessions}/{w.total}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default SchedulePage;
