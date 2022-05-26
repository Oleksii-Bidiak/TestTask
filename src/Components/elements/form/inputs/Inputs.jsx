import React from 'react'
import Input from './Input.jsx'

import './inputs.scss'

const Inputs = ({ name, email, phone, setName, setEmail, setPhone, blurHandler, handler }) => {

   return (
      <div className="form__inputs">
         <Input handler={handler} blurHandler={blurHandler} value={name} setValue={setName} label={'Your name'} name={'name'} />
         <Input handler={handler} blurHandler={blurHandler} value={email} setValue={setEmail} label={'Email'} name={'email'} />
         <Input handler={handler} blurHandler={blurHandler} value={phone} setValue={setPhone} label={'Phone'} name={'phone'} />
      </div>
   )
}

export default Inputs