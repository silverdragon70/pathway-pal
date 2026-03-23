import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { SubjectCard } from "@/components/cards/SubjectCard";
import { mockSubjects } from "@/data/mockData";

const SubjectsPage = () => {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold">Subjects</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {mockSubjects.length} topics · {mockSubjects.reduce((a, b) => a + b.questionCount, 0)} questions
        </p>
      </div>

      <div className="mb-8">
        <SectionHeader title="All Subjects" />
        <div className="px-5 flex flex-col gap-3">
          {mockSubjects.map((s, i) => (
            <div key={s.id} className="animate-fade-up" style={{ animationDelay: `${140 + i * 60}ms` }}>
              <SubjectCard icon={s.icon} name={s.name} questionCount={s.questionCount} progress={s.progress} onClick={() => navigate("/mcq")} />
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default SubjectsPage;
