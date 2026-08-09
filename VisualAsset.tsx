import React from 'react';

interface VisualAssetProps {
  type: string;
}

export const VisualAsset: React.FC<VisualAssetProps> = ({ type }) => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-4 my-4 flex flex-col items-center justify-center border border-slate-800 shadow-inner overflow-x-auto">
      <svg viewBox="0 0 500 250" className="w-full max-w-lg h-auto">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="250" fill="url(#grid)" rx="8" />

        {/* Axes */}
        <line x1="50" y1="210" x2="450" y2="210" stroke="#94a3b8" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="210" stroke="#94a3b8" strokeWidth="2" />

        {/* Axis Labels */}
        <text x="450" y="230" fill="#94a3b8" fontSize="12" textAnchor="end" fontFamily="sans-serif">t (s)</text>
        <text x="30" y="40" fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="sans-serif">v</text>

        {/* Conditional Visual Asset Content */}
        {type === 'kinematics_vt' && (
          <>
            <path d="M 50 170 L 410 70" fill="none" stroke="#3b82f6" strokeWidth="3" />
            <circle cx="50" cy="170" r="4" fill="#60a5fa" />
            <circle cx="410" cy="70" r="4" fill="#60a5fa" />
            <text x="230" y="110" fill="#60a5fa" fontSize="12" fontWeight="bold">Constant Acceleration (Slope = a)</text>
          </>
        )}

        {type === 'projectile_trajectory' && (
          <>
            <path d="M 50 210 Q 250 10 450 210" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="5,5" />
            <text x="250" y="80" fill="#f87171" fontSize="12" fontWeight="bold" textAnchor="middle">Parabolic Trajectory</text>
          </>
        )}

        {type === 'energy_bar_chart' && (
          <>
            <rect x="100" y="90" width="40" height="120" fill="#3b82f6" rx="4" />
            <text x="120" y="80" fill="#93c5fd" fontSize="10" textAnchor="middle">K</text>
            <rect x="160" y="150" width="40" height="60" fill="#10b981" rx="4" />
            <text x="180" y="140" fill="#6ee7b7" fontSize="10" textAnchor="middle">U_g</text>
            <rect x="220" y="190" width="40" height="20" fill="#f59e0b" rx="4" />
            <text x="240" y="180" fill="#fcd34d" fontSize="10" textAnchor="middle">U_s</text>
            <text x="320" y="120" fill="#f8fafc" fontSize="12" fontWeight="bold">Conservation of Energy</text>
          </>
        )}

        {type === 'wave_interference' && (
          <g>
            <path d="M 50 120 Q 125 90 200 120 T 350 120 T 500 120" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <path d="M 50 120 Q 125 150 200 120 T 350 120 T 500 120" fill="none" stroke="#ec4899" strokeWidth="2" />
            <text x="250" y="40" fill="#67e8f9" fontSize="12" fontWeight="bold" textAnchor="middle">Constructive / Destructive Interference</text>
          </g>
        )}

        {type === 'velocity_time' && (
          <>
            <path d="M 60 190 Q 250 190 460 50" fill="none" stroke="#16a34a" strokeWidth="3" />
            <text x="220" y="120" fontSize="10" fill="#16a34a" fontWeight="bold">Increasing Speed ($a &gt; 0$)</text>
          </>
        )}
      </svg>
    </div>
  );
};
