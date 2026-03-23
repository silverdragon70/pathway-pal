import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ArrowLeft, Moon, Sun, Monitor, Type, Bell, Clock } from "lucide-react";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");
  const [fontSize, setFontSize] = useState<"S" | "M" | "L">("M");
  const [reminders, setReminders] = useState(true);
  const [reminderTime, setReminderTime] = useState("08:00");

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-transform">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Appearance */}
      <div className="mb-6">
        <SectionHeader title="Appearance" />
        <div className="px-5">
          <div className="p-4 rounded-2xl bg-card card-shadow">
            <p className="text-sm font-medium text-card-foreground mb-3">Theme</p>
            <div className="flex gap-2">
              {([
                { key: "light", icon: Sun, label: "Light" },
                { key: "dark", icon: Moon, label: "Dark" },
                { key: "system", icon: Monitor, label: "System" },
              ] as const).map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-150 active:scale-[0.96]
                    ${theme === key ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Font Size */}
      <div className="mb-6">
        <SectionHeader title="Reading" />
        <div className="px-5">
          <div className="p-4 rounded-2xl bg-card card-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Type className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-card-foreground">Font Size</span>
            </div>
            <div className="flex gap-2">
              {(["S", "M", "L"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.96]
                    ${fontSize === size ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reminders */}
      <div className="mb-8">
        <SectionHeader title="Notifications" />
        <div className="px-5 flex flex-col gap-3">
          <div className="p-4 rounded-2xl bg-card card-shadow flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-warning" />
              <span className="text-sm font-medium text-card-foreground">Daily Reminders</span>
            </div>
            <button
              onClick={() => setReminders(!reminders)}
              className={`w-12 h-7 rounded-full transition-colors duration-150 relative ${reminders ? "bg-primary" : "bg-secondary"}`}
            >
              <div className={`w-5 h-5 rounded-full bg-card absolute top-1 transition-transform duration-150 ${reminders ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
          {reminders && (
            <div className="p-4 rounded-2xl bg-card card-shadow flex items-center justify-between animate-scale-in">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-card-foreground">Reminder Time</span>
              </div>
              <span className="text-sm font-medium text-primary">{reminderTime}</span>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default SettingsPage;
