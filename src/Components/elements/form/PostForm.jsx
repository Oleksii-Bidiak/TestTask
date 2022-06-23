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

const PostForm = ({ nameClass, formSent, setFormSent }) => {
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

   const [image, setImage] = useState('');
   const [imageDirty, setImageDirty] = useState(false);
   const [imageError, setImageError] = useState('The photo format must be jpeg/jpg type');


   const [formValid, setFormValid] = useState(false);
   const [formSentError, setFormSentError] = useState('');

   const [fetchPositions, isLoading, usersError] = useFetching(async () => {
      const positions = await UsersService.getPositions();
      setOptions(positions.data.positions)
   })

   useEffect(() => {
      fetchPositions()
   }, [])

   useEffect(() => {
      if (nameError || emailError || phoneError || positionError || imageError) {
         setFormValid(false)
      } else {
         setFormValid(true)
      }
   }, [nameError, emailError, phoneError, positionError, imageError]);

   const blurHandler = (e) => {
      switch (e.target.name) {
         case 'name':
            setNameDirty(true)
            setFormSent(false)
            break
         case 'email':
            setEmailDirty(true)
            setFormSent(false)
            break
         case 'phone':
            setPhoneDirty(true)
            setFormSent(false)
            break
         case 'image':
            setImageDirty(true)
            setFormSent(false)
            break
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
         case 'image':
            const file = e.target.files[0]
            console.log(file)
            if (!['image/jpeg', 'image/jpg'].includes(file.type)) {
               setImageError('Невірний формат файлу (лише jpeg/jpg)')
            } else if (file.size > 5 * 1024 * 1024) {
               setImageError('Файл повинен бути менше 5Мб')
            } else {
               console.log('ok')
               if (!file) return; // else it will throw an parse error        
               const url = URL.createObjectURL(file);
               setImage(url)
               setImageError('')
               // const imagePreview = document.querySelectorAll('.file-form__preview>span>img')
               // console.log(imagePreview)
               // if (imagePreview.offsetHeight >= 70 && imagePreview.offsetWidth >= 70) {
               //    setImageError('')
               // } else {
               //    setImageError('Зображення має бути не меншим, ніж 70х70 px')
               // }
            }
            break
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

      fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', { method: 'POST', body: formData, headers: { 'Token': token, }, }).then(function (response) { return response.json(); }).then(function (data) {
         console.log(data);
         if (data.success) {
            setFormSentError('')
            setFormSent(true)
            setName('')
            setEmail('')
            setPhone('')
            setImage('')
         } else {
            setFormSentError(data.message)
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
         <UploadImage
            value={[image, imageDirty, imageError]}
            blurHandler={blurHandler}
            handler={handler}
         />
         <Button
            disabled={!formValid}
            onClick={(e) => submit(e)}
            nameClass='form__button'
         >
            Sign up
         </Button>
         {formSent &&
            <div className='registered'>
               <Title nameClass={'registered__title'}>User successfully registered</Title>
               <img src={success} alt="success" />
            </div>
         }
         {formSentError !== ''
            ? <div className="form__error">{formSentError}</div>
            : ''
         }
      </form >
   )
}

export default PostForm