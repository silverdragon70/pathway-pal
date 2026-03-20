import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { mockReminders } from "@/data/mockData";
import { ArrowLeft, Bell, Plus, Clock, Repeat, Trash2, MessageSquare } from "lucide-react";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState(mockReminders);

  const toggleReminder = (id: string) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(r => r.id !== id));
  };

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold animate-fade-up">Notifications</h1>
      </div>

      <div className="mb-6 animate-fade-up" style={{ animationDelay: "80ms" }}>
        <SectionHeader title="Study Reminders" />
        <div className="px-5 flex flex-col gap-3">
          {reminders.map((r, i) => (
            <div
              key={r.id}
              className={`p-4 rounded-2xl bg-card card-shadow animate-fade-up transition-opacity duration-150 ${!r.enabled ? "opacity-60" : ""}`}
              style={{ animationDelay: `${100 + i * 60}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Bell className={`w-4 h-4 ${r.enabled ? "text-warning" : "text-muted-foreground"}`} />
                  <span className="text-lg font-bold text-card-foreground font-serif">{r.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => deleteReminder(r.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center active:scale-[0.95] transition-transform"
                  >
                    <Trash2 className="w-4 h-4 text-destructive/60" />
                  </button>
                  <button
                    onClick={() => toggleReminder(r.id)}
                    className={`w-12 h-7 rounded-full transition-colors duration-150 relative ${r.enabled ? "bg-primary" : "bg-secondary"}`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-card absolute top-1 transition-transform duration-150 ${r.enabled ? "translate-x-6" : "translate-x-1"}`} />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Repeat className="w-3 h-3" /> {r.repeat}
                </span>
              </div>
              <div className="flex items-start gap-1.5 mt-2">
                <MessageSquare className="w-3 h-3 text-muted-foreground mt-0.5 shrink-0" />
                <p className="text-xs text-muted-foreground leading-relaxed">{r.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add reminder button */}
      <div className="px-5 mb-8 animate-fade-up" style={{ animationDelay: "300ms" }}>
        <button className="w-full h-12 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground active:scale-[0.97] transition-all">
          <Plus className="w-4 h-4" /> Add Reminder
        </button>
      </div>
    </AppLayout>
  );
};

export default NotificationsPage;
