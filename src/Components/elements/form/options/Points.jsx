import React from 'react'
import Point from './Point.jsx'
import './points.scss'

const Points = ({ options, optionHandler }) => {

   const subTitle = 'Select your position'

   return (
      <div className="form__options options-form">
         <h5 className="options-form__title">{subTitle}</h5>
         <div className="options-form__list options">
            {
               options.map((option, index) =>
                  <Point
                  optionHandler={optionHandler}
                     name={option.name}
                     key={index}
                     index={index + 1}
                  />
               )
            }
         </div>
      </div>



   )
}

export default Points