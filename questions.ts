import type { VisualType, VisualData } from './VisualAsset';

export interface Question {
  id: string;
  unit: number;
  topic: string;
  prompt: string;
  options: string[];
  correct_idx: number;
  explanation: string;
  discrimination_a: number; // IRT Discrimination
  difficulty_b: number;      // IRT Difficulty
  visualType?: VisualType;
  visualData?: VisualData;
}

export const allQuestions: Question[] = [
  // ----------------------------------------------------------------
  // UNIT 1: Kinematics
  // ----------------------------------------------------------------
  {
    id: 'u1_q_1',
    unit: 1,
    topic: '1.3 Velocity and Acceleration Graphs',
    prompt: 'Based on the velocity-time graph shown, what physical quantity does the area under the curve between $t = 0\\text{ s}$ and $t = 4\\text{ s}$ represent?',
    options: [
      'Total distance traveled and displacement',
      'Average acceleration of the object',
      'Net force acting on the system',
      'Instantaneous jerk'
    ],
    correct_idx: 0,
    explanation: 'The integral of velocity with respect to time ($ \\int v(t) dt $) gives the displacement of the object over that time interval.',
    discrimination_a: 1.2,
    difficulty_b: -0.4,
    visualType: 'kinematics_graph',
    visualData: { graphType: 'vt' }
  },

  // ----------------------------------------------------------------
  // UNIT 2: Dynamics (Forces)
  // ----------------------------------------------------------------
  {
    id: 'u2_q_1',
    unit: 2,
    topic: '2.2 Newton\'s Second Law & Friction',
    prompt: 'Referring to the free-body diagram of a block on an inclined plane with angle $\\theta = 30^\\circ$, which algebraic expression correctly represents the component of gravity acting parallel down the incline?',
    options: [
      '$mg \\cos(\\theta)$',
      '$mg \\sin(\\theta)$',
      '$\\mu k mg \\cos(\\theta)$',
      '$mg \\tan(\\theta)$'
    ],
    correct_idx: 1,
    explanation: 'Resolving the gravitational force vector $mg$ into components parallel and perpendicular to the inclined surface yields $mg \\sin(\\theta)$ acting down the incline and $mg \\cos(\\theta)$ acting perpendicularly into the surface.',
    discrimination_a: 1.4,
    difficulty_b: 0.1,
    visualType: 'free_body_diagram',
    visualData: { inclineAngle: 30 }
  },

  // ----------------------------------------------------------------
  // UNIT 4: Work, Energy, and Power
  // ----------------------------------------------------------------
  {
    id: 'u4_q_1',
    unit: 4,
    topic: '4.3 Conservation of Energy',
    prompt: 'Examine the energy bar chart (LOL chart) for a mass-spring system or falling object. If no non-conservative work ($W_{nc}$) is done on the system, what fundamental physics principle is illustrated?',
    options: [
      'Conservation of Linear Momentum',
      'Work-Energy Theorem with external dissipation',
      'Conservation of Total Mechanical Energy ($E_{mech} = \\text{constant}$)',
      'Newton\'s Third Law action-reaction pairs'
    ],
    correct_idx: 2,
    explanation: 'When external non-conservative forces are absent, the sum of kinetic energy, gravitational potential energy, and elastic potential energy remains invariant throughout the motion.',
    discrimination_a: 1.3,
    difficulty_b: -0.2,
    visualType: 'energy_bar_chart'
  },

  // ----------------------------------------------------------------
  // UNIT 8: Electric Circuits
  // ----------------------------------------------------------------
  {
    id: 'u8_q_1',
    unit: 8,
    topic: '8.2 Resistors in Series and Parallel',
    prompt: 'In the provided combination circuit with $V = 12\\text{ V}$, $R_1 = 4\\Omega$, and $R_2 = 8\\Omega$, how does the equivalent resistance and total current behave if another resistor is added in parallel?',
    options: [
      'Equivalent resistance increases and total current decreases.',
      'Equivalent resistance decreases and total current increases.',
      'Equivalent resistance remains unchanged.',
      'Voltage across each branch drops to zero.'
    ],
    correct_idx: 1,
    explanation: 'Adding parallel branches provides additional current pathways, which decreases the total equivalent resistance of the circuit and consequently increases the total current drawn from the voltage source according to Ohm\'s Law ($I = \\frac{V}{R_{eq}}$).',
    discrimination_a: 1.5,
    difficulty_b: 0.6,
    visualType: 'circuit_diagram',
    visualData: { voltage: 12, resistorValues: [4, 8] }
  },

  // ----------------------------------------------------------------
  // UNIT 10: Waves and Optics
  // ----------------------------------------------------------------
  {
    id: 'u10_q_1',
    unit: 10,
    topic: '10.2 Wave Interference & Superposition',
    prompt: 'When two coherent traveling waves arrive at the same point in phase (crest meeting crest), what phenomenon occurs and what is the resulting amplitude?',
    options: [
      'Destructive interference resulting in zero amplitude.',
      'Constructive interference resulting in an amplitude equal to the sum of the individual wave amplitudes.',
      'Total internal reflection.',
      'Diffraction around a sharp corner.'
    ],
    correct_idx: 1,
    explanation: 'The Principle of Superposition states that when two waves overlap, the resulting displacement is the algebraic sum of their individual displacements, leading to constructive interference when in phase.',
    discrimination_a: 1.1,
    difficulty_b: -0.5,
    visualType: 'wave_interference'
  }
];
