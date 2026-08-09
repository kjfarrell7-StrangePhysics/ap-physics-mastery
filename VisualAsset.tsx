import React from 'react';

interface VisualAssetProps {
  type: string;
}

export const VisualAsset: React.FC<VisualAssetProps> = ({ type }) => {
  return (
    <div className="w-full bg-white rounded-lg p-3 my-3 flex flex-col items-center justify-center border border-slate-200 shadow-sm overflow-x-auto">
      <svg viewBox="0 0 400 130" className="w-full max-w-md h-32 font-sans">
        {/* Background Grid */}
        <defs>
          <pattern id="matplotlib-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect x="35" y="15" width="345" height="95" fill="url(#matplotlib-grid)" />
        <rect x="35" y="15" width="345" height="95" fill="none" stroke="#334155" strokeWidth="1" />

        {/* Axes & Labels */}
        <line x1="35" y1="110" x2="380" y2="110" stroke="#334155" strokeWidth="1" />
        <text x="207" y="126" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">Time t (s)</text>

        <line x1="35" y1="15" x2="35" y2="110" stroke="#334155" strokeWidth="1" />
        <text x="18" y="62" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 18, 62)">Distance d (m)</text>

        {/* Incline Quadratic Curve (d proportional to t^2) */}
        {type === 'incline_quadratic' && (
          <>
            {/* Legend */}
            <g transform="translate(45, 22)">
              <rect width="85" height="24" fill="white" stroke="#cbd5e1" strokeWidth="0.8" rx="2" />
              <path d="M 6 12 L 18 12" stroke="#2563eb" strokeWidth="2" />
              <circle cx="12" cy="12" r="3" fill="#2563eb" />
              <text x="24" y="15" fill="#1e293b" fontSize="9">Cart on Incline</text>
            </g>

            {/* Quadratic Path: d = 0.5 * a * t^2 */}
            <path d="M 35 110 Q 200 105 365 30" fill="none" stroke="#2563eb" strokeWidth="2" />
            <circle cx="35" cy="110" r="2.5" fill="#2563eb" />
            <circle cx="140" cy="98" r="2.5" fill="#2563eb" />
            <circle cx="255" cy="72" r="2.5" fill="#2563eb" />
            <circle cx="365" cy="30" r="2.5" fill="#2563eb" />
          </>
        )}

        {/* Fallback / Default Kinematics */}
        {type !== 'incline_quadratic' && (
          <path d="M 35 110 L 365 30" fill="none" stroke="#2563eb" strokeWidth="2" />
        )}
      </svg>
    </div>
  );
};
