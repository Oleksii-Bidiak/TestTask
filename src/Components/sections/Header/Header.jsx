import React from 'react'
import Button from '../../ui/button/Button.jsx'

import Logo from '../../../Assets/Logo.svg'
import './header.scss'

const Header = () => {
   return (
      <header className='header'>
         <div className="header__container">
            <div className="header__row">
               <div className="header__logo">
                  <img src={Logo} alt="logo" />
               </div>
               <div className="header__buttons">
                  <Button>Users</Button>
                  <Button>Sign up</Button>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header