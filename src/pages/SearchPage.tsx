import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockSubjects, mockQuestions } from "@/data/mockData";
import { Search, X } from "lucide-react";

const SearchPage = () => {
  const [query, setQuery] = useState("");

  const filteredSubjects = query
    ? mockSubjects.filter((s) => s.name.toLowerCase().includes(query.toLowerCase()))
    : [];

  const filteredQuestions = query
    ? mockQuestions.filter((q) => q.text.toLowerCase().includes(query.toLowerCase()) || q.subject.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold animate-fade-up">Search</h1>
      </div>

      <div className="px-5 mb-6 animate-fade-up" style={{ animationDelay: "60ms" }}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions, topics, subjects..."
            className="w-full h-12 pl-11 pr-10 bg-card rounded-2xl card-shadow text-sm text-card-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {!query && (
        <div className="px-5 animate-fade-up" style={{ animationDelay: "120ms" }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Recent Searches</p>
          <div className="flex flex-wrap gap-2">
            {["Croup", "VSD", "Neonatal jaundice", "Kawasaki disease"].map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-3 py-1.5 bg-secondary rounded-full text-xs font-medium text-secondary-foreground active:scale-[0.96] transition-transform"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {query && (
        <div className="px-5 animate-fade-in">
          {filteredSubjects.length > 0 && (
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Subjects</p>
              {filteredSubjects.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl">
                  <span className="text-xl">{s.icon}</span>
                  <span className="text-sm font-medium text-card-foreground">{s.name}</span>
                </div>
              ))}
            </div>
          )}
          {filteredQuestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Questions</p>
              {filteredQuestions.map((q) => (
                <div key={q.id} className="p-4 rounded-2xl bg-card card-shadow mb-3">
                  <p className="question-text text-sm line-clamp-2">{q.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{q.subject}</span>
                    <span className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground rounded-full">{q.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          {filteredSubjects.length === 0 && filteredQuestions.length === 0 && (
            <p className="text-center text-sm text-muted-foreground py-12">No results for "{query}"</p>
          )}
        </div>
      )}
    </AppLayout>
  );
};

export default SearchPage;
