import React, { useEffect, useState } from 'react'
import Loader from '../../ui/loader/Loader'
import Inputs from './inputs/Inputs'
import Points from './options/Points'
import Button from '../../ui/button/Button.jsx'
import { useFetching } from '../../../hooks/useFetching'
import UsersService from '../../../API/UsersService'

import './postForm.scss'
import UploadImage from './uploadImage/UploadImage'
import Title from '../title/Title'
import success from '../../../Assets/success-image.svg'

const PostForm = ({ nameClass }) => {
   const [options, setOptions] = useState([])

   const [name, setName] = useState('');
   const [nameDirty, setNameDirty] = useState(false);
   const [nameError, setNameError] = useState('Поле "Your name" не може бути пустим');

   const [email, setEmail] = useState('');
   const [emailDirty, setEmailDirty] = useState(false);
   const [emailError, setEmailError] = useState('Поле "Email" не може бути пустим');

   const [phone, setPhone] = useState('');
   const [phoneDirty, setPhoneDirty] = useState(false);
   const [phoneError, setPhoneError] = useState('Поле "Phone" не може бути пустим');

   const [position, setPosition] = useState(0);
   const [positionError, setPositionError] = useState('Оберіть позицію');

   // const [image, setImage] = useState('');
   // const [imageDirty, setImageDirty] = useState(false);
   // const [imageError, setImageError] = useState('The photo format must be jpeg/jpg type');

   const [formValid, setFormValid] = useState(false);
   const [formSent, setFormSent] = useState(false);

   const [fetchPositions, isLoading, usersError] = useFetching(async () => {
      const positions = await UsersService.getPositions();
      setOptions(positions.data.positions)
   })

   useEffect(() => {
      fetchPositions()
   }, [])

   useEffect(() => {
      if (nameError || emailError || phoneError || positionError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [nameError, emailError, phoneError, positionError]);

   const blurHandler = (e) => {
      switch (e.target.name) {
         case 'name':
            setNameDirty(true)
            break
         case 'email':
            setEmailDirty(true)
            break
         case 'phone':
            setPhoneDirty(true)
            break
         // case 'image':
         //    setImageDirty(true)
         //    break
      }
   }

   const handler = (e) => {
      switch (e.target.name) {
         case 'name':
            setName(e.target.value)
            if (e.target.value.length < 2 || e.target.value.length > 60) {
               setNameError('Ім\'я повинно містити від 2-х до 60-ти символів')
               if (!e.target.value) {
                  setNameError('Поле "Your name" не може бути пустим')
               }
            } else {
               setNameError('')
            }
            break
         case 'email':
            setEmail(e.target.value)
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
            if (!re.test(String(e.target.value).toLowerCase())) {
               setEmailError('Некоректний email')
            } else {
               setEmailError('')
               // setImageDirty(false)
            }
            break
         case 'phone':
            setPhone(e.target.value)
            const rePh = /^\+380\d{3}\d{2}\d{2}\d{2}$/;
            if (!rePh.test(String(e.target.value).toLowerCase())) {
               setPhoneError('Невірний формат номеру')
            } else {
               setPhoneError('')
            }
            break
         // case 'image':
         //    const file = e.target
         //    if (!['jpeg', 'jpg'].includes(file.type)) {
         //       setImageError('Невірний формат файлу (лише jpeg/jpg)')
         //    } else if (file.size > 5 * 1024 * 1024) {
         //       setImageError('Файл повинен бути менше 5Мб')
         //    } else {
         //       console.log('ok')
         //       setImageError('')
         //    }
         //    break
      }
   }

   const optionHandler = (e) => {
      setPosition(e.target.dataset.value)
      setPositionError('')
   }

   async function submit(e) {
      e.preventDefault()
      // file from input type='file' 
      var formData = new FormData(); // file from input type='file' 
      var fileField = document.querySelector('input[type="file"]');
      formData.append('position_id', position);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('photo', fileField.files[0]);

      const token = await UsersService.getToken()
      console.log(token)
      console.log(formData)
      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', { method: 'POST', body: formData, headers: { 'Token': token, }, }).then(function (response) { return response.json(); }).then(function (data) {
         console.log(data); if (data.success) {
            setFormSent(true)
         } else { // proccess server errors 
         }
      }).catch(function (error) { // proccess network errors 
      });
   }

   return (
      <form className={`${nameClass} form`} >
         <Inputs
            name={[name, nameDirty, nameError]}
            setName={[setName, setNameDirty, setNameError]}
            email={[email, emailDirty, emailError]}
            setEmail={[email, emailDirty, emailError]}
            phone={[phone, phoneDirty, phoneError]}
            setPhone={[setPhone, setPhoneDirty, setPhoneError]}
            blurHandler={blurHandler}
            handler={handler}
         />
         {
            isLoading
               ? <Loader />
               : <Points optionHandler={optionHandler} options={options} />
         }
         <UploadImage />
         <Button
            disabled={!formValid}
            onClick={(e) => submit(e)}
         >
            Sign up
         </Button>
         {formSent &&
            <div className='registered'>
               <Title nameClass={'registered__title'}>User successfully registered</Title>
               <img src={success} alt="success" />
            </div>}
      </form >
   )
}

export default PostForm