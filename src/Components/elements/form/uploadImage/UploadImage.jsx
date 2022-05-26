import React from 'react'
import './uploadImage.scss'

const UploadImage = () => {
   return (
      <div className='form__file file-form'>
         <div className="file-form__item">
            <input accept='.jpeg, .jpg' type="file" name="image" id="formImage" className='file-form__input' />
            <div className="file-form__button">Upload</div>
         </div>
         <div className="file-form__preview">Upload your photo</div>
      </div>
   )
}

export default UploadImage