import React, { useState } from 'react';
import { QUESTION_BANK, TOPICS, Question } from './questions';
import { VisualAsset } from './VisualAsset';

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [results, setResults] = useState<{ [tag: string]: { correct: number; total: number } }>({});
  const [feedback, setFeedback] = useState<string | null>(null);

  const topicQuestions = QUESTION_BANK.filter((q) => q.topic === selectedTopic);
  const currentQuestion = topicQuestions[currentIdx];

  const handleAnswer = (optionIdx: number) => {
    const isCorrect = optionIdx === currentQuestion.correctAnswer;
    const tag = currentQuestion.conceptTag;

    setResults((prev) => ({
      ...prev,
      [tag]: {
        correct: (prev[tag]?.correct || 0) + (isCorrect ? 1 : 0),
        total: (prev[tag]?.total || 0) + 1,
      },
    }));

    setFeedback(isCorrect ? "Correct! Well done." : `Incorrect. ${currentQuestion.explanation}`);
  };

  const nextQuestion = () => {
    setFeedback(null);
    if (currentIdx < topicQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setSelectedTopic(null);
      setCurrentIdx(0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">AP Physics 1 Mastery</h1>

      {!selectedTopic ? (
        <div>
          <h2 className="text-xl mb-4">Select a Topic:</h2>
          <div className="grid gap-2">
            {TOPICS.map((t) => (
              <button key={t} onClick={() => setSelectedTopic(t)} className="p-4 bg-slate-800 rounded hover:bg-blue-900 text-left">
                {t}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold mb-4">{currentQuestion.topic}</h2>
          <VisualAsset type={currentQuestion.visualType || 'kinematics_vt'} />
          <p className="mb-4 text-lg">{currentQuestion.prompt}</p>
          <div className="grid gap-2">
            {currentQuestion.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(i)} className="p-3 bg-slate-800 rounded hover:bg-slate-700">
                {opt}
              </button>
            ))}
          </div>
          {feedback && (
            <div className="mt-4 p-4 bg-slate-900 border border-slate-700 rounded">
              <p className="mb-2">{feedback}</p>
              <button onClick={nextQuestion} className="bg-blue-600 px-6 py-2 rounded">Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
