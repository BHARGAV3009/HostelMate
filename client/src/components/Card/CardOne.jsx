import React from 'react'
import './CardOne.css'

function CardOne(props) {
  if(props.title && props.description) {
    return (
      <div className='ShortCard' style={{
        background: props.color?.backGround,
        boxShadow: props.color?.boxShadow,
      }}>
        <div className="card-image">
          <span className="emoji">{props.image}</span>
        </div>
        <div className="card-content">
          <h3 className="card-title">{props.title}</h3>
          <p className="card-description">{props.description}</p>
          <button className="card-button">{props.buttonText}</button>
        </div>
      </div>
    )
  }
  
  return(
      <div className='LongCard' style={{
        background:props.color1?.backGround,
        boxShadow:props.color1?.boxShadow,
      }}>
        <div className="heading">
          {props.title1}
        </div>
        <div className="content">
          <h4><span>{props.heading1}</span> : <span>{props.time1}</span></h4>
          <h4><span>{props.heading2}</span> : <span>{props.time2}</span></h4>
          <h4><span>{props.heading3}</span> : <span>{props.time3}</span></h4>
        </div>
      </div>
  )
}

export default CardOne
