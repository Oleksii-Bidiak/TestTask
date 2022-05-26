import React from 'react'
import Paragraph from '../paragraph/Paragraph'
import './user.scss'

const User = ({ nameClass, name, email, avatar, position, phone }) => {
   return (
      <div className={`${nameClass} user`}>
         <div className="user__body">
            <div className="user__avatar"><img src={avatar} alt="phone" /></div>
            <div className="user__title">
               <Paragraph nameClass={'user__name'}>{name}</Paragraph></div>
            <div className="user__description">
               <Paragraph nameClass={'user__position'}>{position}</Paragraph>
               <Paragraph nameClass={'user__email'}>{email}</Paragraph>
               <Paragraph nameClass={'user__phone'}>{phone}</Paragraph>
            </div>
         </div>
      </div>
   )
}

export default User