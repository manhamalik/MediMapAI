import React from 'react';

const sectionStyle = {
  height: '100vh', // Full viewport height
  display: 'flex',
  backgroundColor: '#1D3254',
  color: '#fff',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  boxSizing: 'border-box',
};

const TumorGuide = () => {
  return (
    <div>
      <section id="types" style={sectionStyle}>
        <h1>Tumor Guide</h1>
        <h2>Types & Causes</h2>
        <p>
          Learn about the different types of tumors and their causes. This section provides an overview
          of how tumors develop and the factors that contribute to their formation.
        </p>
      </section>

      <section id="symptoms" style={sectionStyle}>
        <h2>Symptoms</h2>
        <p>
          Understand the common symptoms of tumors. This section explains the warning signs that
          could indicate the presence of a tumor and when to seek medical advice.
        </p>
      </section>

      <section id="treatments" style={sectionStyle}>
        <h2>Treatments</h2>
        <p>
          Explore the treatment options available for different types of tumors. This section covers
          surgical, medical, and alternative therapies to manage or remove tumors.
        </p>
      </section>
    </div>
  );
};

export default TumorGuide;
