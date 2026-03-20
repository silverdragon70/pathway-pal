import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockQuestions } from "@/data/mockData";
import { RotateCcw } from "lucide-react";

const FlashcardsPage = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const card = mockQuestions[currentIndex];

  const handleNext = () => {
    setFlipped(false);
    setTimeout(() => {
      setCurrentIndex((p) => (p + 1) % mockQuestions.length);
    }, 150);
  };

  return (
    <AppLayout>
      <div className="px-5 pt-6 pb-4">
        <h1 className="text-2xl font-bold animate-fade-up">Flashcards</h1>
        <p className="text-sm text-muted-foreground mt-1">{currentIndex + 1} of {mockQuestions.length}</p>
      </div>

      <div className="px-5 flex-1 flex flex-col items-center justify-center min-h-[60vh]">
        <button
          onClick={() => setFlipped(!flipped)}
          className="w-full min-h-[300px] p-6 rounded-3xl bg-card card-shadow transition-all duration-300 active:scale-[0.98] flex flex-col items-center justify-center text-center"
        >
          {!flipped ? (
            <div className="animate-fade-in">
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Question</p>
              <p className="question-text text-base leading-relaxed">{card.text}</p>
              <p className="text-xs text-primary mt-6 font-medium">Tap to reveal answer</p>
            </div>
          ) : (
            <div className="animate-fade-in">
              <p className="text-xs uppercase tracking-widest text-success mb-4">Answer</p>
              <p className="text-sm font-medium text-success mb-3">{card.options[card.correctIndex]}</p>
              <p className="text-sm text-foreground/70 leading-relaxed">{card.explanation}</p>
            </div>
          )}
        </button>

        <div className="flex gap-3 mt-6 w-full">
          <button
            onClick={() => { setFlipped(false); setCurrentIndex((p) => Math.max(0, p - 1)); }}
            className="flex-1 h-12 rounded-2xl bg-destructive/10 text-destructive font-medium text-sm active:scale-[0.97] transition-all"
          >
            Again
          </button>
          <button
            onClick={handleNext}
            className="flex-1 h-12 rounded-2xl bg-success/10 text-success font-medium text-sm active:scale-[0.97] transition-all"
          >
            Got it
          </button>
        </div>

        <button onClick={() => { setFlipped(false); setCurrentIndex(0); }} className="mt-4 flex items-center gap-2 text-xs text-muted-foreground active:scale-[0.97] transition-transform">
          <RotateCcw className="w-3.5 h-3.5" /> Reset deck
        </button>
      </div>
    </AppLayout>
  );
};

export default FlashcardsPage;
