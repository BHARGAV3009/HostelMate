import React from "react";

const TransactionDetailsTwo = ( { transactionID, Amount, PaidDate, DueAmount, Status, backGround, background, bottom, marginbottom, colorText } ) => {

    return(
        <div className="Transaction" style={{display: 'flex', flexDirection: 'row', gap: '20px', justifyContent: 'space-between', alignItems: 'center', backgroundColor: background, borderBottom : bottom, marginBottom : marginbottom, padding: '5px' }}>
        <p>{transactionID}</p>
        <p>{Amount}</p>
        <p>{PaidDate}</p>
        <p style={{ color : colorText }}>{DueAmount}</p>
        <p style={{ width: '50px', backgroundColor: backGround, textAlign: 'center', borderRadius: '10px',boxShadow: '0px 0px 5px rgba(0,0,0,0.25)' }}>{Status}</p>
        </div>
    )
};

export default TransactionDetailsTwo;