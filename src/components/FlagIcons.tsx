import React from 'react';

export const UkFlagIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-7' }) => {
  return (
    <svg
      viewBox="0 0 60 36"
      className={`${className} inline-block rounded-xs shadow-xs overflow-hidden shrink-0 align-middle`}
      aria-label="Drapeau Anglais"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="36" rx="2" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        {/* Blue background */}
        <rect width="60" height="36" fill="#012169" />
        
        {/* White diagonals (St Andrew / St Patrick) */}
        <line x1="0" y1="0" x2="60" y2="36" stroke="#ffffff" strokeWidth="6" />
        <line x1="60" y1="0" x2="0" y2="36" stroke="#ffffff" strokeWidth="6" />
        
        {/* Red diagonals (St Patrick) */}
        <line x1="0" y1="0" x2="60" y2="36" stroke="#C8102E" strokeWidth="2" />
        <line x1="60" y1="0" x2="0" y2="36" stroke="#C8102E" strokeWidth="2" />
        
        {/* White cross (St George broad) */}
        <rect x="25" y="0" width="10" height="36" fill="#ffffff" />
        <rect x="0" y="13" width="60" height="10" fill="#ffffff" />
        
        {/* Red cross (St George) */}
        <rect x="27" y="0" width="6" height="36" fill="#C8102E" />
        <rect x="0" y="15" width="60" height="6" fill="#C8102E" />
      </g>
    </svg>
  );
};

export const FrenchFlagIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-5' }) => {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`${className} inline-block rounded-xs shadow-xs overflow-hidden shrink-0 align-middle`}
      aria-label="Drapeau Français"
    >
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#ffffff" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </svg>
  );
};
