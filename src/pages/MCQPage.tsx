import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockQuestions } from "@/data/mockData";
import { ArrowLeft, Bookmark, ChevronLeft, ChevronRight, X, CheckCircle2, XCircle, Lightbulb, Eye, EyeOff } from "lucide-react";

type QuizMode = "study" | "review" | "test";

const MCQPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [mode, setMode] = useState<QuizMode>("study");
  const [showHint, setShowHint] = useState(false);
  // Review mode state
  const [reviewRevealed, setReviewRevealed] = useState(false);

  const question = mockQuestions[currentIndex];
  const isCorrect = selectedOption === question.correctIndex;
  const progress = ((currentIndex + 1) / mockQuestions.length) * 100;

  const handleSelect = (index: number) => {
    if (mode === "review") return;
    if (selectedOption !== null) return;
    setSelectedOption(index);
    if (mode === "study") setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex((p) => p + 1);
      resetState();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((p) => p - 1);
      resetState();
    }
  };

  const resetState = () => {
    setSelectedOption(null);
    setShowExplanation(false);
    setBookmarked(false);
    setShowHint(false);
    setReviewRevealed(false);
  };

  const getOptionStyle = (index: number) => {
    if (mode === "review") return "bg-card card-shadow border-2 border-transparent";
    if (mode === "test") {
      if (selectedOption === null) return "bg-card card-shadow border-2 border-transparent";
      if (index === selectedOption) return "bg-primary/10 border-2 border-primary";
      return "bg-card border-2 border-transparent opacity-50";
    }
    // study mode
    if (selectedOption === null) return "bg-card card-shadow border-2 border-transparent";
    if (index === question.correctIndex) return "bg-success/5 border-2 border-success";
    if (index === selectedOption && !isCorrect) return "bg-destructive/5 border-2 border-destructive animate-shake";
    return "bg-card border-2 border-transparent opacity-50";
  };

  const modeConfig = {
    study: { label: "Study", color: "bg-primary" },
    review: { label: "Review", color: "bg-success" },
    test: { label: "Test", color: "bg-warning" },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col safe-top">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-transform">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Mode selector */}
        <div className="flex gap-1 p-1 bg-secondary rounded-xl">
          {(["study", "review", "test"] as QuizMode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); resetState(); }}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold uppercase tracking-wider transition-all duration-150
                ${mode === m ? `${modeConfig[m].color} text-white` : "text-muted-foreground"}`}
            >
              {modeConfig[m].label}
            </button>
          ))}
        </div>

        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-transform">
          <X className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="px-5 mb-4">
        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="flex-1 px-5 overflow-y-auto pb-32">
        <div className="mb-4">
          <div className="flex gap-2 mb-3">
            {question.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 bg-secondary text-muted-foreground rounded-full">{tag}</span>
            ))}
          </div>
          <p className="question-text text-base leading-relaxed">{question.text}</p>
        </div>

        {/* Study / Test: normal options */}
        {mode !== "review" && (
          <div className="flex flex-col gap-3 mb-6">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-150 active:scale-[0.98] ${getOptionStyle(i)}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors
                    ${mode === "study" && selectedOption !== null && i === question.correctIndex ? "bg-success text-success-foreground" :
                      mode === "study" && selectedOption === i && !isCorrect ? "bg-destructive text-destructive-foreground" :
                      mode === "test" && selectedOption === i ? "bg-primary text-primary-foreground" :
                      "bg-secondary text-muted-foreground"}`}>
                    {mode === "study" && selectedOption !== null && i === question.correctIndex ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : mode === "study" && selectedOption === i && !isCorrect ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + i)
                    )}
                  </div>
                  <span className="text-sm text-card-foreground leading-relaxed">{option}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Review mode: Known / Unknown */}
        {mode === "review" && (
          <div className="mb-6">
            {!reviewRevealed ? (
              <div className="flex gap-3">
                <button
                  onClick={() => setReviewRevealed(true)}
                  className="flex-1 h-14 rounded-2xl bg-destructive/10 text-destructive font-medium text-sm active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  <EyeOff className="w-4 h-4" /> Unknown
                </button>
                <button
                  onClick={() => { setReviewRevealed(true); }}
                  className="flex-1 h-14 rounded-2xl bg-success/10 text-success font-medium text-sm active:scale-[0.97] transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> Known
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-success/5 border border-success/20">
                <p className="text-sm font-semibold text-success mb-1">Answer</p>
                <p className="text-sm font-medium text-card-foreground mb-2">{question.options[question.correctIndex]}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">{question.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Explanation (study mode) */}
        {mode === "study" && showExplanation && (
          <div className={`p-4 rounded-2xl ${isCorrect ? "bg-success/5 border border-success/20" : "bg-destructive/5 border border-destructive/20"}`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? <CheckCircle2 className="w-5 h-5 text-success" /> : <XCircle className="w-5 h-5 text-destructive" />}
              <span className={`text-sm font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </span>
            </div>
            <p className="text-sm text-foreground/80 leading-relaxed">{question.explanation}</p>
          </div>
        )}

        {/* Hint */}
        {showHint && mode === "study" && selectedOption === null && (
          <div className="p-3 rounded-2xl bg-warning/5 border border-warning/10 mt-4">
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 text-warning" />
              <span className="text-xs font-semibold text-warning">Hint</span>
            </div>
            <p className="text-xs text-foreground/70">Think about the most common presentation in this age group and the characteristic sound of the cough.</p>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 px-5 pb-8 pt-3 bg-gradient-to-t from-background via-background to-transparent">
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="w-11 h-11 rounded-xl bg-card card-shadow flex items-center justify-center disabled:opacity-30 active:scale-[0.95] transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className="w-11 h-11 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-all"
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? "fill-warning text-warning" : "text-foreground"}`} />
          </button>

          <div className="flex-1 flex items-center justify-center">
            <span className="text-sm font-semibold text-card-foreground">{currentIndex + 1}<span className="text-muted-foreground font-normal">/{mockQuestions.length}</span></span>
          </div>

          {/* Hint button: auto-solves the question by selecting the correct answer and showing explanation */}
          {mode === "study" && selectedOption === null && (
            <button
              onClick={() => {
                // Auto-solve: selects the correct answer and reveals explanation
                setSelectedOption(question.correctIndex);
                setShowExplanation(true);
              }}
              className="w-11 h-11 rounded-xl bg-card card-shadow flex items-center justify-center active:scale-[0.95] transition-all"
            >
              <Lightbulb className="w-5 h-5 text-foreground" />
            </button>
          )}
          {(mode !== "study" || selectedOption !== null) && (
            <div className="w-11 h-11" />
          )}

          <button
            onClick={handleNext}
            disabled={currentIndex === mockQuestions.length - 1}
            className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-30 active:scale-[0.95] transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQPage;
