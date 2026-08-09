import React, { useState } from 'react';
import { QUESTION_BANK, TOPICS } from './questions';
import { VisualAsset } from './VisualAsset';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<{ [tag: string]: { correct: number; total: number } }>({});
  const [feedback, setFeedback] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const topicQuestions = QUESTION_BANK.filter((q) => q.topic === selectedTopic);
  const currentQuestion = topicQuestions[currentIdx];

  const handleAnswer = (optionIdx: number) => {
    if (selectedOption !== null) return; // Prevent changing answer after selection
    setSelectedOption(optionIdx);

    const isCorrect = optionIdx === currentQuestion.correctAnswer;
    const tag = currentQuestion.conceptTag;

    setResults((prev) => ({
      ...prev,
      [tag]: {
        correct: (prev[tag]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[tag]?.total || 0) + 1,
      },
    }));

    setFeedback(isCorrect ? "Correct! Excellent analysis." : `Incorrect. ${currentQuestion.explanation}`);
  };

  const nextQuestion = () => {
    setFeedback(null);
    setSelectedOption(null);
    if (currentIdx < topicQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsFinished(true);
    }
  };

  const reset = () => {
    setIsFinished(false);
    setSelectedTopic(null);
    setCurrentIdx(0);
    setFeedback(null);
    setSelectedOption(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <header className="mb-6 flex justify-between items-center border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-blue-400 tracking-wide">AP Physics 1 Mastery</h1>
          {selectedTopic && !isFinished && (
            <span className="text-xs font-semibold uppercase px-3 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-400">
              Question {currentIdx + 1} of {topicQuestions.length}
            </span>
          )}
        </header>

        {!selectedTopic ? (
          <div>
            <h2 className="text-lg font-medium mb-4 text-slate-300">Select an AP Physics 1 Topic:</h2>
            <div className="grid gap-3">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-blue-500 hover:bg-slate-800/60 text-left transition-all font-medium shadow-sm flex justify-between items-center"
                >
                  <span>{t}</span>
                  <span className="text-blue-400 text-sm">Start Practice →</span>
                </button>
              ))}
            </div>
          </div>
        ) : isFinished ? (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-2 text-blue-400">Diagnostic Report Card</h2>
            <p className="text-sm text-slate-400 mb-6">Performance breakdown by concept tag for {selectedTopic}:</p>
            <div className="grid gap-3 mb-6">
              {Object.entries(results).map(([tag, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={tag} className="flex justify-between items-center p-3.5 bg-slate-950 border border-slate-800/80 rounded-xl">
                    <span className="font-mono text-sm text-slate-300 capitalize">{tag.replace(/_/g, ' ')}</span>
                    <span className={`text-sm font-bold px-2.5 py-1 rounded-lg ${pct >= 70 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800/50' : 'bg-rose-950 text-rose-400 border border-rose-800/50'}`}>
                      {pct}% ({data.correct}/{data.total})
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={reset}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              Back to Topic Selection
            </button>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold">{currentQuestion.topic}</span>
              <span className="text-xs text-slate-500 font-mono">Tag: {currentQuestion.conceptTag}</span>
            </div>

            <VisualAsset type={currentQuestion.visualType || 'kinematics_vt'} />

            <p className="mb-5 text-base text-slate-200 leading-relaxed font-medium">{currentQuestion.prompt}</p>

            <div className="grid gap-2.5">
              {currentQuestion.options.map((opt, i) => {
                let btnStyle = "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50";
                if (selectedOption !== null) {
                  if (i === currentQuestion.correctAnswer) {
                    btnStyle = "bg-emerald-950/80 border-emerald-600 text-emerald-200 font-medium";
                  } else if (i === selectedOption) {
                    btnStyle = "bg-rose-950/80 border-rose-600 text-rose-200";
                  } else {
                    btnStyle = "opacity-50 bg-slate-950 border-slate-900 text-slate-500";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={selectedOption !== null}
                    onClick={() => handleAnswer(i)}
                    className={`p-3.5 border rounded-xl text-left transition-all flex items-start gap-3.5 ${btnStyle}`}
                  >
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 mt-0.5">
                      {OPTION_LETTERS[i]}
                    </span>
                    <span className="text-sm leading-normal flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {feedback && (
              <div className="mt-5 p-4 bg-slate-950 border border-slate-800 rounded-xl animate-fadeIn">
                <p className="mb-3 text-sm text-slate-300 leading-relaxed">{feedback}</p>
                <button
                  onClick={nextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2.5 rounded-lg transition-all shadow-md"
                >
                  {currentIdx < topicQuestions.length - 1 ? 'Next Question →' : 'View Report Card →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
