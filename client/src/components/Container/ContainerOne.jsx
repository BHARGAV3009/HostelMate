import React from "react";
import { Payments } from "../Data";
import ContainerTwo from "./ContainerTwo";

const ContainerOne = () => {
  return (
    <div style={{ width: '100%' }}>
      <div className='payment-box' style={{ display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}>
        {Payments.map((card, id) => (
          <div className="ParentContainer" key={id}>
            <ContainerTwo 
              title={card.title}
              amount={card.amount}
              icon={card.icon}
              borderBottom={card.borderBottom}
              IconColor={card.IconColor}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerOne;
