import React, { useState, useEffect } from 'react'
import Title from '../../elements/title/Title.jsx'
import Button from '../../ui/button/Button.jsx'
import UsersService from '../../../API/UsersService.js'
import Loader from '../../ui/loader/Loader.jsx'
import UsersList from '../../elements/usersList/UsersList.jsx'
import { useFetching } from '../../../hooks/useFetching.js'

import './users.scss'

const Users = ({ formSent }) => {

   const [users, setUsers] = useState([])
   const [nextPage, setNextPage] = useState(false);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(6);

   const [fetchUsers, isLoading, usersError] = useFetching(async () => {

      if (formSent && page === 1) {
         const response = await UsersService.getUsers(page);
         setUsers([...response.data.users])
      } else if (formSent) {
         setPage(1)
      }

      if (!formSent) {
         const response = await UsersService.getUsers(page);
         setUsers([...users, ...response.data.users])
         if (response.data.links.next_url) {
            setNextPage(true)
         } else { setNextPage(false) }
      }
   })

   useEffect(() => {
      fetchUsers()
   }, [page, formSent]);

   const nextUsers = () => {
      setPage(page + 1)
   }

   return (
      <section className="users">
         <div className="users__container">
            <div className="users__body">
               <Title nameClass={'users__title'}>Working with GET request</Title>
               {
                  isLoading
                     ? <Loader />
                     : <UsersList users={users} />
               }
               {
                  nextPage &&
                  <Button
                     nameClass={'users__button'}
                     onClick={nextUsers}
                  >
                     Show more
                  </Button>
               }
            </div>
         </div>
      </section>
   )
}

export default Users