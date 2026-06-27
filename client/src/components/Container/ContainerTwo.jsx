
import React from "react";

const ContainerTwo = ({ title, amount, icon: Icon, borderBottom, IconColor }) => {
  return (
    <div
      className="box"
      style={{
        width: '90%',
        height: '80px',
        border: '1px solid #ccc',
        borderBottom: borderBottom,
        borderRadius: '10px',
        textAlign: 'center',
        margin: '20px auto'
      }}
    >
      <h3 style={{ textAlign: 'start', marginLeft: '7%' }}>{title}</h3>
      <div
        className="both"
        style={{ display: 'flex', alignItems: 'center', gap: '15px' }}
      >
        <p style={{ textAlign: 'left', marginLeft: '7%' }}>{amount}</p>
        <Icon
          size={30}
          style={{
            marginBottom: '10px',
            marginLeft: '50%',
            color: IconColor,
          }}
        />
      </div>
    </div>
  );
};

export default ContainerTwo;