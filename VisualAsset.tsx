import React from 'react';

interface VisualAssetProps {
  type: string;
}

export const VisualAsset: React.FC<VisualAssetProps> = ({ type }) => {
  return (
    <div className="w-full bg-slate-900 rounded-xl p-3 my-3 flex flex-col items-center justify-center border border-slate-800 shadow-inner overflow-x-auto">
      <svg viewBox="0 0 500 130" className="w-full max-w-md h-32">
        {/* Background Grid */}
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.5" />
          </pattern>
        </defs>
        <rect width="500" height="130" fill="url(#grid)" rx="6" />

        {/* Axes */}
        <line x1="40" y1="100" x2="460" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="40" y1="20" x2="40" y2="100" stroke="#94a3b8" strokeWidth="1.5" />

        {/* Axis Labels */}
        <text x="465" y="104" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">t</text>
        <text x="36" y="15" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="sans-serif">v</text>

        {/* Conditional Visual Asset Content */}
        {type === 'kinematics_vt' && (
          <>
            <path d="M 40 90 L 440 30" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            <circle cx="40" cy="90" r="3" fill="#60a5fa" />
            <circle cx="440" cy="30" r="3" fill="#60a5fa" />
            <text x="240" y="55" fill="#60a5fa" fontSize="10" fontWeight="bold" textAnchor="middle">Constant Acceleration (Slope = a)</text>
          </>
        )}

        {type === 'projectile_trajectory' && (
          <>
            <path d="M 40 100 Q 250 10 460 100" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4,4" />
            <text x="250" y="50" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Parabolic Trajectory</text>
          </>
        )}

        {type === 'energy_bar_chart' && (
          <>
            <rect x="80" y="45" width="30" height="55" fill="#3b82f6" rx="3" />
            <text x="95" y="38" fill="#93c5fd" fontSize="9" textAnchor="middle">K</text>
            <rect x="130" y="70" width="30" height="30" fill="#10b981" rx="3" />
            <text x="145" y="63" fill="#6ee7b7" fontSize="9" textAnchor="middle">U_g</text>
            <rect x="180" y="90" width="30" height="10" fill="#f59e0b" rx="3" />
            <text x="195" y="83" fill="#fcd34d" fontSize="9" textAnchor="middle">U_s</text>
            <text x="320" y="65" fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">Conservation of Energy</text>
          </>
        )}

        {type === 'wave_interference' && (
          <g>
            <path d="M 40 65 Q 100 45 160 65 T 280 65 T 400 65" fill="none" stroke="#06b6d4" strokeWidth="2" />
            <path d="M 40 65 Q 100 85 160 65 T 280 65 T 400 65" fill="none" stroke="#ec4899" strokeWidth="2" />
            <text x="250" y="25" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">Interference Pattern</text>
          </g>
        )}

        {type === 'velocity_time' && (
          <>
            <path d="M 40 95 Q 250 95 460 25" fill="none" stroke="#16a34a" strokeWidth="2.5" />
            <text x="250" y="60" fontSize="10" fill="#16a34a" fontWeight="bold" textAnchor="middle">Increasing Speed (a &gt; 0)</text>
          </>
        )}
      </svg>
    </div>
  );
};
