import React from 'react';

const Error = ({ message }) => {
  return (
    <div className="error-container">
      <h1>An Error Has Occurred</h1>
      <div className="error-message">
        <p>{message || 'An unexpected error has occurred. Please try again later.'}</p>
      </div>
      <div className="error-actions">
        <button onClick={() => window.history.back()}>Go Back</button>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    </div>
  );
};

export default Error;
