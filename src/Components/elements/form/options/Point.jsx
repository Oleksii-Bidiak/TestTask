import React from 'react'

const Point = ({ name, index, optionHandler }) => {
   return (
      <div className="options__item options">
         <input hidden id={`o_${index}`} className="options__input" type="radio" value={index} name="option" />
         <label onClick={(e) => optionHandler(e)} htmlFor={`o_${index}`} data-value={index} name="option" className="options__label"><span onClick={(e) => optionHandler(e)} name="option" data-value={index} className="options__text">{name}</span></label>
      </div >
   )
}

export default Point