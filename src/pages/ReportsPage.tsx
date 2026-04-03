import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, BookOpen } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Progress } from "@/components/ui/progress";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid,
} from "recharts";

/* ── dummy data ── */
const statCards = [
  { icon: "📝", value: "1,245", label: "Total Questions", desc: "All questions answered across all chapters" },
  { icon: "⏱️", value: "24h 32m", label: "Total Time", desc: "Total study time (MCQ + Flashcards)" },
  { icon: "🏅", value: "8", label: "Mastered", desc: "Chapters with highest medal (3+ completions)" },
  { icon: "✅", value: "15", label: "Chapters Completed", desc: "Chapters with 100% of questions answered" },
  { icon: "🎯", value: "78%", label: "Overall Accuracy", desc: "Correct answers ÷ Total answers × 100" },
  { icon: "🏆", value: "48", label: "Sessions", desc: "Times you opened MCQ or Flashcards" },
];

const dailyActivity = [
  { day: "Mon", questions: 32, time: "1.2h", accuracy: 75 },
  { day: "Tue", questions: 45, time: "1.8h", accuracy: 82 },
  { day: "Wed", questions: 68, time: "2.5h", accuracy: 88 },
  { day: "Thu", questions: 38, time: "1.4h", accuracy: 79 },
  { day: "Fri", questions: 52, time: "1.9h", accuracy: 84 },
  { day: "Sat", questions: 22, time: "0.8h", accuracy: 71 },
  { day: "Sun", questions: 18, time: "0.6h", accuracy: 68 },
];

const weeklySchedule = [
  { weekNumber: 1, chapters: ["Cardiology", "Neurology"], total: 45, answered: 45, percent: 100 },
  { weekNumber: 2, chapters: ["Radiology", "Pediatrics"], total: 45, answered: 32, percent: 71 },
  { weekNumber: 3, chapters: ["Surgery", "Orthopedics"], total: 45, answered: 18, percent: 40 },
];

const bestChapters = [
  { rank: 1, name: "Cardiology", book: "Cardiology Book", correct: 45, total: 45, percent: 100 },
  { rank: 2, name: "Neurology", book: "Neurology Book", correct: 42, total: 45, percent: 93 },
  { rank: 3, name: "Radiology", book: "Radiology Book", correct: 35, total: 45, percent: 78 },
  { rank: 4, name: "Pediatrics", book: "Pediatrics Book", correct: 29, total: 45, percent: 64 },
  { rank: 5, name: "Pharmacology", book: "Pharmacology Book", correct: 25, total: 45, percent: 56 },
];

const worstChapters = [
  { rank: 1, name: "Biochemistry", book: "Basic Sciences Book", correct: 7, total: 45, percent: 16 },
  { rank: 2, name: "Anatomy", book: "Basic Sciences Book", correct: 10, total: 45, percent: 22 },
  { rank: 3, name: "Microbiology", book: "Basic Sciences Book", correct: 13, total: 45, percent: 29 },
  { rank: 4, name: "Pathology", book: "Basic Sciences Book", correct: 18, total: 45, percent: 40 },
  { rank: 5, name: "Immunology", book: "Basic Sciences Book", correct: 20, total: 45, percent: 44 },
];

const timeDistribution = [
  { icon: "📖", label: "MCQ Study", hours: 18, percent: 75 },
  { icon: "🃏", label: "Flashcards", hours: 3, percent: 12.5 },
  { icon: "🧠", label: "Focus Mode", hours: 3, percent: 12.5 },
];

const accuracyTrend = [
  { week: "Week 1", accuracy: 65 },
  { week: "Week 2", accuracy: 72 },
  { week: "Week 3", accuracy: 78 },
  { week: "Week 4", accuracy: 82 },
];

/* ── helpers ── */
type TimeRange = "week" | "month" | "all";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold text-foreground mb-3">{children}</h3>
);

/* ── Page ── */
const ReportsPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>("all");
  const [timeDistFilter, setTimeDistFilter] = useState<TimeRange>("all");

  const totalDailyTime = "10.2h";
  const totalDailyQuestions = dailyActivity.reduce((s, d) => s + d.questions, 0);
  const avgDailyAccuracy = Math.round(dailyActivity.reduce((s, d) => s + d.accuracy, 0) / dailyActivity.length);

  return (
    <AppLayout>
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-95 transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
        <h1 className="text-xl font-bold flex-1 text-center pr-9">Reports</h1>
      </div>

      {/* Stat Cards */}
      <div className="px-5 grid grid-cols-2 gap-3 mb-6">
        {statCards.map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-card card-shadow flex flex-col items-center text-center gap-1">
            <span className="text-2xl">{s.icon}</span>
            <span className="text-xl font-bold font-serif text-card-foreground">{s.value}</span>
            <span className="text-xs font-semibold text-card-foreground">{s.label}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">{s.desc}</span>
          </div>
        ))}
      </div>

      {/* Time Range Selector */}
      <div className="px-5 mb-6">
        <div className="flex gap-2 bg-secondary rounded-2xl p-1">
          {(["week", "month", "all"] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setTimeRange(r)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                timeRange === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {r === "week" ? "Week" : r === "month" ? "Month" : "All Time"}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Activity */}
      <div className="px-5 mb-6">
        <SectionTitle>📈 Daily Activity (Last 7 days)</SectionTitle>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { label: "Total Time", value: totalDailyTime },
            { label: "Questions", value: totalDailyQuestions },
            { label: "Avg Accuracy", value: `${avgDailyAccuracy}%` },
          ].map((m) => (
            <div key={m.label} className="p-3 rounded-2xl bg-card card-shadow text-center">
              <p className="text-sm font-bold font-serif text-card-foreground">{m.value}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="bg-card rounded-2xl card-shadow p-4">
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={dailyActivity}>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Bar dataKey="questions" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} label={{ position: "top", fontSize: 10, fill: "hsl(var(--muted-foreground))", fontWeight: 600 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Weekly Activity Level */}
      <div className="px-5 mb-6">
        <SectionTitle>📅 Weekly Activity Level</SectionTitle>
        <div className="space-y-3">
          {weeklySchedule.map((w) => (
            <button
              key={w.weekNumber}
              onClick={() => navigate("/schedule")}
              className="w-full p-4 rounded-2xl bg-card card-shadow text-left active:scale-[0.98] transition-transform"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-card-foreground">Week {w.weekNumber}</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-[11px] text-muted-foreground mb-2">{w.chapters.join(", ")}</p>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Progress
                    value={w.percent}
                    className="h-2"
                    style={{
                      ["--progress-color" as string]: w.percent === 100 ? "hsl(var(--success))" : "hsl(var(--primary))",
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-card-foreground min-w-[32px] text-right">{w.percent}%</span>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{w.answered}/{w.total} questions</p>
            </button>
          ))}
        </div>
      </div>

      {/* Best Chapters */}
      <div className="px-5 mb-6">
        <SectionTitle>🏆 Best Chapters (by accuracy)</SectionTitle>
        <div className="space-y-2">
          {bestChapters.map((ch) => (
            <button
              key={ch.rank}
              onClick={() => navigate("/books")}
              className="w-full flex items-center gap-3 p-3 rounded-2xl bg-card card-shadow text-left active:scale-[0.98] transition-transform"
            >
              <span className="text-sm font-bold text-primary w-6 text-center">{ch.rank}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-card-foreground truncate">{ch.name}</p>
                <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> {ch.book}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1">
                    <Progress value={ch.percent} className="h-1.5 [&>div]:bg-success" />
                  </div>
                  <span className="text-[10px] text-muted-foreground">{ch.correct}/{ch.total}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-success">{ch.percent}%</span>
              <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
            </button>
          ))}
        </div>
      </div>

      {/* Chapters Needing Review */}
      <div className="px-5 mb-6">
        <SectionTitle>⚠️ Chapters Needing Review</SectionTitle>
        <div className="space-y-2">
          {worstChapters.map((ch) => {
            const barColor = ch.percent < 30 ? "hsl(var(--destructive))" : "hsl(var(--warning))";
            const textColor = ch.percent < 30 ? "text-destructive" : "text-warning";
            return (
              <button
                key={ch.rank}
                onClick={() => navigate("/books")}
                className="w-full flex items-center gap-3 p-3 rounded-2xl bg-card card-shadow text-left active:scale-[0.98] transition-transform"
              >
                <span className="text-sm font-bold text-destructive w-6 text-center">{ch.rank}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-card-foreground truncate">{ch.name}</p>
                  <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {ch.book}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1">
                      <Progress value={ch.percent} className="h-1.5" style={{ ["--progress-indicator" as string]: barColor }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{ch.correct}/{ch.total}</span>
                  </div>
                </div>
                <span className={`text-xs font-bold ${textColor}`}>{ch.percent}%</span>
                <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Distribution */}
      <div className="px-5 mb-6">
        <SectionTitle>⏱️ Time Distribution</SectionTitle>
        <div className="flex gap-2 bg-secondary rounded-2xl p-1 mb-4">
          {(["all", "week", "month"] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setTimeDistFilter(r)}
              className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-colors ${
                timeDistFilter === r ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              }`}
            >
              {r === "week" ? "Last Week" : r === "month" ? "Last Month" : "All Time"}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {timeDistribution.map((td) => (
            <div key={td.label} className="p-3 rounded-2xl bg-card card-shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">
                  {td.icon} <span className="font-medium text-card-foreground">{td.label}</span>
                </span>
                <span className="text-xs text-muted-foreground">{td.hours}h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Progress value={td.percent} className="h-2" />
                </div>
                <span className="text-xs font-semibold text-card-foreground min-w-[36px] text-right">{td.percent}%</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-3">
          Based on total study time: 24 hours 32 minutes
        </p>
      </div>

      {/* Accuracy Trend */}
      <div className="px-5 mb-8">
        <SectionTitle>📈 Accuracy Trend (Last 4 weeks)</SectionTitle>
        <div className="bg-card rounded-2xl card-shadow p-4">
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={accuracyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="week" tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 12, border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="hsl(var(--primary))"
                strokeWidth={2.5}
                dot={{ fill: "hsl(var(--primary))", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AppLayout>
  );
};

export default ReportsPage;
