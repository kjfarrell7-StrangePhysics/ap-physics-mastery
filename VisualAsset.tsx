import React from 'react';

interface VisualAssetProps {
  type: string;
}

export const VisualAsset: React.FC<VisualAssetProps> = ({ type }) => {
  return (
    <div className="w-full bg-white rounded-xl p-4 my-4 flex flex-col items-center justify-center border border-slate-200 shadow-sm overflow-x-auto">
      <svg viewBox="0 0 500 160" className="w-full max-w-lg h-40 font-sans">
        {/* Background Grid */}
        <defs>
          <pattern id="matplotlib-grid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#e2e8f0" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect x="40" y="20" width="420" height="110" fill="url(#matplotlib-grid)" />
        <rect x="40" y="20" width="420" height="110" fill="none" stroke="#334155" strokeWidth="1" />

        {/* Axes Ticks & Labels */}
        {/* Y-Axis */}
        <line x1="40" y1="20" x2="40" y2="130" stroke="#334155" strokeWidth="1" />
        <text x="25" y="78" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 25, 78)">Position (m)</text>
        {[130, 107.5, 85, 62.5, 40, 17.5].map((y, idx) => {
          const val = (5 - idx) * 2;
          if (idx === 5) return null;
          return (
            <g key={idx}>
              <line x1="37" y1={y} x2="40" y2={y} stroke="#334155" strokeWidth="1" />
              <text x="32" y={y + 4} fill="#475569" fontSize="9" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {/* X-Axis */}
        <line x1="40" y1="130" x2="460" y2="130" stroke="#334155" strokeWidth="1" />
        <text x="250" y="152" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Time (s)</text>
        {[40, 110, 180, 250, 320, 390, 460].map((x, idx) => {
          const val = (idx * 0.5).toFixed(1);
          return (
            <g key={idx}>
              <line x1={x} y1="130" x2={x} y2="133" stroke="#334155" strokeWidth="1" />
              <text x={x} y="143" fill="#475569" fontSize="9" textAnchor="middle">{val}</text>
            </g>
          );
        })}

        {/* Conditional Visual Asset Content */}
        {type === 'kinematics_vt' && (
          <>
            {/* Matplotlib Legend Box */}
            <g transform="translate(50, 28)">
              <rect width="75" height="35" fill="white" stroke="#cbd5e1" strokeWidth="0.8" rx="2" />
              <line x1="8" y1="12" x2="22" y2="12" stroke="#2563eb" strokeWidth="1.5" />
              <circle cx="15" cy="12" r="3" fill="#2563eb" />
              <text x="28" y="15" fill="#1e293b" fontSize="9">Object A</text>
              <line x1="8" y1="25" x2="22" y2="25" stroke="#dc2626" strokeWidth="1.5" />
              <rect x="12" y="22" width="6" height="6" fill="#dc2626" />
              <text x="28" y="28" fill="#1e293b" fontSize="9">Object B</text>
            </g>

            {/* Lines matching screenshot */}
            <path d="M 40 130 L 360 62.5" fill="none" stroke="#2563eb" strokeWidth="1.5" />
            <circle cx="40" cy="130" r="3" fill="#2563eb" />
            <circle cx="200" cy="96.25" r="3" fill="#2563eb" />
            <circle cx="360" cy="62.5" r="3" fill="#2563eb" />

            <path d="M 40 130 L 360 40" fill="none" stroke="#dc2626" strokeWidth="1.5" />
            <circle cx="40" cy="130" r="3" fill="#dc2626" />
            <rect x="197" y="93.25" width="6" height="6" fill="#dc2626" />
            <rect x="357" y="37" width="6" height="6" fill="#dc2626" />
          </>
        )}

        {type === 'projectile_trajectory' && (
          <>
            <path d="M 40 130 Q 250 20 460 130" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
            <text x="250" y="75" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">Parabolic Trajectory</text>
          </>
        )}

        {type === 'energy_bar_chart' && (
          <>
            <rect x="90" y="60" width="25" height="70" fill="#2563eb" rx="1" />
            <text x="102" y="52" fill="#2563eb" fontSize="9" textAnchor="middle" fontWeight="bold">K</text>
            <rect x="135" y="85" width="25" height="45" fill="#059669" rx="1" />
            <text x="147" y="77" fill="#059669" fontSize="9" textAnchor="middle" fontWeight="bold">U_g</text>
            <rect x="180" y="110" width="25" height="20" fill="#d97706" rx="1" />
            <text x="192" y="102" fill="#d97706" fontSize="9" textAnchor="middle" fontWeight="bold">U_s</text>
            <text x="320" y="75" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Conservation of Energy</text>
          </>
        )}

        {type === 'wave_interference' && (
          <g>
            <path d="M 40 75 Q 100 50 160 75 T 280 75 T 400 75" fill="none" stroke="#0891b2" strokeWidth="1.5" />
            <path d="M 40 75 Q 100 100 160 75 T 280 75 T 400 75" fill="none" stroke="#db2777" strokeWidth="1.5" />
            <text x="250" y="38" fill="#0891b2" fontSize="10" fontWeight="bold" textAnchor="middle">Interference Pattern</text>
          </g>
        )}

        {type === 'velocity_time' && (
          <>
            <path d="M 40 120 Q 250 120 460 40" fill="none" stroke="#16a34a" strokeWidth="1.5" />
            <text x="250" y="75" fontSize="10" fill="#16a34a" fontWeight="bold" textAnchor="middle">Increasing Speed (a &gt; 0)</text>
          </>
        )}
      </svg>
    </div>
  );
};
