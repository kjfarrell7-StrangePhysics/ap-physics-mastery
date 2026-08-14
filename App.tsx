import React, { useState } from 'react';

// --- Visual Component ---
type VisualType = 'free_body_diagram' | 'kinematics_graph';
interface VisualData {
  inclineAngle?: number;
  graphType?: string;
}

const VisualAsset: React.FC<{ type: VisualType; data?: VisualData }> = ({ type, data }) => {
  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f1f5f9',
      border: '1px dashed #cbd5e1',
      borderRadius: '8px',
      margin: '12px 0',
      textAlign: 'center',
      color: '#475569',
      fontSize: '0.9rem'
    }}>
      📊 [Interactive Physics Visual: {type} {data ? JSON.stringify(data) : ''}]
    </div>
  );
};

// --- Data Types ---
interface Question {
  id: string;
  topicId: string;
  prompt: string;
  options: string[];
  correct_idx: number;
  explanation: string;
  visualType?: VisualType;
  visualData?: VisualData;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

const TOPICS: Topic[] = [
  {
    id: 'topic_1',
    title: 'Topic 1: Mathematical & Analytical Tools for AP Physics 1',
    description: 'Mastery of algebraic rearrangement, vector decomposition, unit analysis, and proportional reasoning required for success across all AP Physics 1 units.',
    questions: [
      {
        id: 't1_q1',
        topicId: 'topic_1',
        prompt: 'Solve algebraically for the acceleration (a) in the kinematic equation: d = v₀t + ½at²',
        options: [
          'a = (d - v₀t) / 2t²',
          'a = 2(d - v₀t) / t²',
          'a = (d / t²) - v₀',
          'a = (2d / t) - 2v₀'
        ],
        correct_idx: 1,
        explanation: 'Subtract v₀t from both sides, then multiply by 2 and divide by t² to isolate a.'
      },
      {
        id: 't1_q2',
        topicId: 'topic_1',
        prompt: 'A vector F has a magnitude of 50 N and acts at an angle of 30° above the horizontal. What is the magnitude of the horizontal component Fₓ?',
        options: [
          '50 sin(30°) ≈ 25 N',
          '50 cos(30°) ≈ 43.3 N',
          '50 tan(30°) ≈ 28.9 N',
          '50 / cos(30°) ≈ 57.7 N'
        ],
        correct_idx: 1,
        explanation: 'The horizontal component is given by Fₓ = F cos(θ). Therefore, 50 cos(30°) ≈ 43.3 N.',
        visualType: 'free_body_diagram',
        visualData: { inclineAngle: 30 }
      },
      {
        id: 't1_q3',
        topicId: 'topic_1',
        prompt: 'If the net force acting on an object of constant mass is doubled, how does the resulting acceleration change according to Newton\'s Second Law (Fₙₑₜ = ma)?',
        options: [
          'Acceleration is halved',
          'Acceleration remains unchanged',
          'Acceleration is quadrupled',
          'Acceleration is doubled'
        ],
        correct_idx: 3,
        explanation: 'Since mass is constant, force and acceleration are directly proportional. Doubling net force doubles acceleration.'
      },
      {
        id: 't1_q4',
        topicId: 'topic_1',
        prompt: 'Convert a speed of 72 km/h into standard SI base units (m/s).',
        options: [
          '20 m/s',
          '25 m/s',
          '120 m/s',
          '7.2 m/s'
        ],
        correct_idx: 0,
        explanation: 'Divide by 3.6 to convert km/h to m/s: 72 / 3.6 = 20 m/s.'
      }
    ]
  },
  {
    id: 'topic_2',
    title: 'Topic 2: Kinematics (1D and 2D Motion)',
    description: 'Analyzing position, velocity, and acceleration graphs along with projectile motion kinematics.',
    questions: [
      {
        id: 't2_q1',
        topicId: 'topic_2',
        prompt: 'What physical quantity is represented by the slope of a velocity-time graph?',
        options: [
          'Position',
          'Displacement',
          'Acceleration',
          'Jerk'
        ],
        correct_idx: 2,
        explanation: 'The derivative of velocity with respect to time represents acceleration.',
        visualType: 'kinematics_graph',
        visualData: { graphType: 'vt' }
      },
      {
        id: 't2_q2',
        topicId: 'topic_2',
        prompt: 'An object is dropped from rest off a cliff and falls freely under gravity. What is its displacement after 3.0 s? (Neglect air resistance, use g = 9.8 m/s²)',
        options: [
          '29.4 meters',
          '44.1 meters',
          '88.2 meters',
          '14.7 meters'
        ],
        correct_idx: 1,
        explanation: 'Using d = v₀t + ½gt² where v₀ = 0: d = 0.5 * 9.8 * (3.0)² = 4.9 * 9 = 44.1 meters.'
      },
      {
        id: 't2_q3',
        topicId: 'topic_2',
        prompt: 'A projectile is launched horizontally from the top of a tower with an initial velocity of 15 m/s. How does its horizontal velocity change just before hitting the ground (ignoring air resistance)?',
        options: [
          'It increases linearly with time',
          'It decreases to zero',
          'It remains constant at 15 m/s',
          'It depends entirely on the height of the tower'
        ],
        correct_idx: 2,
        explanation: 'In ideal projectile motion, there is no horizontal acceleration (aₓ = 0), so the horizontal component of velocity remains constant throughout flight.'
      }
    ]
  },
  {
    id: 'topic_3',
    title: 'Topic 3: Newton\'s Laws of Motion (Dynamics)',
    description: 'Investigating forces, free-body diagrams, friction, tension, and Newton\'s laws in connected systems.',
    questions: [
      {
        id: 't3_q1',
        topicId: 'topic_3',
        prompt: 'A 10 kg block is pulled across a frictionless horizontal surface with a horizontal force of 30 N. What is the magnitude of the block\'s acceleration?',
        options: [
          '0.33 m/s²',
          '3.0 m/s²',
          '300 m/s²',
          '9.8 m/s²'
        ],
        correct_idx: 1,
        explanation: 'Using Newton\'s Second Law: a = Fₙₑₜ / m = 30 N / 10 kg = 3.0 m/s².',
        visualType: 'free_body_diagram'
      },
      {
        id: 't3_q2',
        topicId: 'topic_3',
        prompt: 'Which of Newton\'s laws best explains why passengers lurch forward when a moving bus abruptly brakes?',
        options: [
          'Newton\'s First Law (Inertia)',
          'Newton\'s Second Law (F = ma)',
          'Newton\'s Third Law (Action-Reaction)',
          'Universal Law of Gravitation'
        ],
        correct_idx: 0,
        explanation: 'Newton\'s First Law states that an object in motion tends to stay in motion unless acted upon by an external net force.'
      }
    ]
  }
];

const PASSING_MASTERY_SCORE = 80;

export default function App() {
  const [view, setView] = useState<'welcome' | 'assessment' | 'tutorial' | 'dashboard'>('welcome');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [unlockedTopics, setUnlockedTopics] = useState<number[]>([0]);
  const [topicProgress, setTopicProgress] = useState<Record<number, { score: number; passed: boolean }>>({});

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [scoreCount, setScoreCount] = useState(0);

  const currentTopic = TOPICS[activeTopicIndex];

  const startAssessment = (topicIdx: number) => {
    setActiveTopicIndex(topicIdx);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScoreCount(0);
    setView('assessment');
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    const isCorrect = selectedOption === currentTopic.questions[currentQIndex].correct_idx;
    if (isCorrect) setScoreCount(prev => prev + 1);
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < currentTopic.questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      const finalCorrect = scoreCount + (selectedOption === currentTopic.questions[currentQIndex].correct_idx ? 1 : 0);
      const scorePct = Math.round((finalCorrect / currentTopic.questions.length) * 100);
      const passed = scorePct >= PASSING_MASTERY_SCORE;

      setTopicProgress(prev => ({
        ...prev,
        [activeTopicIndex]: { score: scorePct, passed }
      }));

      if (passed && activeTopicIndex + 1 < TOPICS.length) {
        setUnlockedTopics(prev => Array.from(new Set([...prev, activeTopicIndex + 1])));
      }

      if (passed) {
        setView('dashboard');
      } else {
        setView('tutorial');
      }
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>⚡ AP Physics 1 Mastery Hub</h1>
        <p style={styles.subtitle}>Adaptive Diagnostic & Differentiated Learning Platform</p>
      </header>

      {/* 1. WELCOME SCREEN */}
      {view === 'welcome' && (
        <div style={styles.card}>
          <div style={styles.bannerBox}>
            <h2 style={{ margin: '0 0 10px 0', color: '#0369a1' }}>Welcome to AP Physics 1 Mastery!</h2>
            <p style={{ margin: 0, lineHeight: '1.6', color: '#334155' }}>
              The purpose of this application is to <strong>diagnose your knowledge level</strong> on core physics concepts and 
              differentiate a targeted tutorial to help you master each unit up to a <strong>4 out of 5 proficiency level</strong>. 
              Once you pass the assessment exam for a topic, you will automatically unlock and advance to the next topic in the curriculum.
            </p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ color: '#1e293b' }}>Curriculum Roadmap:</h3>
            {TOPICS.map((t, idx) => {
              const isUnlocked = unlockedTopics.includes(idx);
              const prog = topicProgress[idx];
              return (
                <div key={t.id} style={{ ...styles.roadmapItem, opacity: isUnlocked ? 1 : 0.6 }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>{t.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{t.description}</p>
                  </div>
                  {isUnlocked ? (
                    <button style={styles.primaryBtnSmall} onClick={() => startAssessment(idx)}>
                      {prog?.passed ? 'Review / Retake' : 'Start Assessment'}
                    </button>
                  ) : (
                    <span style={styles.lockedBadge}>🔒 Locked</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. ASSESSMENT EXAM SCREEN */}
      {view === 'assessment' && (
        <div style={styles.card}>
          <div style={styles.metaRow}>
            <span style={styles.badge}>{currentTopic.title}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#6b7280' }}>
              Question {currentQIndex + 1} of {currentTopic.questions.length}
            </span>
          </div>

          {currentTopic.questions[currentQIndex].visualType && (
            <VisualAsset
              type={currentTopic.questions[currentQIndex].visualType!}
              data={currentTopic.questions[currentQIndex].visualData}
            />
          )}

          <h3 style={styles.prompt}>{currentTopic.questions[currentQIndex].prompt}</h3>

          <div style={styles.optionsList}>
            {currentTopic.questions[currentQIndex].options.map((opt, idx) => {
              let btnStyle = styles.optionBtn;
              if (selectedOption === idx) btnStyle = { ...btnStyle, ...styles.optionSelected };
              if (isSubmitted) {
                if (idx === currentTopic.questions[currentQIndex].correct_idx) {
                  btnStyle = { ...btnStyle, ...styles.optionCorrect };
                } else if (selectedOption === idx) {
                  btnStyle = { ...btnStyle, ...styles.optionIncorrect };
                }
              }

              return (
                <button key={idx} style={btnStyle} onClick={() => !isSubmitted && setSelectedOption(idx)}>
                  <span style={{ fontWeight: 600, marginRight: '10px' }}>{String.fromCharCode(65 + idx)}.</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {isSubmitted && (
            <div style={styles.explanationBox}>
              <h4 style={{ margin: '0 0 6px 0', color: '#0369a1' }}>Explanation:</h4>
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155' }}>{currentTopic.questions[currentQIndex].explanation}</p>
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            {!isSubmitted ? (
              <button
                style={selectedOption !== null ? styles.primaryBtn : styles.disabledBtn}
                onClick={handleAnswerSubmit}
                disabled={selectedOption === null}
              >
                Submit Answer
              </button>
            ) : (
              <button style={styles.primaryBtn} onClick={handleNextQuestion}>
                {currentQIndex < currentTopic.questions.length - 1 ? 'Next Question →' : 'View Assessment Results'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. DIFFERENTIATED TUTORIAL SCREEN */}
      {view === 'tutorial' && (
        <div style={styles.card}>
          <div style={styles.bannerBoxWarning}>
            <h2 style={{ margin: '0 0 8px 0', color: '#b45309' }}>Targeted Tutorial & Skill Builder</h2>
            <p style={{ margin: 0, color: '#92400e', lineHeight: '1.5' }}>
              Your diagnostic score was below the 4/5 mastery threshold ({topicProgress[activeTopicIndex]?.score}%). Review the core concepts below before retaking the assessment.
            </p>
          </div>

          <div style={{ marginTop: '20px', lineHeight: '1.6', color: '#334155' }}>
            <h3 style={{ color: '#1e293b' }}>Core Concept Review: {currentTopic.title}</h3>
            <p>To achieve mastery, ensure you are comfortable with fundamental formulas, conceptual definitions, and analytical problem-solving strategies.</p>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button style={styles.primaryBtn} onClick={() => startAssessment(activeTopicIndex)}>
              Retake Assessment Exam 🔄
            </button>
            <button style={styles.secondaryBtn} onClick={() => setView('welcome')}>
              Return to Roadmap
            </button>
          </div>
        </div>
      )}

      {/* 4. DASHBOARD / ROADMAP VIEW */}
      {view === 'dashboard' && (
        <div style={styles.card}>
          <div style={styles.bannerBoxSuccess}>
            <h2 style={{ margin: '0 0 8px 0', color: '#15803d' }}>🎉 Assessment Passed! Mastery Achieved (4/5)</h2>
            <p style={{ margin: 0, color: '#166534' }}>
              You scored {topicProgress[activeTopicIndex]?.score}%. You have successfully mastered this unit and unlocked the next topic in the AP Physics 1 curriculum!
            </p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ color: '#1e293b' }}>Your Progress Roadmap:</h3>
            {TOPICS.map((t, idx) => {
              const isUnlocked = unlockedTopics.includes(idx);
              const prog = topicProgress[idx];
              return (
                <div key={t.id} style={{ ...styles.roadmapItem, opacity: isUnlocked ? 1 : 0.6 }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>{t.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{t.description}</p>
                  </div>
                  {isUnlocked ? (
                    <button style={styles.primaryBtnSmall} onClick={() => startAssessment(idx)}>
                      {prog?.passed ? 'Passed ✅' : 'Start Assessment'}
                    </button>
                  ) : (
                    <span style={styles.lockedBadge}>🔒 Locked</span>
                  )}
                </div>
              );
            })}
          </div>

          <button style={{ ...styles.secondaryBtn, width: '100%', marginTop: '20px' }} onClick={() => setView('welcome')}>
            Back to Home Overview
          </button>
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
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: '#1f2937',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  title: {
    fontSize: '2rem',
    fontWeight: '800',
    margin: 0,
    color: '#111827',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: '6px',
  },
  card: {
    backgroundColor: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
  },
  bannerBox: {
    backgroundColor: '#f0f9ff',
    border: '1px solid #bae6fd',
    borderRadius: '8px',
    padding: '20px',
  },
  bannerBoxWarning: {
    backgroundColor: '#fef3c7',
    border: '1px solid #fde68a',
    borderRadius: '8px',
    padding: '20px',
  },
  bannerBoxSuccess: {
    backgroundColor: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '8px',
    padding: '20px',
  },
  roadmapItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#f8fafc',
  },
  lockedBadge: {
    fontSize: '0.85rem',
    fontWeight: '600',
    color: '#94a3b8',
  },
  metaRow: {
    display: 'flex',
    gap: '8px',
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
  prompt: {
    fontSize: '1.15rem',
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
  primaryBtnSmall: {
    padding: '8px 14px',
    backgroundColor: '#0284c7',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  secondaryBtn: {
    padding: '12px 20px',
    backgroundColor: '#f1f5f9',
    color: '#334155',
    border: '1px solid #cbd5e1',
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
  explanationBox: {
    marginTop: '20px',
    padding: '16px',
    borderRadius: '8px',
    backgroundColor: '#f8fafc',
    borderLeft: '4px solid #0284c7',
  },
};
