import React from 'react'
import User from '../user/User'

const UsersList = ({ users }) => {
   return (
      <div className="users__items">
         {
            users.map(user =>
               <User
                  nameClass={'users__item'}
                  key={user.registration_timestamp}
                  name={user.name}
                  email={user.email}
                  phone={user.phone}
                  avatar={user.photo}
                  position={user.position}
               />
            )
         }
      </div>
   )
}

export default UsersList