import React from 'react'
import './title.scss'

const Title = ({ children, nameClass, ...props }) => {
   return (
      <h1 className={`title ${nameClass}`}>{children}</h1>
   )
}

export default Title