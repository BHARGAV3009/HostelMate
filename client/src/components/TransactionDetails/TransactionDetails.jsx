import React from "react";
import { TransactionHistory } from "../Data";
import TransactionDetailsTwo from "./TransactionDetailsTwo";

const TransactionDetails = () => {
  return (
    <>
      <div
        id="top"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          style={{
            width: "100px",
            height: "40px",
            backgroundColor: "white",
            borderRadius: "5px",
            marginLeft: "64%",
          }}
        >
          View Details
        </button>
      </div>
      <div
        className="Transactions"
        style={{
          width: "55vw",
          borderRadius: "5px",
          padding: "15px",
          marginTop: "20px",
          boxShadow: "0px 0px 2px rgba(0,0,0,0.75)",
        }}
      >
        {TransactionHistory.map((card, id) => (
          <div className="parent" key={id} style={{ marginTop: "0" }}>
            <TransactionDetailsTwo
              transactionID={card.transactionID}
              Amount={card.Amount}
              PaidDate={card.PaidDate}
              DueAmount={card.DueAmount}
              Status={card.Status}
              backGround={card.backGround}
              background={card.background}
              bottom={card.bottom}
              marginbottom={card.marginbottom}
              colorText={card.colorText}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default TransactionDetails;
