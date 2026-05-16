import React from 'react';

export function FilterRadioGroup ({ label, value, onChange, options, activeClass, inactiveClass, labelIcon: LabelIcon }) {
  const refs = React.useRef([]);
  const groupId = React.useId();
  const labelId = `${groupId}-label`;

  const handleKeyDown = (e, idx) => {
    const last = options.length - 1;
    let next = idx;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = idx === last ? 0 : idx + 1;
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = idx === 0 ? last : idx - 1;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = last;
    else return;
    e.preventDefault();
    onChange(options[next].id);
    refs.current[next]?.focus();
  };

  const focusedIndex = Math.max(0, options.findIndex((o) => o.id === value));

  return (
    <div className="mb-5">
      <div id={labelId} className="text-xs uppercase tracking-wider text-blue-700 font-medium mb-3 flex items-center gap-1.5">
        {LabelIcon && <LabelIcon className="w-3 h-3" aria-hidden="true" />}
        {label}
      </div>
      <div role="radiogroup" aria-labelledby={labelId} className="flex flex-wrap gap-2">
        {options.map((opt, idx) => {
          const Icon = opt.icon;
          const isActive = value === opt.id;
          return (
            <button
              key={opt.id}
              ref={(el) => (refs.current[idx] = el)}
              type="button"
              role="radio"
              aria-checked={isActive}
              tabIndex={idx === focusedIndex ? 0 : -1}
              onClick={() => onChange(opt.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border focus:outline-none focus:ring-2 focus:ring-blue-500 ${isActive ? activeClass : inactiveClass}`}
            >
              {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// =====================================================
//  COMPOSANTS BLOCS — Guide
