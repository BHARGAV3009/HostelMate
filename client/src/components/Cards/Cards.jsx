import React from 'react'
import { ShortCardsData, LongCardData } from '../Data'
import CardOne from '../Card/CardOne'
import './Card.css'

function Cards() {

  return (
    <div style={{width:'100%'}}>
      <div className='CardsShort'>
        {ShortCardsData.map((card, id) => {
          return (
            <div className="ParentContainer" key={id}>
              <CardOne 
                title={card.title}
                description={card.description}
                image={card.image}
                buttonText={card.buttonText}
                color={card.color}
              />
            </div>
          
          )
        })}
      </div>
      <div className='CardLong'>
        {LongCardData.map((card, id) => {
          return (
            <div className='LongParent' key={id}>
              <CardOne 
                title1={card.title}
                heading1={card.heading1}
                time1={card.time1}
                heading2={card.heading2}
                time2={card.time2}
                heading3={card.heading3}
                time3={card.time3}
                color1={card.color1}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cards
