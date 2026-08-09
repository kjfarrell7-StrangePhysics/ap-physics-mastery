import React from 'react';

interface VisualAssetProps {
  type: string;
}

export const VisualAsset: React.FC<VisualAssetProps> = ({ type }) => {
  return (
    <div className="w-full bg-white rounded-lg p-2.5 my-2 flex flex-col items-center justify-center border border-slate-200 shadow-sm overflow-x-auto">
      <svg viewBox="0 0 400 110" className="w-full max-w-sm h-28 font-sans">
        {/* Background Grid */}
        <defs>
          <pattern id="matplotlib-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect x="35" y="10" width="345" height="85" fill="url(#matplotlib-grid)" />
        <rect x="35" y="10" width="345" height="85" fill="none" stroke="#334155" strokeWidth="1" />

        {/* Axes & Labels */}
        <line x1="35" y1="95" x2="380" y2="95" stroke="#334155" strokeWidth="1" />
        <text x="207" y="108" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">Time t (s)</text>

        <line x1="35" y1="10" x2="35" y2="95" stroke="#334155" strokeWidth="1" />
        <text x="16" y="52" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle" transform="rotate(-90, 16, 52)">Value</text>

        {/* Velocity vs Time Triangle Graph */}
        {type === 'velocity_triangle' && (
          <>
            <g transform="translate(45, 15)">
              <rect width="80" height="20" fill="white" stroke="#cbd5e1" strokeWidth="0.8" rx="2" />
              <path d="M 5 10 L 15 10" stroke="#2563eb" strokeWidth="2" />
              <text x="20" y="13" fill="#1e293b" fontSize="8">v(t) Triangle</text>
            </g>
            <path d="M 35 95 L 200 25 L 365 95" fill="rgba(37, 99, 235, 0.1)" stroke="#2563eb" strokeWidth="2" />
            <circle cx="35" cy="95" r="2" fill="#2563eb" />
            <circle cx="200" cy="25" r="2" fill="#2563eb" />
            <circle cx="365" cy="95" r="2" fill="#2563eb" />
          </>
        )}

        {/* Incline Quadratic Graph */}
        {type === 'incline_quadratic' && (
          <>
            <path d="M 35 95 Q 200 90 365 25" fill="none" stroke="#2563eb" strokeWidth="2" />
            <circle cx="35" cy="95" r="2" fill="#2563eb" />
            <circle cx="365" cy="25" r="2" fill="#2563eb" />
          </>
        )}

        {/* Default Fallback */}
        {type !== 'velocity_triangle' && type !== 'incline_quadratic' && (
          <path d="M 35 95 L 365 25" fill="none" stroke="#2563eb" strokeWidth="2" />
        )}
      </svg>
    </div>
  );
};
