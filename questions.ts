export interface Question {
  id: string;
  topic: string;
  conceptTag: string;
  prompt: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  visualType?: string;
}

export const TOPICS = [
  'Kinematics',
  'Dynamics',
  'Circular Motion & Gravitation',
  'Energy',
  'Momentum',
  'Simple Harmonic Motion',
  'Rotational Motion',
  'Fluids'
];

export const QUESTION_BANK: Question[] = [
  // ==========================================
  // TOPIC 1: KINEMATICS (5 Questions)
  // ==========================================
  {
    id: 'kin_1',
    topic: 'Kinematics',
    conceptTag: 'linearization',
    prompt: 'A cart rolls down an incline starting from rest. A student measures the distance $d$ traveled at various times $t$. To create a linear graph whose slope allows direct determination of acceleration $a$, which quantities should be plotted on the vertical and horizontal axes?',
    options: [
      'd on the vertical axis, t on the horizontal axis',
      'd on the vertical axis, t^2 on the horizontal axis',
      'd^2 on the vertical axis, t on the horizontal axis',
      'v on the vertical axis, t^2 on the horizontal axis'
    ],
    correctAnswer: 1,
    explanation: 'From $d = \\frac{1}{2}at^2$, plotting $d$ vs $t^2$ yields a straight line with slope $m = \\frac{1}{2}a$. Thus, $a = 2m$.',
    visualType: 'kinematics_vt'
  },
  {
    id: 'kin_2',
    topic: 'Kinematics',
    conceptTag: 'velocity_time_area',
    prompt: 'The velocity vs. time graph of an object moving along a straight line forms a triangle with a base of 6 seconds and a peak velocity of 12 m/s at t = 3 s. What is the total displacement of the object from t = 0 to t = 6 s?',
    options: ['18 m', '36 m', '72 m', '24 m'],
    correctAnswer: 1,
    explanation: 'Displacement is the area under the v-t graph: Area = 0.5 * base * height = 0.5 * 6 s * 12 m/s = 36 m.',
    visualType: 'kinematics_vt'
  },
  {
    id: 'kin_3',
    topic: 'Kinematics',
    conceptTag: 'projectile_motion',
    prompt: 'A projectile is launched with speed v_0 at an angle theta above horizontal over level ground. Neglecting air resistance, which statement correctly describes the projectile at its highest point?',
    options: [
      'Its velocity is zero and its acceleration is zero.',
      'Its velocity is v_0 cos(theta) and its acceleration is g downwards.',
      'Its velocity is v_0 sin(theta) and its acceleration is g downwards.',
      'Its velocity is zero and its acceleration is g downwards.'
    ],
    correctAnswer: 1,
    explanation: 'At maximum height, horizontal velocity remains v_x = v_0 cos(theta) while vertical velocity v_y = 0. Gravity constantly acts downward with acceleration g.',
    visualType: 'projectile_trajectory'
  },
  {
    id: 'kin_4',
    topic: 'Kinematics',
    conceptTag: 'free_fall',
    prompt: 'Ball A is dropped from rest from height H. At the same instant, Ball B is thrown straight down from height H with initial speed v_0. How do their accelerations compare while in the air?',
    options: [
      'Ball B has a greater acceleration because it was thrown.',
      'Ball A has a greater acceleration because it started from rest.',
      'Both balls experience the exact same acceleration g downward.',
      'Ball B experiences decreasing acceleration as it approaches the ground.'
    ],
    correctAnswer: 2,
    explanation: 'Neglecting air resistance, all objects near Earth’s surface experience the same gravitational acceleration g downward, regardless of initial velocity.',
    visualType: 'projectile_trajectory'
  },
  {
    id: 'kin_5',
    topic: 'Kinematics',
    conceptTag: 'relative_motion',
    prompt: 'A boat moves at 4 m/s relative to a river flowing east at 3 m/s. If the boat points directly north across the river, what is the speed of the boat relative to the shore?',
    options: ['1 m/s', '5 m/s', '7 m/s', '12 m/s'],
    correctAnswer: 1,
    explanation: 'Perpendicular velocity components add vectorially: v = sqrt(v_boat^2 + v_river^2) = sqrt(4^2 + 3^2) = 5 m/s.',
    visualType: 'kinematics_vt'
  },

  // ==========================================
  // TOPIC 2: DYNAMICS (5 Questions)
  // ==========================================
  {
    id: 'dyn_1',
    topic: 'Dynamics',
    conceptTag: 'newtons_second_law',
    prompt: 'A block of mass m sits on a rough table. A horizontal force F accelerates it with acceleration a. If the force is doubled and the friction force f remains constant, what is the new acceleration?',
    options: [
      '2a',
      '2a + (f / m)',
      '2a - (f / m)',
      'a + (f / m)'
    ],
    correctAnswer: 1,
    explanation: 'Initially, F - f = ma -> a = (F - f)/m. With 2F: a_new = (2F - f)/m = 2(F - f)/m + f/m = 2a + f/m.',
    visualType: 'velocity_time'
  },
  {
    id: 'dyn_2',
    topic: 'Dynamics',
    conceptTag: 'atwood_machine',
    prompt: 'An ideal Atwood machine consists of two masses, m1 = 3 kg and m2 = 1 kg, connected over a massless pulley. What is the magnitude of the acceleration of the system?',
    options: ['0.25 g', '0.50 g', '0.75 g', '1.00 g'],
    correctAnswer: 1,
    explanation: 'a = (m1 - m2)g / (m1 + m2) = (3 - 1)g / (3 + 1) = 2g / 4 = 0.50 g.',
    visualType: 'velocity_time'
  },
  {
    id: 'dyn_3',
    topic: 'Dynamics',
    conceptTag: 'inclined_plane',
    prompt: 'A box slides down a frictionless incline tilted at an angle theta above horizontal. What is the magnitude of the normal force exerted by the ramp on the box?',
    options: ['mg', 'mg sin(theta)', 'mg cos(theta)', 'mg tan(theta)'],
    correctAnswer: 2,
    explanation: 'Perpendicular to the incline surface, forces balance: N = mg cos(theta).',
    visualType: 'velocity_time'
  },
  {
    id: 'dyn_4',
    topic: 'Dynamics',
    conceptTag: 'newtons_third_law',
    prompt: 'A massive truck collides head-on with a small compact car. During the collision, how does the force exerted by the truck on the car compare to the force exerted by the car on the truck?',
    options: [
      'The truck exerts a much larger force on the car.',
      'The car exerts a much larger force on the truck.',
      'The forces are equal in magnitude and opposite in direction.',
      'The relative magnitude depends on the initial speeds of the vehicles.'
    ],
    correctAnswer: 2,
    explanation: 'According to Newton’s Third Law, force pairs are always equal in magnitude and opposite in direction regardless of mass or speed.',
    visualType: 'velocity_time'
  },
  {
    id: 'dyn_5',
    topic: 'Dynamics',
    conceptTag: 'static_vs_kinetic_friction',
    prompt: 'A student pushes horizontally against a stationary 10 kg box with a force of 20 N. The coefficient of static friction is 0.4. What is the friction force acting on the box?',
    options: ['0 N', '20 N', '39.2 N', '98 N'],
    correctAnswer: 1,
    explanation: 'Maximum static friction f_s,max = mu_s * N = 0.4 * (10 kg * 9.8 m/s^2) = 39.2 N. Since applied force (20 N) < f_s,max, static friction perfectly matches the applied force (20 N).',
    visualType: 'velocity_time'
  },

  // ==========================================
  // TOPIC 3: CIRCULAR MOTION & GRAVITATION (5 Questions)
  // ==========================================
  {
    id: 'circ_1',
    topic: 'Circular Motion & Gravitation',
    conceptTag: 'centripetal_acceleration',
    prompt: 'A car moves around a circular track of radius R at constant speed v. If the speed is doubled and the radius is halved, by what factor does the centripetal acceleration change?',
    options: ['2', '4', '8', '16'],
    correctAnswer: 2,
    explanation: 'a_c = v^2 / R. If v -> 2v and R -> R/2, then a_c_new = (2v)^2 / (R/2) = 4v^2 / (0.5R) = 8 (v^2/R).',
    visualType: 'velocity_time'
  },
  {
    id: 'circ_2',
    topic: 'Circular Motion & Gravitation',
    conceptTag: 'gravitational_law',
    prompt: 'Two spherical planets have mass M and distance R between their centers. If the mass of one planet is tripled and the distance between them is doubled, how does the gravitational force change?',
    options: [
      'Multiplied by 3/4',
      'Multiplied by 3/2',
      'Multiplied by 3/8',
      'Multiplied by 9/4'
    ],
    correctAnswer: 0,
    explanation: 'F_g = G*m1*m2 / r^2. New force F’ = G*(3M)*m2 / (2R)^2 = (3/4) * (G*M*m2/R^2).',
    visualType: 'velocity_time'
  },
  {
    id: 'circ_3',
    topic: 'Circular Motion & Gravitation',
    conceptTag: 'orbital_speed',
    prompt: 'A satellite orbits Earth in a circular orbit of radius r with speed v. If moved to a higher stable circular orbit of radius 4r, what will its new orbital speed be?',
    options: ['v / 4', 'v / 2', '2 v', '4 v'],
    correctAnswer: 1,
    explanation: 'Orbital speed v = sqrt(G*M_E / r). If radius increases to 4r, v’ = sqrt(G*M_E / 4r) = (1/2) * sqrt(G*M_E / r) = v / 2.',
    visualType: 'velocity_time'
  },
  {
    id: 'circ_4',
    topic: 'Circular Motion & Gravitation',
    conceptTag: 'vertical_circular_motion',
    prompt: 'A bucket of water is whirled in a vertical circle of radius R. What is the minimum speed v at the top of the loop required to keep the water from spilling?',
    options: ['sqrt(g / R)', 'sqrt(g * R)', 'g * R', '2 g * R'],
    correctAnswer: 1,
    explanation: 'At the minimum speed, normal force N = 0, so gravity alone supplies centripetal force: mg = m v^2 / R -> v = sqrt(gR).',
    visualType: 'velocity_time'
  },
  {
    id: 'circ_5',
    topic: 'Circular Motion & Gravitation',
    conceptTag: 'gravitational_field',
    prompt: 'At a distance R from Earth’s center, gravitational acceleration is g. What is the gravitational acceleration at an altitude of R above Earth’s surface?',
    options: ['g / 2', 'g / 3', 'g / 4', 'g / 9'],
    correctAnswer: 2,
    explanation: 'An altitude R above the surface means total distance from center is r = R + R = 2R. g’ = G M / (2R)^2 = g / 4.',
    visualType: 'velocity_time'
  },

  // ==========================================
  // TOPIC 4: ENERGY (5 Questions)
  // ==========================================
  {
    id: 'eng_1',
    topic: 'Energy',
    conceptTag: 'work_energy_theorem',
    prompt: 'A force F applied at angle theta above horizontal pushes a box distance d across a frictionless floor. How much work is done by the force on the box?',
    options: ['F d', 'F d sin(theta)', 'F d cos(theta)', 'F d tan(theta)'],
    correctAnswer: 2,
    explanation: 'Work W = F * d * cos(theta), where theta is the angle between force and displacement vectors.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'eng_2',
    topic: 'Energy',
    conceptTag: 'conservation_of_mechanical_energy',
    prompt: 'A mass m is released from rest at height h on a frictionless curved track. What is its speed at the bottom of the track?',
    options: ['gh', 'sqrt(gh)', 'sqrt(2gh)', '2gh'],
    correctAnswer: 2,
    explanation: 'mgh = 0.5 m v^2 -> v = sqrt(2gh).',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'eng_3',
    topic: 'Energy',
    conceptTag: 'spring_potential_energy',
    prompt: 'An ideal spring with constant k is compressed a distance x from equilibrium. If compression distance is doubled to 2x, by what factor does stored potential energy increase?',
    options: ['2', '3', '4', '8'],
    correctAnswer: 2,
    explanation: 'U_s = 0.5 k x^2. Doubling x quadruples U_s.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'eng_4',
    topic: 'Energy',
    conceptTag: 'power',
    prompt: 'An engine delivers a constant force of 500 N to lift an elevator at a steady speed of 2 m/s. What power is generated by the engine?',
    options: ['250 W', '500 W', '1000 W', '2000 W'],
    correctAnswer: 2,
    explanation: 'P = F * v = 500 N * 2 m/s = 1000 W.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'eng_5',
    topic: 'Energy',
    conceptTag: 'non_conservative_forces',
    prompt: 'A 2 kg block slides down a rough incline, losing 50 J of gravitational potential energy while gaining 30 J of kinetic energy. How much work was done by friction?',
    options: ['-80 J', '-20 J', '20 J', '80 J'],
    correctAnswer: 1,
    explanation: 'Delta E_mech = W_friction. W_f = Delta K + Delta U = +30 J - 50 J = -20 J.',
    visualType: 'energy_bar_chart'
  },

  // ==========================================
  // TOPIC 5: MOMENTUM (5 Questions)
  // ==========================================
  {
    id: 'mom_1',
    topic: 'Momentum',
    conceptTag: 'impulse_momentum_theorem',
    prompt: 'A 0.5 kg ball traveling at 10 m/s hits a wall and rebounds at 8 m/s in the opposite direction. What is the magnitude of the impulse imparted to the ball by the wall?',
    options: ['1 N s', '4 N s', '9 N s', '18 N s'],
    correctAnswer: 2,
    explanation: 'Impulse J = Delta p = m(v_f - v_i) = 0.5 * (8 - (-10)) = 0.5 * 18 = 9 N s.',
    visualType: 'velocity_time'
  },
  {
    id: 'mom_2',
    topic: 'Momentum',
    conceptTag: 'inelastic_collisions',
    prompt: 'A 2 kg cart moving at 6 m/s collides and sticks to a stationary 4 kg cart. What is their final combined speed?',
    options: ['1 m/s', '2 m/s', '3 m/s', '4 m/s'],
    correctAnswer: 1,
    explanation: 'm1 v1 = (m1 + m2) v_f -> (2)(6) = (2 + 4) v_f -> 12 = 6 v_f -> v_f = 2 m/s.',
    visualType: 'velocity_time'
  },
  {
    id: 'mom_3',
    topic: 'Momentum',
    conceptTag: 'elastic_collisions',
    prompt: 'In a perfectly elastic collision between two isolated objects, which quantities are conserved?',
    options: [
      'Kinetic energy only',
      'Momentum only',
      'Both momentum and total kinetic energy',
      'Neither momentum nor kinetic energy'
    ],
    correctAnswer: 2,
    explanation: 'By definition, elastic collisions conserve both total momentum and total kinetic energy.',
    visualType: 'velocity_time'
  },
  {
    id: 'mom_4',
    topic: 'Momentum',
    conceptTag: 'center_of_mass_velocity',
    prompt: 'Two ice skaters, one 80 kg and one 40 kg, push off from each other on frictionless ice. If the 80 kg skater moves right at 2 m/s, what is the speed and direction of the 40 kg skater?',
    options: [
      '1 m/s to the left',
      '2 m/s to the left',
      '4 m/s to the left',
      '4 m/s to the right'
    ],
    correctAnswer: 2,
    explanation: '0 = m1 v1 + m2 v2 -> 0 = (80)(2) + (40)(v2) -> v2 = -4 m/s (4 m/s left).',
    visualType: 'velocity_time'
  },
  {
    id: 'mom_5',
    topic: 'Momentum',
    conceptTag: 'force_time_graphs',
    prompt: 'A force acting on a 3 kg object increases linearly from 0 to 20 N over 4 seconds. What is the change in momentum of the object?',
    options: ['20 N s', '40 N s', '60 N s', '80 N s'],
    correctAnswer: 1,
    explanation: 'Impulse = Area under F-t graph = 0.5 * base * height = 0.5 * 4 s * 20 N = 40 N s.',
    visualType: 'velocity_time'
  },

  // ==========================================
  // TOPIC 6: SIMPLE HARMONIC MOTION (5 Questions)
  // ==========================================
  {
    id: 'shm_1',
    topic: 'Simple Harmonic Motion',
    conceptTag: 'mass_spring_period',
    prompt: 'A mass-spring oscillator has period T. If the mass attached to the spring is quadrupled, what is the new period of oscillation?',
    options: ['T / 2', 'T', '2 T', '4 T'],
    correctAnswer: 2,
    explanation: 'T = 2pi sqrt(m / k). Quadrupling mass doubles period: sqrt(4m) = 2 sqrt(m).',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'shm_2',
    topic: 'Simple Harmonic Motion',
    conceptTag: 'simple_pendulum_period',
    prompt: 'A simple pendulum has length L and period T on Earth. What is its period on a planet where gravitational acceleration is 4g?',
    options: ['T / 4', 'T / 2', '2 T', '4 T'],
    correctAnswer: 1,
    explanation: 'T = 2pi sqrt(L / g). Replacing g with 4g gives T’ = 2pi sqrt(L / 4g) = T / 2.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'shm_3',
    topic: 'Simple Harmonic Motion',
    conceptTag: 'shm_energy_conversion',
    prompt: 'A mass on a horizontal spring oscillates with amplitude A. At what displacement x from equilibrium is kinetic energy equal to potential energy?',
    options: ['A / 4', 'A / 2', 'A / sqrt(2)', 'A'],
    correctAnswer: 2,
    explanation: 'Total E = 0.5 k A^2. U = 0.5 k x^2 = 0.5 * E -> x^2 = A^2 / 2 -> x = A / sqrt(2).',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'shm_4',
    topic: 'Simple Harmonic Motion',
    conceptTag: 'shm_acceleration_max',
    prompt: 'Where in its path does a simple harmonic oscillator experience maximum magnitude of acceleration?',
    options: [
      'At equilibrium (x = 0)',
      'At maximum displacement (x = +/- A)',
      'Halfway between equilibrium and amplitude',
      'Acceleration remains constant throughout'
    ],
    correctAnswer: 1,
    explanation: 'a = -(k/m)x. Acceleration magnitude is directly proportional to displacement x, so it reaches maximum at x = +/- A.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'shm_5',
    topic: 'Simple Harmonic Motion',
    conceptTag: 'shm_frequency',
    prompt: 'If the frequency of a harmonic oscillator is 5 Hz, how long does it take to complete one full cycle?',
    options: ['0.2 s', '0.5 s', '2.0 s', '5.0 s'],
    correctAnswer: 0,
    explanation: 'Period T = 1 / f = 1 / 5 Hz = 0.2 seconds.',
    visualType: 'energy_bar_chart'
  },

  // ==========================================
  // TOPIC 7: ROTATIONAL MOTION (5 Questions)
  // ==========================================
  {
    id: 'rot_1',
    topic: 'Rotational Motion',
    conceptTag: 'torque',
    prompt: 'A force F is applied at an angle theta to a wrench of length r. Which orientation yields the maximum torque about the pivot?',
    options: [
      'theta = 0 degrees (parallel to wrench)',
      'theta = 45 degrees',
      'theta = 90 degrees (perpendicular to wrench)',
      'theta = 180 degrees'
    ],
    correctAnswer: 2,
    explanation: 'Torque tau = r F sin(theta). Maximum torque occurs when sin(theta) = 1, which means theta = 90 degrees.',
    visualType: 'velocity_time'
  },
  {
    id: 'rot_2',
    topic: 'Rotational Motion',
    conceptTag: 'rotational_inertia',
    prompt: 'A solid sphere and a thin hoop of equal mass M and radius R roll without slipping down an incline. Which reaches the bottom first?',
    options: [
      'The hoop because it has greater rotational inertia.',
      'The solid sphere because it has smaller rotational inertia.',
      'Both reach the bottom at the exact same time.',
      'It depends on the angle of the incline.'
    ],
    correctAnswer: 1,
    explanation: 'Smaller rotational inertia (sphere I = 2/5 MR^2 vs hoop I = MR^2) means less energy converted to rotation, leaving more for linear translation and faster acceleration.',
    visualType: 'velocity_time'
  },
  {
    id: 'rot_3',
    topic: 'Rotational Motion',
    conceptTag: 'angular_momentum_conservation',
    prompt: 'A figure skater pulls her arms inward during a spin, decreasing her rotational inertia by half. What happens to her angular velocity?',
    options: ['Decreases to half', 'Remains unchanged', 'Doubles', 'Quadruples'],
    correctAnswer: 2,
    explanation: 'Angular momentum L = I * omega is conserved. If I decreases by factor of 2, omega must double.',
    visualType: 'velocity_time'
  },
  {
    id: 'rot_4',
    topic: 'Rotational Motion',
    conceptTag: 'rotational_kinematics',
    prompt: 'A wheel accelerates uniformly from rest to an angular velocity of 12 rad/s in 4 seconds. What angular distance does it rotate through during this time?',
    options: ['12 rad', '24 rad', '48 rad', '96 rad'],
    correctAnswer: 1,
    explanation: 'Theta = 0.5 * (omega_0 + omega_f) * t = 0.5 * (0 + 12) * 4 = 24 rad.',
    visualType: 'velocity_time'
  },
  {
    id: 'rot_5',
    topic: 'Rotational Motion',
    conceptTag: 'rotational_kinetic_energy',
    prompt: 'A disk has rotational inertia I and rotates at angular velocity omega. If its angular velocity is doubled, by what factor does its rotational kinetic energy increase?',
    options: ['2', '4', '8', '16'],
    correctAnswer: 1,
    explanation: 'K_rot = 0.5 I omega^2. Doubling omega quadruples K_rot.',
    visualType: 'velocity_time'
  },

  // ==========================================
  // TOPIC 8: FLUIDS (5 Questions)
  // ==========================================
  {
    id: 'flu_1',
    topic: 'Fluids',
    conceptTag: 'buoyant_force',
    prompt: 'An object of volume V is completely submerged in water of density rho. What is the magnitude of the buoyant force acting on the object?',
    options: ['V / rho', 'rho * V', 'rho * V * g', 'rho * g / V'],
    correctAnswer: 2,
    explanation: 'Archimedes’ Principle states F_b = m_fluid * g = rho_fluid * V_displaced * g.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'flu_2',
    topic: 'Fluids',
    conceptTag: 'fluid_continuity',
    prompt: 'Water flows through a horizontal pipe that narrows from radius R to radius R/2. How does the fluid speed v_2 in the narrow section compare to speed v_1 in the wide section?',
    options: ['v_2 = 2 v_1', 'v_2 = 4 v_1', 'v_2 = v_1 / 2', 'v_2 = v_1 / 4'],
    correctAnswer: 1,
    explanation: 'Continuity equation: A1 v1 = A2 v2 -> pi R^2 v1 = pi (R/2)^2 v2 -> R^2 v1 = 0.25 R^2 v2 -> v2 = 4 v1.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'flu_3',
    topic: 'Fluids',
    conceptTag: 'bernoullis_equation',
    prompt: 'According to Bernoulli’s Principle for horizontal fluid flow, where fluid speed increases, what happens to internal fluid pressure?',
    options: [
      'Pressure increases',
      'Pressure decreases',
      'Pressure remains constant',
      'Pressure becomes zero'
    ],
    correctAnswer: 1,
    explanation: 'For horizontal flow: P + 0.5 rho v^2 = constant. As kinetic energy density (velocity) increases, static pressure P must decrease.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'flu_4',
    topic: 'Fluids',
    conceptTag: 'hydrostatic_pressure',
    prompt: 'What is the absolute pressure at depth h below the surface of a fluid with density rho exposed to atmospheric pressure P_atm?',
    options: [
      'P_atm - rho g h',
      'rho g h',
      'P_atm + rho g h',
      'P_atm / (rho g h)'
    ],
    correctAnswer: 2,
    explanation: 'Absolute pressure P = P_atm + P_gauge = P_atm + rho g h.',
    visualType: 'energy_bar_chart'
  },
  {
    id: 'flu_5',
    topic: 'Fluids',
    conceptTag: 'apparent_weight',
    prompt: 'A solid object weighs 50 N in air and 30 N when fully submerged in water. What is the buoyant force acting on the object?',
    options: ['20 N', '30 N', '50 N', '80 N'],
    correctAnswer: 0,
    explanation: 'Apparent weight = Weight_air - F_buoyant -> 30 N = 50 N - F_b -> F_b = 20 N.',
    visualType: 'energy_bar_chart'
  }
];
