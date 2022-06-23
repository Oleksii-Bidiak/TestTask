import React from 'react'
import Paragraph from '../paragraph/Paragraph'
import Tippy from '@tippyjs/react';
import '../../../styles/tippy.scss'
import './user.scss'

const User = ({ nameClass, name, email, avatar, position, phone }) => {
   return (
      <div className={`${nameClass} user`}>
         <div className="user__body">
            <div className="user__avatar"><img src={avatar} alt="phone" /></div>
            <Tippy placement='bottom' content={name}>
               <div className="user__title">
                  <Paragraph nameClass={'user__name'}>{name}</Paragraph>
               </div>
            </Tippy>
            <div className="user__description">
               <Paragraph nameClass={'user__position'}>{position}</Paragraph>
               <Tippy placement='bottom' content={email}>
                  <a className='user__email text' href={`mailto:${email}`}>{email}</a>
               </Tippy>
               <Tippy placement='bottom' content={phone}>
                  <a className='user__phone text' href={`tel:${phone}`}>{phone}</a>
               </Tippy>
            </div>
         </div>
      </div>
   )
}

export default User