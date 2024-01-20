import React from 'react';

const pageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: "auto"
};

const footerStyle: React.CSSProperties = {
  height: '150px',
  backgroundColor: '#f0f0f0',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   marginTop: "auto"
};

export default function Footer() {
  return (
    <div style={pageStyle}>
      <div style={footerStyle}>
        <h1>Footer</h1>
      </div>
    </div>
  );
}
