import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockSubjects } from "@/data/mockData";
import { Play, Clock, Hash, Shuffle } from "lucide-react";

const ExamSetupPage = () => {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(30);
  const [timeLimit, setTimeLimit] = useState(30);
  const [shuffle, setShuffle] = useState(true);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(["1", "2"]);

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Exam Setup</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize your mock exam
        </p>
      </div>

      <div className="px-5 flex flex-col gap-4">
        {/* Question count */}
        <div className="p-4 rounded-2xl bg-card card-shadow">
          <div className="flex items-center gap-3 mb-3">
            <Hash className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-card-foreground">Number of Questions</span>
          </div>
          <div className="flex gap-2">
            {[10, 20, 30, 50].map((n) => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.96]
                  ${questionCount === n ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Time limit */}
        <div className="p-4 rounded-2xl bg-card card-shadow">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-5 h-5 text-warning" />
            <span className="text-sm font-medium text-card-foreground">Time Limit (minutes)</span>
          </div>
          <div className="flex gap-2">
            {[15, 30, 45, 60].map((n) => (
              <button
                key={n}
                onClick={() => setTimeLimit(n)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.96]
                  ${timeLimit === n ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Shuffle */}
        <div className="p-4 rounded-2xl bg-card card-shadow flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shuffle className="w-5 h-5 text-success" />
            <span className="text-sm font-medium text-card-foreground">Shuffle Questions</span>
          </div>
          <button
            onClick={() => setShuffle(!shuffle)}
            className={`w-12 h-7 rounded-full transition-colors duration-150 relative ${shuffle ? "bg-primary" : "bg-secondary"}`}
          >
            <div className={`w-5 h-5 rounded-full bg-card absolute top-1 transition-transform duration-150 ${shuffle ? "translate-x-6" : "translate-x-1"}`} />
          </button>
        </div>

        {/* Subject selection */}
        <div className="p-4 rounded-2xl bg-card card-shadow">
          <p className="text-sm font-medium text-card-foreground mb-3">Select Subjects</p>
          <div className="flex flex-wrap gap-2">
            {mockSubjects.map((s) => (
              <button
                key={s.id}
                onClick={() => toggleSubject(s.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 active:scale-[0.96]
                  ${selectedSubjects.includes(s.id) ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
              >
                {s.icon} {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <button
          onClick={() => navigate("/mcq")}
          className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 card-shadow active:scale-[0.97] transition-all duration-150 mt-2 mb-8"
        >
          <Play className="w-5 h-5" /> Start Exam
        </button>
      </div>
    </AppLayout>
  );
};

export default ExamSetupPage;
