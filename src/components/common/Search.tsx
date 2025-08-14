import React from 'react';
import iconSearch from '../../assets/images/icons/search.svg';

interface SearchProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
  style?: React.CSSProperties;
  height?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const Search: React.FC<SearchProps> = ({
  placeholder = "Search for...",
  value,
  onChange,
  onSubmit,
  className = "",
  style,
  height = "48px",
  disabled = false,
  ariaLabel = "Search"
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange?.(newValue);
  };



  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value && onSubmit) {
      onSubmit(value);
    }
  };

  return (
    <div className={`position-relative search-input ${className}`} style={style}>
      <input
        type="search"
        className="form-control form-control-dark rounded-pill ps-5"
        style={{ height }}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={disabled}
      />
      <img
        src={iconSearch}
        alt="search"
        className="position-absolute"
        style={{ 
          left: "15px", 
          top: "50%", 
          transform: "translateY(-50%)",
          width: "20px", 
          height: "20px" 
        }}
      />
    </div>
  );
};

export default Search;
