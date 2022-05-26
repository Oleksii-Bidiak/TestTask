import React from 'react'
import './paragraph.scss'

const Paragraph = ({ children, nameClass, ...props }) => {
   return (
      <p className={`text ${nameClass}`}>{children}</p>
   )
}

export default Paragraph
