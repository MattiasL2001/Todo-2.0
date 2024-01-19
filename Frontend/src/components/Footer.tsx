import React from 'react';

export default function Footer() {
    const footerStyle: React.CSSProperties = {
        height: '150px', // You can change this to '200px' if you prefer
        width: '100%',
        backgroundColor: '#f0f0f0', // Add your desired background color
        position: 'fixed',
        bottom: '0',
        left: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={footerStyle}>
            <h1>Footer</h1>
        </div>
    );
}
