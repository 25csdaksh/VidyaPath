import React from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

export const Search = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search topics, algorithms, projects...',
  className = '',
  onClear,
  style = {},
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`search-bar-container ${className}`.trim()} style={style}>
      <div className="search-icon-wrapper">
        <SearchIcon size={18} />
      </div>
      <input
        type="text"
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          style={{
            position: 'absolute',
            right: '0.85rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '0.2rem',
          }}
          aria-label="Clear search query"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Search;
