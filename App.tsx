import React, { useState, useMemo, useEffect } from 'react';
import { allQuestions } from './questions';
import { allFRQs } from './frqs';
import { VisualAsset } from './VisualAsset';
import type { Question } from './questions';
import type { FRQQuestion } from './frqs';

const UNIT_NAMES: Record<number, string> = {
  1: "🚀 Unit 1: Kinematics",
  2: "📐 Unit 2: Dynamics (Forces)",
  3: "🔄 Unit 3: Circular Motion & Gravitation",
  4: "⚡ Unit 4: Work, Energy, and Power",
  5: "💥 Unit 5: Linear Momentum",
  6: "🎡 Unit 6: Torque and Rotational Motion",
  7: "🌀 Unit 7: Simple Harmonic Motion",
  8: "🔌 Unit 8: Electric Circuits",
  10: "🌊 Unit 10: Waves and Optics"
};

const QUIZ_LENGTH = 10;
const LOCAL_STORAGE_KEY = 'ap_physics_mastery_tracker_v1';

interface UnitProgress {
  attempts: number;
  bestScorePct: number;
  lastTheta: number;
  masteryPct: number;
  frqCompleted?: number;
}

interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectIdx: number;
}

function prepareShuffledQuestion(q: Question): ShuffledQuestion {
  const optionsWithIndex = q.options.map((opt, idx) => ({
    text: opt,
    isOriginalCorrect: idx === q.correct_idx,
  }));

  for (let i = optionsWithIndex.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [optionsWithIndex[i], optionsWithIndex[j]] = [optionsWithIndex[j], optionsWithIndex[i]];
  }

  const shuffledOptions = optionsWithIndex.map(o => o.text);
  const shuffledCorrectIdx = optionsWithIndex.findIndex(o => o.isOriginalCorrect);

  return { ...q, shuffledOptions, shuffledCorrectIdx };
}

function calculateProbability(theta: number, a: number, b: number): number {
  return 1 / (1 + Math.exp(-a * (theta - b)));
}

function estimateAPScore(theta: number): number {
  if (theta >= 1.2) return 5;
  if (theta >= 0.4) return 4;
  if (theta >= -0.3) return 3;
  if (theta >= -1.0) return 2;
  return 1;
}

function thetaToMasteryPct(theta: number, scorePct: number): number {
  const thetaScaled = Math.min(Math.max(((theta + 2) / 4) * 100, 0), 100);
  return Math.round(thetaScaled * 0.6 + scorePct * 0.4);
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'practice' | 'frq'>('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<number | null>(null);
  
  // Progress tracker state
  const [unitProgress, setUnitProgress] = useState<Record<number, UnitProgress>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* fallback */ }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(unitProgress));
  }, [unitProgress]);

  // Quiz execution state
  const [quizQuestions, setQuizQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [currentTheta, setCurrentTheta] = useState(0.0);
  const [sessionAnswers, setSessionAnswers] = useState<{ correct: boolean; a: number; b: number }[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // FRQ State
  const [activeFRQId, setActiveFRQId] = useState<string | null>(null);
  const [frqResponses, setFrqResponses] = useState<Record<string, string>>({});
  const [revealedRubrics, setRevealedRubrics] = useState<Record<string, boolean>>({});
  const [rubricScores, setRubricScores] = useState<Record<string, Record<string, boolean>>>({});

  const startQuiz = (unitNum: number) => {
    const unitPool = allQuestions.filter(q => q.unit === unitNum);
    if (unitPool.length === 0) {
      alert("No questions available for this unit yet.");
      return;
    }
    // Shuffle and pick subset
    const shuffled = [...unitPool].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, QUIZ_LENGTH).map(prepareShuffledQuestion);
    
    setQuizQuestions(selected);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCurrentTheta(0.0);
    setSessionAnswers([]);
    setQuizCompleted(false);
    setSelectedUnit(unitNum);
    setActiveTab('practice');
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const currentQ = quizQuestions[currentIndex];
    const isCorrect = selectedOption === currentQ.shuffledCorrectIdx;
    
    // Bayesian / IRT Theta update approximation
    const p = calculateProbability(currentTheta, currentQ.discrimination_a, currentQ.difficulty_b);
    const step = 0.4 / currentQ.discrimination_a;
    const newTheta = isCorrect ? currentTheta + step * (1 - p) : currentTheta - step * p;

    setCurrentTheta(newTheta);
    setSessionAnswers(prev => [...prev, { correct: isCorrect, a: currentQ.discrimination_a, b: currentQ.difficulty_b }]);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
      // Save progress
      if (selectedUnit !== null) {
        const correctCount = sessionAnswers.filter(ans => ans.correct).length + (selectedOption === quizQuestions[currentIndex].shuffledCorrectIdx ? 1 : 0);
        const scorePct = Math.round((correctCount / quizQuestions.length) * 100);
        const mastery = thetaToMasteryPct(currentTheta, scorePct);

        setUnitProgress(prev => {
          const existing = prev[selectedUnit] || { attempts: 0, bestScorePct: 0, lastTheta: 0, masteryPct: 0 };
          return {
            ...prev,
            [selectedUnit]: {
              attempts: existing.attempts + 1,
              bestScorePct: Math.max(existing.bestScorePct, scorePct),
              lastTheta: currentTheta,
              masteryPct: Math.max(existing.masteryPct, mastery),
            }
          };
        });
      }
    }
  };

  const overallMastery = useMemo(() => {
    const units = Object.values(unitProgress);
    if (units.length === 0) return 0;
    const sum = units.reduce((acc, u) => acc + u.masteryPct, 0);
    return Math.round(sum / 9);
  }, [unitProgress]);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>⚡ AP Physics Adaptive Mastery Hub</h1>
        <p style={styles.subtitle}>AI-Powered Diagnostic Testing, IRT Proficiency Tracking, & AP Exam Prep</p>
        
        <div style={styles.tabBar}>
          <button style={activeTab === 'dashboard' ? styles.tabActive : styles.tabInactive} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard & Units
          </button>
          <button style={activeTab === 'frq' ? styles.tabActive : styles.tabInactive} onClick={() => setActiveTab('frq')}>
            📝 FRQ Practice Studio
          </button>
        </div>
      </header>

      {/* DASHBOARD TAB */}
      {activeTab === 'dashboard' && (
        <div>
          <div style={styles.scoreBox}>
            <p style={styles.scoreText}>Overall Course Mastery: <strong>{overallMastery}%</strong></p>
            <p style={styles.apScoreText}>Predicted AP Exam Score: <strong>{estimateAPScore(currentTheta)} / 5</strong></p>
          </div>

          <div style={styles.infoBox}>
            <p style={{ margin: 0, fontWeight: 600 }}>Select any AP Physics unit below to launch an adaptive diagnostic quiz tailored to your current proficiency level.</p>
          </div>

          <div style={styles.unitList}>
            {Object.entries(UNIT_NAMES).map(([uNumStr, uName]) => {
              const uNum = parseInt(uNumStr);
              const prog = unitProgress[uNum];
              const mastery = prog ? prog.masteryPct : 0;

              return (
                <div key={uNum} style={styles.unitBtn} onClick={() => startQuiz(uNum)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 600 }}>{uName}</span>
                      <span style={styles.masteryTextInactive}>{mastery}% Mastery</span>
                    </div>
                    <div style={styles.miniProgressTrack}>
                      <div style={{ ...styles.miniProgressBar, width: `${mastery}%`, backgroundColor: '#0284c7' }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PRACTICE QUIZ TAB */}
      {activeTab === 'practice' && !quizCompleted && quizQuestions.length > 0 && (
        <div style={styles.card}>
          <div style={styles.metaRow}>
            <span style={styles.badge}>Unit {selectedUnit}</span>
            <span style={styles.topicTag}>{quizQuestions[currentIndex].topic}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#6b7280' }}>
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
          </div>

          <div style={styles.progressContainer}>
            <div style={{ ...styles.progressBar, width: `${((currentIndex + 1) / quizQuestions.length) * 100}%` }} />
          </div>

          {quizQuestions[currentIndex].visualType && (
            <VisualAsset
              type={quizQuestions[currentIndex].visualType!}
              data={quizQuestions[currentIndex].visualData}
            />
          )}

          <h3 style={styles.prompt}>{quizQuestions[currentIndex].prompt}</h3>

          <div style={styles.optionsList}>
            {quizQuestions[currentIndex].shuffledOptions.map((opt, idx) => {
              let btnStyle = styles.optionBtn;
              if (selectedOption === idx) btnStyle = { ...btnStyle, ...styles.optionSelected };
              if (isAnswerSubmitted) {
                if (idx === quizQuestions[currentIndex].shuffledCorrectIdx) {
                  btnStyle = { ...btnStyle, ...styles.optionCorrect };
                } else if (selectedOption === idx) {
                  btnStyle = { ...btnStyle, ...styles.optionIncorrect };
                }
              }

              return (
                <button key={idx} style={btnStyle} onClick={() => handleSelectOption(idx)}>
                  <span style={{ fontWeight: 600, marginRight: '10px' }}>{String.fromCharCode(65 + idx)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {isAnswerSubmitted && (
            <div style={styles.explanationBox}>
              <h4 style={styles.explanationTitle}>Explanation:</h4>
              <p style={styles.explanationBody}>{quizQuestions[currentIndex].explanation}</p>
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            {!isAnswerSubmitted ? (
              <button
                style={selectedOption !== null ? styles.primaryBtn : styles.disabledBtn}
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
              >
                Submit Answer
              </button>
            ) : (
              <button style={styles.primaryBtn} onClick={handleNextQuestion}>
                {currentIndex < quizQuestions.length - 1 ? 'Next Question →' : 'View Quiz Results'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* QUIZ COMPLETED SCREEN */}
      {activeTab === 'practice' && quizCompleted && (
        <div style={styles.card}>
          <h2 style={{ textAlign: 'center', color: '#0f172a' }}>🎉 Diagnostic Quiz Completed!</h2>
          <div style={styles.scoreBox}>
            <p style={styles.scoreText}>
              Estimated Ability Level ($\theta$): <strong>{currentTheta.toFixed(2)}</strong>
            </p>
            <p style={styles.apScoreText}>
              Projected AP Exam Score: <strong>{estimateAPScore(currentTheta)} / 5</strong>
            </p>
          </div>
          <button style={styles.primaryBtn} onClick={() => setActiveTab('dashboard')}>
            Return to Dashboard
          </button>
        </div>
      )}

      {/* FRQ PRACTICE STUDIO TAB */}
      {activeTab === 'frq' && (
        <div>
          {!activeFRQId ? (
            <div>
              <div style={styles.infoBox}>
                <p style={{ margin: 0, fontWeight: 600 }}>AP Physics Free-Response Questions (FRQs) requiring multi-step derivations, graphing, and qualitative-quantitative translation.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {allFRQs.map(frq => (
                  <div key={frq.id} style={styles.frqCardItem}>
                    <div>
                      <span style={styles.badge}>Unit {frq.unit}</span>
                      <h4 style={{ margin: '6px 0 0 0', color: '#1e293b' }}>{frq.title}</h4>
                    </div>
                    <button style={styles.frqStartBtn} onClick={() => setActiveFRQId(frq.id)}>
                      Practice FRQ →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            (() => {
              const frq = allFRQs.find(f => f.id === activeFRQId)!;
              return (
                <div style={styles.card}>
                  <button style={styles.navBtn} onClick={() => setActiveFRQId(null)}>← Back to FRQ List</button>
                  <h3 style={{ margin: '16px 0 8px 0', color: '#0f172a' }}>{frq.title}</h3>
                  <div style={styles.scenarioBlock}>
                    <p style={{ margin: 0 }}><strong>Scenario:</strong> {frq.scenario}</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                    {frq.parts.map(part => {
                      const partKey = `${frq.id}_${part.partId}`;
                      const isRevealed = revealedRubrics[partKey];

                      return (
                        <div key={part.partId} style={styles.frqPartBox}>
                          <p style={{ fontWeight: 600, color: '#1e293b', marginTop: 0 }}>Part ({part.partId}): {part.prompt}</p>
                          <textarea
                            style={styles.frqTextarea}
                            rows={4}
                            placeholder="Type your derivation or explanation here..."
                            value={frqResponses[partKey] || ''}
                            onChange={(e) => setFrqResponses({ ...frqResponses, [partKey]: e.target.value })}
                          />

                          <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <button
                              style={styles.submitBtn}
                              onClick={() => setRevealedRubrics({ ...revealedRubrics, [partKey]: true })}
                            >
                              Check Rubric
                            </button>
                          </div>

                          {isRevealed && (
                            <div style={styles.rubricBox}>
                              <p style={{ margin: '0 0 6px 0', fontWeight: 700, color: '#166534' }}>Scoring Guidelines & Sample Answer:</p>
                              <p style={styles.sampleAnswerText}>{part.sampleAnswer}</p>
                              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '0.85rem', color: '#166534' }}>
                                {part.rubricPoints.map((pt, i) => (
                                  <li key={i}>{pt}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '850px',
    margin: '0 auto',
    padding: '24px 16px',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '2.1rem',
    fontWeight: '800',
    margin: 0,
    color: '#111827',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: '6px',
    fontSize: '1rem',
  },
  tabBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '8px',
    marginTop: '16px',
  },
  tabActive: {
    padding: '8px 18px',
    borderRadius: '20px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 2px 4px rgba(2, 132, 199, 0.25)',
  },
  tabInactive: {
    padding: '8px 18px',
    borderRadius: '20px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #cbd5e1',
    fontWeight: '500',
    fontSize: '0.9rem',
    cursor: 'pointer',
  },
  unitList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '20px',
  },
  unitBtn: {
    display: 'flex',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#374151',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'all 0.15s ease',
  },
  masteryTextInactive: {
    fontSize: '0.8rem',
    fontWeight: '700',
    color: '#0284c7',
  },
  miniProgressTrack: {
    height: '4px',
    backgroundColor: 'rgba(0,0,0,0.08)',
    borderRadius: '2px',
    overflow: 'hidden',
    marginTop: '4px',
  },
  miniProgressBar: {
    height: '100%',
    transition: 'width 0.3s ease',
  },
  infoBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    padding: '16px',
    borderRadius: '8px',
    color: '#0369a1',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
  },
  metaRow: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '14px',
  },
  badge: {
    backgroundColor: '#0284c7',
    color: '#ffffff',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '700',
  },
  topicTag: {
    backgroundColor: '#f1f5f9',
    color: '#334155',
    padding: '4px 10px',
    borderRadius: '6px',
    fontSize: '0.8rem',
    fontWeight: '500',
  },
  progressContainer: {
    height: '6px',
    backgroundColor: '#e5e7eb',
    borderRadius: '3px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0284c7',
    transition: 'width 0.3s ease',
  },
  prompt: {
    fontSize: '1.2rem',
    fontWeight: '600',
    margin: '16px 0',
    color: '#111827',
  },
  optionsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    margin: '20px 0',
  },
  optionBtn: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    backgroundColor: '#ffffff',
    color: '#1f2937',
    cursor: 'pointer',
    textAlign: 'left',
    fontSize: '0.95rem',
    transition: 'all 0.15s ease',
  },
  optionSelected: {
    border: '2px solid #0284c7',
    backgroundColor: '#f0f9ff',
  },
  optionCorrect: {
    border: '2px solid #16a34a',
    backgroundColor: '#f0fdf4',
    color: '#15803d',
  },
  optionIncorrect: {
    border: '2px solid #dc2626',
    backgroundColor: '#fef2f2',
    color: '#b91c1c',
  },
  primaryBtn: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  disabledBtn: {
    width: '100%',
    padding: '12px 20px',
    backgroundColor: '#e2e8f0',
    color: '#94a3b8',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    fontSize: '1rem',
    cursor: 'not-allowed',
  },
  submitBtn: {
    padding: '10px 20px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  navBtn: {
    padding: '8px 14px',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  explanationBox: {
    marginTop: '20px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    borderLeft: '4px solid #0284c7',
  },
  explanationTitle: {
    margin: '0 0 6px 0',
    fontSize: '1rem',
    fontWeight: '700',
  },
  explanationBody: {
    margin: 0,
    fontSize: '0.95rem',
    color: '#334155',
    lineHeight: '1.5',
  },
  scoreBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '20px',
    textAlign: 'center',
    margin: '16px 0',
  },
  scoreText: {
    fontSize: '1.2rem',
    margin: 0,
    color: '#0369a1',
  },
  apScoreText: {
    fontSize: '1.1rem',
    margin: '8px 0 0 0',
    color: '#0c4a6e',
  },
  frqCardItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    gap: '16px',
  },
  frqStartBtn: {
    padding: '8px 14px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  scenarioBlock: {
    margin: 0,
    padding: '12px 16px',
    backgroundColor: '#f8fafc',
    borderLeft: '4px solid #0284c7',
    borderRadius: '0 8px 8px 0',
    fontSize: '0.95rem',
    color: '#334155',
  },
  frqPartBox: {
    padding: '16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: '#ffffff',
  },
  frqTextarea: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #cbd5e1',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    resize: 'vertical',
    boxSizing: 'border-box',
  },
  rubricBox: {
    marginTop: '16px',
    padding: '14px',
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
  },
  sampleAnswerText: {
    fontSize: '0.9rem',
    color: '#166534',
    fontStyle: 'italic',
    backgroundColor: '#ffffff',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #dcfce7',
    marginTop: '4px',
  },
};
