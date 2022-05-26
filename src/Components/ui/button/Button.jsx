import React from 'react'

import './button.scss'

const Button = ({ children, nameClass, ...props }) => {
   return (
      <button {...props} className={`button ${nameClass}`}>{children}</button>
   )
}

export default Button