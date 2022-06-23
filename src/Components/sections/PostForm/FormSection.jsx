import React from 'react'
import PostForm from '../../elements/form/PostForm.jsx'
import Title from '../../elements/title/Title.jsx'

import './FormSection.scss'

const FormSection = ({ formSent, setFormSent }) => {

   return (
      <section className="sign-up-form" >
         <div className="sign-up-form__container">
            <div className="sign-up-form__body">
               <Title nameClass={'sign-up-form__title'}>Working with GET request</Title>
               <PostForm formSent={formSent} setFormSent={setFormSent} nameClass={'sign-up-form__form'} />
            </div>
         </div>
      </section >
   )
}

export default FormSection