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
  variantQuestions: Question[];
}

const TOPICS: Topic[] = [
  {
    id: 'topic_1',
    title: 'Topic 1: Mathematical & Analytical Tools for AP Physics 1',
    description: 'Mastery of algebraic rearrangement, vector decomposition, unit analysis, and proportional reasoning.',
    questions: [
      {
        id: 't1_q1',
        topicId: 'topic_1',
        prompt: 'Solve algebraically for the acceleration (a) in the kinematic equation: d = v₀t + ½at²',
        options: ['a = (d - v₀t) / 2t²', 'a = 2(d - v₀t) / t²', 'a = (d / t²) - v₀', 'a = (2d / t) - 2v₀'],
        correct_idx: 1,
        explanation: 'Subtract v₀t from both sides, then multiply by 2 and divide by t² to isolate a.'
      },
      {
        id: 't1_q2',
        topicId: 'topic_1',
        prompt: 'A vector F has a magnitude of 50 N and acts at an angle of 30° above the horizontal. What is the magnitude of the horizontal component Fₓ?',
        options: ['50 sin(30°) ≈ 25 N', '50 cos(30°) ≈ 43.3 N', '50 tan(30°) ≈ 28.9 N', '50 / cos(30°) ≈ 57.7 N'],
        correct_idx: 1,
        explanation: 'The horizontal component is given by Fₓ = F cos(θ). Therefore, 50 cos(30°) ≈ 43.3 N.'
      },
      {
        id: 't1_q3',
        topicId: 'topic_1',
        prompt: 'If the net force acting on an object of constant mass is doubled, how does the resulting acceleration change according to Newton\'s Second Law (Fₙₑₜ = ma)?',
        options: ['Acceleration is halved', 'Acceleration remains unchanged', 'Acceleration is quadrupled', 'Acceleration is doubled'],
        correct_idx: 3,
        explanation: 'Since mass is constant, force and acceleration are directly proportional. Doubling net force doubles acceleration.'
      },
      {
        id: 't1_q4',
        topicId: 'topic_1',
        prompt: 'Convert a speed of 72 km/h into standard SI base units (m/s).',
        options: ['20 m/s', '25 m/s', '120 m/s', '7.2 m/s'],
        correct_idx: 0,
        explanation: 'Divide by 3.6 to convert km/h to m/s: 72 / 3.6 = 20 m/s.'
      }
    ],
    variantQuestions: [
      {
        id: 't1_q1_v',
        topicId: 'topic_1',
        prompt: 'Solve algebraically for the initial velocity (v₀) in the kinematic equation: d = v₀t + ½at²',
        options: ['v₀ = (d - ½at²) / t', 'v₀ = (d + ½at²) / t', 'v₀ = dt - ½at', 'v₀ = d / (t + ½at²)'],
        correct_idx: 0,
        explanation: 'Subtract ½at² from both sides, then divide by t to isolate v₀.'
      },
      {
        id: 't1_q2_v',
        topicId: 'topic_1',
        prompt: 'A vector T has a magnitude of 100 N and acts at an angle of 60° above the horizontal. What is the magnitude of its vertical component Tᵧ?',
        options: ['100 cos(60°) = 50 N', '100 sin(60°) ≈ 86.6 N', '100 tan(60°) ≈ 173.2 N', '100 / sin(60°) ≈ 115.4 N'],
        correct_idx: 1,
        explanation: 'The vertical component uses the sine function: Tᵧ = T sin(60°) ≈ 86.6 N.'
      },
      {
        id: 't1_q3_v',
        topicId: 'topic_1',
        prompt: 'If the mass of an object is tripled while the net force acting on it remains constant, how does its acceleration change?',
        options: ['Acceleration is tripled', 'Acceleration is unchanged', 'Acceleration is cut to one-third (⅓)', 'Acceleration is multiplied by nine'],
        correct_idx: 2,
        explanation: 'Acceleration is inversely proportional to mass (a = F / m). Tripling the mass reduces acceleration by a factor of 3.'
      },
      {
        id: 't1_q4_v',
        topicId: 'topic_1',
        prompt: 'Convert an acceleration of 18 km/h·s into standard SI base units (m/s²).',
        options: ['5 m/s²', '0.5 m/s²', '64.8 m/s²', '180 m/s²'],
        correct_idx: 0,
        explanation: 'Convert km/h to m/s by dividing by 3.6: 18 / 3.6 = 5 m/s².'
      }
    ]
  },
  {
    id: 'topic_2_measurement',
    title: 'Topic 2: Measurement, Uncertainty, and Data Linearization',
    description: 'Mastering measurement precision, uncertainty propagation, data linearization, and best-fit line analysis.',
    questions: [
      {
        id: 'meas_q1',
        topicId: 'topic_2_measurement',
        prompt: 'When using a metric ruler with millimeter markings, to what decimal place should a measurement be recorded?',
        options: ['To the nearest millimeter', 'To the tenth of a millimeter by estimating one uncertain digit', 'To the nearest centimeter', 'To the nearest half-millimeter only'],
        correct_idx: 1,
        explanation: 'Scientific convention requires recording all certain scale digits plus one estimated uncertain digit.'
      },
      {
        id: 'meas_q2',
        topicId: 'topic_2_measurement',
        prompt: 'The period (T) of a pendulum is T = 2π√(L/g). To linearize experimental data of T versus L, what graph should be plotted?',
        options: ['T vs L²', 'T² vs L', 'T vs √L', '1/T vs L'],
        correct_idx: 1,
        explanation: 'Squaring both sides gives T² = (4π²/g)L, creating a linear relationship T² vs L (y = mx).'
      },
      {
        id: 'meas_q3',
        topicId: 'topic_2_measurement',
        prompt: 'A best-fit line for position vs. time squared yields y = (3.5 m/s²)x + 0.1 m. If the theoretical equation is x = ½at², what does the slope represent?',
        options: ['The acceleration (a)', 'Half of the acceleration (½a)', 'Twice the acceleration (2a)', 'Initial velocity (v₀)'],
        correct_idx: 2,
        explanation: 'Comparing y = mx + b to x = ½at², the slope represents ½a, meaning a is twice the slope (7.0 m/s²).'
      },
      {
        id: 'meas_q4',
        topicId: 'topic_2_measurement',
        prompt: 'Mass is measured as 50.0 g ± 0.5 g and volume as 10.0 cm³ ± 0.2 cm³. When calculating density (ρ = m/V), what happens to relative uncertainties?',
        options: ['They are subtracted', 'They are multiplied', 'They are added together', 'They are averaged'],
        correct_idx: 2,
        explanation: 'When multiplying or dividing experimental values with uncertainties, their percentage/relative uncertainties add together.'
      }
    ],
    variantQuestions: [
      {
        id: 'meas_q1_v',
        topicId: 'topic_2_measurement',
        prompt: 'A digital stopwatch measures time to the hundredths place (e.g., 12.45 s). What does this imply about the measurement?',
        options: ['It has zero uncertainty', 'The final digit (5) is an estimated uncertain digit', 'The instrument only reads to the tenths place', 'The true time is guaranteed to be exact'],
        correct_idx: 1,
        explanation: 'The last digit displayed on a measuring instrument represents the technician\'s or instrument\'s estimated uncertain digit.'
      },
      {
        id: 'meas_q2_v',
        topicId: 'topic_2_measurement',
        prompt: 'For an object moving at constant acceleration from rest, x = ½at² is evaluated. To linearize position (x) as a function of time (t), what should be plotted?',
        options: ['x vs t', 'x vs t²', '√x vs t', '1/x vs t'],
        correct_idx: 1,
        explanation: 'Plotting position (x) on the vertical axis and time squared (t²) on the horizontal axis produces a straight line with slope ½a.'
      },
      {
        id: 'meas_q3_v',
        topicId: 'topic_2_measurement',
        prompt: 'In an experiment graphing force (F) versus stretch distance (x) for a spring, the slope of the best-fit line is 25 N/m. What physical parameter does this slope represent?',
        options: ['Spring constant (k)', 'Potential energy (U)', 'Mass attached (m)', 'Work done (W)'],
        correct_idx: 0,
        explanation: 'Hooke\'s Law is F = kx. Plotting F on the vertical axis and x on the horizontal axis yields a slope equal to the spring constant k.'
      },
      {
        id: 'meas_q4_v',
        topicId: 'topic_2_measurement',
        prompt: 'Radius is measured with a 3% relative uncertainty. When calculating the area of a circle (A = πr²), what is the approximate relative uncertainty in the calculated area?',
        options: ['3%', '6%', '9%', '1.5%'],
        correct_idx: 1,
        explanation: 'Since A = πr * r, the relative uncertainties of multiplied terms add: 3% + 3% = 6% (or using exponents, 2 * 3% = 6%).'
      }
    ]
  },
  {
    id: 'topic_3',
    title: 'Topic 3: Kinematics (1D and 2D Motion)',
    description: 'Analyzing position, velocity, and acceleration graphs along with projectile motion kinematics.',
    questions: [
      {
        id: 't3_q1',
        topicId: 'topic_3',
        prompt: 'What physical quantity is represented by the slope of a velocity-time graph?',
        options: ['Position', 'Displacement', 'Acceleration', 'Jerk'],
        correct_idx: 2,
        explanation: 'The derivative of velocity with respect to time represents acceleration.'
      },
      {
        id: 't3_q2',
        topicId: 'topic_3',
        prompt: 'An object is dropped from rest off a cliff and falls freely. What is its displacement after 3.0 s? (g = 9.8 m/s²)',
        options: ['29.4 m', '44.1 m', '88.2 m', '14.7 m'],
        correct_idx: 1,
        explanation: 'Using d = ½gt² = 0.5 * 9.8 * (3.0)² = 44.1 meters.'
      },
      {
        id: 't3_q3',
        topicId: 'topic_3',
        prompt: 'A projectile is launched horizontally at 15 m/s from a tower. How does its horizontal velocity change just before impact?',
        options: ['Increases linearly', 'Decreases to zero', 'Remains constant at 15 m/s', 'Depends on tower height'],
        correct_idx: 2,
        explanation: 'With no horizontal forces or acceleration (aₓ = 0), horizontal velocity remains constant.'
      }
    ],
    variantQuestions: [
      {
        id: 't3_q1_v',
        topicId: 'topic_3',
        prompt: 'What physical quantity is represented by the area under a velocity-time graph between two time points?',
        options: ['Acceleration', 'Displacement', 'Instantaneous speed', 'Change in acceleration'],
        correct_idx: 1,
        explanation: 'Integrating velocity over time (the area under a v-t graph) yields displacement.'
      },
      {
        id: 't3_q2_v',
        topicId: 'topic_3',
        prompt: 'A ball is thrown straight upward with an initial velocity of 20 m/s. What is its instantaneous acceleration at the very top of its trajectory? (g = 9.8 m/s²)',
        options: ['0 m/s²', '9.8 m/s² downward', '9.8 m/s² upward', '20 m/s²'],
        correct_idx: 1,
        explanation: 'Even though velocity is momentarily zero at the peak, gravity continues to act on the object constantly at 9.8 m/s² downward.'
      },
      {
        id: 't3_q3_v',
        topicId: 'topic_3',
        prompt: 'Two identical balls are released simultaneously: Ball A is dropped straight down, while Ball B is shot horizontally off the same ledge. Which ball hits the ground first (ignoring air resistance)?',
        options: ['Ball A', 'Ball B', 'They hit at the exact same time', 'Depends on launch speed'],
        correct_idx: 2,
        explanation: 'Vertical and horizontal motions are independent. Both fall the same vertical height under the same vertical gravity acceleration, so they land simultaneously.'
      }
    ]
  },
  {
    id: 'topic_4',
    title: 'Topic 4: Newton\'s Laws of Motion (Dynamics)',
    description: 'Investigating forces, free-body diagrams, friction, tension, and Newton\'s laws in connected systems.',
    questions: [
      {
        id: 't4_q1',
        topicId: 'topic_4',
        prompt: 'A 10 kg block is pulled across a frictionless horizontal surface with a horizontal force of 30 N. What is the magnitude of acceleration?',
        options: ['0.33 m/s²', '3.0 m/s²', '300 m/s²', '9.8 m/s²'],
        correct_idx: 1,
        explanation: 'Using Newton\'s Second Law: a = F / m = 30 N / 10 kg = 3.0 m/s².'
      },
      {
        id: 't4_q2',
        topicId: 'topic_4',
        prompt: 'Which law explains why passengers lurch forward when a moving bus abruptly brakes?',
        options: ['Newton\'s First Law', 'Newton\'s Second Law', 'Newton\'s Third Law', 'Law of Gravitation'],
        correct_idx: 0,
        explanation: 'Newton\'s First Law (Inertia) states objects in motion tend to stay in motion unless acted on by an external net force.'
      }
    ],
    variantQuestions: [
      {
        id: 't4_q1_v',
        topicId: 'topic_4',
        prompt: 'A 5 kg box experiences a net force of 20 N. What is its acceleration?',
        options: ['100 m/s²', '4.0 m/s²', '0.25 m/s²', '9.8 m/s²'],
        correct_idx: 1,
        explanation: 'Using a = F / m = 20 N / 5 kg = 4.0 m/s².'
      },
      {
        id: 't4_q2_v',
        topicId: 'topic_4',
        prompt: 'When a hammer exerts a force on a nail, what does Newton\'s Third Law say about the force the nail exerts on the hammer?',
        options: ['The nail exerts zero force', 'The nail exerts a smaller force', 'The nail exerts an equal and opposite force', 'The nail exerts a greater force'],
        correct_idx: 2,
        explanation: 'Newton\'s Third Law dictates that forces always occur in equal and opposite action-reaction pairs between two interacting objects.'
      }
    ]
  }
];

const PASSING_MASTERY_SCORE = 80;

export default function App() {
  const [view, setView] = useState<'welcome' | 'assessment' | 'review' | 'dashboard'>('welcome');
  const [activeTopicIndex, setActiveTopicIndex] = useState(0);
  const [unlockedTopics, setUnlockedTopics] = useState<number[]>([0]);
  const [topicProgress, setTopicProgress] = useState<Record<number, { score: number; passed: boolean }>>({});
  
  // Track whether we are using primary questions or variant questions for retakes
  const [useVariants, setUseVariants] = useState<Record<number, boolean>>({});

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const currentTopicObj = TOPICS[activeTopicIndex];
  const activeQuestions = useVariants[activeTopicIndex] 
    ? currentTopicObj.variantQuestions 
    : currentTopicObj.questions;

  const startAssessment = (topicIdx: number, retakeWithVariant = false) => {
    setActiveTopicIndex(topicIdx);
    if (retakeWithVariant) {
      setUseVariants(prev => ({ ...prev, [topicIdx]: true }));
    }
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setUserAnswers({});
    setView('assessment');
  };

  const handleAnswerSubmit = () => {
    if (selectedOption === null) return;
    setUserAnswers(prev => ({ ...prev, [currentQIndex]: selectedOption }));
    setIsSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQIndex < activeQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      const finalAnswers = { ...userAnswers, [currentQIndex]: selectedOption! };
      const correctCount = activeQuestions.reduce((acc, q, idx) => {
        return acc + (finalAnswers[idx] === q.correct_idx ? 1 : 0);
      }, 0);

      const scorePct = Math.round((correctCount / activeQuestions.length) * 100);
      const passed = scorePct >= PASSING_MASTERY_SCORE;

      setTopicProgress(prev => ({
        ...prev,
        [activeTopicIndex]: { score: scorePct, passed }
      }));

      if (passed && activeTopicIndex + 1 < TOPICS.length) {
        setUnlockedTopics(prev => Array.from(new Set([...prev, activeTopicIndex + 1])));
      }

      // Transition to review screen to show explanations before going to dashboard/tutorial
      setView('review');
    }
  };

  const currentProgress = topicProgress[activeTopicIndex];
  const passedCurrent = currentProgress?.passed;

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
              Diagnose your understanding, review targeted explanations, and conquer variant reassessments to achieve unit mastery.
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
                    <button style={styles.primaryBtnSmall} onClick={() => startAssessment(idx, prog?.passed)}>
                      {prog?.passed ? 'Review / Retake 🔄' : 'Start Assessment 🚀'}
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
            <span style={styles.badge}>{currentTopicObj.title} {useVariants[activeTopicIndex] ? '(Variant Exam)' : ''}</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#6b7280' }}>
              Question {currentQIndex + 1} of {activeQuestions.length}
            </span>
          </div>

          {activeQuestions[currentQIndex].visualType && (
            <VisualAsset
              type={activeQuestions[currentQIndex].visualType!}
              data={activeQuestions[currentQIndex].visualData}
            />
          )}

          <h3 style={styles.prompt}>{activeQuestions[currentQIndex].prompt}</h3>

          <div style={styles.optionsList}>
            {activeQuestions[currentQIndex].options.map((opt, idx) => {
              let btnStyle = styles.optionBtn;
              if (selectedOption === idx) btnStyle = { ...btnStyle, ...styles.optionSelected };
              if (isSubmitted) {
                if (idx === activeQuestions[currentQIndex].correct_idx) {
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
              <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155' }}>{activeQuestions[currentQIndex].explanation}</p>
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
                {currentQIndex < activeQuestions.length - 1 ? 'Next Question →' : 'View Assessment Results & Explanations'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. REVIEW & EXPLANATIONS SCREEN */}
      {view === 'review' && (
        <div style={styles.card}>
          <div style={passedCurrent ? styles.bannerBoxSuccess : styles.bannerBoxWarning}>
            <h2 style={{ margin: '0 0 8px 0', color: passedCurrent ? '#15803d' : '#b45309' }}>
              {passedCurrent ? '🎉 Assessment Passed! Mastery Achieved' : '⚠️ Keep Learning: Below Mastery Threshold'}
            </h2>
            <p style={{ margin: 0, color: passedCurrent ? '#166534' : '#92400e', lineHeight: '1.5' }}>
              You scored <strong>{currentProgress?.score}%</strong> ({Object.entries(userAnswers).filter(([idx, ans]) => ans === activeQuestions[Number(idx)].correct_idx).length} out of {activeQuestions.length} correct). 
              {passedCurrent ? ' You have successfully mastered this unit and unlocked the next topic!' : ' Review the step-by-step explanations below, then retake the assessment with fresh variant questions.'}
            </p>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h3 style={{ color: '#1e293b', marginBottom: '16px' }}>Detailed Answer Key & Explanations:</h3>
            {activeQuestions.map((q, qIdx) => {
              const userAns = userAnswers[qIdx];
              const isCorrect = userAns === q.correct_idx;
              return (
                <div key={q.id} style={{
                  padding: '16px',
                  marginBottom: '14px',
                  borderRadius: '8px',
                  backgroundColor: isCorrect ? '#f0fdf4' : '#fef2f2',
                  border: `1px solid ${isCorrect ? '#bbf7d0' : '#fecaca'}`
                }}>
                  <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', color: '#1e293b' }}>
                    Q{qIdx + 1}: {q.prompt}
                  </p>
                  <p style={{ margin: '0 0 4px 0', fontSize: '0.9rem', color: isCorrect ? '#15803d' : '#b91c1c' }}>
                    Your answer: {userAns !== undefined ? `${String.fromCharCode(65 + userAns)}. ${q.options[userAns]}` : 'No answer'} {isCorrect ? '✅' : '❌'}
                  </p>
                  {!isCorrect && (
                    <p style={{ margin: '0 0 6px 0', fontSize: '0.9rem', color: '#15803d', fontWeight: '600' }}>
                      Correct answer: {String.fromCharCode(65 + q.correct_idx)}. {q.options[q.correct_idx]}
                    </p>
                  )}
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#475569', fontStyle: 'italic' }}>
                    💡 <strong>Explanation:</strong> {q.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            {!passedCurrent && (
              <button style={styles.primaryBtn} onClick={() => startAssessment(activeTopicIndex, true)}>
                Retake Assessment with Variant Questions 🔄
              </button>
            )}
            <button style={passedCurrent ? styles.primaryBtn : styles.secondaryBtn} onClick={() => setView('dashboard')}>
              View Roadmap & Progress 🗺️
            </button>
          </div>
        </div>
      )}

      {/* 4. DASHBOARD / ROADMAP VIEW */}
      {view === 'dashboard' && (
        <div style={styles.card}>
          <div style={styles.bannerBox}>
            <h2 style={{ margin: '0 0 8px 0', color: '#0369a1' }}>Curriculum Progress Dashboard</h2>
            <p style={{ margin: 0, color: '#334155' }}>
              Track your unlocked units and mastery scores across the AP Physics 1 curriculum.
            </p>
          </div>

          <div style={{ marginTop: '24px' }}>
            {TOPICS.map((t, idx) => {
              const isUnlocked = unlockedTopics.includes(idx);
              const prog = topicProgress[idx];
              return (
                <div key={t.id} style={{ ...styles.roadmapItem, opacity: isUnlocked ? 1 : 0.6 }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0', color: '#0f172a' }}>
                      {t.title} {prog?.passed ? '✅' : ''}
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                      {prog ? `Best Score: ${prog.score}%` : t.description}
                    </p>
                  </div>
                  {isUnlocked ? (
                    <button style={styles.primaryBtnSmall} onClick={() => startAssessment(idx, false)}>
                      {prog?.passed ? 'Review / Retake' : 'Start Assessment'}
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
    flex: 1,
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
    flex: 1,
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
