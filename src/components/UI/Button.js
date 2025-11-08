// src/components/UI/Button.js
import React from 'react';
import '../../styles/components.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  type = 'button',
  ...props 
}) => {
  return (
    <button
      type={type}
      className={`ui-button ${variant} ${size} ${className} ${loading ? 'loading' : ''}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="button-spinner">⏳</span>}
      {children}
    </button>
  );
};

export default Button;