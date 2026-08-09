export interface FRQPart {
  partId: string;
  prompt: string;
  sampleAnswer: string;
  rubricPoints: string[];
}

export interface FRQQuestion {
  id: string;
  unit: number;
  title: string;
  scenario: string;
  parts: FRQPart[];
}

export const allFRQs: FRQQuestion[] = [
  {
    id: 'frq_u1_kinematics',
    unit: 1,
    title: 'Kinematics & Graph Analysis FRQ',
    scenario: 'A small cart of mass $m$ is launched horizontally across a tracking table. A motion detector records its velocity as a function of time.',
    parts: [
      {
        partId: 'a',
        prompt: 'Using the axes provided, sketch a qualitative graph of acceleration versus time for the cart as it experiences constant frictional deceleration.',
        sampleAnswer: 'A horizontal straight line positioned below the time axis at a constant negative value $a = -\\mu g$.',
        rubricPoints: [
          '1 point for indicating a constant value',
          '1 point for placing the value correctly in the negative acceleration region'
        ]
      },
      {
        partId: 'b',
        prompt: 'Derive an algebraic expression for the stopping distance $d$ of the cart in terms of initial velocity $v_0$, coefficient of kinetic friction $\\mu_k$, and physical constants.',
        sampleAnswer: 'Using kinematic equation $v^2 = v_0^2 + 2a\\Delta x$ where $a = -\\mu_k g$ and final velocity $v=0$: $0 = v_0^2 - 2\\mu_k g d \\implies d = \\frac{v_0^2}{2\\mu_k g}$.',
        rubricPoints: [
          '1 point for starting with an appropriate kinematic or work-energy relationship',
          '1 point for substituting $a = \\mu_k g$ from Newton\'s Second Law',
          '1 point for correct algebraic isolation of distance $d$'
        ]
      }
    ]
  },
  {
    id: 'frq_u4_energy',
    unit: 4,
    title: 'Work-Energy Theorem & Conservation Laws',
    scenario: 'A block of mass $m$ slides down a frictionless track of height $h$ and then compresses an ideal spring with spring constant $k$ by a maximum distance $x_m$.',
    parts: [
      {
        partId: 'a',
        prompt: 'State the law of conservation of energy for this system from the initial release point to the point of maximum spring compression.',
        sampleAnswer: 'Initial gravitational potential energy is fully converted into elastic potential energy stored in the spring: $mgh = \\frac{1}{2}kx_m^2$.',
        rubricPoints: [
          '1 point for identifying initial gravitational potential energy',
          '1 point for identifying final elastic potential energy',
          '1 point for equating the two energies with no spurious terms'
        ]
      }
    ]
  }
];
