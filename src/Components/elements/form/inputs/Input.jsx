import React from 'react'

const Input = ({ label, name, value, setValue, blurHandler, handler }) => {

   const [nameValue, isDirty, error] = value

   return (
      <div className="line-input">
         {(isDirty && error) && <div className="line-input__error">{error}</div>}
         {isDirty && <div className="line-input__dirty"></div>}
         <input onChange={e => handler(e)} value={nameValue} onBlur={(e) => blurHandler(e)} id={name} type="text" name={name} className='line-input__input input' autoComplete="none" />
         <label onBlur={(e) => blurHandler(e)} htmlFor={name} className="line-input__label">{label}</label>
      </div >
   )
}

export default Input