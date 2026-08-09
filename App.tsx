import React, { useState } from 'react';
import { QUESTION_BANK, TOPICS } from './questions';
import { VisualAsset } from './VisualAsset';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'];

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<{ [tag: string]: { correct: number; total: number } }>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const topicQuestions = QUESTION_BANK.filter((q) => q.topic === selectedTopic);
  const currentQuestion = topicQuestions[currentIdx];

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerChecked(true);

    const isCorrect = selectedOption === currentQuestion.correctAnswer;
    const tag = currentQuestion.conceptTag;

    setResults((prev) => ({
      ...prev,
      [tag]: {
        correct: (prev[tag]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[tag]?.total || 0) + 1,
      },
    }));
  };

  const nextQuestion = () => {
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setShowExplanation(false);
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
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setShowExplanation(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-6 flex flex-col items-center font-sans">
      <div className="w-full max-w-3xl bg-white border border-slate-200 rounded-xl shadow-sm p-8">
        
        {/* Header */}
        <header className="mb-6 flex justify-between items-center border-b border-slate-100 pb-4">
          <h1 className="text-xl font-bold text-slate-800">AP Physics 1 Mastery Assessment</h1>
          {selectedTopic && !isFinished && (
            <span className="text-xs font-semibold uppercase px-3 py-1 bg-slate-100 rounded-full text-slate-600">
              Question {currentIdx + 1} of {topicQuestions.length}
            </span>
          )}
        </header>

        {!selectedTopic ? (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Select an Exam Topic:</h2>
            <div className="grid gap-3">
              {TOPICS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className="p-4 bg-white border border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50/30 text-left transition-all font-medium shadow-sm flex justify-between items-center text-slate-700"
                >
                  <span>{t}</span>
                  <span className="text-blue-600 text-sm font-semibold">Start Exam →</span>
                </button>
              ))}
            </div>
          </div>
        ) : isFinished ? (
          <div>
            <h2 className="text-2xl font-bold mb-2 text-slate-800">Assessment Report Card</h2>
            <p className="text-sm text-slate-500 mb-6">Performance summary for {selectedTopic}:</p>
            <div className="grid gap-3 mb-6">
              {Object.entries(results).map(([tag, data]) => {
                const pct = Math.round((data.correct / data.total) * 100);
                return (
                  <div key={tag} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <span className="font-mono text-sm text-slate-700 capitalize">{tag.replace(/_/g, ' ')}</span>
                    <span className={`text-sm font-bold px-3 py-1 rounded-md ${pct >= 70 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                      {pct}% ({data.correct}/{data.total})
                    </span>
                  </div>
                );
              })}
            </div>
            <button
              onClick={reset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow"
            >
              Return to Topic Selection
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold">Question {currentIdx + 1}</span>
              <p className="mt-2 text-base text-slate-800 leading-relaxed font-normal">{currentQuestion.prompt}</p>
            </div>

            {/* Visual Graph Box matching Exam Generator style */}
            <div className="my-6">
              <h3 className="text-center text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                Q{currentIdx + 1} Visual Model: {currentQuestion.topic}
              </h3>
              <VisualAsset type={currentQuestion.visualType || 'kinematics_vt'} />
            </div>

            {/* Options layout matching Exam Generator */}
            <div className="mt-6 mb-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Choose Your Answer (Q{currentIdx + 1}):</h4>
              <div className="grid gap-2.5">
                {currentQuestion.options.map((opt, i) => {
                  let optionStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50";
                  if (isAnswerChecked) {
                    if (i === currentQuestion.correctAnswer) {
                      optionStyle = "border-emerald-500 bg-emerald-50/50 text-emerald-900 font-medium";
                    } else if (i === selectedOption) {
                      optionStyle = "border-rose-300 bg-rose-50/30 text-rose-900";
                    }
                  } else if (selectedOption === i) {
                    optionStyle = "border-blue-500 bg-blue-50/30 text-blue-900";
                  }

                  return (
                    <label
                      key={i}
                      className={`flex items-start gap-3 p-3.5 border rounded-lg cursor-pointer transition-all ${optionStyle}`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentIdx}`}
                        disabled={isAnswerChecked}
                        checked={selectedOption === i}
                        onChange={() => setSelectedOption(i)}
                        className="mt-1 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm leading-normal">
                        <strong className="font-semibold">{OPTION_LETTERS[i]})</strong> {opt}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            {!isAnswerChecked ? (
              <button
                disabled={selectedOption === null}
                onClick={handleCheckAnswer}
                className={`mt-4 px-6 py-2.5 rounded-lg font-medium text-sm transition-all shadow-sm ${
                  selectedOption !== null
                    ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Check Answer (Q{currentIdx + 1})
              </button>
            ) : (
              <div className="mt-4 space-y-4 animate-fadeIn">
                {/* Expandable Solution Accordion */}
                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100 flex justify-between items-center text-left text-sm font-medium text-slate-700 transition-colors"
                  >
                    <span>{showExplanation ? '▾' : '▸'} View Solution & Explanation — Question {currentIdx + 1}</span>
                    <span className="text-xs text-slate-400 font-mono">{showExplanation ? 'Hide' : 'Expand'}</span>
                  </button>
                  {showExplanation && (
                    <div className="p-4 bg-white text-sm text-slate-600 border-t border-slate-200 leading-relaxed">
                      <p className="font-semibold text-slate-800 mb-1">
                        {selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect.'}
                      </p>
                      {currentQuestion.explanation}
                    </div>
                  )}
                </div>

                <button
                  onClick={nextQuestion}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow"
                >
                  {currentIdx < topicQuestions.length - 1 ? 'Next Question →' : 'View Assessment Report Card →'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
