// src/components/UI/Card.js
import React from 'react';
import '../../styles/components.css';

const Card = ({ children, className = '', title, subtitle, actions }) => {
  return (
    <div className={`ui-card ${className}`}>
      {(title || subtitle) && (
        <div className="card-header">
          <div className="card-title">
            {title && <h3>{title}</h3>}
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="card-actions">{actions}</div>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;