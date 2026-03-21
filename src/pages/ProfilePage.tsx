import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { ActionCard } from "@/components/cards/ActionCard";
import { StatCard } from "@/components/cards/StatCard";
import { mockUser } from "@/data/mockData";
import {
  Settings, BookOpen, Award, TrendingUp, LogOut, Bell, Palette, User,
  Shield, Cloud, CalendarDays, Type, Vibrate, Info, FileText, Lock, RefreshCw
} from "lucide-react";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        {/* Avatar & Info */}
        <div className="flex items-center gap-4 animate-fade-up">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-xl font-bold font-serif">
            {mockUser.avatar}
          </div>
          <div>
            <h1 className="text-xl font-bold">{mockUser.name}</h1>
            <p className="text-sm text-muted-foreground">{mockUser.email}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <Award className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">{mockUser.level}</span>
            </div>
          </div>
        </div>
      </div>


      {/* Account */}
      <div className="mb-6 animate-fade-up" style={{ animationDelay: "140ms" }}>
        <SectionHeader title="Account" />
        <div className="px-5 flex flex-col gap-3">
          <ActionCard icon={<User className="w-5 h-5 text-primary" />} title="Profile Details" subtitle="Name, email, photo" onClick={() => navigate("/settings")} />
          <ActionCard icon={<RefreshCw className="w-5 h-5 text-success" />} title="Backup & Restore" subtitle="Save your progress locally" onClick={() => {}} />
          <ActionCard icon={<Cloud className="w-5 h-5 text-primary" />} title="Update Data" subtitle="Check for new data" onClick={() => {}} />
        </div>
      </div>

      {/* Study Settings */}
      <div className="mb-6 animate-fade-up" style={{ animationDelay: "200ms" }}>
        <SectionHeader title="Study Settings" />
        <div className="px-5 flex flex-col gap-3">
          <ActionCard icon={<CalendarDays className="w-5 h-5 text-primary" />} title="Study Schedule" subtitle="Weekly plan & targets" onClick={() => navigate("/schedule")} />
          <ActionCard icon={<Bell className="w-5 h-5 text-warning" />} title="Notifications" subtitle="Study reminders" onClick={() => navigate("/notifications")} />
          <ActionCard icon={<Settings className="w-5 h-5 text-muted-foreground" />} title="Default MCQ Mode" subtitle="Study, Review, or Test" onClick={() => navigate("/settings")} />
          <ActionCard icon={<Type className="w-5 h-5 text-muted-foreground" />} title="Text Size" subtitle="Adjust reading comfort" onClick={() => navigate("/settings")} />
        </div>
      </div>

      {/* Appearance */}
      <div className="mb-6 animate-fade-up" style={{ animationDelay: "260ms" }}>
        <SectionHeader title="Appearance" />
        <div className="px-5 flex flex-col gap-3">
          <ActionCard icon={<Palette className="w-5 h-5 text-success" />} title="Theme" subtitle="System / Light / Dark" onClick={() => navigate("/settings")} />
          <ActionCard icon={<Vibrate className="w-5 h-5 text-muted-foreground" />} title="Vibration" subtitle="Haptic feedback on actions" onClick={() => {}} />
          <ActionCard icon={<Palette className="w-5 h-5 text-primary" />} title="App Theme Color" subtitle="Customize accent color" onClick={() => navigate("/settings")} />
        </div>
      </div>

      {/* More */}
      <div className="mb-6 animate-fade-up" style={{ animationDelay: "320ms" }}>
        <SectionHeader title="More" />
        <div className="px-5 flex flex-col gap-3">
          <ActionCard icon={<Info className="w-5 h-5 text-muted-foreground" />} title="About" subtitle="App version & credits" onClick={() => {}} />
          <ActionCard icon={<FileText className="w-5 h-5 text-muted-foreground" />} title="Changelog" subtitle="What's new" onClick={() => {}} />
          <ActionCard icon={<Lock className="w-5 h-5 text-muted-foreground" />} title="Privacy Policy" subtitle="Data handling & terms" onClick={() => {}} />
        </div>
      </div>

      <div className="px-5 mb-8 animate-fade-up" style={{ animationDelay: "380ms" }}>
        <button className="w-full flex items-center justify-center gap-2 py-3 text-sm font-medium text-destructive active:scale-[0.97] transition-transform">
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
